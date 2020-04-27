import { requestAjaxGet, requestAjaxPost } from './ajax'

export function homeIndex (data) {
  const url = '/shop/applet/home/index.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

export function homeGoodsList (data) {
  const url = '/shop/applet/goods/commodity/zone/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 首页10元商品 爆款商品 落地页
export function commodityzonegoods (data) {
  const url = '/shop/applet/goods/commodity/zone/goods';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 分类页面 三级商品
export function ClassifyThree (data) {
  const url = '/shop/applet/goods/caty/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 三级二级商品
export function ClassifyTwo (data) {
  const url = '/shop/applet/caty/list/sec';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 三级一级商品
export function ClassifyOne (data, cb) {
  const url = '/shop/applet/caty/list';
  requestAjaxGet(url, data, (res) => {
    cb(res)
  })
}

// 分类下的商品
export function ClassificationGoods (data, cb) {
  const url = '/shop/applet/goods/caty/goods';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 商品详情页
export function goodsDetail (data) {
  const url = '/shop/applet/goods/detail';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 商品推荐
export function recommendGoods (data) {
  const url = '/shop/applet/goods/related/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 商品浏览记录
export function goodsRecord (data) {
  const url = '/shop/applet/user/behavior/put.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 商品规格
export function goodsSspecs (data) {
  const url = '/shop/applet/goods/specs';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 生成订单
export function createOrder (data) {
  const url = '/shop/applet/order';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 支付签名
export function PaySign (data) {
  const url = '/shop/applet/order/pay';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 10元专区订单列表
export function orderList (data) {
  const url = '/shop/applet/shopOrder/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 10元专区下方订单列表
export function commodityGoodsList (data) {
  const url = '/shop/applet/goods/commodity/zone/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 登录注册
export function login (data) {
  const url = '/shop/applet/user/login.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 退出登录
export function logout (data) {
  const url = '/shop/applet/user/logout.do';
  const app = getApp();
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 利用code获取用户信息
export function getUserInfo (data) {
  const url = '/shop/applet/user/get.do';
  const app = getApp();
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}


