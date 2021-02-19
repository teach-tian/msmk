<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="goBack"
      @click-right="saveInfo"
    />
    <van-cell-group v-if="userKey == 'nickname'">
      <van-field v-model="userValue" placeholder="请输入昵称" />
    </van-cell-group>
    <van-radio-group v-if="userKey == 'sex'" v-model="userValue">
      <van-cell-group>
        <van-cell title="男" clickable @click="userValue = '0'">
          <template #right-icon>
            <van-radio name="0" />
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="userValue = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-checkbox-group v-if="userKey == 'subjects'" @change="dd" v-model="subjectsId">
      <van-cell-group>
        <van-cell
          v-for="(item,index) in subjectsList"
          clickable
          :key="item.id"
          :title="item.name"
          @click="toggle(index)"
        >
          <template #right-icon>
            <van-checkbox :name="item" ref="checkboxes" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>

<script>
import { zzhUserInfo, zzhUploadUserInfo, city, zzhAttr } from "../../util/http";
export default {
  // 组件名称
  name: "demo", // 组件参数 接收来自父组件的数据
  props: [],
  components: {},
  data() {
    return {
      userKey: "",
      userValue: "",
      subjectsList: [],
      subjectsId: [],
      attrList: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      console.log("退出");
      this.$router.push("/selfInfo");
    },
    async saveInfo() {
      console.log("信息更新");
      if (this.userKey == "subjects") {
        const query = [];
        this.attrList[1].value = this.subjectsId;
        query[1] = this.attrList[1]
        console.log(query)
        const res = await zzhUploadUserInfo({'attr':query});
        console.log(res);
        this.$router.push("/selfInfo");
      } else {
        const query = {};
        query[this.userKey] = this.userValue;
        const res = await zzhUploadUserInfo(query);
        console.log(res);
        this.$router.push("/selfInfo");
      }
    },
    async getUserInfo(userKey) {
      this.userKey = userKey;
      const res = await zzhUserInfo();
      this.userValue = res[userKey];
      console.log(this.userKey);
      console.log(this.userValue);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    dd() {
      console.log(this.subjectsId);
    }
  },
  beforeCreate() {},
  async created() {
    this.getUserInfo(this.$route.params.tag);
    const res = await zzhAttr();
    this.attrList = res;
    this.subjectsList = res[1].value;
    console.log(this.attrList);
    console.log(this.subjectsList);
  },
  beforeMount() {},
  mounted() {}
};
</script> 
<style scoped>
</style>
