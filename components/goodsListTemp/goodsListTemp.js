import {goodsRecord} from '../../api/index'
const app = getApp();

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    showType: {
      type: Number,
      value: 0
    }
  },
  data: {
    goodsList: [],
    goodsLeftData: null,
    goodsRightData: null,
  },
  lifetimes: {
    attached() {}
  },
  methods: {
    reqData(res) {
      if (res) {
        let goodsLeftData = [];
        let goodsRightData = [];
        for (let i = 0; i < res.length; i++) {
          if (i % 2 === 0) {
            goodsLeftData.push(res[i])
          } else {
            goodsRightData.push(res[i])
          }
        }
        this.setData({
          goodsList: res,
          goodsLeftData,
          goodsRightData
        })
      }
    },
    buyGoods(e) {
      const target = e.currentTarget.dataset;
      const goodsSno = target.goodsSno;
      const that = this;
      wx.navigateTo({
        url: `/pages/goodsDetail/goodsDetail?goodsSno=${goodsSno}`,
        success() {
          goodsRecord({goodsSno: goodsSno})
        }
      })
    }
  }

});