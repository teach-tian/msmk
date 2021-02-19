<template>
  <div class="hot_content">
    <div>
      <div @click="soure_item(item)" class="cource" v-for="(item,index) in data" :key="index">
        <p class="title">{{item.title}}</p>
        <p class="cource_xq">
          <van-icon class="icon" name="clock-o" />
          <span>{{item.end_play_date | itemD}} &nbsp;|&nbsp; 共{{item.sales_num}}课时</span>
        </p>
        <div class="cource_img">
          <ul>
            <li>
              <img class="image" :src="item.teachers_list[0].teacher_avatar" alt />
              <p>{{item.teachers_list[0].teacher_name}}</p>
            </li>
          </ul>
        </div>
        <div class="cource_bottom">
          <span class="places">{{item.browse_num}}人已报名</span>
          <span class="status">{{item.price===0?"免费":item.price}}</span>
        </div>
        <i class="has-buy" v-if="item.has_buy"></i>
      </div>
    </div>
  </div>
</template>

<script>

import Tiem from "../../util/Time";
export default {
  props: ["data"],
  components: {
  },
  data() {
    return {
      currentpage: 0,
      lastpage: 5,
      list: []
    };
  },
  mounted() {
    console.log(this.data);
  },
  created(){
    console.log(this.data);
  },
  methods: {
    soure_item(v) {
      // console.log(v.id);
      this.$router.push({
        path: "/coursedet",
        query: {
          id: v.id
        }
      });
    }
  },
  filters: {
    itemD(v) {
      return Tiem(v);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.has-buy {
  position: absolute;
  right: 30px;
  top: 70px;
  background: url("../../assets/images/has-buy.png") no-repeat;
  background-size: 100% 100%;
  width: 68px;
  height: 46px;
}
.cource_bottom {
  display: flex;
  justify-content: space-between;
  padding: 25px 10px;
  .places {
    color: #777;
  }
  .status {
    color: #44a426;
    font-size: 16px;
  }
}
.cource_img {
  ul {
    li {
      padding: 0 10px;
      text-align: center;
      color: #777;
      display: flex;
      align-items: center;
      .image {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        margin-right: 10px;
      }
    }
  }
}
.cource {
  @include Wm(93%);
  background: #fff;
  height: 180px;
  margin: 15px auto;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  position: relative;
  // justify-content: space-around;
  .title {
    font-size: 17px;
    padding: 0 10px;
    padding-top: 10px;
  }
  .cource_xq {
    color: #777;
    padding: 0 10px;
    margin-top: -10px;
    display: flex;
    align-items: center;
  }
}
</style>