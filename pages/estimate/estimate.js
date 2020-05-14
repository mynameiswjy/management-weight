const app = getApp();
const config = require("../../config.globle");
import {saveDiscuss} from '../../api/comment'

Page({
  data: {
    starNum: 5,
    localImgs: [],
    BASE_URL: config.BASE_URL,
    content: ''
  },

  onLoad: function (options) {
    this.setData({
      goodsSno: options.goodsSno
    })
  },

  onShow: function () {

  },

  clickStart(e) {
    const {index} = e.currentTarget.dataset;
    this.setData({
      starNum: index + 1
    });
  },

  uploadImg() {
    const that = this;
    const localImgs = this.data.localImgs;
    wx.chooseImage({
      count: 9 - localImgs.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        if (res.errMsg === "chooseImage:ok") {
          console.log(res);
          that.setData({
            localImgs: localImgs.concat(res.tempFilePaths)
          })
        }
      }
    })
  },

  uploadDIY(filePath, idx) {
    const that = this;
    return new Promise((resolve, reject) => {
      const uploadTask = wx.uploadFile({
        url: that.data.BASE_URL + `/shop/applet/discuss/upload`,
        filePath: filePath,
        name: 'file',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": app.globalData.loginInfo.token,
          "custSno": app.globalData.loginInfo.custSno
        },
        formData: {
          "sortId": idx
        },
        success: (res) => {
          let dataRes = JSON.parse(res.data);
          resolve(dataRes)
        },
        fail: (err) => {
          reject('err', err);
        }
      });
      uploadTask.onProgressUpdate((res) => {
        that.setData({
          progress: res.progress
        })
      })
    })
  },

  deleteImg(e) {
    const {index} = e.currentTarget.dataset;
    this.data.localImgs.splice(index, 1);
    this.setData({
      localImgs: this.data.localImgs
    })
  },

  bindinput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  submit() {
    if (!this.data.content) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
        duration: 2000
      });
      return
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    let callback = [];
    const localImgs = this.data.localImgs;
    if (localImgs.length) {
      for (let i = 0; i < localImgs.length; i++) {
        callback.push(this.uploadDIY(localImgs[i], i))
      }
      Promise.all(callback).then((res) => {
        let imgsIdx = res.map((item) => {
          return item.object
        }).join();
        this.estimate(imgsIdx)
      })
    } else {
      this.estimate()
    }
  },

  estimate(imgsIdx = '') {
    const starNum = this.data.starNum;
    saveDiscuss({
      sno: this.data.goodsSno,
      content: this.data.content,
      imgs: imgsIdx,
      level: starNum
    }).then((res) => {
      wx.hideLoading();
      if (res.data.code === 200) {
        wx.showToast({
          title: '评论成功',
          icon: 'none',
          duration: 1500,
          mask: true
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
});