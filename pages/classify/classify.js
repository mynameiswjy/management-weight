const app = getApp()

Page({
  data: {
    scrollLeft: [
      {name: '推荐分类'},
      {name: '京东超市'},
      {name: '国际名牌'},
      {name: '奢移品'},
      {name: '京东国际'},
      {name: '唯品会'},
      {name: '男装'},
      {name: '内衣配饰'},
      {name: '推荐分类'},
      {name: '推荐分类'},
      {name: '推荐分类'}
    ],
    leftIdx: 0
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  selectTap(e) {
    const idx = e.currentTarget.dataset.index;
    this.setData({
      leftIdx: idx
    })
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
});