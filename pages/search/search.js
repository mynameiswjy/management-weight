
const app = getApp();

Page({

  data: {
    searchVal: '',
    historyList: ['毛衣', '皮大衣打样', '皮大衣样打毛究竟是', '的解放军看是']
  },

  onLoad: function (options) {
    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
    const MenuButton = wx.getMenuButtonBoundingClientRect();
    const coe = 750 / windowWidth;
    this.setData({
      MenuButtonTop: Math.ceil(MenuButton.top * coe) + 5,
      navHeight: Math.ceil((MenuButton.height + MenuButton.top * 2 - statusBarHeight + 3) * coe),
      statusBarHeight: Math.ceil(statusBarHeight * coe)
    });
  },

  onShow: function () {

  },

  bindinput(e) {
    this.setData({
      searchVal: e.detail.value
    })
  },

  emptyVal() {
    this.setData({
      searchVal: ''
    })
  },

  backBtn() {
    wx.navigateBack({
      delta: 1
    })
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onShareAppMessage: function () {

  }
});