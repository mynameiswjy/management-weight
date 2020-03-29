import { ClassifyOne, ClassifyTwo } from '../../api/index'

const app = getApp()

Page({
  data: {
    scrollLeft: [],
    leftIdx: 0,
    rightData: null
  },

  onLoad: function (options) {
    this.initData();
  },

  onShow: function () {

  },

  initData() {
    Promise.all([this.leftData()]).then((res) => {
      this.rightData(res[0][0].sno);
    })
  },

  rightData(sno) {
    ClassifyTwo({sno: sno}).then((data) => {
      this.setData({
        rightData: data.data.object
      })
    })
  },

  leftData() {
    return new Promise((resolve, reject) => {
      ClassifyOne({}, (res) => {
        const Data = res.data.object;
        resolve(Data);
        this.setData({
          scrollLeft: Data
        })
      })
    })
  },

  selectTap(e) {
    const idx = e.currentTarget.dataset.index;
    const sno = e.currentTarget.dataset.sno;
    this.rightData(sno)
    this.setData({
      leftIdx: idx
    })
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
});