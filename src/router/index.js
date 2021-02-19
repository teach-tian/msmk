import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/one',
    children: [
      {
        path: '/one',
        name: 'one',
        component: () => import(/* webpackChunkName: "about" */ '../views/4主页/one.vue')
      },
      {
        path: '/two',
        name: 'two',
        meta: {
          requireLogin: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/4主页/two.vue')
        // beforeEnter: (to, from, next) => {
        //   if (to.meta.requireLogin && localStorage.getItem('adminToken')) {
        //     next()
        //   } else {
        //     next({ path: '/login' })
        //   }
        // }
      },
      {
        path: '/three',
        name: 'three',
        component: () => import(/* webpackChunkName: "about" */ '../views/4主页/three.vue')
      },
      {
        path: '/person',
        name: 'person',
        component: () => import(/* webpackChunkName: "about" */ '../views/4主页/person.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/4主页/home.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import("views/test.vue")
  },
  {
    path: "/coursedet",
    name: "coursedet",
    component: () => import("../views/课程/swiperId"),
    meta: {
      title: "课程详情"
    }
  },
  // 详情
  {
    path: '/courceDetail',
    name: 'courceDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/首页/courceDetail.vue')
  },
  // 详情
  {
    path: '/teacherDetail',
    name: 'teacherDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/首页/teacherDetail.vue')
  },
  // 搜索
  {
    path: '/Search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/课程/Search.vue')
  },
  // 一对一
  {
    path: '/oto',
    name: 'oto',
    component: () => import(/* webpackChunkName: "about" */ '../views/首页/oto.vue')
  },
  {
    path: "/makedetail",
    name: "makedetail",
    component: () => import("../views/首页/makedetail.vue")
    // path: '/makedetail',
    // name: "makedetail",
    // component: () => import('../views/首页/makedetail.vue')
  },
  {
    path: "/hander",
    name: "hander",
    component: () => import("../views/首页/hander.vue")
  },
  // 日历
  {
    path: '/Calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/首页/Calendar.vue')
  },
  {
    //进入邮件页
    path: "/custmoer",
    name: "custmoer",
    component: () => import(/* webpackChunkName: "about" */ '../views/custmoer.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  //用户登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/用户登录/login')
  },
  //忘记密码
  {
    path: '/forget-pass',
    component: () => import('@/views/用户登录/forget-pass')
  },
  //修改信息
  {
    path: '/selfInfo',
    component: () => import('@/views/我的/selfInfo')
  },
  //修改用户名
  {
    path: '/editInfo',
    name: "editInfo",
    component: () => import('@/views/我的/editInfo')
  },
  //订单相关
  {
    path: "/Coupon",
    name: "Coupon",
    component: () => import("@/views/我的/我的账户/coupon.vue"),
    meta: {
      title: "优惠券"
    }
  },
  {
    path: "/Card",
    name: "Card",
    component: () => import("@/views/我的/我的账户/Card.vue"),
    meta: {
      title: "我的学习卡"
    }
  },
  {
    path: "/Vip",
    name: "Vip",
    component: () => import("@/views/我的/我的账户//Vip.vue"),
    meta: {
      title: "会员"
    }
  },
  // 剩余学习币
  {
    path: '/my-currency',
    name: "my-currency",
    component: () => import('@/views/我的/my-currency')
  },
  // 设置
  {
    path: '/options',
    name: "options",
    component: () => import('@/views/我的/自助服务/options')
  },
  //预约
  {
    path: "/point",
    name: "point",
    component: () => import("@/views/练习/point.vue"),
    meta: {
      title: "考点专练"
    }
  },
  {
    path: "/paperPage",
    name: "paperPage",
    component: () => import("@/views/练习/paperPage.vue"),
    meta: {
      title: "套卷练习"
    }
  },
  {
    path: "/exam",
    name: "exam",
    component: () => import("@/views/练习/exam.vue"),
    meta: {
      title: "仿真模考"
    }
  },
  {
    path: "/errorques",
    name: "errorques",
    component: () => import("@/views/练习/errorques.vue"),
    meta: {
      title: "学习日历"
    }
  },
  {
    path: "/assess",
    name: "assess",
    component: () => import("@/views/练习/assess.vue"),
    meta: {
      title: "测评记录"
    }
  }

]

const router = new VueRouter({
  mode: 'hash',
  routes
})


//在router定义的地方，进行全局路由守卫。

//三个

//全局前置守卫
// router.beforeEach((to, from, next) => {
//   //to 即将进入的路由对象
//   //from 离开的路由对象
//   //next() 是否执行下一步

//   console.log(to)

//   if (to.meta.requireLogin) {

//     if (localStorage.getItem('adminToken')) {
//       next()
//     } else {
//       next({ name: 'login' })
//     }

//   } else {
//     next()
//   }

// })

//全局后置钩子
router.afterEach((to, from) => {
  // alert('over')
})

export default router
