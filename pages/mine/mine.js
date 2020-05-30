import {login} from "../../api/index"
import {oderFind} from "../../api/orders";
import {UserGrade} from "../../api/comment";
const config = require('../../config.globle');
const app = getApp();

Page({

  data: {
    imgUrl: config.BASE_URL,
    hasLogin: false,
    baseUrl: config.BASE_URL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.UserGrade()
  },

  UserGrade() {
    wx.login({
      success(res) {
        UserGrade({code: res.code}).then((e) => {
          console.log(e);
        })
      }
    })
  },

  withdrawBtn() {
    wx.navigateTo({
      url: `/pages/payment/payment`
    })
  },

  onShow: function () {
    oderFind({}).then((res) => {
      this.setData({
        accountAmount: res.data.object.accountAmount
      })
    });
    console.log(app.globalData.loginInfo);
    if (app.globalData.IsRefresh) {
      app.loginCallback = () => {
        this.setData({
          hasLogin: app.globalData.loginInfo.hasLogin,
          userInfo: {
            NickName: app.globalData.userInfo.nickName ? app.globalData.userInfo.nickName : app.globalData.loginInfo.phoneNo,
            avatarUrl: app.globalData.userInfo.avatarUrl ? app.globalData.userInfo.avatarUrl : ''
          },
        })
      }
    } else {
      this.setData({
        hasLogin: app.globalData.loginInfo.hasLogin,
        userInfo: {
          NickName: app.globalData.userInfo.nickName ? app.globalData.userInfo.nickName : app.globalData.loginInfo.phoneNo,
          avatarUrl: app.globalData.userInfo.avatarUrl ? app.globalData.userInfo.avatarUrl : ''
        },
      })
    }
  },

  checkDetail(e) {
    const idx = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: `/pages/order/order?navIdx=${idx}`
    })
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
    if (target.errMsg === "getPhoneNumber:ok") {
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
    } else {
      wx.hideLoading();
      wx.showToast({
        title: '您拒绝了授权，无法为您登录',
        icon: 'none',
        duration: 2000
      })
    };
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
      }, () => {
        wx.showToast({
          title: '资料更新成功',
          icon: 'none',
          duration: 2000
        });
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
    wx.navigateTo({
      url: '/pages/setting/setting'
    })
  },

  appRule() {
    wx.navigateTo({
      url: '/sundryPackage/pages/rule/rule'
    })
  },

  FAQ() {
    wx.navigateTo({
      url: '/sundryPackage/pages/FAQ/FAQ'
    })
  },

  about() {
    wx.navigateTo({
      url: '/sundryPackage/pages/about/about'
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