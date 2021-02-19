<template>
  <div class="kinds">
    <ul>
      <router-link tag="li" :to="item.route" v-for="(item,index) in kindsList" :key="index" class="kinds_item">
        <i :class="[item.kindsIcon,icon]"></i>
        <p>{{item.title}}</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "iconfont",
      kindsList: [
        {
          kindsIcon: "icon-shuben",
          title: "特色课",
          route:"/two"
        },
        {
          kindsIcon: "icon-tucao2",
          title: "一对一辅导",
          route:"/oto"
        },
        {
          kindsIcon: "icon-xuexirili",
          title: "学习日历",
          route:"/calendar"
        }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/CSS/index.scss";
.kinds {
  width: 90%;
  height: 103px;
  margin: 0 auto;
  position: relative;
  top: -25px;
  margin-bottom: -20px;
  ul {
    @include FlexSpace();
  }
}
.kinds_item {
  width: 103px;
  height: 103px;
  @include BgC(#fff, #8c8c8c);
  border-radius: 10px;
  text-align: center;
  @include FlexMenu();
  .iconfont {
    font-size: 30px;
  }
  .icon-shuben {
    color: #5251da;
  }
  .icon-tucao2 {
    color: #73b3a5;
  }
  .icon-xuexirili {
    color: #d88f72;
  }
}
</style>