import {search} from "../../api/index"
const app = getApp();
const config = require("../../config.globle");

Page({

  data: {
    searchVal: '',
    historyList: [],
    pageIndex: 1,
    IsEmpty: false,
    searchData: false
  },

  onLoad: function (options) {
    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
    const MenuButton = wx.getMenuButtonBoundingClientRect();
    const coe = 750 / windowWidth;
    wx.hideShareMenu();
    this.setData({
      MenuButtonTop: Math.ceil(MenuButton.top * coe) + 5,
      navHeight: Math.ceil((MenuButton.height + MenuButton.top * 2 - statusBarHeight + 3) * coe),
      statusBarHeight: Math.ceil(statusBarHeight * coe),
      windowHeight: Math.ceil(windowHeight * coe) * 2,
      historyList: wx.getStorageSync(config.SearchHistory).slice(0, 9) || []
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
      searchVal: '',
      searchData: ''
    })
  },

  backBtn() {
    wx.navigateBack({
      delta: 1
    })
  },

  searchBtn(e) {
    wx.showLoading({
      title: '加载中',
    });
    search({
      keyword: e.detail.value,
      pageSize: 10,
      page: this.data.pageIndex
    }).then((res) => {
      wx.hideLoading();
      this.data.historyList.unshift(this.data.searchVal);
      if (res.data.code === 200) {
        const Data = res.data.object;
        if (Data.length) {
          this.setData({
            searchData: Data,
            historyList: this.data.historyList,
            IsEmpty: false
          }, () => {
            this.selectComponent("#goodsListTemp").reqData(Data)
          });
        } else {
          this.setData({
            IsEmpty: true,
            historyList: this.data.historyList,
          })
        }
      } else {
        this.setData({
          IsEmpty: true,
          historyList: this.data.historyList,
        })
      }

    })
  },

  deleteHistory() {
    const that = this;
    wx.showModal({
      content: '确定删除全部历史记录？',
      success (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: config.SearchHistory,
            success: function(res) {
              that.setData({
                historyList: []
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  onHide: function () {
    const that = this;
    wx.setStorage({
      key: config.SearchHistory,
      data: that.data.historyList
    });
  },

  onUnload: function () {
    const that = this;
    wx.setStorage({
      key: config.SearchHistory,
      data: that.data.historyList
    });
  },

  onPullDownRefresh: function () {

  },

  onShareAppMessage: function () {

  }
});