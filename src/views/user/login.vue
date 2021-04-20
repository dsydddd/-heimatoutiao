<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <hm_input
          v-model="user.username"
          placeholder="请输入手机号"
          :rules="/^1[35789]\d{9}$/"
          msg="请输入11位手机号"
        ></hm_input>
        <hm_input
          v-model="user.password"
          placeholder="请输入密码"
          :rules="/^.{3,16}$/"
          msg="请输入3~16位的密码"
        ></hm_input>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <hm_button @click="login" type="success">登陆</hm_button>
    </div>
  </div>
</template>

<script>
import hm_button from "@/components/hm_button";
import hm_input from "@/components/hm_input";
import {userLogin} from '@/apis/userlogin'
export default {
  components: {
    hm_button,
    hm_input,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (/^1[35789]\d{9}$|^admin$/.test(this.user.username) && /^.{3,16}$/.test(this.user.password)) {
        userLogin(this.user)
          .then(res => {
          if(res.data.data.message ="登录成功"){
 this.$toast.success('成功登录');
          }else{
this.$toast.fail('失败了');
          }
          })
          .catch(err => {
            console.log(err);
          })
      } else {
 this.$toast.fail('密码和用户名不正确');
      }
    },
  },
};
</script>

<style lang="less">
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #3385ff;
  }
}
</style>
