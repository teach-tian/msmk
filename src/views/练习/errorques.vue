<template>
  <div>
    <van-nav-bar title="题错记录" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon @click="Search" class="search" name="search" />
      </template>
    </van-nav-bar>
    <div class="err_hander">
      <div class="err_drop">
        <van-dropdown-menu  class="dropdown">
          <van-dropdown-item ref="drop" title="类类不限">
            <ul>
              <li
                @click="ondrop(item)"
                class="dropitem"
                :class="{active:act==item.value}"
                v-for="(item,index) in option"
                :key="index"
              >{{item.text}}</li>
            </ul>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="err_right">
        <ul>
          <li class="right_item" v-for="(item,index) in topic" :key="index">
            <img :src="item.icon" alt />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <Empty v-show="list.length==0" :empty_type="empty" />
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, DropdownMenu, DropdownItem, List } from "vant";
import Empty from "../../components/empty";
import { errorques } from "../../util/http";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    Empty
  },
  data() {
    return {
      activeKey: 0,
      empty: {
        name: "暂无错题记录"
      },
      list: [],
      option: [
        { text: "全部", value: -1 },
        { text: "套卷练习", value: 3 },
        { text: "考点专练", value: 4 },
        { text: "仿真模考", value: 5 }
      ],
      topic: [
        {
          icon: require("../../assets/images/error-all.png"),
          name: "巩固全部错题"
        },
        {
          icon: require("../../assets/images/error-remove-icon.png"),
          name: "移除错题"
        }
      ],
      act: -1,
      params: {
        page: 1,
        limit: 10,
        ques_source: -1
      }
    };
  },
  mounted() {
    this.geterrorques(this.params);
  },
  methods: {
    geterrorques(v) {
      errorques(v).then(res => {
        console.log(res);
        this.list = res.list;
      });
    },
    ondrop(item) {
      this.act = item.value;
      this.params.ques_source = item.value;
      this.geterrorques(this.params);
      this.$refs.drop.toggle();
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
.err_hander {
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  background: #fff;
  .err_drop {
    flex: 2;
    .dropdown {
      height: 42px;
      .dropitem {
        line-height: 45px;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px #eee solid;
      }
    }
  }
  .err_right {
    flex: 3;
    height: 42px;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .right_item {
        line-height: 42px;
        color: #777;
        img {
          width: 13px;
          padding-right: 5px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
}
.search {
  font-size: 18px;
  color: #000;
}
</style>
