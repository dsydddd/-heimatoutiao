<template>
 <input 
  class="hminput"
 :class="{success:flag,error:!flag}"
         @input='handlerInput'
         @blur='handlerBlur'
 >
</template>

<script>
export default {
    props:{
        rules: {
      // 定义数据的校验规则
      type: RegExp
     
    },
    },
    msg:{
         type: String,
      default: '输入错误'
    },
    data(){
 return{
     flag:"",
     class:'success'
 }
    },

    methods:{
        handlerInput(e){
          let value =e.target.value
             if (this.rules) { // 判断是否传递了规则
        // 进行用户数据的校验
        if (this.rules.test(value)) { // 合法
          console.log('ok');
          this.flag = true
        } else { // 不合法
          console.log('no ok');
          this.flag = false
        }
      }

        this.$emit('input',value)
        },
         handlerBlur (e) {
      let value = e.target.value
      if (this.rules) { // 判断是否传递了规则
        // 进行用户数据的校验
        if (!this.rules.test(value)) { // 合法
          console.log(this.msg)
        }
      }
    }
    }

}
</script>

<style lang="less" scoped>
.hminput {
  width: 314 / 360vw * 100;
  height: 50px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 20px;
  color: #888;
  line-height: 50px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>