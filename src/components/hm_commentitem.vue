<template>
  <div class="commentItem">
    <div class="top">
      <div class="left">
        <span>{{parent.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span>回复</span>
    </div>
    <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    parent: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>