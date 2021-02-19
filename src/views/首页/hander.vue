<template>
  <div>
    <div class="hand">
      <div class="detail_hander">
        <van-icon @click="hui" class="icon" name="arrow-left" />{{title}}
      </div>
      <div class="detail_cart">
        <img class="img" :src="detailData.avatar" alt />
        <div class="cart_content">
          <p class="name">{{detailData.teacher_name}}</p>
          <p class="cart_xq">
            <span>{{detailData.sex==0?"男":"女"}}</span>
            <span>&nbsp;{{detailData.teach_age}}年教龄</span>
          </p>
        </div>
        <div @click="ondescribe" class="cart_right">{{describe}}</div>
      </div>
    </div>
  </div>
</template>


<script>
import {Icon} from "vant"
export default {
    props:['detailData','title','describe'],
  data() {
    return {};
  },
  components:{
      [Icon.name]:Icon
  },
  methods: {
    hui() {
      this.$router.go(-1);
    },
    ondescribe(){
      this.$router.push({
        path:"/teacherDetail",
        query:{
          id:this.detailData.id
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.detail_cart {
  height: 100px;
  @include Wm(95%);
  background: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    border-radius: 100%;
  }
  .cart_content {
    width: 210px;
    .name {
      font-size: 15px;
    }
    .cart_xq {
      color: #777;
    }
  }
  .cart_right {
    width: 62px;
    height: 28px;
    padding: 0 5px;
    background: #ebeefe;
    border-radius: 10px;
    text-align: center;
    line-height: 28px;
    color: #eb6100;
  }
}
.hand {
  width: 100%;
  height: 100px;
  background: #5ba2f4;
  .detail_hander {
    @include Wm(95%);
    height: 44px;
    text-align: center;
    color: #fff;
    line-height: 44px;
    font-size: 18px;
    .icon {
      line-height: 44px;
      float: left;
    }
  }
}
</style>