<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="我的优惠券" left-arrow></van-nav-bar>
    <van-tabs @change="onchange" v-model="active">
      <van-tab v-for="(item,index) in tabs" :key="index" :title="item.text"></van-tab>
    </van-tabs>
    <div>
      <Empty v-if="list.length==0" :empty_type="empty" />
    </div>
  </div>
</template>

<script>
import { Coupon } from "../../../util/http";
import Empty from "../../../components/empty";
export default {
  props: {},
  data() {
    return {
      empty: {
        name: "暂无优惠券"
      },
      active: 0,
      tabs: [
        {
          text: "未使用",
          id: 0
        },
        {
          text: "已使用",
          id: 1
        },
        {
          text: "已过期",
          id: 2
        }
      ],
      list: []
    };
  },
  components: {
    Empty
  },
  mounted() {
    let obj = {
      status: 0
    };
    Coupon(obj).then(res => {
      this.list = res;
    });
  },
  methods: {
    getCoupon(v) {
      let obj = {
        status: v
      };
      Coupon(obj).then(res => {
        this.list = res;
      });
    },
    onchange(v) {
      console.log(v);
      this.getCoupon(v);
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss" >
</style>
