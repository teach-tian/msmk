<template>
  <div>
    <van-nav-bar title="找回密码" left-text="返回" left-arrow @click-left="goBack" />
    <van-form @submit="resetPassword" style="margin-top:30px;position: relative;">
      <span class="getCode" @click="getResetCode">获取验证码</span>
      <van-field
        class="formInput"
        v-model="reset.mobile"
        name="用户名"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        class="formInput"
        v-model="reset.password"
        name="用户名"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        class="formInput"
        v-model="reset.sms_code"
        name="验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请输入短信验证码' }]"
      />
      <div style="margin: 16px;">
        <van-button
          style="margin-top:60px"
          round
          block
          type="info"
          native-type="submit"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
        >注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { zzhSmsCode, zzhReset } from "../../util/http.js";
export default {
  // 组件名称
  name: "demo", // 组件参数 接收来自父组件的数据
  props: [],
  components: {},
  data() {
    return {
      reset: {
        mobile: "",
        password: "",
        sms_code: ""
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      this.$router.push("/login");
    },
    async getResetCode() {
      const queryInfo = {
        mobile: this.reset.mobile,
        sms_type: "getPassword"
      };
      const res = await zzhSmsCode(queryInfo);
    },
    async resetPassword() {
      console.log(this.reset);
      const res = await zzhReset(this.reset);
      console.log(res);
      this.$toast("修改密码成功");
      setTimeout(() => {
        this.$router.push("/login");
      }, 800);
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {}
};
</script> 
<style scoped>
.otherWay {
  display: flex;
  justify-content: space-between;
  color: #999999;
}
.getCode {
  position: absolute;
  right: 0;
  z-index: 2;
  margin-top: 15px;
  color: #eb6100;
}
</style>
