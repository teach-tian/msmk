import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from "./util/fetch"
import qrcode from 'qrcode'
import Vant from 'vant';
import * as filters from "./util/filter"
import plugins from './util/plugins'
import 'vant/lib/index.css';

Vue.use(Vant);
//适配rem
import 'lib-flexible/flexible'


router.beforeEach((to,from,next)=>{
  var user = window.sessionStorage.getItem('user')
  if( to.path == '/person' && !user ){
    next('/login')
  }else{
    next()
  }
})

//时间过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  
  return `${y}-${m}-${d}`
  })
Vue.prototype.$http = http;
Vue.prototype.$pub = plugins;
Vue.prototype.$qrcode = qrcode;
Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
