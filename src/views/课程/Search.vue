<template>
  <div>
    <div class="hander">
      <form action="/">
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
          <template #left>
            <van-icon @click="left" size="17" class="icon" name="arrow-left" />
          </template>
          <template #action>
            <div ref="txt" @click="onCancel">{{value?'搜索':'取消'}}</div>
          </template>
        </van-search>
      </form>
    </div>
    <div class="content">
      <div v-if="value==''">
        <div class="title">
          <h3>搜索历史</h3>
          <i @click="del" class="iconfont icon-lajixiang"></i>
        </div>
        <div class="list">
          <span v-for="(item,index) in input_history" :key="index" @click="btnitem(item)">{{item}}</span>
        </div>
      </div>
      <div v-else>
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <CourseSearitem :data="classList" v-if="classList.length" />
        </van-list>
        <div class="empty" v-if="emptybool">
          <img class="imageempty" src="../../assets/images/empty.png" alt />
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Toast, Icon, List } from "vant";
import CourseSearitem from "../../components/course/course_item";
export default {
  data() {
    return {
      value: "",
      loading: false,
      finished: true,
      classList: [],
      page: 1,
      name: this.$route.query.name,
      emptybool: false,
      input_history: JSON.parse(window.localStorage.getItem("list")) || []
    };
  },
  components: {
    [Search.name]: Search,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [List.name]: List,
    CourseSearitem
  },
  methods: {
    btnitem(item) {
      this.value = item;
      this.beg();
    },
    del() {
      this.input_history = [];
      window.localStorage.removeItem("list");
    },
    left() {
      this.$router.go(-1);
    },
    onSearch(val) {
      if (this.input_history.length == 0) {
        this.input_history.push(val);
      } else {
        let index = this.input_history.findIndex(v => v == val);
        if (index != -1) {
          this.input_history.splice(index, 1);
          this.input_history.unshift(val);
        } else {
          this.input_history.unshift(val);
        }
      }
      this.beg();
      window.localStorage.setItem("list", JSON.stringify(this.input_history));
    },
    beg() {
      if (this.$route.query.name) {
        switch (this.$route.query.name) {
          case "oto":
            this.$store.commit("OTO_sear", this.value);
            this.$router.replace({
              name: this.name
            });
            break;
          case "paperPage":
            console.log(this.value, this.$route.query.name);
            this.$store.commit("Paer_sear", this.value);
            this.$router.replace({
              name: this.name
            });
            break;
          case "exam":
            console.log(this.value);
            this.$store.commit("Exam_sear", this.value);
            this.$router.replace({
              name: this.name
            });
            break;
        }
      } else {
        this.$http
          .get("/app/courseBasis", {
            limit: 10,
            page: this.page,
            course_type: 0,
            keywords: this.value
          })
          .then(res => {
            this.loading = false;
            if (res.list.length == 0) {
              this.classList = [];
              this.finished = true;
              this.emptybool = true;
              return;
            }
            if (this.page == 1) {
              this.classList = res.list;
              console.log(this.classList);
              this.emptybool = false;
            } else {
              this.classList = this.classList.concat(res.list);
              this.emptybool = false;
            }
          });
      }
    },
    onCancel() {
      if (this.$refs.txt.innerHTML === "取消") {
        this.$router.go(-1);
      } else {
        this.onSearch(this.value);
      }
    },
    onLoad() {
      this.page++;
      this.beg();
    }
  },
  watch: {
    value(val) {
      if (!val) {
        this.classList = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  display: flex;
  flex-direction: column;
}
.content {
  .title {
    width: 95%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconfont {
      font-size: 19px;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    span {
      padding: 0 5px;
      height: 33px;
      text-align: center;
      line-height: 33px;
      background: #fff;
      border-radius: 3px;
      color: #646464;
      margin: 10px 12px;
    }
  }
}
.icon {
  padding-right: 10px;
}
</style>