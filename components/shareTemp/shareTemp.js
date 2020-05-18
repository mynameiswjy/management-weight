import {ShareImg} from "../../api/index";
const utils = require("../../utils/util");

let app = getApp();

Component({
  properties: {

  },
  data: {
    openShareTemp: false,
    goodsData: null,
    IsShareImg: false,
    shareImg: ''
  },
	lifetimes() {

  },
  methods: {
    saveImgBtn() {
      wx.showLoading({
        title: '保存中，请耐心等待',
        mask: true
      });
      utils.saveMinappToPhoto(this.data.shareImg, () => {
        this.closeImgs()
      })
    },

    canselBtn(e) {
      this.data.goodsData = e;
      this.setData({
        openShareTemp: e.isOpen === 1 ? true : false
      })
    },

    previewImage: function() {
      const imgUrl = this.data.shareImg;
      wx.previewImage({
        urls: [imgUrl]
      })
    },

    closeImgs() {
      this.setData({
        IsShareImg: false
      })
    },

    uploadBtn() {
      wx.showLoading({
        title: '加载中',
      });
      if (this.data.shareImg) {
        this.setData({
          openShareTemp: false,
          shareImg: this.data.shareImg,
          IsShareImg: true
        })
        return
      }
      const goodsData = this.data.goodsData;
      ShareImg({
        scene: goodsData.scene,
        page: goodsData.page,
        goodsSno: goodsData.goodsSno,
        specsGoodsSno: goodsData.specsGoodsSno
      }).then((res) => {
        if (res.data.code === 200) {
          this.setData({
            IsShareImg: true,
            openShareTemp: false,
            shareImg: res.data.object[0]
          })
        }
      })
    },

    bindload() {
      wx.hideLoading();
    },

    stop() {
      return
    }
  }
});