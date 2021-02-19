<template>
  <div class="selfInfo">
    <van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="goBack" />
    <van-cell is-link class="head">
      <template #title>
        <span class="custom-title">头像</span>
      </template>
      <template #right-icon>
        <!-- <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" /> -->
        <img
          @click="upLoadPopup = true"
          result-type="file"
          class="headImg"
          :src="userInfo.avatar"
          alt
        />
      </template>
    </van-cell>
    <van-cell title="昵称" @click="toEditInfo('nickname')" :value="userInfo.nickname" is-link />
    <van-cell title="手机号" :value="userInfo.mobile" is-link />
    <van-cell @click="toEditInfo('sex')" v-if="userInfo.sex == 0" title="性别" is-link value="男" />
    <van-cell @click="toEditInfo('sex')" v-if="userInfo.sex == 1" title="性别" is-link value="女" />
    <van-cell @click="toEditInfo('sex')" v-if="userInfo.sex == 3" title="性别" is-link value="未知" />
    <van-cell title="出生日期" @click="showBirthdayPopup" is-link :value="currentDate | dateFormat" />
    <van-cell title="所在城市" @click="showCityPopup" is-link :value="cityName.join(',')" />
    <van-cell @click="toEditInfo('subjects')" title="学科" is-link value="学科" />
    <van-cell @click="classPopup = true" title="年级" is-link :value="userInfo.attr[0].attr_value" />
    <!-- 上传头像 -->
    <van-popup v-model="upLoadPopup" position="bottom">
      <van-uploader :after-read="afterRead" />
    </van-popup>
    <!-- 生日选择 -->
    <van-popup v-model="birthdayPopup" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="birthdaySure"
      />
    </van-popup>
    <!-- 城市选择 -->
    <van-popup v-model="cityPopup" position="bottom">
      <van-area
        @change="change"
        @confirm="citySure"
        title="标题"
        :value="String(userInfo.district_id)"
        :area-list="areaList"
      />
    </van-popup>
    <!-- 年级选择 -->
    <van-popup v-model="classPopup" position="bottom">
      <van-picker
        title="标题"
        show-toolbar
        :columns="classList.value"
        value-key='name'
        @confirm="classSure"
        @cancel="classPopup = false"
        :default-index='defaultClassIndex'
      />
    </van-popup>
  </div>
</template>

<script>
import {
  zzhUserInfo,
  zzhUpLoadImg,
  zzhUploadUserInfo,
  city,
  zzhAttr
} from "../../util/http";
export default {
  // 组件名称
  name: "demo", // 组件参数 接收来自父组件的数据
  props: [],
  components: {},
  data() {
    return {
      userInfo: {},
      upLoadPopup: false,
      minDate: new Date(1940, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      birthdayPopup: false,
      cityPopup: false,
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      cityName: [],
      cityCode: [],
      city: "所在城市",
      classPopup: false,
      classList : [],
      defaultClassIndex:0,
      defaultClass:''
    };
  },
  filters: {
    birthday() {
      return this.currentDate.toLocaleString();
    }
  },
  computed: {},
  watch: {},
  methods: {
    async classSure(e){
      console.log(e)
      const query = []
      query[0] = {'attr_id':1,'attr_val_id':e.id}
      const queryF = {}
      const res = await zzhUploadUserInfo({ 'user_attr': JSON.stringify(query) });
      console.log(res)
      this.classPopup = false
      this.getUserInfo()
    },
    async getUserInfo() {
      const res = await zzhUserInfo();
      this.userInfo = res;
      console.log(this.userInfo);
      // this.defaultClass = this.userInfo.attr[0].attr_value
      console.log(this.userInfo.attr[0].attr_value)
      this.cityName.push(res.province_name);
      this.cityName.push(res.city_name);
      this.cityName.push(res.district_name);

      this.currentDate = new Date(this.userInfo.birthday);
    },
    goBack() {
      this.$router.push("/person");
    },
    showBirthdayPopup() {
      this.birthdayPopup = true;
    },
    async birthdaySure() {
      let data = this.currentDate;
      const res = await zzhUploadUserInfo({ birthday: data });
      this.birthdayPopup = false;
      console.log(res);
    },
    showCityPopup() {
      this.cityPopup = true;
    },
    async citySure(e) {
      console.log(e);
      this.cityName = [];
      this.cityCode = [];
      this.cityPopup = false;
      e.forEach(item => {
        this.cityName.push(item.name);
        this.cityCode.push(item.code);
      });
      var queryInfo = {};
      queryInfo.province_id = this.cityCode[0];
      queryInfo.city_id = this.cityCode[1];
      queryInfo.district_id = this.cityCode[2];
      queryInfo.province = this.cityName[0];
      queryInfo.city = this.cityName[1];
      queryInfo.district = this.cityName[2];
      const res = await zzhUploadUserInfo(queryInfo);
      console.log(res);
    },
    async change(picker, item, index) {
      if (index == 0) {
        //请求市接口
        const resCity = await city(item[0].code);
        let obj1 = {};
        resCity.forEach(item => {
          obj1[item.id] = item.area_name;
          this.areaList.city_list = obj1;
        });
        //请求区接口
        let obj2 = {};
        const resCounty = await city(resCity[0].id);
        resCounty.forEach(item => {
          obj2[item.id] = item.area_name;
          this.areaList.county_list = obj2;
        });
        console.log(this.areaList);
      }
      if (index == 1) {
        console.log(item);
        // //请求区接口
        let obj2 = {};
        const resCounty = await city(item[1].code);
        resCounty.forEach(item => {
          obj2[item.id] = item.area_name;
          this.areaList.county_list = obj2;
        });
      }
    },
    async afterRead(e) {
      let formData = new FormData();
      formData.append("file", e.file);
      const res = await zzhUpLoadImg(formData);
      // console.log(res.path)
      const res2 = await zzhUploadUserInfo({ avatar: res.path });
      this.upLoadPopup = false;
      this.$toast.success("修改头像成功");
      this.getUserInfo();
    },
    toEditInfo(query) {
      this.$router.push({
        name: "editInfo",
        params: {
          tag: query
        }
      });
    }
  },
  beforeCreate() {},
  async created() {
    this.getUserInfo();
    const resProvince = await city(0);
    resProvince.forEach(item => {
      this.areaList.province_list[item.id] = item.area_name;
    });
    const resCity = await city(this.userInfo.province_id);
    resCity.forEach(item => {
      this.areaList.city_list[item.id] = item.area_name;
    });
    const resCounty = await city(this.userInfo.city_id);
    resCounty.forEach(item => {
      this.areaList.county_list[item.id] = item.area_name;
    });
    const res = await zzhAttr();
    console.log(res);
    res[0].value.forEach((item,index)=>{
      // console.log(item.name)
      // console.log(this.userInfo.attr[0].attr_value)
      if( item.name == this.userInfo.attr[0].attr_value ){
        this.defaultClassIndex = index
      }
    })
    this.classList = res[0]
    console.log(this.classList)
  },
  beforeMount() {},
  mounted() {}
};
</script> 
<style scoped>
.selfInfo {
  background: #f0f2f5;
  min-height: 100%;
}
.head .van-cell__title {
  margin-top: 12px;
}
.headImg {
  width: 50px;
  height: 50px;
  border-radius: 50% !important;
}
</style>
