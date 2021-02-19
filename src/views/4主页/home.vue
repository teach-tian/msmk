<template>
  <div>
     <van-nav-bar
      title="约课记录"
     />

    <van-tabs v-model="activeName" title-active-color="rgb(235,97,0)" background-color="#000" line-width="20px" line-height="2.5px" title-inactive-color="rgb(125,126,128)">
      <van-tab title="待上课" name="a"></van-tab>
      <van-tab title="已上课" name="b"></van-tab>
      <van-tab title="已取消" name="c"></van-tab>
    </van-tabs>


    <div class="item_image">
        <img src="../../assets/yue.png" alt="">
    </div>
    <div class="item_btn">
      <button class="btn" @click="addGotoAuto">立即约课</button>
    </div>


  </div>
</template>

<script>

import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';

export default {
  data(){
    return {
      activeName: 'a',
    }
  },


  components:{
    [NavBar.name]:NavBar,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs
  },




  methods:{
    addGotoAuto(){
      this.$router.push('/oto')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-nav-bar {
    font-size: 30rem;
  }

  .item_image {
    width: 100%;
    height: 300px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // flex-wrap: wrap;
    img {
      width: 250px;
      height: 140px;

    }
  }

  .item_btn {
    width: 100%;
      display: inline-flex;
    justify-content: center;
    align-items: center;
  .btn {
      font-size: 16px;
      color: #ffffff;
      background-color: rgb(235, 97, 0);
      border: none;
      outline: none;
      width:90px;
      height: 35px;
  }
  }


  
</style>