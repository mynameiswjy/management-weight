import { ClassifyOne, ClassifyTwo, ClassificationGoods } from '../../api/index'

const app = getApp()

Page({
  data: {
    scrollLeft: [],
    goodsData: [],
    navIdx: 0,
    isEnd: false,
    pageIdx: 1,
    Isbreakdown: false,
    IsShowGoods: false
  },

  onLoad: function (options) {
    this.initData();
  },

  onShow: function () {

  },

  initData() {
    this.leftData().then((res) => {
      this.rightData(res[this.data.navIdx].sno);
    })
  },

  rightData(sno) {
    const navIdx = this.data.navIdx;
    if (!this.data.scrollLeft[navIdx].isEnd) {
      wx.showLoading({
        title: '加载中',
      });
      ClassificationGoods({
        sno: sno,
        page: this.data.scrollLeft[navIdx].pageIndex,
        pageSize: 10
      }).then((data) => {
        wx.hideLoading();
        if (data.data.code === 200) {
          const Data = data.data.object;
          if (Data.length) {
            const goodsData = this.data.goodsData;
            goodsData[navIdx] = Data;
            this.data.scrollLeft[navIdx].pageIndex++;
            this.setData({
              IsShowGoods: true,
              goodsData
            }, () => {
              this.selectComponent("#goodsListTemp").reqData(goodsData[navIdx]);
            })
          } else {
            this.data.scrollLeft[navIdx].isEnd = true;
            this.setData({
              scrollLeft: this.data.scrollLeft
            })
          }
        } else {
          this.setData({
            Isbreakdown: !this.data.goodsData.length
          });
          wx.showToast({
            title: data.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  navTab(e) {
    const {index, sno} = e.currentTarget.dataset;
    this.setData({
      navIdx: index
    });
    if (!this.data.goodsData[index]) {
      this.rightData(sno);
    } else {
      this.selectComponent("#goodsListTemp").reqData(this.data.goodsData[this.data.navIdx]);
    }
  },

  leftData() {
    return new Promise((resolve, reject) => {
      ClassifyOne({}, (res) => {
        const Data = res.data.object;
        const leftList = Data.map((item) => {
          item.pageIndex = 1;
          item.isEnd = false;
          return item
        });
        resolve(leftList);
        this.setData({
          scrollLeft: leftList
        })
      })
    })
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
    this.rightData(this.data.scrollLeft[this.data.navIdx].sno)
  },

  onShareAppMessage: function () {

  }
});