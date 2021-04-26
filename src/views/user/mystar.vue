<template>
  <div class="stars">
    <hmheader title="我的收藏">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </hmheader>
    <hm_postBlock
      v-for="value in startsList"
      :key="value.id"
      :post="value"
      @click="$router.push({path: `/post/ ${value.id}`})"
    ></hm_postBlock>
  </div>
</template>

<script>
import hmheader from "@/components/hm_header.vue";
import hm_postBlock from "@/components/hm_postblock";
import { getUserStars } from "@/apis/user.js";
export default {
  components: {
    hmheader,
    hm_postBlock,
  },
  data() {
    return {
      startsList: [],
    };
  },
  async mounted() {
    let res = await getUserStars();
    this.startsList = res.data.data;
  },
};
</script>

<style>
</style>