<template>
   <div class="content">
        <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="goBack" />
        <van-cell title="设置密码" @click="toSetPass()" is-link />
        <van-button
          @click='toLogOut()'
          style="margin-top:60px"
          round
          block
          type="info"
          native-type="submit"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
        >退出登录</van-button>
   </div>
</template>

<script>
export default {
     name:'',
    components: {

    },
    props: [

    ],
    data() {
        return {

        };
    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    mounted() {
        
    },
    methods: {
        goBack(){
            this.$router.push("/selfInfo");
        },
        toSetPass(){
            this.$router.push("/forget-pass");
        },
        toLogOut(){
            window.localStorage.clear()
            window.sessionStorage.clear()
            this.$router.push("/login");
        }
    },
};
</script>

<style scoped >

</style>
