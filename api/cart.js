import { requestAjaxGet, requestAjaxPost } from './ajax'

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
