<template>
  <div>
    <van-nav-bar title="套卷练习" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon @click="Search" class="search" name="search" />
      </template>
    </van-nav-bar>
    <div class="course-fitler">
      <van-dropdown-menu >
        <van-dropdown-item title="套卷分类" ref="classify_id">
          <van-tree-select
            :items="classifyList"
            :main-active-index="mainActiveIndex"
            :active-id="activeId"
            @click-nav="onClickNav"
            @click-item="onClickItem"
          />
        </van-dropdown-item>
        <van-dropdown-item title="套卷状态" ref="done_status">
          <ul class="course-sort">
            <li
              :class="searchParams.done_status == item.key ? 'active':''"
              v-for="item in state"
              :key="item.key"
              @click="selectType('done_status',item.key)"
            >{{item.value}}</li>
          </ul>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div v-if="list.length!=0" class="content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <Card :data="list" />
      </van-list>
    </div>
    <div v-if="list.length==0">
      <Empty :empty_type="{name:'请稍等，套卷正在赶来的路上啦'}" />
    </div>
  </div>
</template>

<script>
import "../../assets/CSS/index.scss";
import Empty from "../../components/empty";
import Card from "./questionCard";
import {
  NavBar,
  Icon,
  DropdownMenu,
  DropdownItem,
  Sidebar,
  SidebarItem,
  TreeSelect,
  Divider,
  List
} from "vant";
import { classify, packageP } from "../../util/http";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [TreeSelect.name]: TreeSelect,
    [Divider.name]: Divider,
    [List.name]: List,
    Empty,
    Card
  },
  data() {
    return {
      activeKey: 0,
      classifyList: [],
      switch1: "",
      state: [
        { key: 0, value: "全部" },
        { key: 1, value: "已做" },
        { key: 2, value: "未做" }
      ],
      mainActiveIndex: 0,
      //分类选中元素的id
      activeId: "",
      searchParams: {
        done_status: 0,
        classify_id: 0,
        name: ""
      },
      list: [],
      loading: false,
      finished: true
    };
  },
  mounted() {
    this.getclassify();
    if (this.$store.state.Paersear) {
      this.searchParams.name = this.$store.state.Paersear;
      // console.log(this.searchParams);
      this.getpackageP(this.searchParams);
    }
  },
  methods: {
    //搜索
    Search() {
      this.$router.push({
        path: "/search",
        query: {
          name: "paperPage"
        }
      });
    },
    selectType(name, val) {
      console.log(name, val);
      this.$refs[name].toggle();
      this.searchParams[name] = val;
      console.log(this.searchParams);
      this.getpackageP(this.searchParams);
    },
    getpackageP(v) {
      packageP(v).then(res => {
        console.log(res);
        this.list = res.list;
      });
    },
    onClickNav(index) {
      // console.log(index)
      this.mainActiveIndex = index;
      if (!this.classifyList[index].children) {
        this.selectType("classify_id", this.classifyList[index].id);
      }
    },
     // 获取分类选中元素的id进行赋值
    onClickItem(data) {
      this.activeId = data.id;
    },
   
    getclassify() {
      classify().then(res => {
        // console.log(res.rows)
        res.rows.forEach(item => {
          item.text = item.label;
          item.children &&
            item.children.forEach(it => {
              it.text = it.label;
            });
        });
        // console.log(res.rows)
        res.rows.unshift({
          text: "全部",
          id: 0
        });
        this.classifyList = res.rows;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss" >
@import "../../assets/CSS/index.scss";
.active {
  color: chocolate;
}
.course-sort {
  li {
    line-height: 40px;
    text-align: center;
    font-size: 14.5px;
    border-bottom: 1px #eee solid;
  }
}
.classright {
  position: absolute;
  left: 90px;
  top: 0;
  float: right;
}
.search {
  font-size: 18px;
  color: #000;
}
</style>
