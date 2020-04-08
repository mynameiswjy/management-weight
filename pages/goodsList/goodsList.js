import { ClassifyThree, commodityzonegoods } from '../../api/index'
const app = getApp();

Page({
  data: {
    goodsList: [],
    pageIdx: 1,
    IsRefresh: false,
    isEnd: false
  },

  onLoad: function (options) {
    this.options = options;
    this.initData();
  },

  initData() {
    if (this.data.IsRefresh) return;
    const options = this.options;
    const type = options.type;
    const pageIdx = this.data.pageIdx;
    if (type === "index") {
      commodityzonegoods({
        zoneType: options.zoneType,
        page: pageIdx,
        pageSize: 10
      }).then((res) => {this.manage(res)})
    } else if (type === "classify") {
      ClassifyThree({sno: options.sno, page: pageIdx, pageSize: 10}).then((res) => {this.manage(res)})
    } else {

    }
  },

  onShow: function () {

  },

  manage(res) {
    const data = res.data.object;
    if (!data.length) {
      this.data.IsRefresh = true;
      this.setData({
        isEnd: true
      });
    } else {
      this.data.pageIdx++;
      this.setData({
        goodsList: this.data.goodsList.concat(data),
        isEnd: this.data.goodsList.length < 10 ? true : false
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
    this.initData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});