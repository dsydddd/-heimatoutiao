<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search"
       @click="$router.push({path:'/search'})"
      >
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- tab标签页
    1.数量超过5个，标签项才能左右滚动--滑动
    2.sticky：实现吸顶效果
    3.swipeable：滑动内容，实现标签项的切换 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <van-list
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          :offset="5"
          :immediate-check="false"
          @load="onLoad"
        >
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <hm_postBlock
              v-for="item in cate.postlist"
              :key="item.id"
              :post="item"
            ></hm_postBlock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category.js";
import { getPostList } from "@/apis/post.js";

import hm_postBlock from "@/components/hm_postblock";
export default {
  data() {
    return {
      // 当前被激活项的索引值:这个索引值就对应着数据在数组中的索引
      // 🧨🧨active是标签栏目tabs的index索引值 下
      // 这个项目在打开首页之后，应该让“头条”栏目默认被选中，如果登陆了，有了关注，那么active=1，否则 active=0
      active: localStorage.getItem("heimatoken") ? 1 : 0,
      cateList: [], // 所有栏目数据
      // postlist: [] // 栏目的新闻数据
    };
  },
  components: {
    hm_postBlock,
  },
  async mounted() {
    document.querySelector(".van-sticky").onclick =(e) => {
      console.log(e.target.className);
      if (e.target.className.indexOf("van-sticky") !=-1) {
        // 说明点击的位置是入口位置
        this.$router.push({ name: "cateManager" });
      }
    };
    // 获取栏目数据
    // let res = await getCateList()
    // this.cateList = res.data.data
    // console.log(res.data.data);
    // let res = await getCateList();
    // this.cateList = res.data.data;
    this.cateList = JSON.parse(localStorage.getItem('cateList') || '[]')
    if (this.cateList.length == 0) {
      // 页面一加载完毕：获取栏目数据
      let res = await getCateList()
      // console.log(res.data.data);
      // 这个数据现在只有 id  name  is_top，并没有存储新闻数据的数组
      this.cateList = res.data.data
    } else { // 有本地存储数据，那么就需要手动的添加 “关注”和“头条”
      if (localStorage.getItem('heimatoken')) {
        this.cateList.unshift({ id: 0, name: '关注', is_top: 1 }, { id: 999, name: '头条', is_top: 1 })
      } else {
        this.cateList.unshift({ id: 999, name: '头条', is_top: 1 })
      }
    }

    // 数据改造--重点 获取到的标签栏目 内容进行数据改造
    // 🧨🧨 在每个栏目中添加一个保存新闻数据的空数组 后面各取各需
    // 🍖再添加页码和页面条数
    //  this.cateList = this.cateList.map((v) => {
    //   return { ...v, postlist: [] }
    //  })
    this.cateList = this.cateList.map((v) => {
      return {
        ...v,
        postlist: [],
        pageSize: "6",
        pageIndex: "1",
        loading: false,
        finished: false,
        isLoading: false,
      };
    });
    console.log(this.cateList);
    // 获取当前被激活栏目的新闻数据
    this.getpost();
  },

  watch: {
    async active() {
      // 如果当前栏目的postlist有数据，则不用再发请求
      if (this.cateList[this.active].postlist.length == 0) {
        this.getpost();
      }
    },
  },
  methods: {
    async onRefresh() {
      (this.cateList[this.active].pageIndex = 1),
        (this.cateList[this.active].postlist.length = 0);

      await this.getpost();
      this.$toast("刷新成功");
    },
    onLoad() {
      this.cateList[this.active].pageIndex++;
      setTimeout(() => {
        this.getpost();
      }, 1000);
    },
    async getpost() {
      console.log(this.active);
      // 根据当前的Active获取到数据在数组中的索引，通过索引获取栏目id
      // this.active:当前标签项的索引，它就是数据的索引
      // this.cateList[this.active]：获取当前被激活项的栏目数据
      // this.cateList[this.active].id：获取栏目id
      // let id = this.cateList[this.active].id

      // 🧨🧨将数据存储在当前栏目对象的postlist数组中
      let current = (
        await getPostList({
          category: this.cateList[this.active].id,
          pageSize: this.cateList[this.active].pageSize,
          pageIndex: this.cateList[this.active].pageIndex,
        })
      ).data.data;
      this.cateList[this.active].postlist.push(...current);
      //  本次加载完成后 loading重置为false
      this.cateList[this.active].loading = false;
      //  本次加载完成后 isLoading重置为false
      this.cateList[this.active].isLoading = false;
      // 判断数据是否已全部加载完毕：我要求6条数据，结果返回的数量小于6，说明真没有数据了
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
      // console.log(this.postlist);
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  /deep/ .van-sticky {
    padding-right: 44px;

    &::before {
      content: "+";
      width: 44px;
      height: 44px;
      position: absolute;
      top: 0;
      right: 0;
      background-color: red;
      color: #fff;
      line-height: 38px;
      text-align: center;
      font-size: 30px;
    }
  }

  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: orange;
    .logo {
      color: #fff;
      .iconnew {
        font-size: 50px;
      }
    }
    .search {
      flex: 1;
      height: 40px;
      margin-top: 5px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin: 0 10px;
    }
    .user {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>