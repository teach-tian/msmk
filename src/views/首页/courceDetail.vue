<template>
  <div>
    <div class="top">
      <van-nav-bar
        v-show="top<30"
        title="课程详情"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        left-arrow
      >
        <template #right>
          <van-icon name="cluster-o" />
        </template>
      </van-nav-bar>
      <van-nav-bar
        right-text="分享"
        v-show="top>30"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        left-arrow
      >
        <template #title>
          <ul class="hander">
            <li>课程介绍</li>
            <li>课程大纲</li>
            <li>课程评价</li>
          </ul>
          <!-- <van-icon name="cluster-o" /> -->
        </template>
      </van-nav-bar>
    </div>
    <div class="detail_hand">
      <div class="detail_main">
        <div class="title">{{curce.title}}</div>
        <p class="act">{{curce.price}}</p>
        <p class="price">共{{curce.total_periods}}课时 | {{curce.browse_num}}人已报名</p>
      </div>
    </div>
    <div class="detail_team">
      <div class="detail_team_main">
        <p class="team_title">教学团队</p>
        <div class="team_item">
          <ul>
            <li>
              <img class="image" :src="teachers.avatar" alt />
              <p>{{teachers.teacher_name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="detail_introduce">
      <div class="introduce_main">
        <p class="team_title">课程介绍</p>
        <div class="introduce_txt">{{curce.course_statement}}</div>
      </div>
    </div>
    <div class="detail_introduce">
      <div class="introduce_main">
        <p class="team_title">课程大纲</p>
        <ul class="team_ul">
          <li>{{curce.course_statement}}</li>
        </ul>
      </div>
    </div>
    <div class="comment"></div>
    <div @click="addapply" class="btn">立即报名</div>
  </div>
</template>

<script>
import { courceId } from "../../util/http";
export default {
  components: {
  },
  data() {
    return {
      curce: {},
      teachers:[],
      handeract: true,
      top: 0
    };
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    courceId(this.$route.query.id).then(res => {
  
      this.teachers=res.teachers[0]
      this.curce = res.info
    });
  },
  methods: {
    addapply() {},
    handleScroll() {
      this.top = document.body.scrollTop || document.documentElement.scrollTop;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {}
  },
  created() {
    //监听滚动事件, 全局事件
    window.addEventListener("scroll", this.handleScroll);
  },
  //当离开页面的时候解除绑定
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.hander {
  display: flex;
  justify-content: space-around;
  li {
    padding: 0 1px;
  }
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.comment {
  width: 100%;
  height: 300px;
}
.btn {
  width: 100%;
  height: 44px;
  background: #eb6100;
  text-align: center;
  line-height: 44px;
  color: #fff;
  font-size: 17px;
  position: fixed;
  bottom: 0;
}
.team_ul {
  width: 95%;
  margin: 0 auto;
  color: #777;
  li {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.detail_introduce {
  width: 100%;
  height: 92px;
  background: #fff;
  .introduce_main {
    width: 90%;
    margin: 20px auto;
    .team_title {
      font-size: 17px;
      padding-top: 5px;
    }
    .introduce_txt {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.detail_team {
  width: 100%;
  height: 145px;
  background: #fff;
  .detail_team_main {
    width: 90%;
    margin: 20px auto;
    .team_title {
      font-size: 17px;
      padding-top: 5px;
    }
    .team_item {
      ul {
        li {
          width: 50px;
          text-align: center;
          float: left;
          margin-right: 10px;
        }
      }
      .image {
        width: 100%;
        border-radius: 100%;
      }
    }
  }
}
.detail_hand {
  width: 100%;
  height: 106px;
  background: #fff;
  margin-top: 45px;
  .detail_main {
    width: 90%;
    height: 106px;
    margin: 0 auto;
    border: 1px #fff solid;
    .title {
      font-size: 17px;
    }
    .act {
      color: orange;
      font-size: 16.8px;
      line-height: 5px;
    }
    .price {
      font-size: 16px;
      color: #777;
    }
  }
}
</style>