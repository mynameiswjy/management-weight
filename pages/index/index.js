const app = getApp()

Page({
  data: {
    bannerList: [
      {img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201912/31/c9da_2f5f7a96_2f5f7a96.jpg'},
      {img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201910/31/bdf4_07744ebf_07744ebf.png'},
      {img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201903/12/a6aa_2c89a03e_2c89a03e.png'}
    ],
    bannerCurIdx: 0
  },
  onLoad: function () {

  },

  swiperChange(e) {
    this.setData({
      bannerCurIdx: e.detail.current
    })
  }

});
