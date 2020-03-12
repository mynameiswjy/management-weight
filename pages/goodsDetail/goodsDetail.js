const app = getApp();

Page({

  data: {
    coe: 2,
    MenuButton: null,
    scrollTop: 0
  },

  onLoad: function (options) {
    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
    const MenuButton = wx.getMenuButtonBoundingClientRect();
    const coe = 750 / windowWidth;
    this.setData({
      coe: coe,
      MenuButtonTop: Math.ceil(MenuButton.top * coe),
      navHeight: Math.ceil((MenuButton.height + MenuButton.top * 2 - statusBarHeight + 3) * coe)
    });
  },

  onShow: function () {

  },

  onPageScroll(e) {
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShareAppMessage: function () {

  }
})