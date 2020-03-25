const config = require("../config.globle");
const host = config.BASE_URL;

export function requestAjaxGet(url, data = {}, cb, header = {}, err) {
  const head = header ? header : {
    'content-type': 'onapplication/js' // 默认值
  };
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
  const head = header ? header : {
    'content-type': 'onapplication/js' // 默认值
  };
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