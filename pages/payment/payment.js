import {oderFind, paymentMoney, paymentList} from '../../api/orders'
const app = getApp();

Page({

  data: {
    paymentRecord: null,
    accountAmount: 0
  },

  onLoad: function (options) {
    oderFind({}).then((res) => {
      console.log(res);
      this.setData({
        accountAmount: res.data.object.accountAmount
      })
    });
    paymentList().then((res) => {
      this.setData({
        paymentRecord: res.data.object
      })
    })
  },

  onShow: function () {

  },

  paymentBtn() {
    return;
    paymentMoney({}).then((res) => {
      console.log(res);
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