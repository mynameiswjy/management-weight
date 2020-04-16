
import {createOrder} from "../../api/index"
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    createOrder({
      custSno: app.globalData.loginInfo.custSno,
      cseInfoSno: '',
      goodsDetails: [
        {
          goodsSno: options.goodsSno,
          specsGoodsSno: options.specsGoodsSno,
          quantity: options.quantity
        }
      ]
    }).then((res) => {
      this.setData({
        orderInfo: res.data.object
      })
    })
  },

  onShow: function () {

  },

  bindaddress(e) {
    console.log(e);
  },

  addAddress() {
    this.selectComponent('#addAddress').showTemp()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})