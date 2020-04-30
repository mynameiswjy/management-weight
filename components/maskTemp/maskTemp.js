import {login} from "../../api/index";

let app = getApp();

Component({
  properties: {

  },
  data: {
    showUserInfo: false
  },
	lifetimes() {

  },
  methods: {
    showTemp() {
      this.setData({
        showUserInfo: true
      })
    }
  }
});