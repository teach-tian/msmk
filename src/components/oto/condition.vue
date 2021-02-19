<template>
  <div>
    <div class="about">
      <p class="title">老师类型</p>
      <ul>
        <li
          @click="choose(index,item)"
          v-for="(item,index) in obj.otoTeacherLevel"
          :key="index"
          :class="teachSearch.level_id==item.level_id?'active':''"
        >{{item.level_name}}</li>
      </ul>
    </div>
    <div class="about">
      <p class="title">只看</p>
      <div class="radio">
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1">已关注</van-radio>
          <van-radio name="2">上过课的</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="about">
      <p class="title">性别</p>
      <ul>
        <li
          @click="teachSearch.sex = item.sex"
          v-for="(item) in sexs"
          :key="item.sex"
          :class="teachSearch.sex==item.sex?'active':''"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="options" v-for="(item,index) in obj.attrList" :key="index">
      <p class="title">{{item.attr_name}}</p>
      <ul>
        <li
          :class="teachSearch.attr_val_id['attr'+index]==item2.attr_val_id?'active':''"
          @click="onattr(item2.attr_val_id,index)"
          v-for="(item2) in item.child"
          :key="item2.attr_val_id"
        >{{item2.attr_val_name}}</li>
      </ul>
    </div>
    <div class="botom">
      <div @click="reset" class="reset">重置</div>
      <div @click="off" class="fix">确定</div>
    </div>
  </div>
</template>

<script>

import { oto } from "../../util/http";
export default {
  props: ["obj"],
  components: {
  },
  data() {
    return {
      radio: "",
      teachSearch: {
        level_id: "",
        attr_val_id: {},
        is_collect: 0,
        is_attended: 0,
        sex: null
      },
      sexs: [
        { name: "男", sex: 0 },
        { name: "女", sex: 1 }
      ]
    };
  },
  mounted() {
    document.body.style.background = "#fff";
  },
  watch: {
    radio: {
      handler(val) {
        if (val == 2) {
          this.teachSearch.is_attended = 1;
        } else {
          this.teachSearch.is_attended = 0;
        }
        if (val == 1) {
          this.teachSearch.is_collect = 1;
        } else {
          this.teachSearch.is_collect = 0;
        }
      }
    }
  },
  
  methods: {
    reset() {
      (this.teachSearch = {
        level_id: "",
        attr_val_id: {},
        is_collect: 0,
        is_attended: 0,
        sex: null
      }),
        this.$emit("reset");
    },
    onattr(item2, index) {
      this.$set(this.teachSearch.attr_val_id, "attr" + index, item2);
    },
    choose(index, item) {
      this.teachSearch.level_id = item.level_id;
    },
    off() {
      let obj = {
        level_id: this.teachSearch.level_id,
        attr_val_id: this.$pub.objToStr(this.teachSearch.attr_val_id, ","),
        is_collect: this.teachSearch.is_collect,
        is_attended: this.teachSearch.is_attended,
        sex: this.teachSearch.sex
      };
      oto(obj).then(res => {
        console.log(res)
        this.$emit("off", res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.radio {
  margin-left: 10px;
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
.active {
  background: #ebeefe !important;
  color: #eb6100 !important;
}
.options {
  @include Wm(95%);
  margin-bottom: 50px;
  .title {
    padding-left: 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 2rem;
      height: 0.8rem;
      @include BgC(#f5f5f5, #646464);
      text-align: center;
      line-height: 0.7rem;
      border-radius: 3px;
      margin: 7px;
    }
  }
}
.about {
  @include Wm(95%);
  .title {
    padding-left: 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 2rem;
      height: 0.8rem;
      @include BgC(#f5f5f5, #646464);
      text-align: center;
      line-height: 0.7rem;
      border-radius: 3px;
      margin: 7px;
    }
  }
}
</style>