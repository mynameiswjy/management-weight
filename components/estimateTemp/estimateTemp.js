const config = require("../../config.globle");
const app = getApp()

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    IsOpenAllBtn: {// 是否显示全部按钮
      type: Boolean,
      value: false
    }
  },
  data: {
    list: [
      {
        avatar: config.BASE_URL + '/upload/details/default_avatar.png',
        nickName: '1688',
        graded: 3,
        content: '坚持的是否会发染发可能成就从丹江口市 v 吃饭的 成都市传递函数健康的减肥大家好健康快乐考虑到',
        imgs: [
          '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/96908/4/14043/44963/5e61cbbaE964a5718/ae4ddc25a189426b.jpg!cc_100x100!q70.dpg.png',
          "//img30.360buyimg.com/shaidan/s128x96_jfs/t1/93358/2/3299/62111/5dde08deEe9fe3310/348fec8610c9d2d5.jpg!cc_100x100!q70.dpg.png",
          '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/106510/33/3264/95310/5dde08dfE88abf71b/5e6addcea7b46d0d.jpg!cc_100x100!q70.dpg.png'
        ],
        date: '2020-03-06'
      },{
        avatar: config.BASE_URL + '/upload/details/default_avatar.png',
        nickName: '1688',
        graded: 3,
        content: '坚持的是否会发染发可能成就从丹江口市 v 吃饭的 成都市传递函数健康的减肥大家好健康快乐考虑到',
        imgs: [
          '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/96908/4/14043/44963/5e61cbbaE964a5718/ae4ddc25a189426b.jpg!cc_100x100!q70.dpg.png',
          "//img30.360buyimg.com/shaidan/s128x96_jfs/t1/93358/2/3299/62111/5dde08deEe9fe3310/348fec8610c9d2d5.jpg!cc_100x100!q70.dpg.png",
          '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/106510/33/3264/95310/5dde08dfE88abf71b/5e6addcea7b46d0d.jpg!cc_100x100!q70.dpg.png'
        ],
        date: '2020-03-06'
      },
    ],
    BASE_URL: config.BASE_URL
  },
  lifetimes: {
    attached() {}
  },
  methods: {
    commentlist(e) {
      this.setData({
        list: e
      })
    },
    checkAll() {
      wx.navigateTo({
        url: `/pages/comment/comment?goodsSno=${this.data.list[0].goodsSno}`
      })
    }
  }

});