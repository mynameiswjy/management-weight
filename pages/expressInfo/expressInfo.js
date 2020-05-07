import {expressFind} from '../../api/address'
const app = getApp();

Page({

  data: {
    expressData: null,
    IsEmptyPage: false
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    expressFind({
      "expressBill": options.expressBill,
      "sno": options.sno,
      custSno: app.globalData.loginInfo.custSno
    }).then((res) => {
      wx.hideLoading();
      if (res.data.code === 200) {
        if (res.data.object.jdOrderTrack.orderTrack.length) {
          this.setData({
            expressData: res.data.object
          })
        } else {
          this.setData({
            IsEmptyPage: true
          })
        }
      }
    })
  },

  onShow: function () {

  },

  copyBtn() {
    wx.setClipboardData({
      data: this.data.expressData.shippingSno,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
      }
    })
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})