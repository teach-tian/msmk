<template>
  <div>
    <van-nav-bar title="练习" />
    <div class="question">
      <ul>
        <li @click="onpract(item)" v-for="(item,index) in quesList" :key="index">
          <div class="imgmain">
            <img :src="item.image" alt />
          </div>
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
    <div class="recent">
      <p class="title">近期模考</p>
      <div class="title2">
        <span style="color:#EB6100">默认排序</span>
        <span>时间</span>
      </div>
      <img src="../../assets/images/empty@2x.png" alt />
      <div>暂无安排，敬请期待</div>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data() {
    return {
      quesList: [
        {
          image: require("../../assets/images/exam-point.png"),
          title: "考点专练",
          path: "point"
        },
        {
          image: require("../../assets/images/paper-package.png"),
          title: "套卷练习",
          path: "paperPage"
        },
        {
          image: require("../../assets/images/exam.png"),
          title: "仿真模考",
          path:"exam"
        },
        {
          image: require("../../assets/images/wrong-test.png"),
          title: "错题练习",
          path:"errorques"
        },
        {
          image: require("../../assets/images/assess.png"),
          title: "测评记录",
          path:"assess"
        },
        {
          image: require("../../assets/images/question-collocet.png"),
          title: "习题收藏"
        }
      ]
    };
  },
  methods: {
    onpract(item) {
      this.$router.push({
        name: item.path
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.recent {
  width: 100%;
  height: 240px;
  background: #fff;
  text-align: center;
  .title {
    font-size: 16px;
    text-align: left;
    padding: 10px 10px;
    padding-bottom: 0px;
    color: #8c8c8c;
  }
  .title2 {
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 10px;
    }
  }
  img {
    width: 30%;
    height: 140px;
  }
}
.question {
  width: 95%;
  margin: 15px auto;
  height: 179px;
  background: #fff;
  border-radius: 5px;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 88px;
      height: 84px;
      text-align: center;
      @include FlexMenu();
      margin-top: 7px;
      color: #595959;
      .imgmain {
        @include Size(40px, 40px);
        background-image: url("../../assets/images/question-raido.png");
        background-size: 100% 100%;
      }
      img {
        width: 20px;
        height: 20px;
        margin-top: 9px;
      }
    }
  }
}
</style>