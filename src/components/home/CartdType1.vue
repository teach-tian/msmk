<template>
  <div>
    <van-cell @click="detail(item)" class="cell" v-for="(item,index) in data.list" :key="index">
      <template #title>
        <div class="card_item">
          <div class="img">
            <img :src="item.teacher_avatar" alt />
          </div>
          <div class="item-right">
            <p>{{item.teacher_name}}</p>
            <p class="item_xq">{{item.introduction}}</p>
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
  methods:{
      detail(item){
          console.log(item);
          this.$router.push({
              path:"/teacherDetail",
              query:{
                  id:item.teacher_id
              }
          })
      }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  margin-bottom: 0.2rem;
}
.card_item {
  display: flex;
  align-items: center;
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
    }
    .item_xq {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>