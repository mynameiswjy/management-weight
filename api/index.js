import { requestAjaxGet, requestAjaxPost } from './ajax'

export function homeIndex (data) {
  const url = '/shop/applet/home/index.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 分类三级商品
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