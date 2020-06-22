import { requestAjaxGet, requestAjaxPost } from './ajax'

export function manageGet (data) {
    const url = '/shop/manage/get.do';
    return new Promise((resolve, reject) => {
        requestAjaxPost(url, data, (res) => {
            resolve(res)
        })
    })
}

// 新手教程
export function courseNewGet (data) {
    const url = '/shop/course/new/get.do';
    return new Promise((resolve, reject) => {
        requestAjaxPost(url, data, (res) => {
            resolve(res)
        })
    })
}

// 邀请好友图片
export function inviteGet (data) {
    const url = '/shop/applet/qr/invite/get.do';
    return new Promise((resolve, reject) => {
        requestAjaxPost(url, data, (res) => {
            resolve(res)
        })
    })
}

// 邀请好友 信息保存
export function inviteSave (data) {
    const url = '/shop/applet/share/user/put.do';
    return new Promise((resolve, reject) => {
        requestAjaxPost(url, data, (res) => {
            resolve(res)
        })
    })
}
