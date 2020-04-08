import { homeIndex, homeGoodsList } from '../../api/index'
const config = require('../../config.globle');

const app = getApp();

Page({
  data: {
    bannerList: [
      /*{img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201912/31/c9da_2f5f7a96_2f5f7a96.jpg'},
      {img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201910/31/bdf4_07744ebf_07744ebf.png'},
      {img: 'http://shangchuan.566.com/exam8uploadpath/TiKu/201903/12/a6aa_2c89a03e_2c89a03e.png'}*/
    ],
    bannerCurIdx: 0,
    goodsListTitle: [
      {name: '热门', txt: '不容错过', id: 1, type: 'hostSellGoods', pageIdx: 1, IsEnd: false},
      {name: '特价', txt: '每日必抢', id: 2, type: 'specialOfferGoods', pageIdx: 1, IsEnd: false},
      {name: '品牌', txt: '保质保真', id: 3, type: 'brandGoods', pageIdx: 1, IsEnd: false}
    ],
    TitleIdx: 0,
    windowHeight: 0,
    intoView: '',
    cos: 2,
    isStop: false,
    imgUrl: config.BASE_URL,
    indexData: null,
    currentGoodsTab: 'hostSellGoods',
    goodsData: {
      hostSellGoods: [],
      specialOfferGoods: [],
      brandGoods: []
    },
    isEnd: false
  },
  onLoad: function () {
    const {windowWidth, windowHeight} = app.globalData.SystemInfo;
    this.data.cos = 750 / windowWidth;
    this.setData({
      windowHeight: windowHeight * 750 / windowWidth,
      windowWidth
    });
    this.initData();
  },

  initData() {
    homeIndex({}).then((res) => {
      let data = res.data.object;
      this.typeGoodsData(data[this.data.currentGoodsTab]);

      let zoneGoodsList = data.zoneGoods.zoneGoodsList;
      const len = Math.floor(zoneGoodsList.length / 3) * 3;
      let newZoneGoodsList = [];
      let item = [];
      for (let i = 0; i < len; i++) {
        item.push(zoneGoodsList[i]);
        if ((i + 1) % 3 === 0) {
          newZoneGoodsList.push(item);
          item = []
        }
      }
      data.hotStyleGoods = data.hotStyleGoods.slice(0, 4)
      data.zoneGoods.newZoneGoodsList = newZoneGoodsList;
      this.setData({
        indexData: data
      })
    })
  },

  typeGoodsData(sno) {
    const currentGoodsTab = this.data.currentGoodsTab;
    const goodsListTitle = this.data.goodsListTitle;
    let CurrentI;
    for (let i = 0; i < goodsListTitle.length; i++) {
      if (currentGoodsTab === goodsListTitle[i].type) {
        CurrentI = i;
        break;
      }
    }
    if (goodsListTitle[CurrentI].IsEnd) return;
    homeGoodsList({
      page: goodsListTitle[CurrentI].pageIdx,
      pageSize: 10,
      sno: sno
    }).then((res) => {
      const data = res.data.object;
      if (!data.length) {
        goodsListTitle[CurrentI].IsEnd = true;
        this.setData({
          isEnd: true
        });
        return
      }
      goodsListTitle[CurrentI].pageIdx++;
      const goodsData = this.data.goodsData[currentGoodsTab].concat(data);
      this.data.goodsData[currentGoodsTab] = goodsData;
      this.selectComponent('#goodsListTemp').reqData(goodsData);
    })
  },

  goSearchPage() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  swiperChange(e) {
    this.setData({
      bannerCurIdx: e.detail.current
    })
  },

  selectGoodsType(e) {
    const target = e.currentTarget.dataset;
    const index = Number(target.index);
    if (this.data.TitleIdx === index) return;
    const dataType = target.type;
    this.data.currentGoodsTab = dataType;
    const goodsData = this.data.goodsData;
    let data = goodsData[dataType];
    if (!data.length) {
      this.typeGoodsData(this.data.indexData[dataType]);
    } else {
      this.selectComponent('#goodsListTemp').reqData(data);
    }
    this.setData({
      TitleIdx: index,
      intoView: 'goods-list-title',
      isEnd: this.data.goodsListTitle[index].IsEnd
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
  },

  // 上拉刷新
  tolower(e) {
    this.typeGoodsData(this.data.indexData[this.data.currentGoodsTab])
  },

  goToGoodsList(e) {
    const target = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/goodsList/goodsList?type=index&zoneType=${target.zoneType}`
    })
  }

});
