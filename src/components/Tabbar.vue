<template>
  <div>
    <van-tabbar active-color="#fd6103" route v-model="active">
    <van-tabbar-item to="/one" class="a" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/two" icon="hotel-o">课程</van-tabbar-item>
    <van-tabbar-item to="/three" icon="tosend">练习</van-tabbar-item>
    <van-tabbar-item to="/home" icon="orders-o">约课</van-tabbar-item>
    <van-tabbar-item to="/person" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
  </div>

</template>
<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="scss">
.icon--xiaolu {
  font-size: 19px !important;
}
.icon-kecheng {
  font-size: 19px !important;
}
.icon-dianji {
  font-size: 19px !important;
}
.icon-lianxi {
  font-size: 19px !important;
}
.icon-yonghu {
  font-size: 19px !important;
}
</style>