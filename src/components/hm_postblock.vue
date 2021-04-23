<template>
  <div class="single">
    <div class="left">
      <p class="content">{{article.title}}</p>
      <p class="info">
        <span>{{article.user.nickname}}</span>
        <span>{{article.comment_length}}跟帖</span>
      </p>
    </div>
    <img :src="article.cover[0].url"
         alt />
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
</style>