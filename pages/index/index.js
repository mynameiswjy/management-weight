const app = getApp();
const config = require('../../config.globle');

Page({
  data: {
    bannerList: [
      {img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201912/31/c9da_2f5f7a96_2f5f7a96.jpg'},
      {img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201910/31/bdf4_07744ebf_07744ebf.png'},
      {img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201903/12/a6aa_2c89a03e_2c89a03e.png'}
    ],
    bannerCurIdx: 0,
    goodsList: [
      {name: '热门', txt: '不容错过'},
      {name: '特价', txt: '每日必抢'},
      {name: '品牌', txt: '保质保真'}
    ],
    TitleIdx: 0,
    windowHeight: 0,
    intoView: '',
    cos: 2,
    isStop: false,
    imgUrl: config.BASE_URL
  },
  onLoad: function () {
    const {windowWidth, windowHeight} = app.globalData.SystemInfo;
    this.data.cos = 750 / windowWidth;
    this.setData({
      windowHeight: windowHeight * 750 / windowWidth,
      windowWidth
    });
  },

  swiperChange(e) {
    this.setData({
      bannerCurIdx: e.detail.current
    })
  },

  selectGoodsType(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      TitleIdx: index,
      intoView: 'goods-list-title'
    })
  },

  bindscrollchange(e) {
    const HEIGHT = 779 + 340 * Math.ceil(4/2); // 爆款商品数量 / 每排两个
    const topHeight = HEIGHT / this.data.cos;
    const scrollTop = e.detail.scrollTop;
    if (scrollTop > topHeight + 20) {//isStop
      if (!this.data.isStop) {
        this.setData({
          isStop: true
        })
      }
    } else if (scrollTop < topHeight + 50) {
      if (this.data.isStop) {
        this.setData({
          isStop: false
        })
      }
    }
  }

});
