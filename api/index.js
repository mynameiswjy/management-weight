import { requestAjaxGet, requestAjaxPost } from './ajax'

export function homeIndex (data) {
  const url = '/shop/applet/home/index.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, (res) => {
      resolve(res)
    })
  })
}