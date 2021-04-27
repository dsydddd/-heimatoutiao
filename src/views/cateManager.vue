<template>
  <div class="cateManager">
    <hm_header title="栏目管理">
      <template v-slot:left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <div class="delCate">
      <h3>点击删除频道</h3>
      <div class="list">
        <span
        
         v-for="value in cateList" :key="value.id" @click="removeCate(value)">{{
          value.name
        }}</span>
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道</h3>
      <div class="list">
        <span v-for="value in unaddcateList" :key="value.id" @click="addCate(value)">{{
          value.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import {getCateList} from "@/apis/category";
export default {
  components: {
    hm_header,
  },
  data() {
    return {
      cateList: [],
      unaddcateList: [],
    };
  },
  async mounted() {
       this.cateList = JSON.parse(localStorage.getItem('cateList') )
if(!this.cateList){
  let res = await getCateList();
    console.log(res);
    this.cateList = res.data.data;
       if (localStorage.getItem('heimatoutiao_token')) {
        this.cateList.splice(0, 2)
      } else {
        this.cateList.splice(0, 1)
      }
      console.log(this.cateList);
      
}
    
   this.unaddcateList = JSON.parse(localStorage.getItem('unaddcateList')) || '[]'
  },
  methods: {
    removeCate(value) {
      this.unaddcateList.push(value);
      this.cateList = this.cateList.filter((v) => {
        return v.id != value.id;
      });
// 存储起来
      localStorage.setItem('cateList',JSON.stringify(this.cateList))
      localStorage.setItem('unaddcateList',JSON.stringify(this.unaddcateList))
    },
      addCate(value) {
      this.cateList.push(value);
      this.unaddcateList = this.unaddcateList.filter((v) => {
        return v.id != value.id;
      });
// 存储起来
        localStorage.setItem('cateList',JSON.stringify(this.cateList))
      localStorage.setItem('unaddcateList',JSON.stringify(this.unaddcateList))
    },

  },
};
</script>

<style lang="less" scoped>
.delCate,
.addCate {
  padding: 10px;
  h3 {
    line-height: 30px;
    font-weight: bold;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 21%;
      border: 1px solid #ccc;
      margin: 5px;
      padding: 10px 15px;
      text-align: center;
      &:hover {
        background-color: #ccc;
        color: #fff;
      }
    }
  }
}
</style>