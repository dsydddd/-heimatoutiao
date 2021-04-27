<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2"
            @click="$router.back()"></span>
      <van-search v-model.trim="userKey"
                  placeholder="请输入搜索关键词"
                  shape="round">
      </van-search>
      <div @click="search">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <p v-for='item in historyList'
         :key='item'
         @click='searchByHistory(item)'>{{item}}</p>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link :to="{path:`/postDetail/${value.id}`}"
                   v-for='value in searchList'
                   :key='value.id'>{{value.title}}</router-link>
    </div>
  </div>
</template>

<script>
import { searchPost } from '@/apis/post.js'
export default {
  data () {
    return {
      userKey: '',
      searchList: [],
      historyList: []
    }
  },
  methods: {
    async search () {
      let res = await searchPost(this.userKey)
      console.log(res);
      this.searchList = res.data.data

      // 将当前关键字存储到本地存储
      // 获取本地存储，并转换为数组
      // let arr = JSON.parse(localStorage.getItem('toutiao_search')) || []
      // 将关键字添加到数组
      // arr.unshift(this.userKey)
      let index = this.historyList.indexOf(this.userKey)
      if (index !== -1) {
        // 先删除
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(this.userKey)
      localStorage.setItem('toutiao_search', JSON.stringify(this.historyList))
    },
    searchByHistory (item) {
      this.userKey = item
      this.search()
    }
  },
  mounted () {
    // 如果有本地存储就获取数据，如果没有本地存储就进行初始化
    this.historyList = JSON.parse(localStorage.getItem('toutiao_search')) || []
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>