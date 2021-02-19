<template>
  <div>
    <van-nav-bar @click-left="$router.go(-1)" title="开通会员" left-arrow></van-nav-bar>
    <div class="user">
      <img class="avatar" :src="userinfo.avatar" alt />
      <div class="user_xq">
        <p class="title">{{userinfo.nickname}}</p>
        <p>开通会员免费学习</p>
      </div>
    </div>
    <div class="content">
      <p>
        购买会员
        <span>购买会员后可免费观看会员课程</span>
      </p>
      <div class="tent_item">
        <div
          v-for="(item,index) in viplist"
          :class="{active:act==item.id}"
          :key="index"
          class="item"
          @click="vip(item)"
        >
          <p class="name">{{item.name}}</p>
          <p class="price">
            <i class="iconfont icon-jinbi"></i>
            {{item.price}}
          </p>
        </div>
      </div>
    </div>
    <van-button class="btn" type="default">立即支付</van-button>
  </div>
</template>

<script>
import { Userinfo, Vip } from "../../../util/http";
export default {
  props: {},
  components: {
  },
  mounted() {
    Userinfo().then(res => {
      console.log(res);
      this.userinfo = res;
    });
    this.getvip();
  },
  data() {
    return {
      userinfo: {},
      viplist: [],
      act: 5
    };
  },
  methods: {
    vip(item) {
      this.act = item.id;
    },
    getvip() {
      Vip().then(res => {
        console.log(res);
        this.viplist = res;
      });
    }
  }
};
</script>

<style scoped  lang="scss">
.active {
  background: #f9f0d9 !important;
}
.btn {
  position: fixed;
  bottom: 30px;
  width: 95%;
  left: 10px;
  right: 0px;
  border-radius: 20px;
  background: #dfbe86;
  color: #fff;
}
.user {
  height: 75px;
  background: #fff;
  display: flex;
  align-items: center;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 20px;
  }
  .user_xq {
    line-height: 10px;
    padding-left: 20px;
    color: #777;
    .title {
      font-size: 14px;
    }
  }
}
.content {
  width: 95%;
  margin: 30px auto;
  p {
    font-size: 16px;
    span {
      font-size: 12px;
      color: #777;
    }
  }
  .tent_item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .item {
      width: 102px;
      height: 112px;
      border: 1px solid #e6c37f;
      border-radius: 10px;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 0px;
      justify-content: center;
      .name {
        font-weight: 510;
      }
      .price {
        font-size: 19px;
        font-weight: 540;
        color: #d5a322;
        .iconfont {
          font-size: 16px;
          color: #ffae01;
        }
      }
    }
  }
}
</style>
