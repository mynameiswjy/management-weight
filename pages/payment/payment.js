import {oderFind, paymentMoney, paymentList} from '../../api/orders'
import {reqMessageStatus, tmplIds} from "../../api/comment";
const app = getApp();

Page({

  data: {
    paymentRecord: null,
    accountAmount: 0
  },

  onLoad: function (options) {
    oderFind({}).then((res) => {
      this.setData({
        accountAmount: res.data.object.accountAmount,
        occurAmount: res.data.object.occurAmount
      })
    });
    paymentList().then((res) => {
      this.setData({
        paymentRecord: res.data.object
      })
    });

    tmplIds().then((res) => {
      if (res.data.code) {
        this.setData({
          tmplIds: res.data.object
        })
      }
    })
  },

  onShow: function () {

  },

  paymentBtn() {
    paymentMoney({}).then((res) => {
      if (res.data.code === 200) {
        wx.showToast({
          title: '奖励金领取成功',
          duration: 2000,
          mask: true
        })
        utils.requestSubscribeMessage(that.data.tmplIds, (data) => {
          reqMessageStatus(data)
        });
      } else {
        wx.showToast({
          title: res.data.message,
          duration: 2000,
          icon: 'none',
          mask: true
        })
      }

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})