<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" :title="name" left-arrow></van-nav-bar>
    <van-tabs @change="onTabChange">
      <van-tab v-for="(item, index) in tabs" :key="index" :title="item.name"></van-tab>
    </van-tabs>
    <div v-if="dataList.length">
      <van-list
        ref="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <mystausItem :act="'order'" :data="dataList" />
      </van-list>
    </div>
    <div v-else class="no-login">
      <img src="../../assets/empty.png" alt />
      <div class="info">暂无订单</div>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, List } from "vant";
import { order } from "@/util/http";
import mystausItem from "./orderItem";
// import { OrderType } from "@/util/enums";
export default {
  props: {},
  data() {
    return {
      name: OrderType.getValue(this.$route.query.order_type) || "我的订单",
      dataList: [],
      params: {
        order_status: 0,
        order_type: this.$route.query.order_type
      },
      loading: false,
      finished: true,
      tabs: [
        { name: "全部订单", order_status: 0 },
        { name: "待支付", order_status: 1 },
        { name: "已完成", order_status: 2 },
        { name: "已取消", order_status: 3 }
      ]
    };
  },
  components: {
    mystausItem
  },
  mounted() {
    console.log(this.$route.query);
    this.orderreq();
  },
  methods: {
    onLoad() {},
    onTabChange(index) {
      console.log(index);
      this.params.order_status = this.tabs[index].order_status;
      this.orderreq(this.params);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onGetdata(data) {
      this.dataList = data;
      console.log(this.dataList);
    },
    orderreq() {
      order(this.params).then(res => {
        console.log(res);
        this.dataList = res.list;
      });
    }
  }
};
</script>