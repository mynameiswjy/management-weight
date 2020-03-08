App({
  globalData: {
    SystemInfo: null
  },
  onLaunch () {
    this.globalData.SystemInfo = wx.getSystemInfoSync()
  }
})