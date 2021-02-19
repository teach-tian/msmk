<template>
  <div>
    <van-nav-bar @click-left="$router.go(-1)" title="我的学习卡" left-arrow>
      <template #right>
        <div>学习卡兑换</div>
      </template>
    </van-nav-bar>
    <div>
      <Empty v-if="list.length==0" :empty_type="empty" />
    </div>
  </div>
</template>

<script>
import { myStudy } from "../../../util/http";
import Empty from "../../../components/empty";
export default {
  props: {},
  components: {
    Empty
  },
  data() {
    return {
      list: [],
      empty: {
        name: "暂无兑换记录"
      }
    };
  },
  mounted() {
    this.getmystudy();
  },
  methods: {
    getmystudy() {
      myStudy().then(res => {
        this.list = res;
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped >
</style>

