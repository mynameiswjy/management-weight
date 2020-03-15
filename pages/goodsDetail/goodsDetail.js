const app = getApp();
const config = require('../../config.globle');

Page({

  data: {
    imgUrl: config.BASE_URL,
    coe: 2,
    MenuButton: null,
    scrollTop: 0,
    statusBarHeight: 0,
    navList: [
      {name: '商品'},
      {name: '评价'},
      {name: '详情'},
      {name: '推荐'}
    ],
    navIdx: 0,
    grodCoe: 0,
    IsShare: 0,
    bannerHei: 0,
    bannerList: [
      {img: 'http://m.360buyimg.com/mobilecms/s750x750_jfs/t1/107089/10/13905/251177/5e60d902Edb55f975/fafbe62a2ef82f59.jpg!q80.dpg.png'},
      {img: 'http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/102801/30/146/374179/5da80a5aE3de865e2/b3a3b05ca10cc363.jpg!q70.dpg.png'},
      {img: 'http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/48645/21/13561/74696/5da80a59E6de2b117/9fa345567bd57231.jpg!q70.dpg.png'},
    ],
    detailsImg: [
      '//img13.360buyimg.com/cms/jfs/t1/88159/7/12016/182150/5e427ff6Ebdc11470/aa39e08c4514c1f2.jpg!q70.dpg.png',
      '//img12.360buyimg.com/cms/jfs/t1/64584/38/9901/503898/5d77fbc2E4d7a864c/7b2caae267ead5f7.jpg!q70.dpg.png',
      '//img13.360buyimg.com/cms/jfs/t1/64856/12/9871/893638/5d77fbc2E5e11abbc/83da552181607fe5.jpg!q70.dpg.png',
    ]
  },

  onLoad: function (options) {
    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
    const MenuButton = wx.getMenuButtonBoundingClientRect();
    const coe = 750 / windowWidth;
    this.setData({
      coe: coe,
      MenuButtonTop: Math.ceil(MenuButton.top * coe),
      navHeight: Math.ceil((MenuButton.height + MenuButton.top * 2 - statusBarHeight + 3) * coe),
      statusBarHeight: statusBarHeight * coe,
      options
    });
  },

  onShow: function () {

  },

  selectTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      navIdx: index,
      intoView: 'intoView' + (index + 1)
    })
  },

  onPageScroll(e) {

  },

  backBtn() {
    if (this.data.options.IsShare) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  bindscroll(e) {
    const scrollTop = e.detail.scrollTop;
    this.setData({
      grodCoe: (scrollTop / 110 > 1 ? 1 : scrollTop / 110).toFixed(1)
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShareAppMessage: function () {

  }
})