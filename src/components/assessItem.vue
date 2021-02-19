<template>
  <div class="itemList">
    <div class="item" v-for="(item,index) in data" :key="index">
      <div class="pc-t">
        <p class="pc-title">
          <font v-if="item.report_type == 1 || item.report_type == 2">
            <font :class="{'default': item.is_useful == 3}">[{{stateType[item.report_type]}}]</font>
          </font>
          {{item.package_name}}
        </p>
        <span class="right">
          <font class="right_count">{{item.right_count}}</font>
          <font style="color: #8c8c8c;">/{{item.ques_count}}</font>
        </span>
      </div>
      <div class="pc-info">
        <p v-if="item.report_type==3">
          <span>答题时长：{{item.report_time_long ? item.report_time_long: '暂无'}}</span>
        </p>
        <p v-else-if="item.report_type==4">
          <span>答题时长：{{item.report_time_long ? item.report_time_long: '暂无'}}</span>
          <span>正确率：{{item.correct_rate}}%</span>
        </p>
        <p v-else>
          <span>{{item.report_type==1 ? '模拟考试':"正式考试"}}</span>
          <span>考试次数：{{item.have_done_count}}/{{item.repeat_times}}</span>
          <span>考试时长：{{item.report_time_long ? item.report_time_long: '暂无'}}</span>
        </p>
        <p>
          <span>{{item.report_type == 4 ? '提交时间':'交卷时间'}}：{{item.created_at | fomartTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </p>
      </div>
      <button class="btn">查看成绩</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      stateType: {
        "1": "进行中",
        "2": "未开始",
        "3": "已结束"
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped >
.btn {
  position: absolute;
  right: 30px;
  background: none;
  border-radius: 10px;
  border: 1px #4169ff solid;
  color: #4169ff;
  padding:3px 10px
}
.item {
  height: 140px;
  box-shadow: 0 0 2vw rgba(0, 0, 0, 0.1);
  .pc-t {
    padding-top: 0.5px;
    padding-left: 15px;
    font-size: 14px;
    position: relative;
    .right {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 13px;
      .right_count {
        color: blue;
      }
    }
  }
  .pc-info {
    padding-left: 15px;
    color: #777;
    p {
      span {
        padding-right: 10px;
      }
    }
  }
}
.itemList {
  width: 95%;
  margin: 15px auto;
}
</style>

