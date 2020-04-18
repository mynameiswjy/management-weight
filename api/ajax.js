const config = require("../config.globle");
const host = config.BASE_URL;
const {token, custSno} = wx.getStorageSync(config.LOGININFO);

export function requestAjaxGet(url, data = {}, cb, header = {}, err) {
  let head = {
    'content-type': 'application/json',
    token: token ? token : '',
    custSno: custSno ? custSno : ''
  };
  head = Object.assign({}, head, header);
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

export function requestAjaxPost(url, data={}, cb, header, err) {
  let head = {
    'content-type': 'application/json',
    token: token ? token : '',
    custSno: custSno ? custSno : ''
  };
  head = Object.assign({}, head, header);
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
      err(error)
    }
  })
}