<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <hm_input
        type="text"
          v-model="user.username"
          placeholder="请输入手机号"
          :rules="/^1[35789]\d{9}$/"
          msg="请输入11位手机号"
        ></hm_input>
          <hm_input
           type="text"
          v-model="user.nickname"
          placeholder="请输入昵称"
          :rules="/^.{2,10}$/"
          msg="请输入2~10位的昵称"
        ></hm_input>


        <hm_input
         type="password"
          v-model="user.password"
          placeholder="请输入密码"
          :rules="/^.{3,16}$/"
          msg="请输入3~16位的密码"
        ></hm_input>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/login" class="">去登录</a>
      </p>
      <hm_button @click="register" type="danger">注册</hm_button>
    </div>
  </div>
</template>

<script>
import hm_button from "@/components/hm_button";
import hm_input from "@/components/hm_input";
import { userRegister } from "@/apis/user";
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
        nickname:""
      },
    };
  },
  methods: {
    register() {
      if (
        /^1[35789]\d{9}$|^admin$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.password)
      ) {
        userRegister(this.user)
          .then((res) => {
              console.log(res);
            if ((res.data.data.message = "注册成功")) {
              this.$toast.success("成功注册");
              this.$router.push({ path:`/login`})
            } else {
              this.$toast.fail("注册失败手机号码已经存在");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail("密码和用户名不正确");
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
