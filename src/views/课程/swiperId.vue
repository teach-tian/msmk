<template>
  <div>
    <div class="top">
      <van-nav-bar @click-left="onClickLeft" left-arrow>
        <template #title>
          <span v-if="top<30">课程详情</span>
          <div class="h_title" v-else>
            <span :class="{'active':active=='tro'}" @click="scrollTo('tro')">课程介绍</span>
            <span :class="{'active':active=='list'}" @click="scrollTo('list')">课程大纲</span>
            <span :class="{'active':active=='com'}" @click="scrollTo('com')">课程评价</span>
          </div>
        </template>
        <template #right>
          <van-icon @click="show=true" color="#000" size="20" name="exchange" />
          <van-dialog
            v-model="show"
            title="分享"
            :close-on-click-overlay="true"
            :show-confirm-button="false"
          >
            <img :src="qrimg" alt />
          </van-dialog>
        </template>
      </van-nav-bar>
    </div>
    <div>
      <div class="info">
        <p class="title">
          <span>{{data.info.title}}</span>
          <span @click="oncollects" :class="{'ic-active':data.info.is_collect}">
            <!-- <i class="iconfont icon-shoucang" ></i> -->
            收藏
          </span>
        </p>
        <p class="price">
          <i class="iconfont icon-jinbi"></i>
          <span v-if="data.info.price!=0">{{data.info.price | toFixPrice}}</span>
          <span v-else>免费</span>
        </p>
        <p class="info_xq">
          <span>共{{data.info.total_periods}}课时 | {{data.info.sales_num}}人报名</span>
        </p>
        <p
          class="info_xq"
        >开课时间：{{data.info.start_play_date | fomartTime('yyyy.MM.dd hh:mm')}} - {{data.info.end_play_date | fomartTime('yyyy.MM.dd hh:mm')}}</p>
      </div>
      <div v-if="data.couponList.length !==0" class="actives">
        <p>活动:</p>
        <div class="vip">优惠</div>
        <p>
          领取优惠券最多可减 &nbsp;
          <i class="iconfont icon-jinbi"></i>&nbsp;10
        </p>
        <p @click="show1=true" class="reveive">领取></p>
        <van-popup v-model="show1" position="bottom" :style="{ height: '50%' }" />
      </div>
      <div class="teach">
        <p class="title">教学团队</p>
        <div class="team_item">
          <ul>
            <li v-for="(item,index) in data.teachers" :key="index">
              <div class="avatar">
                <img class="image" :src="item.avatar" alt />
              </div>
              <div class="txt">{{item.teacher_name}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div id="tro" class="cd_tro">
        <p class="title">课程介绍</p>
        <div class="cd-details" v-html="data.info.course_details"></div>
      </div>
      <div id="list" class="cd_list">
        <p class="title">课程大纲</p>
        <Charpter :info="data.info" />
      </div>
      <div id="com" class="cd_comment">
        <p class="title">课程评论</p>
        <img src="../../assets/images/empty.png" alt />
      </div>
      <van-button class="course-btn" @click="submit">{{state==0?'立即报名':'立即学习'}}</van-button>
    </div>
  </div>
</template>

<script>
import Charpter from "../../components/Charpter";
import { NavBar, Icon, Button, Overlay, Popup, Toast, Dialog } from "vant";
import Tiem from "../../util/Time";
import { collect, nocollect } from "../../util/http";
export default {
  name: "swiperid",
  data() {
    return {
      data: {
        info: {
          title: ""
        },
        couponList: []
      },
      top: 0,
      show: false,
      show1: false,
      active: "",
      qrimg: "",
      state: 0
    };
  },
  components: {
    Charpter,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Overlay.name]: Overlay,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  mounted() {
    console.log(this.$router.query)
    this.getdetail();
    this.getUrl();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    //收藏
    oncollects() {
      console.log(this.data.info.id)
      let obj = {
        course_basis_id: this.data.info.id,
        type: 1
      };
      if (!this.data.info.is_collect) {
        collect(obj).then(() => {
          console.log('收藏成功')
          this.$toast({
            message: "收藏成功",
            type: "success",
            duration: 800
          });
        });
      } else {
        nocollect(this.data.info.collect_id).then(() => {
          console.log('取消收藏')
          this.$toast({
            message: "取消收藏",
            duration: 800
          });
        });
      }
      this.getdetail(); 
    },
    getdetail() {
      this.$http
        .get(`/app/courseInfo/basis_id=${this.$route.query.id}`)
        .then(res => {
          console.log(res);
          if (res.info.is_buy || res.info.is_join_study) {
            this.state = 1;
          }
          console.log(this.state);
          this.data = res;
        });
    },
    getUrl() {
      let URL = document.URL + "&share=1";
      this.QueryDetail = URL;
      this.$qrcode.toDataURL(URL, (err, res) => {
        if (err) {
          throw err;
        }
        this.qrimg = res;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    submit() {
      console.log(this.data.info.id, this.data.info.course_type, this.data);
      if (this.data.info.is_free) {
        this.$http
          .post(`/app/order/downOrder`, {
            shop_id: this.data.info.id,
            type: this.data.info.course_type
          })
          .then(res => {
            console.log(res);

            this.$toast({
              message: "成功",
              type: "success",
              duration: 1000
            });
            this.getdetail();
          });
      } else {
        if (
          this.data.info.stock == 0 &&
          this.data.info.store_num > 0 &&
          (this.data.info.course_type == 7 || this.data.info.course_type == 3)
        ) {
          this.$toast({
            message: "你来晚了哦,名额已经没有了~",
            type: "success",
            duration: 1500
          });
          return;
        }
      }
    },
    handleScroll() {
      this.top = document.body.scrollTop || document.documentElement.scrollTop;
    },
    scrollTo(v) {
      this.active = v;
      let h = document.getElementById(`${v}`).offsetTop - 45;
      // console.log(h);
      document.documentElement.scrollTop = h;
    }
  },
  filters: {
    itemD(v) {
      return Tiem(v);
    }
  }
};
</script>


<style lang="scss" scoped>
.icon-shoucang {
  font-size: 16px;
  padding-right: 10px;
}
.ic-active {
  color: red;
}
.active {
  color: #333;
  font-weight: 500;
  font-size: 18px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 180px;
  height: 180px;
  background-color: #fff;
}
.iconfont {
  margin-right: 5px;
}
.h_title {
  span {
    padding: 0 5px;
  }
}
.course-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eb6100;
  color: #fff;
  width: 100%;
}
.cd_comment {
  width: 100%;
  height: 180px;
  background: #fff;
  text-align: center;
  margin-bottom: 60px;
  .title {
    text-align: left;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;
  }
  img {
    width: 90px;
    height: 100px;
  }
}
.cd_list {
  width: 100%;
  height: 101px;
  background: #fff;
  .title {
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;
  }
}
.cd_tro {
  width: 100%;
  background: #fff;

  .title {
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;
  }
  .cd-details {
    padding-left: 10px;
    padding-bottom: 10px;
  }
}
.teach {
  width: 100%;
  height: 145px;
  background: #fff;
  margin-top: 15px;
  .title {
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;
  }
  .team_item {
    padding-left: 10px;
    overflow: hidden;
    ul {
      display: flex;
      align-items: center;
      li {
        width: 70px;
        float: left;
        margin-right: 10px;
        text-align: center;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          margin: 0 auto;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
        .txt {
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
    .image {
      width: 100%;
      border-radius: 100%;
    }
  }
}
.icon-jinbi {
  color: #e9bf17;
  font-size: 13px;
}
.actives {
  width: 100%;
  height: 56px;
  background: #fff;
  margin-top: 15px;
  display: flex;
  align-items: center;
  .vip {
    width: 38px;
    height: 19px;
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
    background-image: url("../../assets/images/bg-vip-board.png");
    background-size: 100% 100%;
  }
  .reveive {
    margin-left: 70px;
  }
  p {
    padding-left: 10px;
    margin-right: 10px;
  }
}
.info {
  width: 100%;
  height: 146px;
  background: #fff;
  margin-top: 46px;
  .title {
    font-size: 16px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      padding-right: 10px;
    }
  }
  .price {
    color: #ee1f1f;
    font-size: 16px;
  }
  .info_xq {
    color: #777;
  }
  p {
    padding-left: 10px;
    line-height: 15px;
  }
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 771;
}
</style>