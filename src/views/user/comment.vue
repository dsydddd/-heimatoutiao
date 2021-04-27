// @/views/Comment.vue
<template>
  <div class="comments">
    <hmheader title="精彩评论">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </hmheader>
    <div class="lists">
      <div class="item" v-for="value in commentList" :key="value.id">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{ value.user.nickname }}</p>
            <span>2小时前</span>
          </div>
          <span @click="replayComment(value)">回复</span>
        </div>
        <hmcommentitem
          v-if="value.parent"
          :parent="value.parent"
        ></hmcommentitem>
        <div class="text">{{ value.content }}</div>
      </div>
      <hmcommentFooter :post="article" @refresh="refresh"
      :commentObj="temp"
      @cancel="temp=null"
      ></hmcommentFooter>
    </div>
  </div>
</template>

<script>
import hmheader from "@/components/hm_header.vue";
import hmcommentitem from '@/components/hm_commentitem'
import hmcommentFooter from '@/components/hm_commentFooter'
import {getCommentList ,getPostDetail} from '@/apis/post'
import axios from '@/utils/myaxios.js'
export default {
  components: {
    hmheader,hmcommentitem,hmcommentFooter
  },
  data(){
      return{
    commentList:[],
    article:{},
    temp:{}
      }
  },
  async mounted(){
    this.init()
    },
     methods: {
  async init(){
  let id = this.$route.params.id
  // console.log(id);
  
      // 获取文章详情数据
  
      this.article = (await getPostDetail(id)).data.data
      let res = await getCommentList(id,{pageSize:40,pageIndex:1})
      console.log(res)
      this.commentList = res.data.data
    // 图片路径的处理
      this.commentList = this.commentList.map(value => {
          value.user.head_img = axios.defaults.baseURL + value.user.head_img
          return value

    })
    },refresh () {
      this.init()
      // 让列表自动的滚动到顶部
      window.scrollTo(0, 0)
    },
    // 应为value在循环中所以 🍗定义中间变量temp 得到父传子的值 value
    replayComment(v){
      console.log('父组件中的', v);
      
      this.temp= v
    }
     }
  
};
</script>

<style lang='less' scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding-bottom: 60px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>