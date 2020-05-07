import { PaySign } from '../../api/index'
import { orderList, finished} from '../../api/orders'
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
      IsRefresh: false
    },
    pageIdx: 1
  },

  onLoad: function (options) {
    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
    this.data.cos = 750 / windowWidth;
    if (options.navIdx) {
      this.setData({
        navIdx: Number(options.navIdx)
      })
    }
    this.setData({
      windowHeight: (windowHeight - 90) * 750 / windowWidth,
    });
    this.initData()
  },

  onShow: function () {},

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
          if (res.data.object.length) {
            const data = res.data.object;
            this.data.AllOrderList[type?type:'allList'] = this.data.AllOrderList[type?type:'allList'].concat(data);
            this.data.navList[navIdx].pageIdx++;
            this.setData({
              AllOrderList: this.data.AllOrderList,
              IsEnd: this.data.pageIdx < 2 && data.length < 10 ? true : false
            });
          } else {
            this.data.navList[navIdx].IsEnd = true;
            this.setData({
              navList: this.data.navList
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

  payment(e) {
    const {orderSno, payNum} = e.currentTarget.dataset
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
          if (e.errMsg === "requestPayment:ok") {
            wx.redirectTo({
              url: `/pages/createOrder/creadeOrder?successPay=true&PayNum=${payNum}`
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
    const {expressBill, sno} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/expressInfo/expressInfo?expressBill=${expressBill}&sno=${sno}`
    })
  },

  navTab(e) {
    const index = e.currentTarget.dataset.index;
    const type = this.data.navList[index].type;
    this.data.navIdx = index;
    this.initData();
    this.setData({
      navIdx: index
    })
  },

  confirmGoodsBtn(e) {
    const that = this;
    wx.showLoading({
      title: '请稍后',
    })
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
    this.initData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});