let app = getApp();

Component({
  properties: {
    openCover: {
      type: Boolean,
      value: false
    }
  },
  options: {
    // addGlobalClass: true,
  },
  data: {
    showPopup: false,
    navigateUrl: null,
    login: false,
  },
	lifetimes() {

  },
  methods: {

    checkSession() {
      wx.showLoading({
        title: '加载中',
      })

    },
    showPopup() {
      this.setData({
        showPopup: true
      })
    },
    hidePopup() {
			this.setData({
        showPopup: false
      })
    },

    getPhoneNumber(e) {
      console.log(e, 'phone');
      wx.showLoading({
        title: '获取中',
      })
      const {
        encryptedData = null, iv = null
      } = e.detail

    }
  }
})