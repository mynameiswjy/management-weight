import {login} from "../../api/index";

let app = getApp();

Component({
  properties: {

  },
  data: {
    showUserInfo: false,
    InCircleRules: [
      {
        name: '打卡耐力榜',
        value: '按用户圈子内累计打卡次数进行排序，累计打卡次数最多的用户排在最前'
      }, {
        name: '打卡连续榜',
        value: '按用户圈子内连续打卡天数作为排名。连续时间相同，按耐力榜单排名'
      }, {
        name: '注：'
      }, {
        value: '1、补卡不计算在打卡次数中'
      }, {
        value: '2、当多个用户为统一打卡数据时，将并列为同一名次'
      }
    ],
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