import { goodsDetail, goodsSspecs, addCard } from '../../api/index'
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
    bannerHei: 0,
    bannerList: [],
    detailsImg: [],
    currentScrollTop: 0,
    selectColorIdx: 0,
    selectSpecsIdx: 0,
    goodsNum: 1,
    IsOpenMaskGoods: false,
    goodsInfo: null,
    selectInfo: [],
    selectColor: '',
    selectSpecs: '',
    defaultSpecsGoodsSnoL: ''
  },

  onLoad: function (options) {
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

    goodsDetail({goodsSno: options.goodsSno || "3712144700781232517"}).then((res) => {
      let Data = res.data.object;
      /*Data.supportSpecs = ['1.8米床 220*240cm', '2.0米床 220*240cm', '2.2米床 220*240cm'];
      Data.supportColors = ['宝利莱', '珊瑚粉', '樱花白'];*/
      this.setData({
        goodsInfo: Data
      }, () => {

      })
    });
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



  // 打开选择模板
  openSelectMask() {

  },

  selectData(e) {
    const goodsData = this.data.goodsInfo;
    this.data.selectType = e.currentTarget.dataset.type;
    goodsSspecs({
      defaultSpecsGoodsSno: this.data.defaultSpecsGoodsSnoL || goodsData.defaultSpecsGoodsSno,
      goodsSno: goodsData.goodsSno,
      color: this.data.selectColor,
      specs: this.data.selectSpecs
    }).then((res) => {
      const data = res.data.object;
      let selectInfo = data.color.length ? data.color : data.specs;
      selectInfo = selectInfo.filter((item) => {
        return item.defaultIsSelect === true
      });
      data.selectInfo = selectInfo;
      this.setData({
        IsOpenMaskGoods: true,
        IsOpenAnimation: true,
        selectInfo: data
      }, () => {
        let selectColor, selectSpecs;
        if (data.color.length) {
          for (let i = 0; i < data.color.length; i++) {
            if (data.color[i].defaultIsSelect) {
              selectColor = data.color[i].color
              break;
            }
          }
        }
        if (data.specs.length) {
          for (let i = 0; i < data.specs.length; i++) {
            if (data.specs[i].defaultIsSelect) {
              selectSpecs = data.specs[i].specs
              break;
            }
          }
        }
        this.setData({
          selectColor,
          selectSpecs
        })
      });
    });
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
    const target = e.currentTarget.dataset;
    const idx = target.index;
    const tap = target.tap;
    if (!target.isSelect) return;
    this.data.defaultSpecsGoodsSnoL = target.defaulSno;
    if (tap === 'color') {
      this.data.selectColor = target.color
    } else if (tap === 'specs') {
      this.data.selectSpecs = target.specs
    }
    this.selectData();
  },

  confirmOrder(e) {
    const that = this;
    const type = this.data.selectType;
    const goodsInfo = this.data.goodsInfo;
    const specsGoodsSno = this.data.defaultSpecsGoodsSnoL ? this.data.defaultSpecsGoodsSnoL : goodsInfo.defaultSpecsGoodsSno;
    let param= `quantity=${this.data.goodsNum}&goodsSno=${goodsInfo.goodsSno}&specsGoodsSno=${specsGoodsSno}`;
    if (this.data.selectSpecs) {
      param += `&selectSpecs=${this.data.selectSpecs}`
    }
    if (this.data.selectColor) {
      param += `&selectColor=${this.data.selectColor}`
    }
    if (type === 'buy') {
      wx.navigateTo({
        url: '/pages/createOrder/creadeOrder?' + param,
        success() {
          that.setData({
            IsOpenMaskGoods: false
          })
        }
      })
    } else {
      addCard({
        specsGoodsSno: this.data.defaultSpecsGoodsSnoL ? this.data.defaultSpecsGoodsSnoL : goodsInfo.defaultSpecsGoodsSno,
        quantity: this.data.goodsNum,
        goodsSno: goodsInfo.goodsSno,
        isSelect: 'N',
        custSno: app.globalData.loginInfo.custSno
      }).then((res) => {
        console.log(res);
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShareAppMessage: function () {

  },

  stopClick() {
    return
  }
});