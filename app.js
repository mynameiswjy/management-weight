App({
  globalData: {
    SystemInfo: null,
    loginInfo: {
      hasLogin: false
    },
    userInfo: {
      avatar: '',
      userName: ''
    }
  },
  onLaunch () {
    this.globalData.SystemInfo = wx.getSystemInfoSync();
    try {
      const value = wx.getStorageSync('loginInfo');
      if (value) {
        const loginInfo = {
          hasLogin: value.token ? true : false
        };
        this.globalData.loginInfo = Object.assign({}, value, loginInfo)
      }
    } catch (e) {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        duration: 2000
      })
    }
  },
  syncLoginInfo(data = null) {
    if (!data) return;
    const {custSno, phoneNo, token} = data;
    const loginInfo = {custSno, phoneNo, token};
    this.globalData.loginInfo = loginInfo;
    wx.setStorage({
      key: "loginInfo",
      data: loginInfo
    })
    wx.showToast({
      title: '登录成功',
      icon: 'none',
      duration: 2000
    })
  }
});