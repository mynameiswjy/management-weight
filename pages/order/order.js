import {orderList} from '../../api/index'
const app = getApp();

Page({

  data: {
    windowWidth: 750,
    navList: [// INIT待付款，PAID 代发货，SHIPPED 已发货，FINISHED 已完成，CANCEL 取消；
      {name: "全部", type: ''},
      {name: "待发货", type: 'PAID'},
      {name: "待付款", type: 'INIT'},
      {name: "待收货", type: 'SHIPPED'},
      {name: "已完成", type: 'FINISHED'},
      {name: "已取消", type: 'CANCEL'}
    ],
    navIdx: 0,
    AllOrderList: {
      allList: [
        {
          sno	:	4244810770998321250,
          orderState	:	'INIT',
          totalAmount	:	0.01,
          totalQuantity	:	1,
          items: [
            {
              shopOrderGoodsSno:	4244810770998321251,
              goodsSno:	4230091952434454544,
              specsGoodsSno:	4230091952434454545,
              goodsImgUrl	:	'http://www.mengniuhealth.cn/upload/15867861380616203.jpg',
              name:	'吾迪新款270本色6劵卫生纸家庭装无芯卷纸家用卷纸筒纸',
              specs:'吾迪新款270本色6劵',
              color: null,
              quantity:	1,
              payAmount	:	0.01,
              carriageAmount	:	0.00,
              payMethod	:	'CASE',
              compostCashPrice	:	0.01,}
          ],
          handler: {}
        },
        {
          sno	:	4244810770998321250,
          orderState	:	'PAID',
          totalAmount	:	0.01,
          totalQuantity	:	1,
          items: [
            {
              shopOrderGoodsSno:	4244810770998321251,
              goodsSno:	4230091952434454544,
              specsGoodsSno:	4230091952434454545,
              goodsImgUrl	:	'http://www.mengniuhealth.cn/upload/15867861380616203.jpg',
              name:	'吾迪新款270本色6劵卫生纸家庭装无芯卷纸家用卷纸筒纸',
              specs:'吾迪新款270本色6劵',
              color: null,
              quantity:	1,
              payAmount	:	0.01,
              carriageAmount	:	0.00,
              payMethod	:	'CASE',
              compostCashPrice	:	0.01,}
          ],
          handler: {}
        },
        {
          sno	:	4244810770998321250,
          orderState	:	'SHIPPED',
          totalAmount	:	0.01,
          totalQuantity	:	1,
          items: [
            {
              shopOrderGoodsSno:	4244810770998321251,
              goodsSno:	4230091952434454544,
              specsGoodsSno:	4230091952434454545,
              goodsImgUrl	:	'http://www.mengniuhealth.cn/upload/15867861380616203.jpg',
              name:	'吾迪新款270本色6劵卫生纸家庭装无芯卷纸家用卷纸筒纸',
              specs:'吾迪新款270本色6劵',
              color: null,
              quantity:	1,
              payAmount	:	0.01,
              carriageAmount	:	0.00,
              payMethod	:	'CASE',
              compostCashPrice	:	0.01,}
          ],
          handler: {}
        },
        {
          sno	:	4244810770998321250,
          orderState	:	'FINISHED',
          totalAmount	:	0.01,
          totalQuantity	:	1,
          items: [
            {
              shopOrderGoodsSno:	4244810770998321251,
              goodsSno:	4230091952434454544,
              specsGoodsSno:	4230091952434454545,
              goodsImgUrl	:	'http://www.mengniuhealth.cn/upload/15867861380616203.jpg',
              name:	'吾迪新款270本色6劵卫生纸家庭装无芯卷纸家用卷纸筒纸',
              specs:'吾迪新款270本色6劵',
              color: null,
              quantity:	1,
              payAmount	:	0.01,
              carriageAmount	:	0.00,
              payMethod	:	'CASE',
              compostCashPrice	:	0.01,}
          ],
          handler: {}
        },
        {
          sno	:	4244810770998321250,
          orderState	:	'CANCEL',
          totalAmount	:	0.01,
          totalQuantity	:	1,
          items: [
            {
              shopOrderGoodsSno:	4244810770998321251,
              goodsSno:	4230091952434454544,
              specsGoodsSno:	4230091952434454545,
              goodsImgUrl	:	'http://www.mengniuhealth.cn/upload/15867861380616203.jpg',
              name:	'吾迪新款270本色6劵卫生纸家庭装无芯卷纸家用卷纸筒纸',
              specs:'吾迪新款270本色6劵',
              color: null,
              quantity:	1,
              payAmount	:	0.01,
              carriageAmount	:	0.00,
              payMethod	:	'CASE',
              compostCashPrice	:	0.01,}
          ],
          handler: {}
        },
      ],
      PAID: [],
      INIT: [],
      SHIPPED: [],
      FINISHED: [],
      CANCEL: [],
      IsEnd: false
    },
    pageIdx: 1
  },

  onLoad: function (options) {
    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
    this.data.cos = 750 / windowWidth;
    this.setData({
      windowHeight: (windowHeight - 90) * 750 / windowWidth,
    });
    this.initData()
  },

  onShow: function () {},

  initData() {
    wx.showLoading({
      title: '加载中',
    });
    const type = this.data.navList[this.data.navIdx].type;
    orderList({
      status: type,
      pageSize: 10,
      page: this.data.pageIdx,
      custSno: app.globalData.loginInfo.custSno
    }).then((res) => {// INIT待付款，PAID 代发货，SHIPPED 已发货，FINISHED 已完成，CANCEL 取消；
      wx.hideLoading();
      if (res.data.code === 200) {
        if (res.data.object.length) {
          this.data.AllOrderList[type?type:'allList'] = this.data.AllOrderList[type?type:'allList'].concat(res.data.object);
          this.data.pageIdx++;
          this.setData({
            AllOrderList: this.data.AllOrderList
          });
        } else {
          this.setData({
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
  },

  navTab(e) {
    const index = e.currentTarget.dataset.index;
    const type = this.data.navList[index].type;
    this.data.navIdx = index;
    if (!this.data.AllOrderList[type].length) {
      this.initData();
      this.setData({
        navIdx: index
      })
    } else {
      this.setData({
        navIdx: index,
        AllOrderList: s.data.AllOrderList
      })
    }


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