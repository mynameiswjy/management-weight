// sundryPackage/pages/FAQ/FAQ.js
Page({

  data: {
    list: [
      {
        title: '什么是淘客精选?',
        value: ['淘客精选是全国人民都在使用的“购物平台返佣平台”，有了它分享商品还能赚钱，真正目的做到省钱、赚钱的利器。'],
        IsShow: false
      },{
        title: '平台商品质量有保证吗？',
        value: ['淘客精选有专门的选品团队，商品保证质量和性价比。所以你看到的都是高质量性价比商品，放心购买，大胆分享，强大的淘客精选团队后盾支持你。'],
        IsShow: false
      },{
        title: '订单为什么会失效呢？',
        value: ['1、订单已退款', '2、宝贝拍下未付款'],
        IsShow: false
      },{
        title: '下单后如何取消订单？',
        value: ['下单后，仅当天切未发货状态可以联系客服取消订单。'],
        IsShow: false
      },{
        title: '订单发货时间？',
        value: ['平台发货时间24小时之内。'],
        IsShow: false
      },{
        title: '如何审核售后呢？',
        value: ['进入订单商品详情，点击“客服” 进行在线人工客服沟通，并不是所有商品都支持售后服务。'],
        IsShow: false
      },{
        title: '为什么下单佣金比显示的佣金低呢？',
        value: ['商家会不定时更新平台佣金，存在小部分商品佣金更新不及时 的情况，不影响结算'],
        IsShow: false
      },{
        title: '为什么升级为高级团长，下单还是初级？',
        value: ['系统更新不及时，请耐心等待。'],
        IsShow: false
      }
    ]
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  showDetail(e) {
    const {idx} = e.currentTarget.dataset;
    this.data.list[idx].IsShow = !this.data.list[idx].IsShow;
    this.setData({
      list: this.data.list
    })
  },

  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})