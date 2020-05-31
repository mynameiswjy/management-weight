
import {createOrder, PaySign, recommendGoods, putShare} from "../../api/index"
import {addrDefaulted} from "../../api/address"
import {tmplIds, reqMessageStatus} from "../../api/comment";
const utils = require('../../utils/util');
const app = getApp();

Page({
  data: {
    orderInfo: null,
    defaultAddData: null,
    isShowAddr: false,
    options: null,
    successPay: false,
    IsRefresh: false,
    PayNum: 0,
    pageIdx: 1,
    isEnd: false,
    tmplIds: null
  },

  onLoad: function (options) {
    if (app.globalData.userSelectInfo.length) {
      this.data.userSelectInfo = app.globalData.userSelectInfo;
      app.globalData.userSelectInfo = null;
    }
    this.data.options = options;
    if (options.successPay) {
      this.setData({
        successPay: options.successPay,
        PayNum: options.PayNum
      })
    } else {
      this.orderData()
    }
    if (this.data.successPay) {
      this.goodsList()
    }
    tmplIds().then((res) => {
      if (res.data.code) {
        this.setData({
          tmplIds: res.data.object
        })
      }
    })
  },

  onShow: function () {
    if (this.data.IsRefresh) {
      this.initData(this.data.defaultAddData)
    }
  },

  bindaddress(e) {
    console.log(e);
  },

  modifiyAddr() {
    this.data.IsRefresh = true;
    wx.navigateTo({
      url: '/pages/addressList/addressList?from=order'
    })
  },

  orderData() {
    Promise.all([this.addrDefaultedData()]).then((addr) => {
      this.initData(addr[0])
    })
  },

  initData(addr) {
    wx.showLoading({
      title: '加载中',
    });
    createOrder({
      custSno: app.globalData.loginInfo.custSno,
      cseInfoSno: addr.sno,
      goodsDetails: this.data.userSelectInfo
    }).then((res) => {
      if (res.data.code === 200) {
        this.setData({
          orderInfo: res.data.object
        }, () => {
          wx.hideLoading()
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '所选商品型号不存在，请更换！',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    })
  },

  addrDefaultedData() {
    return new Promise((resolve, reject) => {
      addrDefaulted({custSno: app.globalData.loginInfo.custSno}).then((res) => {
        if (res.data.code === 200) {
          this.setData({
            defaultAddData: res.data.object,
          });
          resolve(res.data.object)
        } else {
          this.setData({
            isShowAddr: true
          })
        }
      });
    })
  },

  submit() {
    if (!this.data.defaultAddData) {
      wx.showToast({
        title: '请填写收货地址',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    }
    const options = this.data.options;
    if (options.shareCustSno) {
      const userSelectInfo = this.data.userSelectInfo[0];
      putShare({
        goodsSno: userSelectInfo.goodsSno,
        specsGoodsSno: userSelectInfo.specsGoodsSno,
        shareCustSno: options.shareCustSno
      }).then((res) => {
        if (res.data.code === 200) {
          this.pay()
        } else {
          wx.showToast({
            title: '网络错误，请重新下单',
            icon: 'none',
            duration: 1000,
            mask: true
          });
        }
      })
    } else {
      this.pay()
    }

  },

  pay() {
    const that = this;
    PaySign({
      orderSno: this.data.orderInfo.orderSno,
      payChannel: 'WX',
      custSno: app.globalData.loginInfo.custSno
    }).then((res) => {
      const data = res.data.object;
      wx.requestPayment({
        timeStamp: data.timestamp,
        nonceStr: data.nonceStr,
        package: 'prepay_id=' + data.prepayId,
        signType: 'MD5',
        paySign: data.sign,
        success(e) {
          console.log(e);
          if (e.errMsg === "requestPayment:ok") {
            that.setData({
              successPay: true
            });
            utils.requestSubscribeMessage(that.data.tmplIds, (data) => {
              reqMessageStatus(data)
            });
            that.goodsList()
          }
        },
        fail(err) {
          console.log(err);
        }
      })
    })
  },

  AnotherOrder() {//goodsSno pages/goodsDetail/goodsDetail
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  goodsList() {
    if (this.data.isEnd) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return
    }
    recommendGoods({
      page: this.data.pageIdx,
      pageSize: 10
    }).then((res) => {
      if (res.data.code === 200) {
        if (res.data.object.length) {
          this.data.pageIdx++;
          this.selectComponent('#goodsListTemp').reqData(res.data.object);
        } else {
          this.setData({
            isEnd: true
          })
        }
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000,
          mask: true
        });
      }
    })
  },
  checkDetail() {
    wx.navigateTo({
      url: '/pages/order/order?navIdx=1'
    })
  },

  addAddress() {
    this.selectComponent('#addAddress').showTemp()
  },

  onReachBottom() {
    if (this.data.successPay) {
      this.goodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})