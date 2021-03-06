import {inviteGet} from "../../../api/mine"
const config = require("../../../config.globle");
const utils = require("../../../utils/util");

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: config.BASE_URL,
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  initData() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    if (!app.globalData.hasLogin) {
      wx.hideLoading();
      this.selectComponent("#login").showPopup();
      return
    }
    inviteGet({
      scene: utils.createUrlParam({
        custSno: app.globalData.loginInfo.custSno,
        IsInvite: true
      }),
      page: 'pages/index/index'
    }).then(res => {
      wx.hideLoading();
      this.setData({
        imgUrl: res.data.object
      })
    })
  },

  loginCancelBtn() {
    wx.navigateBack({
      delta: 1
    })
  },

  loginCallback() {
    this.initData()
  },

  savePosterBtn() {
    if (!this.data.imgUrl) return;
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    wx.getImageInfo({
      src: that.data.imgUrl,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success() {
            wx.hideLoading();
            wx.showToast({
              title: '保存成功！',
              icon: 'none',
              duration: 1000
            });
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
});