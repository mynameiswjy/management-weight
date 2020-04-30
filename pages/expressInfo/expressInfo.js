import {expressFind} from '../../api/address'
const app = getApp();

Page({

  data: {
    expressData: null
  },

  onLoad: function (options) {
    expressFind({
      "expressBill":"773033554381865",
      "sno":"4274707660389253134",
      "custSno":"80691038527"
    }).then((res) => {
      if (res.data.code === 200) {
        this.setData({
          expressData: res.data.object
        })
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