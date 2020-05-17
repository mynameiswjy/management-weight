import {addrList, setDefault, deleteAddr, wechatAddr} from "../../api/address"
const app = getApp();

Page({

  data: {
    addrList: null,
    isEmpty: false
  },

  onLoad: function (options) {
    this.initData()
  },

  onShow: function () {

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
              that.initData()
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
    let data = {
      cityName: "北京市",
      countyName: "海淀区",
      detailInfo: "中关村南大街甲12号寰太大厦",
      errMsg: "chooseAddress:ok",
      nationalCode: "110108",
      postalCode: "100089",
      provinceName: "北京市",
      telNumber: "15831683109",
      userName: "王佳运",
    };
    const that = this;
    wx.chooseAddress({
      success(res) {
        if (res.errMsg === "chooseAddress:ok") {
          console.log(res);
          wechatAddr(Object.assign({}, res, {
            town: 0
          })).then((res) => {
            if (res.data.code === 200) {
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 1000
              });
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