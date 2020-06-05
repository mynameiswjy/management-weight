import {addrList, setDefault, deleteAddr, wechatAddr} from "../../api/address"
const app = getApp();

Page({
  data: {
    addrList: null,
    isEmpty: false,
    pageFrom: ''
  },

  onLoad: function (options) {
    this.setData({
      options
    });
    this.initData()
  },

  onShow: function () {

  },

  getSno(e) {
    if (this.data.options.from !== 'order') {
      return
    }
    const {item} = e.currentTarget.dataset;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      defaultAddData: item
    }, () => {
      wx.navigateBack({
        delta: 1
      })
    })
  },

  initData() {
    wx.showLoading({
      title: '加载中',
    });
    addrList({custSno: app.globalData.loginInfo.custSno}).then((res) => {
      if (res.data.code === 200) {
        this.setData({
          addrList: res.data.object,
          isEmpty: !res.data.object.length
        }, () => {
          wx.hideLoading()
        })
      }
    })
  },

  defaultAddr(e) {
    const {defaulted, sno} = e.currentTarget.dataset;
    if (defaulted) return;
    setDefault({sno: sno}).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        this.initData()
      }
    })

  },

  bindaddress() {
    this.initData()
  },

  closeTemp(e) {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success (res) {
        if (res.confirm) {
          deleteAddr({sno: e.currentTarget.dataset.sno}).then((res) => {
            if (res.data.code === 200) {
              that.initData();
              if (that.data.options.from === 'order') {
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];
                prevPage.setData({
                  IsAllRefresh: true,
                  defaultAddData: ''
                })
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  redactAddr(e) {
    this.selectComponent('#addAddress').showTemp(e.currentTarget.dataset.item)
  },

  manuallyAdd() {
    this.selectComponent('#addAddress').showTemp()
  },

  wechatAdd() {
    const that = this;
    wx.chooseAddress({
      success(res) {
        if (res.errMsg === "chooseAddress:ok") {
          console.log(res);
          wechatAddr({
            town: 0,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            provinceName: res.provinceName,
            telNumber: res.telNumber,
            userName: res.userName
          }).then((res) => {
            if (res.data.code === 200) {
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 1000
              });
              that.initData();
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1000
              });
            }
          })
        }
      }
    })
  },

  onShareAppMessage: function () {

  }
});