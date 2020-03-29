import { ClassifyThree } from '../../api/index'
const app = getApp();

Page({
  data: {
    goodsList: [],
    pageIdx: 1,
    IsRefresh: false
  },

  onLoad: function (options) {
    this.initData();
  },

  initData() {
    if (this.data.IsRefresh) return;
    ClassifyThree({
      sno: "12215",
      page: this.data.pageIdx,
      pageSize: 10
    }).then((res) => {
      const data = res.data.object;
      if (!data.length) {
        this.data.IsRefresh = true
      }
      this.data.pageIdx++;
      this.setData({
        goodsList: this.data.goodsList.concat(data)
      })
    })
  },

  onShow: function () {

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
})