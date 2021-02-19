<template>
  <div class="main">
    <div class="charpter_top">
      <i class="iconfont icon-dian"></i>
      <div class="huifang">{{info.course_type==2?"回访":'无状态'}}</div>
      <div class="title">{{info.title}}</div>
    </div>
    <div class="content">{{info.start_play_date | fomartTime('yyyy.MM.dd hh:mm')}}</div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      play_state: ["无状态", "未开始", "直播中", "暂无回放", "回放"]
    };
  }
};
</script>


<style lang="scss" scoped>
.content{
    padding-left: 30px;
    color: #777;
}
.charpter_top {
  display: flex;
  align-items: center;
  .huifang {
    background: #ea7a2f;
    color: #fff;
    border-radius: 5px;
    padding: 2px 4px;
  }
  .iconfont {
    color: orange;
  }
  .title {
    margin: 0 10px;
  }
}
</style>