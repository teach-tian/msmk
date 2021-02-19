<template>
  <div class="home">

      <Tabbar />

       <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from "../components/Tabbar"
import { Button } from "vant";
export default {
  components: {
    [Button.name]: Button,
    Tabbar,

  },
};
</script>
