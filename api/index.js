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

// 商品详情页
export function goodsDetail (data) {
  const url = '/shop/applet/goods/detail';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}