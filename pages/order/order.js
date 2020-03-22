const app = getApp();

Page({

  data: {
    windowWidth: 750,
    navList: [
      {name: "全部"},
      {name: "待发货"},
      {name: "待付款"},
      {name: "待收货"},
      {name: "已完成"},
      {name: "已取消"}
    ],
    navIdx: 0
  },

  onLoad: function (options) {
    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
  },

  onShow: function () {

  },

  navTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      navIdx: index
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})