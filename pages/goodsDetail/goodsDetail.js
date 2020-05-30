import { goodsDetail, goodsSspecs, recommendGoods, getGoodsInfo } from '../../api/index'
import {discussList} from "../../api/comment"
import { addCard } from '../../api/cart'
const app = getApp();
const config = require('../../config.globle');

Page({

  data: {
    imgUrl: config.BASE_URL,
    coe: 2,
    MenuButton: null,
    scrollTop: 0,
    statusBarHeight: 0,
    navList: [{name: '商品'}, {name: '评价'}, {name: '详情'}, {name: '推荐'}],
    navIdx: 0,
    grodCoe: 0,
    IsShare: 0,
    goodsNum: 1,
    IsOpenMaskGoods: false,
    goodsInfo: null,
    selectInfo: [],
    hasLogin: false,
    pageIdx: 1,
    scrollTops: null,
    isEnd: false,
    userSelect: {},
    currentIdx: 0,
    estimateList: [],
    iphoneX: app.globalData.iphoneX
  },

  analyticParam(options) {
    if (options.scene) {

    } else {
      return options
    }
  },

  onLoad: function (options) {
    options = this.analyticParam(options);
    wx.showLoading({
      title: '加载中',
    });
    const {windowWidth, windowHeight, statusBarHeight} = app.globalData.SystemInfo;
    const MenuButton = wx.getMenuButtonBoundingClientRect();
    const coe = 750 / windowWidth;
    this.setData({
      coe: coe,
      MenuButtonTop: Math.ceil(MenuButton.top * coe),
      navHeight: Math.ceil((MenuButton.height + MenuButton.top * 2 - statusBarHeight + 3) * coe),
      statusBarHeight: statusBarHeight * coe,
      options
    });

    this.commentData(options);
    this.recommendList();
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query.selectAll(".scroll-view-item").boundingClientRect((rect) => {
        this.setData({
          scrollTops: rect
        })
      }).exec();
    }, 1000)
  },

  onShow: function () {

  },

  initData(options) {
    return new Promise((resolve, reject) => {
      goodsDetail({goodsSno: options.goodsSno || "3712144700781232517"}).then((res) => {
        let Data = res.data.object;
        wx.hideLoading();
        resolve(Data);
        this.setData({
          goodsInfo: Data
        })
      });
    })
  },

  checkImgs(e) {
    const {idx, imgs} = e.currentTarget.dataset;
    wx.previewImage({
      current: imgs[idx], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },

  swiperChange(e) {
    this.setData({
      currentIdx: e.detail.current
    })
  },

  commentData(options) {
    Promise.all([this.initData(options)]).then((res) => {
      discussList({
        goodsSno: res[0].goodsSno,
        page: this.data.pageIdx,
        pageSize: 3
      }).then((comment) => {
        if (comment.data.code === 200) {
          this.selectComponent("#estimateTemp").commentlist(comment.data.object)
          this.setData({
            estimateList: comment.data.object
          })
        }
      });
    })
  },

  recommendList() {
    if (this.data.isEnd) {
      wx.showToast({
        title: '到底了, 别扯了',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return
    }
    recommendGoods({
      page: this.data.pageIdx,
      pageSize: 10
    }).then((res) => {
      if (res.data.code === 200) {
        if (res.data.object.length) {
          this.data.pageIdx++;
          this.selectComponent('#goodsListTemp').reqData(res.data.object);
        } else {
          this.setData({
            isEnd: true
          })
        }
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000,
          mask: true
        });
      }
    })
  },

  successCallback(){
    // this.selectData({type: this.data.selectType})
  },

  selectData(e) {
    const goodsData = this.data.goodsInfo;
    if (e) {
      this.data.selectType = e.currentTarget.dataset.type;
    }
    if (!app.globalData.loginInfo.hasLogin) {
      this.selectComponent("#login").showPopup();
      return;
    }
    if (this.data.selectInfo.length) {
      this.setData({
        IsOpenMaskGoods: true,
        IsOpenAnimation: true
      });
    } else {
      goodsSspecs({
        goodsSno: goodsData.goodsSno,
      }).then((res) => {
        const data = res.data.object;
        let selectInfo = [];
        for (let i in data) {
          const item = data[i];
          if (item.length) {
            selectInfo.push({
              data: item,
              name: i === 'specs' ? '类型' :'颜色',
              type: i
            })
          }
        }
        this.setData({
          IsOpenMaskGoods: true,
          IsOpenAnimation: true,
          selectInfo: selectInfo
        });
      });
    }
  },

  goodsAddBtn(e) {
    const tap = e.currentTarget.dataset.tap;
    let goodsNum = this.data.goodsNum;

    if (tap == 1) {// 加号
      ++goodsNum;
      this.setData({
        goodsNum: goodsNum
      })
    } else {
      if (goodsNum > 0) {
        this.setData({
          goodsNum: --goodsNum
        })
      }
    }
  },

  selectType(e) {
    const globalData = this.data;
    const selectInfo = globalData.selectInfo;
    const {index, idx, item, type} = e.currentTarget.dataset;
    if (type === 'color') {
      globalData.userSelect.color = item.color;
    } else if (type === 'specs') {
      globalData.userSelect.specs = item.specs;
    }
    for (let i = 0; i < selectInfo[idx].data.length; i++) {
      if (index === i) {
        selectInfo[idx].data[index].IsSelect = true
      } else {
        selectInfo[idx].data[i].IsSelect = false
      }
    }
    this.setData({
      selectInfo: selectInfo,
      userSelect: globalData.userSelect
    });
    getGoodsInfo(Object.assign({}, globalData.userSelect, {
      goodsSno: this.data.goodsInfo.goodsSno
    })).then((res) => {
      if (res.data.code === 200) {
        const Data = res.data.object;
        let goodsInfo = this.data.goodsInfo;
        goodsInfo.compostCashPrice = Data.compostCashPrice;
        goodsInfo.name = Data.name;
        goodsInfo.specsImgUrls = Data.specsImgUrl;
        goodsInfo.specsGoodsSno = Data.specsGoodsSno;
        this.setData({
          goodsInfo
        })
      }
    })

  },

  confirmOrder(e) {
    const that = this;
    const type = this.data.selectType;
    const goodsInfo = this.data.goodsInfo;
    const selectInfo = this.data.selectInfo;
    const userSelect = this.data.userSelect;
    const specsGoodsSno = goodsInfo.specsGoodsSno;
    const options = this.data.options;
    let paramUrl = `/pages/createOrder/creadeOrder`;
    if (options.shareCustSno) {
      paramUrl += `?shareCustSno=${options.shareCustSno}`
    }
    let paramArr = {
      quantity: this.data.goodsNum,
      goodsSno: goodsInfo.goodsSno,
      specsGoodsSno: specsGoodsSno
    };
    for (let i = 0; i < selectInfo.length; i++) {
      if (!userSelect[selectInfo[i].type]) {
        wx.showToast({
          title: `请选择${selectInfo[i].name}`,
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return
      }
    }
    /*for (let key in userSelect) {
      if (userSelect[key]) {
        if (key === 'color') {
          paramUrl += `&selectColor=${userSelect[key]}`
        } else {
          paramUrl += `&selectSpecs=${userSelect[key]}`
        }
      }
    }*/

    if (type === 'buy') {
      app.globalData.userSelectInfo = [paramArr];
      wx.navigateTo({
        url: paramUrl,
        success() {
          that.setData({
            IsOpenMaskGoods: false
          })
        }
      })
    } else if (type === 'addCard') {
      addCard({
        specsGoodsSno: specsGoodsSno,
        quantity: this.data.goodsNum,
        goodsSno: goodsInfo.goodsSno,
        isSelect: 'N',
        custSno: app.globalData.loginInfo.custSno
      }).then((res) => {
        that.setData({
          IsOpenMaskGoods: false
        });
        if (res.data.code === 200) {
          wx.showToast({
            title: '宝贝添加成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      that.setData({
        IsOpenMaskGoods: false
      });
    }
  },

  // 关闭选择模板
  hideGoodsMask() {
    this.setData({
      IsOpenAnimation: false
    })
    setTimeout(() => {
      this.setData({
        IsOpenMaskGoods: false
      })
    }, 500);
  },

  selectTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      navIdx: index,
      intoView: 'intoView' + (index + 1)
    })
  },

  backBtn() {
    if (this.data.options.IsShare) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  catchtouchmove() {},

  bindscroll(e) {
    const scrollTop = e.detail.scrollTop;
    let pageTops = this.data.scrollTops && this.data.scrollTops.map((item) => {
      return item.top
    });
    const h = 60;
    if (pageTops[0] < scrollTop + h && scrollTop + h < pageTops[1]) {
      if (this.data.navIdx != 0) {
        this.setData({
          navIdx: 0
        })
      }
    } else if (pageTops[1] < scrollTop + h && scrollTop + h < pageTops[2]) {
      if (this.data.navIdx != 1) {
        this.setData({
          navIdx: 1
        })
      }
    } else if (pageTops[2] < scrollTop + h && scrollTop + h < pageTops[3]) {
      if (this.data.navIdx != 2) {
        this.setData({
          navIdx: 2
        })
      }
    } else if (scrollTop + h > pageTops[3]) {
      if (this.data.navIdx != 3) {
        this.setData({
          navIdx: 3
        })
      }
    }

    this.setData({
      grodCoe: (scrollTop / 110 > 1 ? 1 : scrollTop / 110).toFixed(1)
    });
  },

  gotoBtn() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  bindscrolltolower() {
    this.recommendList()
  },

  moreExpress() {
    this.selectComponent("#estimateTemp").checkAll()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  shareBtn() {
    if (!app.globalData.loginInfo.hasLogin) {
      this.selectComponent("#login").showPopup();
      return;
    }
    const goodsInfo = this.data.goodsInfo;
    this.selectComponent("#shareTemp").canselBtn({
      isOpen: 1,
      goodsSno: this.data.options.goodsSno,
      page: 'pages/goodsDetail/goodsDetail',
      scene: '1,2,3',
      specsGoodsSno: goodsInfo.specsGoodsSno || goodsInfo.defaultSpecsGoodsSno
    });
  },

  onShareAppMessage: function () {
    this.selectComponent("#shareTemp").canselBtn({isOpen: 0});
    let title = '好物分享';
    let path = `/pages/goodsDetail/goodsDetail?goodsSno=${this.data.options.goodsSno}&IsShare=1&shareCustSno=${app.globalData.loginInfo.custSno}`;
    return {
      title: title,
      path: path
    }
  },

  stopClick() {
    return
  }
});