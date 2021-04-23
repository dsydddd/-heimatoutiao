<template>
  <div class="edit_profile">
    <hm_header title="编辑用户信息">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>

      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </hm_header>
    <div class="imgarea">
      <img :src="userinfo.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell
      title="昵称"
      :desc="this.userinfo.nickname"
      @click.native="editNicknameDialog"
    ></hmcell>
    <van-dialog
      v-model="nickshow"
      title="编辑昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field
        v-model="nickname"
        label="昵称:"
        placeholder="请输入用户昵称"
      />
    </van-dialog>
    <hmcell
      title="密码"
      :desc="this.userinfo.password"
      @click.native="
        passshow = !passshow;
        oldpass = newpassword = '';
      "
    ></hmcell>
    <van-dialog
      v-model="passshow"
      title="编辑密码"
      show-cancel-button
      @confirm="editPass"
      :beforeClose="beforeClose"
    >
      <van-field
        v-model.trim="oldpass"
        label="原密码:"
        placeholder="请输入原密码"
      />
      <van-field
        v-model.trim="newpassword"
        label="新密码:"
        placeholder="请输入新密码"
      />
    </van-dialog>

    <hmcell
      title="性别"
      :desc="userinfo.gender == 1 ? '男' : '女'"
      @click.native="gendershow = !gendershow"
    ></hmcell>
    <van-action-sheet v-model="gendershow"
     :actions="actions" @select="onSelect" 
     :close-on-click-action ='true'
     />
  </div>
</template>

<script>
import axios from "@/utils/myaxios";
import hm_header from "@/components/hm_header";
import hmcell from "@/components/hm_cell.vue";
import { fileUpload } from "@/apis/fileUpload.js";
import { getUserDetail, updateUserInfo } from "@/apis/user.js";

export default {
  components: {
    hm_header,
    hmcell,
  },
  data() {
    return {
      userinfo: {},
      nickshow: false,
      nickname: "",
      passshow: false,
      gendershow:false,
      oldpass: "",
      newpassword: "",
        actions: [{ name: '男' }, { name: '女' }],
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    //  console.log(this.$route.params);
    //    console.log(id);
    getUserDetail(this.id)
      .then((res) => {
        console.log(res);
        this.userinfo = res.data.data;
        // 数据改造：在图片路径之前拼接基准路径
        console.log(this.userinfo);

        this.userinfo.head_img =
          axios.defaults.baseURL + this.userinfo.head_img;
        console.log(this.userinfo.head_img);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      console.log(file.file);
      const formdata = new FormData();
      formdata.append("file", file.file);
      fileUpload(formdata)
        .then((res) => {
          console.log("文件上传成功", res);
          if (res.data.message == "文件上传成功") {
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;
            console.log(this.userinfo.head_img);

            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                console.log(res);
                if (res.data.message == "修改成功") {
                  this.$toast.success(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editNicknameDialog() {
      this.nickshow = !this.nickshow;
      this.nickname = this.userinfo.nickname;
    },
    editNickname() {
      updateUserInfo(this.$route.params.id, {
        nickname: this.nickname,
      })
        .then((res) => {
          console.log(res);
          if (res.data.message == "修改成功") {
            this.userinfo.nickname = this.nickname;
            this.$toast.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editPass() {
      console.log(this.userinfo.password);
      console.log("1", this.newpassword);

      if (this.oldpass == this.userinfo.password) {
        if (/^.{3,16}$/.test(this.newpassword)) {
          let res = await updateUserInfo(this.$route.params.id, {
            password: this.newpassword,
          });
          console.log(res);
          console.log("1", this.newpassword);

          this.userinfo.password = this.newpassword;
          this.$toast.success(res.data.message);
        } else {
          this.$toast.fail("密码输入必须是3到16位");
        }
      } else {
        this.$toast.fail("原密码输入错误");
      }
    },
    beforeClose(action, done) {
      if (action == "confirm") {
        if (
          this.oldpass !== this.userinfo.password ||
          !/^.{3,16}$/.test(this.newpassword)
        ) {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    async onSelect(item){

      console.log(item);

      let gender = item.name == '男' ? 1 : 0
      let res = await updateUserInfo(this.$route.params.id, { gender })
      // 页面刷新：所谓刷新就是修改元素所绑定的数据
      this.userinfo.gender = gender
      this.$toast.success(res.data.message)
      console.log(res);
      
    }
    

  },
};
</script>

<style lang="less" scoped>
.edit_profile {
  .imgarea {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    position: relative;
    > img {
      width: 120px;
      height: 120px;
      display: block;
    }

    /deep/ .van-uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    /deep/ .van-uploader__upload {
      width: 120px;
      height: 120px;
      opacity: 0;
    }
  }
}
</style>