import {cardList, cardEdit, deleteCartGoods} from '../../api/cart'
import {recommendGoods} from '../../api/index'

const app = getApp();

Page({

  data: {
    isSelect: true,
    cardList: null,
    pageIdx: 1,
    isEnd: false
  },

  onLoad: function (options) {

  },

  onShow: function () {
    this.initData();
    this.goodsList()
  },

  goodsList() {
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

  initData() {
    wx.showLoading({
      title: '加载中',
    });
    cardList({custSno: app.globalData.loginInfo.custSno}).then((res) => {
      wx.hideLoading();
      let isAllSelect = res.data.object.filter((item) => {
        return item.isSelect === 'N'
      });
      this.setData({
        cardList: res.data.object,
        isAllSelect: !isAllSelect.length
      })
    })
  },
  quantityGoods(e) {
    const {type, index} = e.currentTarget.dataset;
    const cardList = this.data.cardList;
    const {specsGoodsSno, sno} = cardList[index];
    cardList[index].quantity = Number(cardList[index].quantity);
    if (type === 'add') {
      cardList[index].quantity++
    } else {
      if (cardList[index].quantity === 1) {
        wx.showToast({
          title: '不能再少了',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return;
      }
      cardList[index].quantity--
    }
    cardEdit({
      specsGoodsSno: specsGoodsSno,
      quantity: cardList[index].quantity,
      sno: sno,
      custSno: app.globalData.loginInfo.custSno
    }).then((res) => {
      if (res.data.code === 200) {
        this.initData()
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000,
          mask: true
        });
      }
    });
    /*this.setData({
      cardList: cardList
    })*/
  },

  deleteGoods(e) {
    const that = this;
    const {sno, specsGoodsSno} = e.currentTarget.dataset.item;
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success (res) {
        if (res.confirm) {
          deleteCartGoods({
            specsGoodsSno: specsGoodsSno,
            sno: sno,
            custSno: app.globalData.loginInfo.custSno
          }).then((res) => {
            if (res.data.code === 200) {
              that.setData({
                ScrollLeft: 0
              })
              that.initData()
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1000,
                mask: true
              });
            }
          })
        } else if (res.cancel) {
          that.setData({
            ScrollLeft: 0
          })
        }
      }
    })
  },

  selecGoods(e) {
    const {index} = e.currentTarget.dataset;
    const cardList = this.data.cardList;
    if (cardList[index].isSelect === 'Y') {
      cardList[index].isSelect = 'N'
    } else {
      cardList[index].isSelect = 'Y'
    }
    const list = cardList.filter((item) => {
      return item.isSelect === 'N'
    });
    this.setData({
      cardList: cardList,
      isAllSelect: !list.length
    })
  },

  IsJoinCart() {
    const cardList = this.data.cardList;
    let isAllSelect = this.data.isAllSelect;
    for (let i = 0; i < cardList.length; i++) {
      if (isAllSelect) {
        cardList[i].isSelect = 'N'
      } else {
        cardList[i].isSelect = 'Y'
      }
    }

    this.setData({
      isAllSelect: !isAllSelect,
      cardList
    })
  },

  PayBtn() {
    const userSelectInfo = this.data.cardList.filter((item) => {
      return item.isSelect === 'Y'
    }).map((item, index) => {
      return {
        quantity: item.quantity,
        goodsSno: item.goodsSno,
        specsGoodsSno: item.specsGoodsSno
      }
    });
    if (!userSelectInfo.length) {
      wx.showToast({
        title: `请选择要购买的商品`,
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return
    }
    app.globalData.userSelectInfo = userSelectInfo;
    wx.navigateTo({
      url: '/pages/createOrder/creadeOrder?param'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {
    this.goodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})