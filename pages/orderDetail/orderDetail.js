import {orderDetail} from '../../api/orders'
const app = getApp();

Page({

  data: {
    orderData: null
  },

  onLoad: function (options) {
    orderDetail({
      sno: options.sno,
      custSno: app.globalData.loginInfo.custSno
    }).then((res) => {
      this.setData({
        orderData: res.data.object,
        cseInfoBean: res.data.object.cseInfoBean
      })
    })
  },

  copyBtn(e) {
    const {sno} = e.currentTarget.dataset;
    wx.setClipboardData({
      data: sno,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
      }
    })
  },

  onShow: function () {

  },

  onShareAppMessage: function () {

  }
});