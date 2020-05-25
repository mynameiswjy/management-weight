import {discussList} from "../../api/comment"
const app = getApp();
const config = require("../../config.globle");

Page({
  data: {
    pageIdx: 1,
    commentList: [],
    BASE_URL: config.BASE_URL,
    goodsSno: '',
    isEnd: false
  },

  onLoad: function (options) {
    this.setData({
      goodsSno: options.goodsSno
    })
    this.initData()
  },

  initData() {
    discussList({
      goodsSno: this.data.goodsSno,
      page: this.data.pageIdx,
      pageSize: 10
    }).then((res) => {
      if (res.data.code === 200) {
        const data = res.data.object;
        if (data.length) {
          this.data.pageIdx++;
          this.setData({
            commentList: this.data.commentList.concat(data)
          })
        } else {
          this.setData({
            isEnd: true
          })
        }
      } else {
        console.log('评论获取失败')
      }
    })
  },

  onShow: function () {

  },

  onReachBottom: function () {
    if (!this.data.isEnd) {
      this.initData()
    }
  },

  onShareAppMessage: function () {

  }
});