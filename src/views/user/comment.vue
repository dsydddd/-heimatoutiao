// @/views/Comment.vue
<template>
  <div class="comments">
    <hmheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
    <div class="lists">
      <div class="item"
      v-for="value in commentList "
      :key="value.id"
      >
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <hmcommentitem v-if="value.parent" :parent="value.parent"></hmcommentitem>
        <div class="text">{{value.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import hmheader from "@/components/hm_header.vue";
import hmcommentitem from '@/components/hm_commentitem'
import {getCommentList} from '@/apis/post'
import axios from '@/utils/myaxios.js'
export default {
  components: {
    hmheader,hmcommentitem
  },
  data(){
      return{
    commentList:[]
      }
  },
  async mounted(){
    let res = await getCommentList(this.$route.params.id,{pageSize:40,pageIndex:1})
    console.log(res)
    this.commentList = res.data.data.length>0?res.data.data:this.commentList
	// 图片路径的处理
    this.commentList = this.commentList.map(value => {
        value.user.head_img = axios.defaults.baseURL + value.user.head_img
        return value
    })
}
};
</script>

<style lang='less' scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
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