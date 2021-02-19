<template>
  <div>
    <Hander :describe="'查看详情'" :title="'预约课程'" :detailData="teacherData" />


    <div class="content">
      <p class="co_title">选择时间 (北京时间)</p>

      <div class="co_time">
        <div class="opt_block">
          <ul>
            <li
              :class="item.disable==0?'disabel':isSelect.day==item.day?'active':''"
              @click="selectDay(item)"
              v-for="(item,index) in weekTime"
              :key="index"
            >
              <span>{{week[index]}}</span>
              <span>{{item.month}}/{{item.day}}</span>
              <i v-show="item.day==isSelect.day"></i>
            </li>
          </ul>
        </div>
      </div>




      <div v-if="tiems.length!=0" class="op_content">ddd</div>
      <div v-else>
        <Empty class="empty" :empty_type="{name: '暂无信息'}"></Empty>
      </div>
    </div>



    <van-button @click="submit" class="bottom">立即预约</van-button>
  </div>
</template>


<script>
import Hander from "./hander";
import { Button, Toast } from "vant";
import { orderTime } from "@/request/http";
import Empty from "../../components/empty";
export default {
  data() {
    return {
      teacherData: {},
      week: [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日"
      ],
      weekTime: [],
      isSelect: {},
      tiems: [],
      oto_course: {}
    };
  },
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
    Hander,
    Empty
  },
  mounted() {
    // /teacher/35
    this.$http.get(`/teacher/${this.$route.query.id}`).then(res => {
      // console.log(res.teacher);
      this.teacherData = res.teacher;
    });
    this.initTime();
  },
  methods: {
    selectDay(item) {
      if (item.disable == 0) {
        return;
      }
      this.isSelect = item;
      this.gettime();
    },
    gettime() {
      let obj = {
        teacher_id: 44,
        week_day: 5,
        is_next: 0
      };
      orderTime(obj).then(res => {
        console.log(res);
        if (res.otoCourseList.length) {
          this.tiems = res.otoCourseList;
        }
      });
    },
    //周几
    getWeek() {
      let date = `${this.isSelect.year}/${this.isSelect.month}/${this.isSelect.day}`;
      let weekday = new Date(date).getDay();
      if (weekday == 0) weekday = 7;
      return weekday;
    },
    //预约
    submit() {
      if (this.oto_course.start_play) {
        console.log(this.oto_course);
      } else {
        this.$toast("请选择预约时间");
      }
    },
    //选择时间
    initTime() {
      let { days, day } = this.$pub.initDays();
      // console.log(days, day);
      days.map(v => {
        // console.log(v);
        if (v.day == day) {
          this.isSelect = v;
        }
        if (v.day < 10) v.day = "0" + v.day;
        if (v.month < 10) v.month = "0" + v.month;
      });
      this.weekTime = days;
    }
  }
};
</script>


<style lang="scss" scoped>
.op_content {
  width: 95%;
  margin: 10px auto;
}
.bottom {
  width: 100%;
  height: 45px;
  background: #eb6100;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 45px;
  color: #fff;
  font-size: 16px;
}
.content {
  margin-top: 65px;
  width: 95%;
  margin: 65px auto;
  .co_title {
    font-size: 14px;
    padding-left: 10px;
    border-left: 3px orange solid;
  }
  .co_time {
    margin: 0 auto;
    width: 100%;
    height: 74px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 0 10px;
    overflow: auto;
    display: flex;
    box-sizing: border-box;
    .opt_block {
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      ul {
        display: flex;
        align-items: center;
        li {
          width: 59px;
          height: 62px;
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            padding: 3px 0px;
            &:nth-child(2) {
              margin-bottom: 5px;
            }
          }
          i {
            position: relative;
            bottom: 0px;
            left: 12%;
            width: 20px;
            height: 4px;
            background: rgba(65, 105, 255, 1);
            border-radius: 4px;
            transform: translateX(-50%);
            // margin: 0 auto;
          }
        }
        .active {
          color: chocolate;
        }
        .disabel {
          color: #c2c2c2;
        }
      }
    }
  }
}
</style>