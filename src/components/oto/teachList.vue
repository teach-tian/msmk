<template>
  <div class="content_teacher">
    <ul>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
        <li @click="makedetail(item)" v-for="(item,index) in list" :key="index">
          <p class="buddha">
            <img :src="item.avatar" alt />
          </p>
          <div class="message">
            <div class="message_name">{{item.real_name}}</div>
            <div class="message_xq">
              <span>{{item.sex==0?"男":"女"}}&nbsp;</span>
              <span>{{item.teach_age}}年教龄</span>
            </div>
          </div>
          <div class="make">
            <div class="btn_teach" >预约</div>
          </div>
        </li>
      </van-list>
    </ul>
  </div>
</template>

<script>
import { List } from "vant";
export default {
  props: ["list"],
  components: {
    [List.name]: List
  },
  data() {
    return {
      loading: false,
      finished: true
    };
  },
  methods: {
    makedetail(v) {
      console.log(v);
      this.$router.push({
        path: "/makedetail",
        query: {
          id: v.teacher_id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.content_teacher {
  width: 95%;
  margin: 0 auto;
  ul {
    li {
      width: 100%;
      height: 81px;
      background: #fff;
      margin-top: 10px;
      @include FlexArroud();
      .buddha {
        width: 40px;
        height: 40px;
        margin-left: 15px;
        overflow: hidden;
        flex: 1;
        img {
          border-radius: 100%;
          width: 40px;
          height: 40px;
        }
      }
      .message {
        flex: 3.5;
        .message_name {
          font-size: 16px;
          margin-bottom: 4px;
        }
        .message_xq {
          color: #777;
        }
      }
      .make {
        flex: 1.5;
        .btn_teach {
          @include SizeBack(70px, 31px, #ebeefe);
          color: #eb6100;
          text-align: center;
          line-height: 31px;
          border-radius: 18px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>