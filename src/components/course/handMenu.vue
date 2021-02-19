<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item ref="item" title="分类">
        <div class="about">
          <div v-for="(item,index) in list" :key="index">
            <p>{{item.name}}</p>
            <ul>
              <li
                :class="attr_val_id['attr'+index] == item2.id ? 'active':''"
                v-for="item2 in item.child"
                :key="item2.id"
                @click="choose(item2.id,'attr'+index)"
              >{{item2.name}}</li>
            </ul>
          </div>
        </div>
        <van-divider />
        <div class="btn">
          <van-button @click="reset" plain size="small" class="btn_item" block type="info">重置</van-button>
          <van-button @click="ok" color="#eb6100" size="small" class="btn_item" block type="info">确认</van-button>
        </div>
      </van-dropdown-item>
      <van-dropdown-item ref="rankItem" title="排序">
        <div class="rank">
          <ul>
            <li
              @click="rank(item)"
              :class="{'act':item.act}"
              v-for="(item,index) in sank"
              :key="index"
            >{{item.title}}</li>
          </ul>
        </div>
      </van-dropdown-item>
      <van-dropdown-item ref="scrItem" title="筛选">
        <div class="screen">
          <ul>
            <li
              @click="sreen(item)"
              :class="{'active':item.isActive}"
              v-for="(item,index) in screen"
              :key="index"
            >{{item.title}}</li>
          </ul>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>

import { courseify } from "../../util/http";
export default {
  data() {
    return {
      value: "",
      list: [],
      act: null,
      act2: null,
      sank: [
        {
          title: "综合排序",
          act: true,
          id: 0
        },
        {
          title: "最新",
          act: false,
          id: 1
        },
        {
          title: "最热",
          act: false,
          id: 2
        },
        {
          title: "价格从低到高",
          act: false,
          id: 3
        },
        {
          title: "价格从高到低",
          act: false,
          id: 4
        }
      ],
      screen: [
        {
          title: "全部",
          isActive: true,
          id: 0
        },
        {
          title: "大班课",
          isActive: false,
          id: 2
        },
        {
          title: "小班课",
          isActive: false,
          id: 3
        },
        {
          title: "公开课",
          isActive: false,
          id: 4
        },
        {
          title: "点播课",
          isActive: false,
          id: 5
        },
        {
          title: "面授课",
          isActive: false,
          id: 6
        },
        {
          title: "音频课",
          isActive: false,
          id: 7
        },
        {
          title: "系统课",
          isActive: false,
          id: 8
        },
        {
          title: "图文课",
          isActive: false,
          id: 9
        },
        {
          title: "会员课",
          isActive: false,
          id: 10
        }
      ],
      attr_val_id: {}
    };
  },
  components: {
  },
  mounted() {
    courseify().then(res => {
      console.log(res)
      const { attrclassify } = res;
      console.log(attrclassify);
      this.list = attrclassify;
      let attr_val_id = {};
      attrclassify.forEach((item, index) => {
        attr_val_id["attr" + index] = 0;
      });
      this.attr_val_id = attr_val_id;
    });
  },
  methods: {
    sreen(item) {
      this.screen.map(v =>
        v.title === item.title ? (v.isActive = true) : (v.isActive = false)
      );
      this.$emit("sreen", item.id);
      this.$refs.scrItem.toggle();
    },
    reset() {
      for (let i in this.attr_val_id) {
        this.attr_val_id[i] = 0;
      }
      this.$emit("reset")
      this.$refs.item.toggle();
    },
    rank(item) {
      this.sank.map(v =>
        v.title === item.title ? (v.act = true) : (v.act = false)
      );
      this.$emit("course", item.id);
      this.$refs.rankItem.toggle();
    },
    ok() {
      //用逗号隔开
      let attr_id = this.$pub.objToStr(this.attr_val_id, ",");
      console.log(attr_id);
      this.$emit("attr", attr_id);
      this.$refs.item.toggle();
    },
    choose(id, attr) {
      this.$set(this.attr_val_id, attr, id);
    }
  }
};
</script>



<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.screen {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 69px;
      height: 33px;
      text-align: center;
      line-height: 33px;
      background: #f5f5f5;
      border-radius: 3px;
      color: #646464;
      margin: 10px 12px;
    }
  }
}
.rank {
  ul {
    li {
      @include Size(100%, 50px);
      line-height: 50px;
      text-align: center;
      border-bottom: 1px #eee solid;
      font-size: 15px;
    }
  }
}
.content {
  margin-top: 100px;
}

.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11111;
}
.bottom {
  height: 50px;
}
.act {
  color: #eb6100;
}
.active {
  background: #ebeefe !important;
  color: #eb6100 !important;
}
.about {
  @include Wm(95%);
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
.btn_item {
  width: 40%;
  color: #000;
}
.btn {
  @include Wm(95%);
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem;
}
</style>