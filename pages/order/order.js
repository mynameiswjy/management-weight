import { PaySign } from '../../api/index'
import { orderList, finished, deleteOrder} from '../../api/orders'
import {addCard} from "../../api/cart";
const app = getApp();

Page({

  data: {
    windowWidth: 750,
    navList: [// INIT待付款，PAID 代发货，SHIPPED 已发货，FINISHED 已完成，CANCEL 取消；
      {name: "全部", type: '', pageIdx: 1, isEnd: false},
      {name: "待发货", type: 'PAID', pageIdx: 1, isEnd: false},
      {name: "待付款", type: 'INIT', pageIdx: 1, isEnd: false},
      {name: "待收货", type: 'SHIPPED', pageIdx: 1, isEnd: false},
      {name: "已完成", type: 'FINISHED', pageIdx: 1, isEnd: false},
      {name: "已取消", type: 'CANCEL', pageIdx: 1, isEnd: false}
    ],
    navIdx: 0,
    AllOrderList: {
      allList: [],
      PAID: [],
      INIT: [],
      SHIPPED: [],
      FINISHED: [],
      CANCEL: [],
      IsEnd: false,
      IsRefresh: false // 订单列表发生变动把这个变为true
    },
    pageIdx: 1
  },

  onLoad: function (options) {
    if (!app.globalData.hasLogin) {
      this.selectComponent("#login").showPopup();
      return
    }

    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
    this.data.cos = 750 / windowWidth;
    if (options.navIdx) {
      this.setData({
        navIdx: Number(options.navIdx)
      })
    }
    this.setData({
      windowHeight: windowHeight * 375 / windowWidth * 2,
    });
    this.initData();
    wx.hideShareMenu()
  },

  onShow: function () {
    if (this.data.IsRefresh) {
      this.initData()
    }
  },

  initData() {
    const navIdx = this.data.navIdx;
    const IsRefresh = this.data.IsRefresh;
    const type = this.data.navList[navIdx].type;
    if (IsRefresh) {
      this.data.navList[navIdx].pageIdx = 1
    }
    if (!this.data.navList[navIdx].IsEnd || IsRefresh) {
      wx.showLoading({
        title: '加载中',
      });
      orderList({
        status: type,
        pageSize: 10,
        page: this.data.navList[navIdx].pageIdx,
        custSno: app.globalData.loginInfo.custSno
      }).then((res) => {// INIT待付款，PAID 代发货，SHIPPED 已发货，FINISHED 已完成，CANCEL 取消；
        wx.hideLoading();
        if (res.data.code === 200) {
          this.data.AllOrderList[type?type:'allList'] = [];
          if (res.data.object.length) {
            const data = res.data.object;
            if (IsRefresh) {
              this.data.IsRefresh = false;
              this.data.AllOrderList[type?type:'allList'] = data
            } else {
              this.data.AllOrderList[type?type:'allList'] = this.data.AllOrderList[type?type:'allList'].concat(data);
            }
            this.setData({
              AllOrderList: this.data.AllOrderList,
              IsEnd: this.data.navList[navIdx].pageIdx < 2 && data.length < 10 ? true : false
            }, () => {
              this.data.navList[navIdx].pageIdx++;
            });
          } else {
            this.data.navList[navIdx].IsEnd = true;
            this.setData({
              navList: this.data.navList,
              IsEnd: true
            })
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  succCallBack() {
    this.initData()
  },

  canselBtn() {
    wx.navigateBack({
      delta: 1
    })
  },

  payment(e) {
    wx.showLoading({
      title: '支付中',
      mask: true
    });
    const {orderSno, payNum} = e.currentTarget.dataset;
    PaySign({
      orderSno: orderSno,
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
          wx.hideLoading();
          if (e.errMsg === "requestPayment:ok") {
            wx.redirectTo({
              url: `/pages/createOrder/creadeOrder?successPay=true&PayNum=${payNum}`
            })
          } else {
            wx.showToast({
              title: '支付失败',
              duration: 2000,
              mask: true
            })
          }
        },
        fail(err) {
          wx.hideLoading();
          wx.showToast({
            title: '支付失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    })
  },

  remindBtn() {
    wx.showToast({
      title: '提醒商家发货成功',
      icon: 'success',
      duration: 2000
    })
  },

  deleteOrder(e) {
    const {sno} = e.currentTarget.dataset;
    const that = this;
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
              that.setData({
                IsRefresh: true
              });
              that.initData()
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

  checkLogis(e) {
    const {expressBill, sno} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/expressInfo/expressInfo?expressBill=${expressBill}&sno=${sno}`
    })
  },

  navTab(e) {
    const index = e.currentTarget.dataset.index;
    this.data.navList[index].pageIdx = 1;
    this.data.navIdx = index;
    this.initData();
    this.setData({
      navIdx: index
    })
  },

  estimateBtn(e) {
    const {goodsSno, status} = e.currentTarget.dataset;
    if (status === 'true') {
      return
    }
    this.data.IsRefresh = true;
    wx.navigateTo({
      url: `/pages/estimate/estimate?goodsSno=${goodsSno}`
    })
  },

  checkOrderDetail(e) {
    const {sno} = e.currentTarget.dataset;
    this.data.IsRefresh = true;
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?sno=${sno}`
    })
  },

  confirmGoodsBtn(e) {
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
            sno: e.currentTarget.dataset.sno,
            custSno: app.globalData.loginInfo.custSno
          }).then((res) => {
            wx.hideLoading();
            if (res.data.code === 200) {
              wx.showToast({
                title: '确认收货成功',
                icon: 'none',
                duration: 1000,
                success(e) {
                  that.setData({
                    IsRefresh: true
                  });
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
        }
      }
    })
  },

  buyAgain(e) {
    wx.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?goodsSno=${e.currentTarget.dataset.goodsSno}`
    })
  },

  onPullDownRefresh: function () {

  },

  bindscrolltolower() {
    this.initData()
  },

  onShareAppMessage: function () {

  }
});