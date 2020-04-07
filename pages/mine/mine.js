import {login, logout} from "../../api/index"
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
      hasLogin: app.globalData.loginInfo.hasLogin,
      userInfo: {
        NickName: app.globalData.userInfo.nickName ? app.globalData.userInfo.nickName : app.globalData.loginInfo.phoneNo,
        avatarUrl: app.globalData.userInfo.avatarUrl ? app.globalData.userInfo.avatarUrl : ''
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

  getCode() {
    return new Promise((resolve, reject) => {
        wx.login({
          success(res) {
            resolve(res.code)
          },
          fail(err) {
            reject(err)
          }
        })
    })
  },

  getPhoneNumber(event) {
    const that = this;
    const target = event.detail;
    wx.showLoading({
      title: '加载中',
    });
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
                hasLogin: true,
                userInfo: {
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

  getUserInfo(e) {
    const target = e.detail;
    console.log(e);
    if (target.errMsg === 'getUserInfo:ok') {
      /*let data = {
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELeFMWLr9vD1jLNYJm3BvQoIqFiacibEReCbdDNppzNgbp3zPNHTwbVB2hiaboj2eqApCicZmKrNFIJsQ/132",
        city: "Changping",
        country: "China",
        gender: 1,
        language: "zh_CN",
        nickName: "王佳运",
        province: "Beijing"
      }*/
      this.setData({
        userInfo: {
          NickName: target.userInfo.nickName,
          avatarUrl: target.userInfo.avatarUrl
        }
      });
      app.updateUserInfo(target.userInfo)
    } else {
      wx.showToast({
        title: '由于您拒绝了授权，头像信息获取失败',
        icon: 'none',
        duration: 2000
      });
      wx.hideLoading();
    }
  },

  logout() {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定退出吗？',
      success (res) {
        if (res.confirm) {
          logout({}).then((res) => {
            app.globalData.loginInfo.hasLogin = false;
            that.setData({
              hasLogin: false
            }, () => {
              wx.removeStorage({
                key: config.LOGININFO,
                success: function(res) {
                  console.log(res.data)
                }
              })
            })
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  onShareAppMessage: function () {

  }
})