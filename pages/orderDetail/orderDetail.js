import {deleteOrder, finished, orderDetail, orderCancel} from '../../api/orders'
import {PaySign} from "../../api/index";
const app = getApp();

Page({

  data: {
    orderData: null,
    options: null
  },

  onLoad: function (options) {
    this.data.options = options;
    this.initData()
  },

  initData() {
    wx.showLoading({
      title: '加载中',
    });
    orderDetail({
      sno: this.data.options.sno,
      custSno: app.globalData.loginInfo.custSno
    }).then((res) => {
      wx.hideLoading();
      if (res.data.code !== 200) {
        wx.showToast({
          title: '订单不存在',
          icon: 'none',
          duration: 2000
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000);
        return
      }
      this.setData({
        orderData: res.data.object,
        cseInfoBean: res.data.object.cseInfoBean
      })
    })
  },

  cancelOrder() {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确认取消订单吗',
      success (res) {
        if (res.confirm) {
          orderCancel({
            sno: that.data.orderData.sno
          }).then((res) => {
            that.initData()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 复制
  copyBtn(e) {
    const {sno} = e.currentTarget.dataset;
    wx.setClipboardData({
      data: sno,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
      }
    })
  },

  onShow: function () {

  },

  deleteOrder() {
    const {sno} = this.data.orderData;
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success (res) {
        if (res.confirm) {
          deleteOrder({
            sno: sno,
            custSno: app.globalData.loginInfo.custSno
          }).then((res) => {
            if (res.data.code === 200) {
              const pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];   //上一页
              prevPage.setData({
                IsRefresh: true
              });
              wx.navigateBack({
                delta: 1
              });
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  payment() {
    const {orderSno, payAmount} = this.data.orderData;
    PaySign({
      orderSno: orderSno,
      payChannel: 'WX',
      custSno: app.globalData.loginInfo.custSno
    }).then((res) => {
      const data = res.data.object;
      if (res.data.code !== 200) {
        wx.showToast({
          title: res.data.message
        });
        return
      }
      wx.requestPayment({
        timeStamp: data.timestamp,
        nonceStr: data.nonceStr,
        package: 'prepay_id=' + data.prepayId,
        signType: 'MD5',
        paySign: data.sign,
        success(e) {
          if (e.errMsg === "requestPayment:ok") {
            wx.redirectTo({
              url: `/pages/createOrder/creadeOrder?successPay=true&PayNum=${payAmount}`
            })
          }
        },
        fail(err) {
          console.log(err);
        }
      })
    })
  },

  checkLogis(e) {
    const {expressBill, sno} = this.data.orderData;
    wx.navigateTo({
      url: `/pages/expressInfo/expressInfo?expressBill=${expressBill}&sno=${sno}`
    })
  },

  //确认收货
  confirmGoodsBtn() {
    const that = this;
    wx.showModal({
      title: '确认收货',
      content: '确认收到该订单的商品？',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后',
          });
          finished({
            sno: that.data.orderData.sno,
            custSno: app.globalData.loginInfo.custSno
          }).then((res) => {
            wx.hideLoading();
            if (res.data.code === 200) {
              wx.showToast({
                title: '确认收货成功',
                icon: 'none',
                duration: 1000,
                success(e) {
                  that.initData();
                }
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  buyAgain() {
    wx.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?goodsSno=${this.data.orderData.items[0].goodsSno}`
    })
  },

  remindBtn() {
    wx.showToast({
      title: '提醒商家发货成功',
      icon: 'success',
      duration: 2000
    })
  },

  onShareAppMessage: function () {

  }
});