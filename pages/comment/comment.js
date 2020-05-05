import {discussList} from "../../api/comment"
const app = getApp();

Page({
  data: {
    pageIdx: 1,
    commentList: [
      {
        userName: '王一闪',
        avatar: '',
        "goodsSno": "123",
        "custSno": "321",
        "discussantContent": "这是评论内容，需要人工审核的哦",
        "status": "pass",
        "imgs":
          [
            '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/106510/33/3264/95310/5dde08dfE88abf71b/5e6addcea7b46d0d.jpg!cc_100x100!q70.dpg.png'
          ],
        "level": 5
      },
      {
        userName: '王一闪',
        avatar: '',
        "goodsSno": "123",
        "custSno": "321",
        "discussantContent": "djfsd hfskdfh hkjsd fkjsdhfjkdsrjkg你发个变更登记良好的该地块的观点的反馈给加入配电柜的看法地方快递费开工了老地方",
        "status": "pass",
        "imgs":
          [
            '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/106510/33/3264/95310/5dde08dfE88abf71b/5e6addcea7b46d0d.jpg!cc_100x100!q70.dpg.png',
            '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/106510/33/3264/95310/5dde08dfE88abf71b/5e6addcea7b46d0d.jpg!cc_100x100!q70.dpg.png'
          ],
        "level": 5
      },
      {
        userName: '王一闪',
        avatar: '',
        "goodsSno": "123",
        "custSno": "321",
        "discussantContent": "这是评论内容，需要人工审核的哦",
        "status": "pass",
        "imgs":
          [
            '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/96908/4/14043/44963/5e61cbbaE964a5718/ae4ddc25a189426b.jpg!cc_100x100!q70.dpg.png',
            '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/96908/4/14043/44963/5e61cbbaE964a5718/ae4ddc25a189426b.jpg!cc_100x100!q70.dpg.png',
            '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/96908/4/14043/44963/5e61cbbaE964a5718/ae4ddc25a189426b.jpg!cc_100x100!q70.dpg.png',
            "//img30.360buyimg.com/shaidan/s128x96_jfs/t1/93358/2/3299/62111/5dde08deEe9fe3310/348fec8610c9d2d5.jpg!cc_100x100!q70.dpg.png",
            '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/106510/33/3264/95310/5dde08dfE88abf71b/5e6addcea7b46d0d.jpg!cc_100x100!q70.dpg.png'
          ],
        "level": 3
      }
    ]
  },

  onLoad: function (options) {
    discussList({
      goodsSno: '3802278231621427204',
      page: this.data.pageIdx,
      pageSize: 10
    }).then((res) => {
      console.log(res);
    })
  },

  onShow: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
});