<template>
  <div class="card">
    <p class="title">{{data.channel_info.name}}</p>
    <div class="type2" v-if="data.channel_info.type==1">
      <CardType2 :data="data" />
    </div>
    <div class="type2" v-if="data.channel_info.type==2">
      <CardType2 :data="data" />
    </div>
    <div v-if="data.channel_info.type==3">
      <CardType1 :data="data" />
    </div>
    <div v-if="data.channel_info.type==4">
      <CardType1 :data="data" />
    </div>
  </div>
</template>

<script>
import CardType1 from "./CartdType1";
import CardType2 from "./CardType2";
export default {
  components: {
    CardType1,
    CardType2
  },
  props: ["data"],
  mounted() {
    // console.log(this.data.list);
  },
  data() {
    return {};
  }
};
</script>


<style lang="scss" scoped>
.card {
  width: 95%;
  margin: 0 auto;
  .title {
    border-left: 3px red solid;
    padding-left: 10px;
    font-size: 17px;
  }
}


</style>