import {requestAjaxGet, requestAjaxPost} from "./ajax";

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

// 删除收货地址
export function expressFind (data) {
  const url = '/shop/applet/shopOrder/express/detail';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}