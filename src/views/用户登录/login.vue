<template>
  <div class="login">
    <van-image
      style="margin-top:50px"
      src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019pILfAg7Avr1567732916.png"
    />
    <!-- 登录 -->
    <van-form v-if="loginView" @submit="toLogin" style="margin-top:30px;">
      <van-field
        class="formInput"
        v-model="login.mobile"
        name="请输入手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        class="formInput"
        v-model="login.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <p class="otherWay">
        <span @click="toForgetPass">找回密码</span>
        <span @click="loginView=false,registerView=true">注册/验证码登录</span>
      </p>
      <div style="margin: 16px;">
        <van-button
          style="margin-top:60px"
          round
          block
          type="info"
          native-type="submit"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
        >提交</van-button>
      </div>
    </van-form>
    <!-- 注册 -->
    <van-form v-if="registerView" @submit="toRegister" style="margin-top:30px;position: relative;">
      <span class="getCode" @click="getCode">获取验证码</span>
      <van-field
        class="formInput"
        v-model="register.mobile"
        name="用户名"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        class="formInput"
        v-model="register.sms_code"
        name="验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请输入短信验证码' }]"
      />
      <p class="otherWay">
        <span>*未注册的手机号将自动注册</span>
        <span @click="loginView=true,registerView=false">使用密码登录</span>
      </p>
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
import { zzhSmsCode, zzhLogin, zzhReset } from "../../util/http";
export default {
  // 组件名称
  name: "demo", // 组件参数 接收来自父组件的数据
  props: [],
  components: {},
  data() {
    return {
      loginView: true,
      registerView: false,
      forgetView: false,
      findPassword: false,
      login: {
        mobile: "",
        password: "",
        type: 1,
        client: 1
      },
      register: {
        mobile: "",
        sms_code: "",
        type: 2,
        client: 1
      },
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
    async toLogin(values) {
      const res = await zzhLogin(this.login);
      if (!res.id) {
        return this.$toast("信息不正确");
      } else {
        console.log(res.remember_token);
        window.sessionStorage.setItem("user", JSON.stringify(res));
        window.localStorage.setItem("adminToken", res.remember_token);
        this.$toast("登录成功");
        setTimeout(() => {
          this.$router.push("/person");
        }, 800);
      }
    },
    async toRegister(values) {
      const queryInfo = {};
      const res = await zzhLogin(this.register);
      if (!res.id) {
        return this.$toast("信息不正确");
      } else {
        console.log(res.is_new);
        if (res.is_new == 2) {
          console.log(res.remember_token)
          window.localStorage.setItem("adminToken",res.remember_token);
          window.sessionStorage.setItem("user", JSON.stringify(res));
          this.$toast("登录成功");
          setTimeout(() => {
            this.$router.push("/person");
          }, 800);
        }else{
          window.localStorage.setItem("adminToken", res.remember_token);
          window.sessionStorage.setItem("user", JSON.stringify(res));
          var info = {
            mobile:this.register.mobile,
            sms_code:this.register.sms_code
          }
          this.$store.commit('saveInfo',info)
          this.$router.push('/setPassFirst')
        }
      }
    },
    async getCode() {
      const queryInfo = {
        mobile: this.register.mobile,
        sms_type: "login"
      };
      const res = await zzhSmsCode(queryInfo);
    },
    toForgetPass() {
      this.$router.push("/forget-pass");
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {}
};
</script> 
<style scoped>
.login {
  padding: 30px;
  box-sizing: border-box;
  height: 100%;
}
.formInput {
  height: 50px;
  line-height: 30px;
  font-size: 20px;
}
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
