import {logout} from "../../api/index";
const config = require("../../config.globle");

const app = getApp();

Page({

  data: {
    userInfo: null,
    phoneNum: ''
  },

  onLoad: function (options) {
    this.setData({
      userInfo: {
        NickName: app.globalData.userInfo.nickName ? app.globalData.userInfo.nickName : app.globalData.loginInfo.phoneNo,
        avatarUrl: app.globalData.userInfo.avatarUrl ? app.globalData.userInfo.avatarUrl : '',
        phoneNum: app.globalData.loginInfo.phoneNo
      },
    })

    this.selectComponent("#maskTemp").showTemp()
  },

  onShow: function () {

  },

  logoutBtn() {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定退出吗？',
      success (res) {
        if (res.confirm) {
          logout({}).then((res) => {
            app.globalData.loginInfo.hasLogin = false;
            wx.removeStorage({
              key: config.LOGININFO,
              success: function(res) {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  shoppingAddr() {
    wx.navigateTo({
      url: '/pages/addressList/addressList'
    })
  },

  onShareAppMessage: function () {

  }
});