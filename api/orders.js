import { requestAjaxGet, requestAjaxPost } from './ajax'

// 订单列表
export function orderList (data) {
  const url = '/shop/applet/shopOrder/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 删除订单
export function deleteOrder (data) {
  const url = '/shop/applet/shopOrder/del';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 确认收货
export function finished (data) {
  const url = '/shop/applet/shopOrder/finished';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 订单详情
export function orderDetail (data) {
  const url = '/shop/applet/shopOrder/detail';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 订单详情
export function orderCancel (data) {
  const url = '/shop/applet/shopOrder/cancel';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 提现明细查询
export function paymentList (data) {
  const url = '/shop/applet/acc/list.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 提现
export function paymentMoney (data) {
  const url = '/shop/applet/acc/essay.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 账户查询
export function oderFind (data) {
  const url = '/shop/applet/acc/get.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}