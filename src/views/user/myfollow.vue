<template>
  <div class="myfollow">
    <!-- 头部 -->
    <hm_header title='我的关注'>
      <template v-slot:left>
        <van-icon name="arrow-left"
                  @click="$router.go(-1)" />
      </template>
    </hm_header>
    <!-- 关注列表 -->
    <div class="list">
      <div class="box"
           v-for='(value,index) in followList'
           :key='value.id'>
        <img :src="value.head_img"
             alt="">
        <div class="center">
          <p>{{value.nickname}}</p>
          <span>2019-9-9</span>
        </div>
        <span  @click="cancelFolllow(value.id,index)
        "
        >取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import hm_header from '@/components/hm_header.vue'
import { getUserFollows, unFollowUser} from '@/apis/user.js'
import axios from '@/utils/myaxios.js'
export default {
  components: {
    hm_header
  },
  data () {
    return {
      followList: []
    }
  },
  async mounted () {
    let res = await getUserFollows()
    console.log(res);
    this.followList = res.data.data.map(v => {
      v.head_img = axios.defaults.baseURL + v.head_img
      return v
    })
  },methods:{
     async cancelFolllow(id,index){
         let res =await unFollowUser(id)
      this.$toast.success(res.data.message)
      this.followList.splice(index,1)


      }
  }
}
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>