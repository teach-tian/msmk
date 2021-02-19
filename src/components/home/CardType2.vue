<template>
  <div>
    <van-cell @click="detail(item)" class="cell" v-for="(item,index) in data.list" :key="index">
      <template #title>
        <div class="item_title">{{item.title}}</div>
        <div class="item_hour">共{{item.total_periods}}课时</div>
        <div>
          <div class="card_item2" v-for="(item2,index) in item.teachers_list" :key="index">
            <div class="img">
              <img :src="item2.teacher_avatar" alt />
            </div>
            <div class="item-right">
              <p>{{item2.teacher_name}}</p>
            </div>
          </div>
        </div>
        <div class="item_xq">
          <div>{{item.sales_num}}人报名</div>
          <div class="price">
            <i class="iconfont icon-jinbi"></i>
            {{item.price}}.00
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
export default {
  props: ["data"],
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    detail(item) {
      console.log(item);
      this.$router.push({
        path: "/courceDetail",
        query: {
          id: item.id
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.type2 {
  .item_title {
    font-size: 18px;
  }
  .item_hour {
    color: #777;
  }
  .item_xq {
    display: flex;
    justify-content: space-between;
    color: #999;
    .price {
      font-size: 17px;
      color: rgb(255, 60, 0);
      font-weight: 500;
      .iconfont {
        color: orange;
        font-size: 17px;
      }
    }
  }
}
.cell {
  margin-bottom: 0.2rem;
}
.card_item2 {
  display: flex;
  align-items: center;
  margin: 15px 0;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
  .item-right {
    margin-left: 10px;
    p {
      line-height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      color: #999;
    }
    .item_xq {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>