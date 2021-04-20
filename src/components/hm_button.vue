<template>
  <div
    class="btn"
    :class="{ success: type == 'success', danger: type == 'danger' }"
    @click="handler"
  >
    <slot > </slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    }
  },
  methods: {
    handler(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 318 * 100vw/360;
  height: 50px;
  background-color: rgb(155, 161, 151);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
.success {
  background-color: rgb(82, 165, 26);
}
.danger {
  background-color: rgb(207, 52, 25);
}
</style>