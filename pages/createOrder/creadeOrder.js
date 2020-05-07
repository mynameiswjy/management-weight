
import {createOrder, PaySign, recommendGoods} from "../../api/index"
import {addrDefaulted} from "../../api/address"
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
    isEnd: false
  },

  onLoad: function (options) {
    this.options = options;
    if (options.successPay) {
      this.setData({
        successPay: options.successPay,
        PayNum: options.PayNum
      })
    } else {
      this.orderData(options)
    }
    this.goodsList()
  },

  onShow: function () {
    if (this.data.IsRefresh) {
      this.orderData(this.options)
    }
  },

  bindaddress(e) {
    console.log(e);
  },

  modifiyAddr() {
    this.data.IsRefresh = true;
    wx.navigateTo({
      url: '/pages/addressList/addressList'
    })
  },

  orderData(options) {
    wx.showLoading({
      title: '加载中',
    });
    Promise.all([this.addrDefaultedData()]).then((addr) => {
      createOrder({
        custSno: app.globalData.loginInfo.custSno,
        cseInfoSno: addr[0].sno,
        goodsDetails: [
          {
            goodsSno: options.goodsSno,
            specsGoodsSno: options.specsGoodsSno,
            quantity: options.quantity
          }
        ]
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
          if (errMsg === "requestPayment:ok") {
            that.setData({
              successPay: true
            })
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