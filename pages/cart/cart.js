import {cardList} from '../../api/index'

const app = getApp();

Page({

  data: {
    isSelect: true,
    cardList: null
  },

  onLoad: function (options) {
    cardList({custSno: app.globalData.loginInfo.custSno}).then((res) => {
      console.log(res);
      this.setData({
        cardList: res.data.object
      })
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },
  quantityGoods(e) {
    const {type, index} = e.currentTarget.dataset;
    const cardList = this.data.cardList;
    cardList[index].quantity = Number(cardList[index].quantity);
    if (type === 'add') {
      cardList[index].quantity++
    } else {
      if (cardList[index].quantity === 0) {
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
    this.setData({
      cardList: cardList
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
      isAllSelect: list.length ? false : true
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})