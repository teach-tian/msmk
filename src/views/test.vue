<template>
  <div id="test">
    <!-- //搜索 -->
    <input type="text" @input="search" v-model="val" />

    <h1 ref="mes">{{ message }}</h1>

    <button @click="fn">修改message</button>

    <div ref="a" id="bg" v-drag></div>

    <p v-for="(value, key) in item" :key="key">
      {{ value }}
    </p>
    <button @click="addProperty">动态添加新属性</button>
  </div>
</template>

<script>
//防抖函数导入
import { _debounce, _throttle } from "@/util/untils.js";

export default {
  name: "test",
  data() {
    return {
      val: "",
      message: "初始值",
      item: {
        oldProperty: "旧值",
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    addProperty() {
      // this.item.newProperty = "新值"; // 为items添加新属性
      this.item = Object.assign({}, this.item, { newProperty: "新值" });
      // this.$forceUpdate();
      console.log(this.item); // 输出带有newProperty的items
    },
    fn() {
      this.message = "值1";
      this.message = "值2";
      this.message = "值3";
      this.$nextTick(function () {
        console.log(this.$refs.mes.textContent);
      });
    },
    search: _debounce(function () {
      this.ajax();
    }, 1000),

    ajax() {
      console.log(this.val);
    },
  },
  directives: {
    drag: {
      bind() {},
      inserted(el) {
        el.onmousedown = (e) => {
          let x = e.clientX - el.offsetLeft;
          let y = e.clientY - el.offsetTop;
          document.onmousemove = (e) => {
            let xx = e.clientX - x + "px";
            let yy = e.clientY - y + "px";
            el.style.left = xx;
            el.style.top = yy;
          };
          el.onmouseup = (e) => {
            document.onmousemove = null;
          };
        };
      },
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#bg {
  width: 200px;
  height: 200px;
  background: red;
  position: absolute;
  left: 100px;
  top: 200px;
}
</style>