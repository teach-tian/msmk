<template>
  <div class="hante_con">
    <div class="hand_hate">
      <span>{{curYear}}年{{curMonth}}月</span>
      <span class="hate_arrow">
        <van-icon @click="arrow(0)" class="left" name="arrow-left" />
        <van-icon @click="arrow(1)" name="arrow" />
      </span>
    </div>
    <div class="title">
      <div class="cell" v-for="(item, index) in titleList" :key="index">{{item}}</div>
    </div>
    <div class="day">
      <div class="dayitem" v-for="(item,index) in weekDay" :key="index+'empty'"></div>
      <div
        class="dayitem"
        :class="{'pointer': item!==0}"
        v-for="(item, index) in days"
        :key="index"
        @click="onClickDay(item)"
      >
        <div :class="{'today':item==today.d,select:item==selected.d}" v-if="item!==0" class="text">
          {{item}}
          <div :class="{'has-course':(hasCourse(item)) }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props: {
    courseDate: {
      //含有课程的日期集合 如['2019-8-1', '2019-8-15']
      type: Array
    },
    firstDay: {
      //周起始日 1到7
      type: Number,
      default: 1,
      validator(val) {
        if (val >= 1 && val <= 7) {
          return true;
        }
        return false;
      }
    }
  },
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {
      curYear: new Date().getFullYear(),
      curMonth: new Date().getMonth() + 1,
      titleList: ["日", "一", "二", "三", "四", "五", "六"],
      days: "", //每个月的天数
      weekDay: "", //每月第一天周几
      today: {
        //今天
        y: new Date().getFullYear(),
        m: new Date().getMonth() + 1,
        d: new Date().getUTCDate()
      },
      selected: {
        //选中的时间
        y: "",
        m: "",
        d: ""
      }
    };
  },
  mounted() {
    this.init();
    this.$emit("onCurDate", `${this.today.y}-${this.today.m}-${this.today.d}`);
  },
  computed: {
    courseDateSet() {
      const retAry = [];
      this.courseDate.forEach(i => {
        retAry.push(new Date(i.replace(/-/g, "/")));
      });
      return retAry;
    }
  },
  methods: {
    isDateEqual(date1, date2) {
      if (date1.getDate() == date2) {
        return true;
      }
      return false;
    },
    hasCourse(date) {
      for (const i of this.courseDateSet) {
        if (this.isDateEqual(i, date)) {
          return true;
        }
      }
      return false;
    },
    //切换月份
    arrow(v) {
      if (v) {
        this.curMonth++;
        if (this.curMonth > 12) {
          this.curMonth = 1;
          this.curYear++;
        }
        this.$emit("onChangeDate", `${this.curYear}-${this.curMonth}-1`);
        this.today.d = null;
        this.selected.d = null;
        if (this.curMonth == new Date().getMonth() + 1) {
          this.today.d = new Date().getUTCDate();
        }
      } else {
        this.curMonth--;
        if (this.curMonth < 1) {
          this.curMonth = 12;
          this.curYear--;
        }
        this.$emit("onChangeDate", `${this.curYear}-${this.curMonth}-1`);
        this.today.d = null;
        this.selected.d = null;
        if (this.curMonth == new Date().getMonth() + 1) {
          this.today.d = new Date().getUTCDate();
        }
      }
    },
    onClickDay(v) {
      this.selected.y = this.curYear;
      this.selected.m = this.curMonth;
      this.selected.d = v;
      this.$emit("onclickDate", `${this.selected.y}-${this.selected.m}-${v}`);
    },
    init() {
      this.days = new Date(this.curYear, this.curMonth, 0).getDate();
      this.weekDay = new Date(this.curYear, this.curMonth - 1, 1).getDay();
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../assets/CSS/index.scss";

.hand_hate {
  font-size: 22px;
  color: #595959;
  line-height: 60px;
  padding-left: 20px;
  .hate_arrow {
    float: right;
    padding-right: 15px;
    .left {
      margin-right: 20px;
    }
  }
}
.info {
  padding: 0 0 20px 20px;
  .date {
    font-size: 30px;
    color: $theme_color;
    margin-right: 30px;
  }
  .course-count {
    font-size: 24px;
    color: #8c8c8c;
  }
}
.pointer {
  cursor: pointer;
}
.day {
  font-size: 15px;
  color: #595959;
  border: 1px #fff solid;
  .dayitem {
    width: 14.28%;
    height: 45px;
    // display: block;
    float: left;
    text-align: center;
    line-height: 30px;
    position: relative;
    .text {
      margin: 0 auto;
    }
    .today {
      color: $theme_color;
      background-color: $theme_color_light;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .select {
      color: #fff;
      background-color: $theme_color;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .has-course {
      background: $theme_color;
      width: 4px;
      height: 4px;
      margin: 4px auto;
    }
  }
}
.title {
  .cell {
    width: 14.28%;
    height: 40px;
    display: block;
    float: left;
    text-align: center;
    position: relative;
  }
}
</style>
