import {login} from "../../api/index"
import {oderFind} from "../../api/orders";
import {UserGrade} from "../../api/comment";
const config = require('../../config.globle');
const app = getApp();

Page({

  data: {
    imgUrl: config.BASE_URL,
    hasLogin: false,
    baseUrl: config.BASE_URL,
    grade: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.UserGrade()
  },

  UserGrade() {
    UserGrade({}).then((res) => {
      const data = res.data.object;
      let grade;
      if (data.rank === '1') {
        grade = '初级'
      } else if (data.rank === '2') {
        grade = '中级'
      } else {
        grade = '高级'
      }
      this.setData({
        gradeName: grade,
        grade: data.rank
      })
    })
  },

  withdrawBtn() {
    wx.navigateTo({
      url: `/pages/payment/payment`
    })
  },

  onShow: function () {
    if (app.globalData.loginInfo.hasLogin) {
      oderFind({}).then((res) => {
        this.setData({
          accountAmount: res.data.object.accountAmount
        })
      });
    }

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

  addWechat() {
    this.selectComponent("#maskTemp").showTemp()
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