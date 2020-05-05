import { requestAjaxGet, requestAjaxPost } from './ajax'

// 评论列表
export function discussList (data) {
  const url = '/shop/applet/discuss/list';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}


// 评论区图片上传
export function uploadImg (data) {
  const url = '/shop/applet/discuss/upload';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}

// 提交评论
export function saveDiscuss (data) {
  const url = '/shop/applet/discuss/save';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}