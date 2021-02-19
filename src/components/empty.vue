<template>
  <div class="empty">
    <img :src="empty_type.img || require('../assets/empty.png')" :style="mStyle" />
    <p>{{empty_type.name}}</p>
  </div>
</template>
<script>
export default {
  props: {
    empty_type: {
      type: Object,
      required: true
    }
  },
  computed: {
    mStyle() {
      const retStyle = this.empty_type.style;
      if (retStyle) {
        for (const i in retStyle) {
          if (!retStyle[i].includes("%")) {
            retStyle[i] = this.$pub.px2vw(retStyle[i]);
          }
        }
      }
      return retStyle;
    }
  }
};
</script>
<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  text-align: center;
  img{
    width: 70%;
    margin:0 auto;
  }
  p {
    font-size: 15px;
    color: #8c8c8c;
    margin-top: 40px;
  }
}
</style>