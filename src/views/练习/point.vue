<template>
  <div>
    <div v-show="show ==0">
      <van-nav-bar title="题库选择" @click-left="onClickLeft" left-arrow />
      <div class="search">
        <van-cell-group class="inp">
          <van-field
            @click-right-icon="onright"
            class="input"
            right-icon="search"
            v-model="value"
            placeholder="请输入题库名称关键字"
            @keyup.enter.native="onSearch"
          />
        </van-cell-group>
      </div>
      <div class="content">
        <div class="content_left">
          <ul>
            <li
              :class="act==item.id?'active':''"
              v-for="(item,index) in pointList"
              :key="index"
              @click="onpointL(item)"
            >{{item.name}}</li>
          </ul>
        </div>
        <div class="content_right">
          <div v-for="(item,index) in pointRist" :key="index" class="right_item">
            <p>{{item.name}}</p>
            <ul class="item">
              <li
                @click="onpointRact(item2)"
                :class="pointRact==item2.id?'active2':''"
                v-for="(item2) in item.bank"
                :key="item2.id"
                class="item_xq"
              >{{item2.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-show="show==1" class="point_Search">
      <div class="search">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </div>
      <div class="sear_content">
        <ul>
          <li v-for="(item,index) in searchList" :key="index">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div v-show="show==2">
      <van-nav-bar :title="data.name" @click-left="onClickLeft" left-arrow />
      <div class="bak"></div>
      <div class="tiku_content">
        <div class="content_top">
          <span @click="point">
            <van-icon size="17px" class="left_icon" name="bars" />&nbsp;&nbsp;
            <span class="txt">题库选择</span>
          </span>
          <span class="right_shezhi">
            <van-icon name="setting-o" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, CellGroup, Field, Search, Toast, Icon } from "vant";
import { pointL, pointR, pointSearch, examPoint } from "../../util/http";
export default {
  props: {},
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Search.name]: Search,
    [Toast.name]: Toast,
    [Icon.name]: Icon
  },
  data() {
    return {
      value: "",
      pointList: [],
      pointRist: [],
      searchList: [],
      act: 19,
      show: 0,
      pointRact: 0,
      data: {}
    };
  },
  mounted() {
    pointL().then(res=>{
      console.log(res)
    })
    document.body.style.background = "#fff";
    this.initpointL();
    this.initpintR();
  },
  methods: {
    point() {
      this.show = 0;
    },
    onpointRact(item) {
      console.log(item);
      this.data = item;
      this.pointRact = item.id;
      this.show = 2;
      this.getexam(item.classify_id,item.id);
    },
    getexam(v) {
      examPoint(v).then(res => {
        console.log(res);
      });
    },
    //enter
    onSearch() {
      if (!this.value) {
        this.$toast({
          message: "不能为空"
        });
        return;
      }
      this.show = 1;
      this.Search(this.value);
    },
    onCancel() {
      this.show = 0;
      this.value = "";
    },
    //点击搜素
    onright() {
      if (!this.value) {
        this.$toast({
          message: "不能为空"
        });
        return;
      }
      this.show = 1;
      this.Search(this.value);
    },
    Search(v) {
      pointSearch(v).then(res => {
        this.searchList = res;
      });
    },
    onpointL(item) {
      this.act = item.id;
      this.initpintR();
    },
    initpointL() {
      pointL().then(res => {
        console.log(res)
        this.act = res[0].id;
        this.pointList = res;
      });
    },
    initpintR() {
      pointR(this.act).then(res => {
        console.log(res);
        this.pointRist = res;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.bak {
  height: 15px;
  background: #f2f3f5;
}
.tiku_content {
  .content_top {
    line-height: 40px;
    padding-left: 10px;
    font-size: 15px;
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .txt {
      top: -3px;
      position: relative;
    }
    .right_shezhi {
      padding-right: 10px;
    }
  }
}
.sear_content {
  ul {
    li {
      line-height: 40px;
      padding-left: 10px;
      border-bottom: 1px #e6e4e4 solid;
      color: #595959;
    }
  }
}
.content {
  display: flex;
  border-top: 1px rgb(245, 245, 245) solid;
  .content_left {
    width: 25%;
    position: absolute;
    left: 0;
    background: #f2f3f5;
    height: 100%;
    ul {
      li {
        padding-left: 10px;
        line-height: 40px;
      }
      .active {
        background: #fff;
      }
    }
  }
  .content_right {
    width: 75%;
    position: absolute;
    right: 0;
    background: #fff;
    height: 100%;
    .right_item {
      padding-left: 10px;
      .item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-left: 10px;
        li {
          padding: 4px 20px;
          width: 70px;
          background: #f2f3f5;
          margin: 5px 5px;
          border-radius: 2px;
          text-align: center;
        }
        .active2 {
          background: #fdefe5;
          color: #eb6100;
        }
      }
    }
  }
}
.search {
  width: 100%;
  background: #fff;
  padding: 5px 0px;
}
.inp {
  width: 95%;
  margin: 6px auto;
  border-radius: 55px;
  background: #f7f8fa;
  .input {
    border-radius: 45px;
    background: #f7f8fa;
  }
}
</style>
