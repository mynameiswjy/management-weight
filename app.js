const config = require("./config.globle");
import {getUserInfo} from "./api/index"

App({
  globalData: {
    SystemInfo: null,
    loginInfo: null,
    userInfo: {
      avatar: '',
      userName: ''
    },
    IsRefresh: false,
    userSelectInfo: null,
    iphoneX: false,
    hasLogin: false
  },
  onLaunch () {
    const that = this;
    const SystemInfo = wx.getSystemInfoSync();
    this.globalData.SystemInfo = SystemInfo;
    const systemInfo = SystemInfo.system.substring(0, 3);
    const iOS = systemInfo === 'iOS';
    const above = SystemInfo.safeArea.top;
    if (above > 40 && iOS) {
      that.globalData.iphoneX = true;
    }

    try {
      const loginInfo = wx.getStorageSync(config.LOGININFO);
      const userInfo = wx.getStorageSync(config.UserInfo);
      if (loginInfo) {
        if (loginInfo.token && loginInfo.custSno) {
          this.globalData.hasLogin = true;
          this.globalData.loginInfo = loginInfo;
        } else {
          this.globalData.hasLogin = false;
        }
      } else {
        that.globalData.IsRefresh = true;
        wx.login({
          success(e) {
            getUserInfo({code: e.code}).then((res) => {
              const data = res.data.object;
              if (res.data.code === 200 && data.loginStatus != 'SIGNOUT') {
                that.syncLoginInfo(data);
              } else {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                  duration: 2000
                })
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
    const loginInfo = {custSno, phoneNo, token};
    this.globalData.loginInfo = loginInfo;
    this.globalData.hasLogin = true;
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
    console.log('存储成功')
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