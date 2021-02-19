<template>
  <div>
    <div v-if="data.length==0">
      <Empty :empty_type="{}" />
    </div>
    <div class="examitem" v-for="(item,index) in data" :key="index">
      <p class="title">
        <span>《{{item.exam_type == 2 ? '正式考试':'模拟考试'}}》</span>
        <span>{{item.name}}</span>
      </p>
      <div class="pc-info">
        <p>
          <span class="theme-color">{{item.exam_type == 2 ? '正式考试':'模拟考试'}}</span>
          <span>考试时长：{{que_time(item.limit_time)}}</span>
        </p>
        <p>
          <span>考试时长：{{que_time(item.limit_time)}}</span>
          <span>满分：{{item.limit_time}}</span>
          <span>通过分数：{{item.pass_score}}</span>
        </p>
        <p>考试时间：{{item.start_time | fomartTime('MM/dd hh:mm:ss')}} ~ {{item.end_time | fomartTime('MM/dd hh:mm:ss')}}</p>
        <p>考试次数：{{item.repeat_times}}次（已考{{item.have_done_count}}次）共{{item.question_num}}道题</p>
      </div>
      <van-button class="btn">查看详情</van-button>
      <img class="exam-state" :src="img[item.start_status]" />
      <img
        class="exam-nopass"
        src="@/assets/images/exam-no-pass.png"
        v-if="item.pass_status && item.pass_status == 2"
      />
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import Empty from "../components/empty";
export default {
  props: {
    data: {
      type: Array
    },
    comType: {
      type: String,
      default: "Package"
    }
  },
  components: {
    [Button.name]: Button,
    Empty
  },
  data() {
    return {
      img: {
        "1": require("@/assets/images/exam-ing.png"),
        "2": require("@/assets/images/exam-will.png"),
        "3": require("@/assets/images/exam-finish.png")
      }
    };
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  methods: {
    que_time(time) {
      if (time > 0) {
        return time;
      } else {
        return "无限制";
      }
    }
  }
};
</script>

<style lang="scss" scoped >
.exam-nopass {
  position: absolute;
  right: 10px;
  width: 45px;
  top: 40px;
}
.exam-state {
  position: absolute;
  right: 0px;
  width: 45px;
  top: 0;
}
.btn {
  height: 30px;
  border: 1px blue solid;
  border-radius: 20px;
  background: none;
  position: absolute;
  color: #4169ff;
  right: 20px;
  line-height: 28px;
  font-size: 12px;
}
.examitem {
  width: 100%;
  height: 185px;
  margin-bottom: 10px;
  box-shadow: 0 0 2vw rgba(0, 0, 0, 0.1);
  position: relative;
  color: #777;
  p {
    line-height: 11px;
    padding-left: 15px;
  }
  .title {
    padding-left: 15px;
    padding-top: 20px;
    font-size: 14.5px;
  }
  .pc-info {
    padding: 0px 15px;
    .theme-color {
      color: chocolate;
      padding-right: 15px;
    }
  }
}
</style>
