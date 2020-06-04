import {reqMessageStatus} from "../../../api/comment";

const config = require("../../../config.globle");
import {UserUpgrade} from "../../../api/index"
const app = getApp();

Page({
  data: {
    baseUrl: config.BASE_URL,
    privileList: [
      '0门槛：只需扫码注册即可做淘客',
      '0投资：无需投入一分钱',
      '0售后：所购商品为你负责',
      '0改变：不改变你原本的购物方式',
      '0风险：你无需承担任何风险',
      '无需营销：活动不断助你拉新',
      '服务好：添加导师微信一对一指导',
      '市场大：平台用户都是你的潜在用户',
      '适合人群广：人人都可以做淘客',
      '分享赚钱：分享好友购买商品即可赚钱',
      '月月有收入：随时可提现至微信',
      '裂变发展：滚雪球模式迅速壮大团队',
    ],
    gradeData: null
  },

  onLoad: function (options) {
    UserUpgrade({}).then((res) => {
      if (res.data.code === 200) {
        this.setData({
          gradeData: res.data.object
        })
      }
    })
  },

  onReady: function () {

  },

  userUpgrade() {
    const data = this.data.gradeData;
    if (!data) return;
    wx.requestPayment({
      timeStamp: data.timestamp,
      nonceStr: data.nonceStr,
      package: 'prepay_id=' + data.prepayId,
      signType: 'MD5',
      paySign: data.sign,
      success(e) {
        console.log(e);
        if (e.errMsg === "requestPayment:ok") {
          wx.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 1000,
            mask: true
          });
        }
      },
      fail(err) {
      }
    })
  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
});