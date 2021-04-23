<template>
  <div class="header">
      <div class="left">
          <slot name="left">
             
          </slot>
      </div>
      <div class="center">{{title}}</div>
       <div class="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:"MY-HEADER"
        }
    }

}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .right {
    font-size: 20px;
    color: Red;
  }
}
</style>