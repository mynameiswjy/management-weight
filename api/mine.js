import { requestAjaxGet, requestAjaxPost } from './ajax'

export function manageGet (data) {
    const url = '/shop/manage/get.do';
    return new Promise((resolve, reject) => {
        requestAjaxPost(url, data, (res) => {
            resolve(res)
        })
    })
}

export function courseNewGet (data) {
    const url = '/shop/course/new/get.do';
    return new Promise((resolve, reject) => {
        requestAjaxPost(url, data, (res) => {
            resolve(res)
        })
    })
}