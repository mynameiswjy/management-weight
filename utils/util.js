function createUrlParam(params) {
  let scene = '';
  let baseParams = {
    "IsShare": 1,
    "isCode": 1
  }

  let options = Object.assign(baseParams, params)

  for (var key in options) {
    scene += options[key] + ','
  }
  return scene
}

function parseUrlParam(options, data = []) {
  //文件引用不要改位置 会引起错误
  if (options.scene) {
    const scene = decodeURIComponent(options.scene).split(',');
    let params = {};
    let key = [
      "IsShare",
      "isCode"
    ]

    key = key.concat(data);

    for (let i = 0; i < scene.length - 1; i++) {
      params[key[i]] = scene[i]
    }

    return params
  }
  return null
}

function getMinappCodeImage(page, app, params = {}) {

  let url = config.BASE_URL + '/api/checkin/GetMinAppCodeImage';
  const scene = createUrlParam(app, params);

  const data = {
    scene: scene,
    packageId: 1
  }
  url = `${url}?scene=${scene}&page=${page}&packageId=${data.packageId}`;
  return url
}

function saveMinappToPhoto(tempFilePath, cb) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: tempFilePath,
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success(res) {
            resolve(res);
            wx.hideLoading()
            cb();
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
          },
          fail(err) {
            reject(err)
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function requestSubscribeMessage(tmplIds, cb, err) {
  if (!tmplIds.length) return console.log('tmplIds是空的', tmplIds);

  /*模板消息start*/
  wx.requestSubscribeMessage({
    tmplIds: tmplIds,
    success(e) {
      if (e.errMsg === 'requestSubscribeMessage:ok') {
        let State;
        const data = tmplIds.map((item) => {
          let obj = {};
          if (e[item] === 'accept') {
            State = 1
          } else if (e[item] === 'reject') {
            State = 0
          } else if (e[item] === 'ban') {
            State = -1
          }
          obj.State = State;
          obj.WxTemplateId = item;
          return obj
        });

        if (cb && data.length) {
          cb(data)
        }
      }
    },
    fail(error) {
      if (err) {
        err(error)
      }
    }
  });
  /*模板消息end*/
}

module.exports = {
  createUrlParam,
  parseUrlParam,
  getMinappCodeImage,
  saveMinappToPhoto,
  requestSubscribeMessage
};
