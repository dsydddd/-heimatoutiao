<template>
  <div class="hmcell">
    <div class="left">{{title}}</div>
    <div class="right">
      <span>{{desc}}</span>
      <!-- <span class="iconfont iconjiantou1"></span> -->
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.hmcell {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .right {
    font-size: 12px;
    color: #999;
  }
}
</style>