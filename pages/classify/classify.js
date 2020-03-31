import { ClassifyOne, ClassifyTwo } from '../../api/index'

const app = getApp()

Page({
  data: {
    scrollLeft: [],
    leftIdx: 0,
    rightData: null,
    goodsData: []
  },

  onLoad: function (options) {
    this.initData();
  },

  onShow: function () {

  },

  initData() {
    Promise.all([this.leftData()]).then((res) => {
      this.rightData(res[0][this.data.leftIdx].sno);
    })
  },

  rightData(sno) {
    ClassifyTwo({sno: sno}).then((data) => {
      const Data = data.data.object;
      const goodsData = this.data.goodsData;
      const leftIdx = this.data.leftIdx;
      goodsData[leftIdx] = Data;
      this.setData({
        rightData: Data
      })
    })
  },

  leftData() {
    return new Promise((resolve, reject) => {
      ClassifyOne({}, (res) => {
        const Data = res.data.object;
        resolve(Data);
        this.setData({
          scrollLeft: Data
        })
      })
    })
  },

  selectTap(e) {
    const idx = e.currentTarget.dataset.index;
    const sno = e.currentTarget.dataset.sno;
    const goodsData = this.data.goodsData;
    this.data.leftIdx = idx;
    if (!goodsData[idx]) {
      this.rightData(sno);
      this.setData({
        leftIdx: idx
      })
    } else {
      this.setData({
        leftIdx: idx,
        rightData: goodsData[idx]
      })
    }
  },

  moreGoodsList(e) {
    const sno = e.currentTarget.dataset.sno;
    wx.navigateTo({
      url: `/pages/goodsList/goodsList?type=classify&sno=${sno}`
    })
  },

  goSearchPage() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
});