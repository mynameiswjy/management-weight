const config = require("../config.globle");
const host = config.BASE_URL;

export function requestAjaxGet(url = '', data = null, cb, header = null, err) {
  const {globalData} = getApp();
  let head = {
    token: '',
    custSno: ''
  };
  if (globalData && globalData.loginInfo) {
    head = {
      token: globalData.loginInfo.token,
      custSno: globalData.loginInfo.custSno
    };
  }
  head = Object.assign({
    'content-type': 'application/json'
  }, head, header);
  wx.request({
    url: host + url,
    data: data,
    method: "GET",
    header: head,
    success(res) {
      if (cb) {
        cb(res)
      }
    },
    fail(error) {
      if (err) {
        err(error)
      }
    }
  })
}

export function requestAjaxPost(url = '', data = null, cb, header = null, err) {
  const app = getApp();
  let head = {
    token: '',
    custSno: ''
  };
  if (app && app.globalData && app.globalData.loginInfo) {
    head = {
      token: app.globalData.loginInfo.token,
      custSno: app.globalData.loginInfo.custSno
    };
  }
  head = Object.assign({
    'content-type': 'application/json',
  }, head, header);
  wx.request({
    url: host + url,
    data: data,
    method: "POST",
    header: head,
    success(res) {
      if (cb) {
        cb(res)
      }
    },
    fail(error) {
      if (err) {
        err(error)
      }
    }
  })
}