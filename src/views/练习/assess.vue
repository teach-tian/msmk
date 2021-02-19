<template>
  <div>
    <van-nav-bar title="测评记录" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon @click="Search" class="search" name="search" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu  class="dropdown">
      <van-dropdown-item ref="type" title="类型不限">
        <ul>
          <li
            @click="ondrop('type',item)"
            class="dropitem"
            :class="{active:params.type==item.key}"
            v-for="(item,index) in type"
            :key="index"
          >{{item.value}}</li>
        </ul>
      </van-dropdown-item>
      <van-dropdown-item ref="time" title="时间">
        <ul>
          <li
            @click="ondrop('time',item)"
            class="dropitem"
            :class="{active:params.search_type==item.key}"
            v-for="(item,index) in search_type"
            :key="index"
          >{{item.value}}</li>
        </ul>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <assList :data="list" />
      </van-list>
      <Empty v-show="list.length==0" :empty_type="empty" />
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, DropdownMenu, DropdownItem, List } from "vant";
import Empty from "../../components/empty";
import { assess } from "../../util/http";
import assList from "../../components/assessItem";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    Empty,
    assList
  },
  data() {
    return {
      activeKey: 0,
      loading: false,
      finished: false,
      type: [
        { key: "all", value: "全部" },
        { key: "practice", value: "套卷练习" },
        { key: "simulation", value: "仿真模考" },
        { key: "point", value: "考点专练" }
      ],
      search_type: [
        { key: "all", value: "全部" },
        { key: "today", value: "今天" },
        { key: "week", value: "7天" }
      ],
      params: {
        type: "all",
        search_type: "all",
        name: ""
      },
      act: 0,
      list: [],
      empty: {
        name: "该时段您没有留下测评记录哦！"
      }
    };
  },
  mounted() {
    this.getassess(this.params);
  },
  methods: {
    onLoad() {},
    ondrop(v, item) {
      switch (v) {
        case "type":
          this.params.type = item.key;
          this.getassess(this.params);
          break;
        case "time":
          this.params.search_type = item.key;
          this.getassess(this.params);
          break;
      }
      this.$refs[v].toggle();
    },
    getassess(v) {
      assess(v).then(res => {
        console.log(res);
        this.list = res.list;
        this.finished = true;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    Search() {}
  }
};
</script>

<style lang="scss" scoped >
@import "../../assets/CSS/index.scss";
.active {
  color: $theme_color;
}
.dropitem {
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px #eee solid;
}
.search {
  font-size: 18px;
  color: #000;
}
</style>
