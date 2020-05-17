import {login} from "../../api/index";

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
      this.triggerEvent('cansel', {});
    },

    getPhoneNumber(e) {
      console.log(e, 'phone');
      const that = this;
      wx.showLoading({
        title: '获取中',
      });
      const {
        encryptedData = null, iv = null, errMsg
      } = e.detail;
      if (errMsg === "getPhoneNumber:ok") {
        wx.login({
          success(e) {
            login({
              code: e.code,
              encryptedData: encryptedData,
              iv: iv
            }).then((res) => {
              wx.hideLoading();
              if (res.data.code === 200) {
                const data = res.data.object;
                if (data.token) {
                  app.globalData.loginInfo.hasLogin = true;
                  that.setData({
                    showPopup: false
                  })
                }
                app.syncLoginInfo(data);
                that.triggerEvent('succCallBack', {});
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }).catch((err) => {
              console.log(err);
              wx.hideLoading();
              wx.showToast({
                title: '获取用户信息失败',
                icon: 'none',
                duration: 2000
              })
            })
          }
        })
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '您拒绝了授权，无法为您登录',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
});