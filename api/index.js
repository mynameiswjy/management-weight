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

// 省
export function findAllProvince (data, cb) {
  const url = '/shop/area/findAllProvince';
  requestAjaxGet(url, data, (res) => {
    cb(res)
  })
}

// 市
export function findByParentCode (data, cb) {
  const url = '/shop/area/findByParentCode';
  requestAjaxPost(url, data, (res) => {
    cb(res)
  })
}

// 添加地址
export function addAddress (data) {
  const url = '/shop/cse/add';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 获取默认地址
export function addrDefaulted (data) {
  const url = '/shop/cse/defaulted';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 获取收货地址列表
export function addrList (data) {
  const url = '/shop/cse/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 设置默认地址
export function setDefault (data) {
  const url = '/shop/cse/default';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 修改地址
export function modifiAddr (data) {
  const url = '/shop/cse/edit';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 删除收货地址
export function deleteAddr (data) {
  const url = '/shop/cse/del';
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

// 添加购物车
export function addCard (data) {
  const url = '/shop/cart/add';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 添加购物车
export function cardList (data) {
  const url = '/shop/cart/info';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 修改购物车
export function cardEdit (data) {
  const url = '/shop/cart/edit';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 删除购物车商品
export function deleteCartGoods (data) {
  const url = '/shop/cart/del';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

