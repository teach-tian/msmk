<template>
  <div>
    <ul class="staus">
      <li v-for="(item,index) in data" :key="index">
        <p class="number">订单编号：{{item.order_number}}</p>
        <p class="title">{{item.title}}</p>
        <p class="number">时间: &nbsp;&nbsp;{{item.created_at | fomartTime('yyyy.MM.dd hh:mm')}} </p>
        <p class="number">
            实付款：
            <i class="iconfont icon-jinbi"></i>
            {{item.order_price | toFixPrice}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props: {
    data: {
      type: Array
    }
  },
  components: {
    [Icon.name]: Icon
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.hour_xq {
  padding-left: 10px;
}
.hour_tiem {
  width: 90px;
  height: 4px;
  background: #eee;
}
.hour {
  color: #777;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.cource_xq {
  padding-left: 10px;
  //   margin-top: -10px;
  display: flex;
  align-items: center;
  color: #777;
  .icon {
    margin-right: 5px;
  }
}
.iconfont{
    color: orange;
    font-size: 12px;
}
.staus {
  width: 90%;
  margin: 0 auto;
  li {
    border: 1px rgb(230, 230, 230) solid;
    height: 127px;
    margin-top: 15px;
    border-radius: 5px;
    p{
        line-height: 12px;
        color: #777;
    }
    .number{
        padding-left: 10px;
    }
    .title {
      font-size: 14px;
      padding-left: 10px;
      margin-top: 20px;
    }
  }
}
</style>