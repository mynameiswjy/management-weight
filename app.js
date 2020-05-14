const config = require("./config.globle");
import {getUserInfo} from "./api/index"

App({
  globalData: {
    SystemInfo: null,
    loginInfo: {
      hasLogin: false
    },
    userInfo: {
      avatar: '',
      userName: ''
    },
    IsRefresh: false,
    userSelectInfo: null
  },
  onLaunch () {
    const that = this;
    this.globalData.SystemInfo = wx.getSystemInfoSync();
    try {
      const loginInfo = wx.getStorageSync(config.LOGININFO);
      const userInfo = wx.getStorageSync(config.UserInfo);
      if (loginInfo) {
        let data = {};
        if (loginInfo.token) {
          data = {hasLogin: true}
        } else {
          data = {hasLogin: false}
        }
        this.globalData.loginInfo = Object.assign({}, data, loginInfo)
      } else {
        that.globalData.IsRefresh = true;
        wx.login({
          success(e) {
            getUserInfo({code: e.code}).then((res) => {
              const data = res.data.object;
              if (res.data.code === 200 && data.loginStatus != 'SIGNOUT') {
                that.syncLoginInfo(data);
              }
            })
          }
        });
      }
      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
    } catch (e) {
      /*wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        duration: 2000
      })*/
    }
  },

  syncLoginInfo(data = null) {
    if (!data) return;
    const that = this;
    const {custSno, phoneNo, token} = data;
    const loginInfo = {custSno, phoneNo, token, hasLogin: true};
    this.globalData.loginInfo = loginInfo;
    wx.setStorage({
      key: config.LOGININFO,
      data: loginInfo,
      success(e) {
        if (that.globalData.IsRefresh && that.loginCallback) {
          that.loginCallback();
        }
        that.globalData.IsRefresh = false;
      }
    });
    wx.showToast({
      title: '存储成功',
      icon: 'none',
      duration: 2000
    })
  },
  updateUserInfo(data) {
    if (!data) return;
    const {avatarUrl, nickName, gender} = data;
    const userInfo = {
      avatarUrl,
      nickName,
      gender
    };
    this.globalData.userInfo = userInfo;
    wx.setStorage({
      key: config.UserInfo,
      data: userInfo
    });
  }
});