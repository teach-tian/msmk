<template>
  <div>
    <div class="hand">
      <div class="detail_hander">
        <van-icon @click="hui" class="icon" name="arrow-left" />讲师详情
      </div>
      <div class="detail_cart">
        <img class="img" :src="detailData.avatar" alt />
        <div class="cart_content">
          <p class="name">{{detailData.teacher_name}}</p>
          <p class="cart_xq">
            <span>{{detailData.sex==0?"男":"女"}}</span>
            <span>&nbsp;{{detailData.age}}年教龄</span>
          </p>
        </div>
        <div class="cart_right" @click="focus">{{flag==2?'关注':'取消关注'}}</div>
      </div>
    </div>
    <div class="detail_content">
      <van-tabs title-active-color="#eb6100" color="#eb6100" v-model="active">
        <van-tab title="讲师介绍">
          <div v-for="(item,index) in attr" :key="index">
            <div class="contetn_item">
              <p class="content_name">{{item.attr_name}} :</p>
              <div class="content_txt" v-for="(item2,index) in item.attr_value" :key="index">
                <p class="txt_xq">{{item2.attr_value_name}}</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="主讲课程">
          <div v-for="(item,index) in attr" :key="index">
            <div v-if="index<2" class="contetn_item">
              <p class="content_name">{{item.attr_name}}:</p>
              <div class="content_txt" v-for="(item2,index) in item.attr_value" :key="index">
                <p class="txt_xq">{{item2.attr_value_name}}</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="学员评价">
          <div class="evaluation">
            <img class="image" src="../../assets/images/empty.png" alt />
            暂无评价
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div v-show="detailData.level_name" @click="onorder" class="detail_bottom">立即预约</div>
  </div>
</template>

<script>
import { teacherId, teacherInfo, teacherCollect } from "../../util/http";
export default {
  data() {
    return {
      detailData: {},
      active: 0,
      attr: [],
      flag: 0,
      fouc: true
    };
  },
  components: {
  },
  mounted() {
    teacherId(this.$route.query.id).then(res => {
      console.log(res);
      this.flag = res.flag;
      this.detailData = res.teacher;
    });
    teacherInfo(this.$route.query.id).then(res => {
      this.attr = res.attr;
    });
  },
  methods: {
    hui() {
      this.$router.go(-1);
    },
    //关注
    focus() {
      teacherCollect(this.detailData.id).then(res => {
        console.log(1)
        console.log(res);
        this.$toast({
          message: res.flag == 1 ? "已关注" : "已取消",
          type: "success",
          duration: 1000
        });
        teacherId(this.$route.query.id).then(res => {
          console.log(res)
          this.flag = res.flag;
          this.detailData = res.teacher;
        });
      });
    },
    onorder(){
      this.$router.push({
        path:"/otoplan",
        query:{
          id:this.detailData.id
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/CSS/index.scss";
.detail_bottom {
  @include BgC(#eb6100, #fff);
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  position: absolute;
  bottom: 0;
}
.detail_bottomw {
  @include BgC(#bfbfbf, #fff);
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  position: absolute;
  bottom: 0;
}
.evaluation {
  text-align: center;
}
.image {
  width: 100%;
}
.detail_content {
  @include Wm(100%);
  @include BgC(#fff, #777);
  margin-top: 60px;
  font-size: 13px;
  .contetn_item {
    display: flex;
    align-items: center;
    .content_name {
      padding: 0 10px;
    }
    .txt_xq {
      padding: 0 5px;
    }
  }
}
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
    background: #ebeefe;
    border-radius: 15px;
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