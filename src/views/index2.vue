<template>
  <div class="index">
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
    <van-tabs v-model="active" sticky swipeable>
  <van-tab :title="cate"
  v-for="cate in cateList "
  :key="cate.id">
  
  
  </van-tab>
  
</van-tabs>


  </div>


</template>

<script>
import { getCateList } from "@/apis/category.js";
import { getPostList } from "@/apis/post.js";

import hm_postBlock from "@/components/hm_postblock";
export default {
    data(){
        return{
            // active等同于栏目的index值
            active:localStorage.getItem('heimatoken')? 1:0,
            cateList:''
        }
    },
    // 获取栏目数据 顺带获得每个栏目的id
  async  mounted(){
let res=await getCateList()
this.cateList=res.data.data
// 数据改造--重点 获取到的标签栏目 内容进行数据改造
    // 🧨🧨 在每个栏目中添加一个保存新闻数据的空数组 后面各取各需
    // 🍖再添加页码和页面条数
    this.cateList =this.cateList.map((v) =>{

        console.log(v);
       return{
           ...v,
           post
           
       }
    })
    }


}
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