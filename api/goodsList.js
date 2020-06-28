import { requestAjaxGet, requestAjaxPost } from './ajax'

// 添加购物车
export function similarGoods (data) {
  const url = '/shop/applet/goods/similar/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}