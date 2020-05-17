import {ShareImg} from "../../api/index";

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

    uploadBtn() {
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

    stop() {
      return
    }
  }
});