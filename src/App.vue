<template>
  <div id="app">
    <router-view />
    <div
      v-show="$store.active"
      class="Customer"
      id="default_drag_comp"
      @click="goNext"
      @touchstart="down"
      @touchmove="move"
      @touchend="end"
    >
      <i class="iconfont icon-xin"></i>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";

export default {
  mounted() {
    document.body.style.background = "#f2f3f5";
    this.maxW = document.documentElement.clientWidth; //获取可视窗口宽
    this.maxH = document.documentElement.clientHeight; //获取可视窗口高
    console.log(this.maxW, this.maxH);
  },
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      flags: false, //是否开启拖拽
      nx: "", //鼠标移动X
      ny: "", //鼠标移动Y
      dx: "", //鼠标按下X轴
      dy: "", //鼠标按下Y轴
      maxW: 0, //可视窗口宽
      maxH: 0, //可是窗口高
    };
  },
  methods: {
    // 点击实现页面跳转
    goNext() {
      //this.$router.push("/custmoer");
      // this.$emit("goNext");
    },
    // 实现移动端拖拽
    down() {
      // console.log(event)
      this.flags = true; //鼠标按下开启拖拽
      var touch;
      if (event.touches) {
        touch = event.touches[0]; //通过event.touches[0]拿到鼠标按下的数据
      }
      this.dx = touch.clientX; //将鼠标按下的X轴数据存储data
      // console.log(this.dx);
      this.dy = touch.clientY; //将鼠标按下的Y轴数据存储data
      console.log(this.dx, this.dy);
    },
    move(event) {
      event.preventDefault(); //方法阻止元素发生默认的行为。
      //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素
      let default_drag_comp = document.querySelector("#default_drag_comp");
      if (this.flags) {
        //判断用户是否在拖拽  如果拖拽
        var touch;
        if (event.touches) {
          touch = event.touches[0]; //将拖拽的数据赋值给touch
        }
        this.nx = touch.clientX;
        this.ny = touch.clientY;
        //左右范
        if (this.nx < 0) {
          //设置拖动范围   不可以拖动到可是窗口外  当拖动X轴小于0时说明已经拖出去了  就将X轴赋值为0
          this.nx = 0;
        } else if (this.nx > this.maxW) {
          //如果大于可视窗口宽时将可视窗口宽赋值给X轴
          this.nx = this.maxW;
        }
        //上下范围
        if (this.ny < 0) {
          //设置拖动范围   不可以拖动到可是窗口外  当拖动X轴小于0时说明已经拖出去了  就将Y轴赋值为0
          this.ny = 0;
        } else if (this.ny >= this.maxH) {
          //如果大于可视窗口高时将可视窗口宽赋值给X轴
          this.ny = this.maxH;
        }
        default_drag_comp.style.left = this.nx - 30 + "px"; //将拖拽的X轴赋值给div
        default_drag_comp.style.top = this.ny - 30 + "px"; //将拖拽的Y轴赋值给div
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        // document.addEventListener(
        //   "touchmove",
        //   function () {
        //     // event.preventDefault();
        //   },
        //   false
        // );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false; //鼠标释放关闭拖拽
    },
  },
};
</script>


<style lang="scss">
.iconfont {
  font-size: 30px;
}
.Customer {
  background: #007aff;
  border-radius: 100%;
  text-align: center;
  line-height: 60px;
  color: #fff;
  position: fixed;
  bottom: 80px;
  right: 10px;
  width: 60px;
  height: 60px;
  z-index: 99999999;
}
</style>
