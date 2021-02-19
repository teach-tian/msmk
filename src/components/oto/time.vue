<template>
  <div>
    <div class="time-date">
      <p class="time-block">日期</p>
      <van-row type="flex" justify="space-around">
        <van-col v-for="(item,index) in week" :key="index">
          <span class="time-week">{{item}}</span>
        </van-col>
      </van-row>
      <div class="time-day">
        <p @click.stop="selectDay(item)" v-for="(item,index) in day_list" :key="index">
          <font
            :class="selectTime.day==item.day?'active':item.disable==0?'disable':isToday==item.day?'today':''"
          >
            {{item.day}}
            <span v-if="item.day == isToday" class="time-today">今天</span>
          </font>
        </p>
      </div>
    </div>
    <div class="time-rinle">
      <p class="time-block">时段</p>
      <div class="tr-ipt">
        <p @click="openPicker('startTime')">
          <input placeholder="开始时间" :value="studyTime.startTime" disabled="disabled" />
          <i></i>
        </p>
        <font>-</font>
        <p @click="openPicker('endTime')">
          <input placeholder="结束时间" :value="studyTime.endTime" disabled="disabled" />
          <i></i>
        </p>
      </div>
    </div>
    <div class="botom">
      <div class="reset" @click="reset">重置</div>
      <div @click="ensure" class="fix">确定</div>
    </div>
    <van-popup v-model="timeShow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentTime"
        type="time"
        :min-hour="0"
        :max-hour="23"
        @confirm="successHanlder"
        @cancel="timeShow=false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Calendar, Cell, Popup, DatetimePicker, Row, Col } from "vant";
import { oto } from "../../request/http";
export default {
  data() {
    return {
      date: "",
      tiem: "",
      timeShow: false,
      currentTime: "",
      timeChoose: "",
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      studyTime: {
        startTime: "",
        endTime: "",
        init: function() {
          this.startTime = "";
          this.endTime = "";
        }
      },
      isToday: "",
      day_list: [],
      selectTime: {
        year: "",
        month: "",
        day: ""
      },
      params: {}
    };
  },
  components: {
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Row.name]: Row,
    [Col.name]: Col
  },
  mounted() {
    this.initTime();
  },
  methods: {
    reset(){
      this.selectTime={}
      this.$emit("reset")
    },
    selectDay(v) {
      if (v.disable == 0) {
        return;
      }
      this.selectTime = v;
    },
    initTime() {
      let { days, day } = this.$pub.initDays();
      this.isToday = day;
      this.day_list = days;
    },
    successHanlder(val) {
      console.log(val);
      this.studyTime[this.timeChoose] = val;
      console.log(this.studyTime);
      
      this.timeShow = false;
    },
    openPicker(name) {
      this.currentTime = this.studyTime[name];
      this.timeChoose = name;
      this.timeShow = true;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.date = this.formatDate(date);
    },
    getParams() {
      let datatime = "";
      if (this.selectTime.year) {
        datatime =
          this.selectTime.year +
          "-" +
          this.selectTime.month +
          "-" +
          this.selectTime.day;
      }
      let params = {
        start_time: this.studyTime.startTime
          ? datatime + " " + this.studyTime.startTime
          : datatime
          ? datatime + " 00:00:00"
          : "",
        end_time: this.studyTime.endTime
          ? datatime + " " + this.studyTime.endTime
          : datatime
          ? datatime + " 23:59:59"
          : ""
      };
      return params;
    },
    //确认按钮
    ensure() {
      console.log(this.getParams());
      oto(this.getParams()).then(res => {
        console.log(res);
         this.$emit("off",res);
      });
     
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.time-date {
  width: 95%;
  margin: 10px auto;
  background: #fff;
  padding: 5px;
  border-radius: 5px;
  .time-block {
    font-size: 14px;
    padding-left: 10px;
    margin-top: 5px;
  }
  .time-day {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    p {
      width: 14.1%;
      height: 45px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        font-size: 17px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        line-height: 35px;
        color: rgba(89, 89, 89, 1);
        text-align: center;
        position: relative;
        span {
          width: 60px;
          position: absolute;
          bottom: -30px;
          left: -13px;
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(183, 183, 183, 1);
        }
      }
      font.active {
        background: $theme_color;
        color: #fff;
      }
      font.today {
        background: #ebeefe;
        color: $theme_color;
      }
      font.disable {
        color: #b7b7b7;
      }
    }
  }
}
.time-rinle {
  margin-top: 15px;
  height: 108px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  .time-block {
    font-size: 15px;
    padding-left: 10px;
    padding-top: 10px;
  }
  .tr-ipt {
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: -9px;
    p {
      width: 190px;
      height: 35px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      border: 2px solid rgba(191, 191, 191, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        border: none;
        width: 100px;
        height: 31px;
        line-height: 50px;
        font-size: 16px;
        padding-left: 20px;
      }
      i {
        width: 20px;
        height: 20px;
        background: url("../../assets/images/icon-time.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 6px;
      }
    }
    font {
      width: 50px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      color: rgba(183, 183, 183, 1);
      font-size: 25px;
    }
  }
}
.botom {
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  .fix {
    background: #eb6100;
    color: #fff;
  }
  .reset {
    color: #eb6100;
    background: #fff;
  }
  div {
    flex: 1;
    text-align: center;
    line-height: 45px;
    font-size: 16px;
  }
}
</style>