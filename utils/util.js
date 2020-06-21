function createUrlParam(params) {
  let scene = '';
  let baseParams = {
    "IsShare": 1
  }

  let options = Object.assign(baseParams, params)

  for (let key in options) {
    scene += options[key] + ','
  }
  return scene
}

function parseUrlParam(options, data = []) {
  //文件引用不要改位置 会引起错误
  if (options.scene) {
    const scene = decodeURIComponent(options.scene).split(',');
    let params = {};
    let key = ["IsShare"]

    key = key.concat(data);

    for (let i = 0; i < scene.length - 1; i++) {
      params[key[i]] = scene[i]
    }

    return params
  }
  return options
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

function saveMinappToPhoto(imgs, cb, idx) {
  let tempFilePath;
  if (!imgs.length) {
    wx.hideLoading();
    wx.showToast({
      title: '共计' + idx + '张图片保存成功',
      icon: 'none',
      duration: 1000
    });
    return false;
  } else {
    idx++;
    tempFilePath = imgs[0];
    imgs.splice(0, 1)
  }
  wx.getImageInfo({
    src: tempFilePath,
    success: function(res) {
      wx.saveImageToPhotosAlbum({
        filePath: res.path,
        success(res) {
          saveMinappToPhoto(imgs, cb, idx)
        },
        fail(err) {
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

function requestPayment(data) {
  wx.showLoading({
    title: '加载中',
  });
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: data.timestamp,
      nonceStr: data.nonceStr,
      package: 'prepay_id=' + data.prepayId,
      signType: 'MD5',
      paySign: data.sign,
      success(e) {
        wx.hideLoading();
        if (e.errMsg === "requestPayment:ok") {
          wx.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 1000,
            mask: true
          });
          resolve(e)
        } else {
          reject(e)
        }
      },
      fail(err) {
        wx.hideLoading();
        wx.showToast({
          title: '支付失败',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        reject(err)
      }
    })
  })
}

module.exports = {
  createUrlParam,
  parseUrlParam,
  getMinappCodeImage,
  saveMinappToPhoto,
  requestSubscribeMessage,
  requestPayment
};
