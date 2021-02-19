import Request from "../util/request"
import Fetch from "../util/fetch"
import Vue from "vue"
let thia = Vue.prototype


//轮播
export const banner = () => thia.$http.get('/banner')
//首页列表
export const cartlist = () => thia.$http.get("/recommend/appIndex")

//axios请求轮播图
// export const ban = () => Request(
//     {
//         url: "/api/banner",
//         headers: {
//             DeviceType: 'H5'
//         }
//     }
// )
export const appIndex = () => Fetch(
    "/recommend/appIndex"
)

//讲师详情
export const teacherId = (data) => thia.$http.get(`/teacher/${data}`)
//讲师关注 teacher/collect/52?
export const teacherCollect = (data) => thia.$http.get(`/teacher/collect/${data}`)
//讲师列表
export const teacherList = (data) => thia.$http.get('/collect', data)
//讲师列表取消关注
export const noteacher = (data) => thia.$http.put(`/collect/cancel/${data}/2`)

export const teacherInfo = (data) => Request({
    url: `/api/teacher/info/${data}`,
    method: "GET"
})

//课程详情
export const courceId = (data) => Request({
    url: `/api/courseInfo/basis_id=${data}`,
    method: "GET"
})

//特色课--分类 
export const courseify = () => Request({
    url: `/api/courseClassify`,
    method: "GET"
})

//分类-分页?page=1&limit=10
export const coursebasis = (data) => thia.$http.get('/courseBasis', data)

//约课 app/oto/myInviteCourse/index

//登录 /login
export const login = (data) => Request({
    url: `/api/login`,
    method: "POST",
    params: data
})

//课程详情报名
export const apply = (data) => thia.$http.post('/order/downOrder', data)
//oto列表 app/otoCourse?page=1&limit=10&attr_val_id=6&
export const oto = (data) => thia.$http.get("/otoCourse", data) //Fetch("/otoCourse", data)

// //oto选择老师条件 /app/otoCourseOptions?
export const otoconditon = () => thia.$http.get("/otoCourseOptions")
//预约课程
export const orderTime = (data) => thia.$http.post('/teacher/invite', data)

//发送验证码
export const SmsVerification = (data) => thia.$http.post('/smsCode', data)
//验证码登录
export const VerificationLogin = (data) => thia.$http.post('/login', data)
//确认密码
export const secondPassword = (data) => thia.$http.post('/password', data)
//学科年级  /module/attribute/1
export const attr = () => thia.$http.get('/module/attribute/1')
//提交
export const user = (data) => thia.$http.put('/user', data)

//分享
export const share = () => thia.$http.post('/public/share')
//更换用户头像
export const avatar = (data) => thia.$http.post('/public/img', data)
//城市
export const city = (data) => thia.$http.get(`/sonArea/${data}`)

//用户userinfo
export const Userinfo = () => thia.$http.get('/userInfo')
//user信息
export const UserCenter = () => thia.$http.get('/getUCenterInfo')


//我的学习
export const mystaus = (type) => thia.$http.get(`/myStudy/${type}`)
//学习日历
export const myrili = (data) => thia.$http.get(`/study/live/${data}`)
// 切换日历月份 /app/study/schedule?date=2019-8-1&
export const myrlisutdy = (data) => thia.$http.get(`/study/schedule?date=${data}`)
//日历 course_type==1
export const getRoom = (data) => thia.$http.get(`/oto/getLiveRoomCode/${data}/0`)

export const getRoomCode = (dataid, chapterID) => thia.$http.get(`/getPcRoomCode/course_id=${dataid}/chapter_id=${chapterID}`)


//课程订单
export const order = (data) => thia.$http.post('/myOrder', data)
//收藏
export const collect = (data) => thia.$http.post('/collect', data)
//取消收藏
export const nocollect = (data) => thia.$http.put(`/collect/cancel/${data}/1`)
//收藏列表
export const collectlist = (data) => thia.$http.get('/collect', data)

//余额
export const gold = () => thia.$http.get('/coinBalance');
//充值
export const czgold = () => thia.$http.get('/coin/coinRank')
//金额明细
export const goldmx = (data) => thia.$http.get('/coin/item', data)
//优惠券 /coupon?status=0&
export const Coupon = (data) => thia.$http.get('/coupon', data)
//我的学习卡 /myStudy
export const myStudy =()=> thia.$http.post('/myStudy')
//会员
export const Vip =()=>thia.$http.get('/vip/grade')

//题库选择--科目
export const pointL = () => thia.$http.get("/wap/classify")
//题库选择--题库 /wap/quesBank/19
export const pointR = (data) => thia.$http.get(`/wap/quesBank/${data}`)
//题库搜素 /wap/search/bank?bank=2&
export const pointSearch = (data) => thia.$http.get(`/wap/search/bank?bank=${data}`)
//题库选择--选择/examPoint/21/15?
export const examPoint = (a, b) => thia.$http.get(`/examPoint/${a}/${b}`)
//套餐分类 /exam/classify
export const classify = () => thia.$http.get("/exam/classify")
//套卷选择 /exam/packagePractice?classify_id=8
export const packageP = (data) => thia.$http.get("/exam/packagePractice", data)
//仿真考试/exam/packageSimulation
export const examlist = (data) => thia.$http.get("/exam/packageSimulation", data)
//错题记录 /myExam/errorRecord?ques_source=-1
export const errorques = (data) => thia.$http.post('/myExam/errorRecord', data)
//测聘记录 /examStatistics/detail
export const assess = (data) => thia.$http.get("/examStatistics/detail", data)
