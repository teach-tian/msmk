import Request from "../util/request"
import Fetch from '../util/fetch'
import Vue from "vue"
let thia = Vue.prototype
//
//
//                      ****二组接口封装****
//
//
//
//

//
// 朱振虎
//
//首页数据
export const zzhHomeList = () => Fetch.get('/app/recommend/appIndex')
//banner
// export const zzhBanner = () => Fetch.get('/app/banner')
export const zzhBanner = () => Fetch.get('/app/banner')
//获取短信验证码
export const zzhSmsCode = (data) => Fetch.post('/app/smsCode', data)
//手机号注册
export const zzhLogin = (data) => Fetch.post('/app/login', data)
//修改密码
export const zzhReset = (data) => Fetch.post('/app/password', data)
//获取用户信息
export const zzhUserInfo = () => Fetch.get('/app/userInfo')
//上传新头像
export const zzhUpLoadImg = (data) => Fetch.post('/app/public/img', data)
//修改用户信息
export const zzhUploadUserInfo = (data) => Fetch.put('/app/user', data)
//城市接口
export const city = (data) => Fetch.get(`/app/sonArea/${data}`)
//学科年级
export const zzhAttr = (data) => Fetch.get('/app/module/attribute/1')
// https://www.365msmk.com/api/app/otoCourse?page=1&limit=10&
//学科年级
export const zzhOtoCourse = (data) => Fetch.get(`/app/otoCourse?page=${data.page}&limit=${data.limit}`)
// https://www.365msmk.com/api/app/otoCourseOptions?
//学科年级
export const zzhOtoCourseOptions = (data) => Fetch.get(`/app/otoCourseOptions`)
// export const zzhOtoCourseOptions = (data) => Fetch.get(`/app/get/config/system_webConfig`)
//
// 丁佳惠
//考点专练侧边栏
export const djhLeft = () => Fetch.get('/app/wap/classify')
// 考点专练右边内容
export const djhRight = (data) => Fetch.get(`/app/wap/quesBank/` + data.id)
//搜索
export const djhSearch = () => Fetch.get(`/app/wap/search/bank?bank=%E8%AF%AD%E6%96%87&`)
//
// 张雪涛
//轮播图
export const zxtbanner = () => Fetch.get('/app/banner')
//名师数据
export const zxtHomeList = () => Fetch.get('/app/recommend/appIndex')
//名师详情：http://120.53.31.103:84/api/app/courseInfo/basis_id=xxx
export const zxtcourseInfo = (id) => Fetch.get(`app/courseInfo/basis_id=${id}`)
//课程评论：http://120.53.31.103:84/api/app/courseComment
export const zxtcourseComment = (id) => Fetch.post(`app/courseComment?id=${id}`)
// 特色课：https://www.365msmk.com/api/app/courseBasis
export const zxtcourseBasis = (page) => Fetch.get(`/app/courseBasis?page=${page}`)
//
// 李承一
//
//
// 刘广来
// 
//进入页面的请求数据接口
export const lglGettingDataContainer = (data) => Fetch.get(`/app/courseBasis?attr_val_id=${data.one},${data.xue}&order_by=${data.order}&course_type=${data.course_type}&page=${data.page}`)
//点击详情页面的请求数据接口
export const lglListRightXiang = (data) => Fetch.get(`app/courseInfo/basis_id=${data}`)
//精品课程详情
export const xwDetail = (data) => Fetch.get(`/app/courseInfo/basis_id=${data}`)
//精品课程详情评论
export const xwDetailPl = (data) => Fetch.post(`/app/courseComment`, data)
// 删除收藏
export const xwCollect = (data) => Fetch.put(`/app/collect/cancel/${data}/1`)
// 添加收藏
export const xuanranshoucang = () => Fetch.get(`/app/collect?page=1&limit=10&type=1`)
//课程列表
export const xwCourse = (data) => Fetch.get(`/app/courseBasis?page=${data.page}&limit=${data.limit}`)
//课程筛选列表
export const xwCourseChoose = () => Fetch.get(`/app/courseClassify`)
//筛选出来的数据course 
export const xwChooseData = (data) => Fetch.get(`/app/courseBasis?page=${data.page}&limit=${data.limit}&course_type=${data.course_type}&classify_id=${data.classify_id}&order_by=${data.order_by}&attr_val_id=${data.attr_val_id}&is_vip=${data.is_vip}`)
// 课程详情--立即学习
export const downOrder = (data) => Fetch.post(`/app/order/downOrder`, data)
export const addCollect = (data) => Fetch.post(`/app/collect`, data)
//课程列表
export const zzhCourseBasis = (data) => Fetch.get(`/app/courseBasis?page=${data.page}&limit=${data.limit}&course_type=${data.course_type}&keywords=${data.keywords}`)
export const lzcourse = (type) => Fetch.get(`/app/courseBasis?page=1&limit=10&course_type=${type}`)
//
// 杨婉婷
// 请求老师列表接口
export const ywtTeacherlist = () => Fetch.get('/app/otoCourse')
// 预约课程
export const ywtOrdercourse = () => Fetch.get('/app/userInfo')

//优惠券 /coupon?status=0&
export const Coupon = (data) => Fetch.get('/app/coupon', data)
//我的学习卡 /myStudy
export const myStudy = () => Fetch.post('/app/myStudy')
//会员
export const Vip = () => Fetch.get('/app/vip/grade')
//用户userinfo
export const Userinfo = () => Fetch.get('/app/userInfo')
//余额

export const gold = () => Fetch.get('/app/coinBalance');

//充值

export const czgold = () => Fetch.get('/app/coin/coinRank')

// //金额明细
// // /余额
// export const gold = () => thia.$http.get('/app/coinBalance');
// //充值
// export const czgold = () => thia.$http.get('/app/coin/coinRank')
// //金额明细
// export const goldmx = (data) => thia.$http.get('/app/coin/item', data)

// 这个接口要传入data值 进行输入缓存

export const goldmx = (data) => Fetch.get('/app/coin/item', data)
//分享的接口
export const share = () => Fetch.post('/app/public/share')


//                                       首页接口
//轮播
export const banner = () => Fetch.get('/app/banner')
//首页列表
export const cartlist = () => Fetch.get("/app/recommend/appIndex")

//课程详情
export const courceId = (data) => Fetch.get(`/app/courseInfo/basis_id=${data}`)
//讲师详情
export const teacherId = (data) =>  Fetch.get(`/app/teacher/${data}`)
//讲师关注 teacher/collect/52?
export const teacherCollect = (data) =>  Fetch.get(`/app/teacher/collect/${data}`)
//讲师列表
export const teacherList = (data) =>  Fetch.get('/app/collect', data)
//讲师列表取消关注
export const noteacher = (data) =>  Fetch.put(`/app/collect/cancel/${data}/2`)

export const teacherInfo = (data) =>  Fetch.get(`/app/teacher/info/${data}`)
//分类-分页?page=1&limit=10
export const coursebasis = (data) =>Fetch.get('/app/courseBasis', data)
//特色课--分类 
export const courseify = () => Fetch.get(`/app/courseClassify`)
//oto列表 app/otoCourse?page=1&limit=10&attr_val_id=6&
export const oto = (data) => Fetch.get("/app/otoCourse", data)
//收藏
export const collect = (data) => thia.$http.post('/app/collect', data)
//取消收藏
export const nocollect = (data) => thia.$http.put(`/app/collect/cancel/${data}/1`)

// //oto选择老师条件 /app/otoCourseOptions?
export const otoconditon = () =>Fetch.get("/app/otoCourseOptions")




//题库选择--科目  王文健
export const pointL = () => thia.$http.get("/app/wap/classify")
//题库选择--题库 /wap/quesBank/19 王文健
export const pointR = (data) => thia.$http.get(`/app/wap/quesBank/${data}`)
//题库搜素 /wap/search/bank?bank=2& 李晓阳
export const pointSearch = (data) => thia.$http.get(`/app/wap/search/bank?bank=${data}`)
//题库选择--选择/examPoint/21/15?   王文健
export const examPoint = (a, b) => thia.$http.get(`/app/examPoint/${a}/${b}`)
//套餐分类 /exam/classify    刘恒志
export const classify = () => thia.$http.get("/app/exam/classify")
//套卷选择 /exam/packagePractice?classify_id=8 刘恒志
export const packageP = (data) => thia.$http.get("/app/exam/packagePractice", data)
//仿真考试/exam/packageSimulation  高雨洁
export const examlist = (data) => thia.$http.get("/app/exam/packageSimulation", data)
//错题记录 /myExam/errorRecord?ques_source=-1   李娜娜
export const errorques = (data) => thia.$http.post('/app/myExam/errorRecord', data)
//测聘记录 /examStatistics/detail  王翔
export const assess = (data) => thia.$http.get("/app/examStatistics/detail", data)
