<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
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
        <hmpostblock
          v-for="post in postlist"
          :key="post.id"
          :article="post"
        ></hmpostblock>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCategory } from "@/apis/category";
import { getPostList } from "@/apis/post";
import hmpostblock from "@/components/hm_postblock";
export default {
  components: {
    hmpostblock,
  },
  data() {
    return {
      active: localStorage.getItem("heimatoken") ? 1 : 0,
      cateList: [],
      postlist: [],
    };
  },
  async mounted() {
    let res = await getCategory();
    console.log(res);
    this.cateList = res.data.data;
    // 获取当前被激活栏目的新闻数据
    let id = this.cateList[this.active].id;

    this.postlist = (await getPostList(id)).data.data;
  },
  watch: {
    async active() {
      console.log(this.active);
      let id = this.cateList[this.active].id;

      this.postlist = (await getPostList(id)).data.data;
      console.log(this.postlist);

      // console.log(id);
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: #f00;
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