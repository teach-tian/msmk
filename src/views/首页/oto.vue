<template>
  <div>
    <div class="top">
      <van-nav-bar @click-left="onClickLeft" title="一对一辅导" left-arrow>
        <template #right>
          <van-icon @click="search" color="#000" size="20" name="search" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <div class="options">
        <ul>
          <li
            @click="toggle(item)"
            :class="{'act':item.active}"
            v-for="(item, index) in opt"
            :key="index"
          >
            {{item.title}}
            <van-icon v-show="!item.active" name="arrow-down" />
            <van-icon v-show="item.active" name="arrow-up" />
          </li>
        </ul>
      </div>
      <div>
        <keep-alive>
          <component
            @condoff="oncondoff"
            :obj="conditionobj"
            @off="off"
            @reset="onreset"
            :list="otoList"
            :is="comm"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>

import { oto, otoconditon } from "../../util/http";
import TeachList from "../../components/oto/teachList";
import time from '../../components/oto/time'
import Condition from "../../components/oto/condition";
export default {
  name: "oto",
  components: {
    TeachList,
    Condition
  },
  data() {
    return {
      otoList: [],
      comm: TeachList,
      opt: [
        {
          title: "选择上课时间",
          active: false,
          comm: "Time"
        },
        {
          title: "选择老师条件",
          active: false,
          comm: "Condition"
        }
      ],
      conditionobj: {},
      params: {
        page: 1,
        limit: 10,
        teacher_name: this.$store.state.OtoSear
      }
    };
  },
  created() {
    document.body.style.background = "#f2f3f5";
  },
  mounted() {
    if (this.$store.state.OtoSear) {
      oto(this.params).then(res => {
        this.otoList = res;
      });
    } else {
      oto().then(res => {
        this.otoList = res;
      });
    }

    otoconditon().then(res => {
      this.conditionobj = res;
    });
  },
  updated() {
    if (this.comm == 'Condition') {
      document.body.style.background = "#fff";
    }
  },
  methods: {
    oncondoff(v) {
      this.comm = "TeachList";
      oto(v).then(res => {
        this.otoList = res;
      });
      this.opt.map(v => (v.active = false));
    },
    onreset() {
      oto().then(res => {
        this.otoList = res;
      });
      this.comm = "TeachList";
      this.opt.map(v => (v.active = false));
    },
    search() {
      this.$router.push({
        path: "/search",
        query: {
          name: "oto"
        }
      });
    },
    off(v) {
      this.comm = "TeachList";
      this.otoList = v;
      this.opt.map(v => (v.active = false));
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    toggle(item) {
      if (item.active) {
        this.comm = "TeachList";
        this.opt.map(v => (v.active = false));
        return;
      }
      this.opt.map(v =>
        v.comm == item.comm ? (v.active = true) : (v.active = false)
      );
      this.comm = item.comm;
    }
  },
  watch: {
    otoList() {
      document.body.style.background = "#f2f3f5";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.act {
  color: #eb6100 !important;
}

.options {
  margin-top: 45px;
  @include SizeBack(100%, 45px, #fff);
  ul {
    display: flex;
    align-items: center;
    li {
      flex: 1;
      text-align: center;
      line-height: 45px;
      font-size: 15px;
      color: #777;
    }
  }
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 111;
}
</style>