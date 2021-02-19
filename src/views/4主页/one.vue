<template>
  <div>
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item @click="swiper(item)" v-for="(item,index) in list" :key="index">
          <img class="banner_image" :src="item.banner_img" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <Kinds />
    </div>
    <Cart :data="item" v-for="(item,index) in cartlist" :key="index"></Cart>
    <div class="bottom"></div>
  </div>
</template>

<script>
import Kinds from "../../components/home/kinds";
import Cart from "../../components/home/Card";
import { banner, cartlist } from "../../util/http";
export default {
  components: {
    Kinds,
    Cart,
  },
  mounted() {
    document.body.style.background = "#f2f3f5";

    this.getBaner();
    cartlist().then(res => {
      this.cartlist = res;
    });
  },
  data() {
    return {
      cartlist: [],
      list: []
    };
  },
  methods: {
    getBaner() {
      // console.log(this.$http);
      banner().then(res => {
        this.list = res;
      });
    },
    swiper(e) {
      console.log(e);
      this.$router.push({
        path: "/coursedet",
        query: {
          id: e.link_content
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.bottom {
  height: 60px;
}
.swiper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 51%;
}
.banner_image {
  width: 100%;
}
</style>