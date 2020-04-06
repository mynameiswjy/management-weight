import {login} from "../../api/index"
const config = require('../../config.globle');
const app = getApp();

Page({

  data: {
    imgUrl: config.BASE_URL,
    hasLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.loginInfo);
    this.setData({
      userInfo: {
        hasLogin: app.globalData.loginInfo.hasLogin,
        NickName: app.globalData.loginInfo.phoneNo
      },
    })
  },

  withdrawBtn() {
    wx.requestPayment({
      nonceStr: 'eTbQRtR0pojH66z2',
      package: 'prepay_id=wx0612502995170960fb1b2d561676667800',
      paySign: 'EBC512761D30F6C60A26BFDD7F8DF021',
      signType: 'MD5',
      timeStamp: '1586148629',
      success(e) {
        console.log(e);
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  onShow: function () {

  },


  getPhoneNumber(event) {
    const that = this;
    const target = event.detail;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success(e) {
        login({
          code: e.code,
          encryptedData: target.encryptedData,
          iv: target.iv
        }).then((res) => {
          wx.hideLoading();
          if (res.data.code === 200) {
            const data = res.data.object;
            if (data.token) {
              app.globalData.loginInfo.hasLogin = true;
              that.setData({
                userInfo: {
                  hasLogin: true,
                  NickName: data.phoneNo
                },
              })
            }
            app.syncLoginInfo(data)
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
          wx.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000
          })
        })
      }
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  onShareAppMessage: function () {

  }
})