
const app = getApp()

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
  },
  data: {
    goodsList: [
      {
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/59506/33/14676/503513/5dc2907eE8450f0f7/5284aeea0e76884b.jpg!q70.dpg.png',
        name: '中兴 ZTE Blade 20 Smart 孝心版 松石绿 4GB+1中兴',
        price: 50,
        sharePrice: 0.3,
        isLook: 1
      },{
        img: 'http://img30.360buyimg.com/mobilecms/s372x372_jfs/t1/90468/3/10407/150794/5e19e46fE6b30adaf/09ad6e5b1ebb82f7.jpg!q70.dpg.png',
        name: '中兴 ZTE Blade 20 Smart 孝心版 松石绿 4GB+1中兴',
        price: 50,
        sharePrice: 0.3
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/51319/23/10981/144232/5d7e10c7E1515a0f5/b7ace9f7e89c1511.jpg!q70.dpg.png',
        name: '中兴 ZTE Blade 20 Smart 孝心版 松石绿 4GB+1中兴',
        price: 50,
        sharePrice: 0.3,
        isLook: 0
      },{
        img: '//img13.360buyimg.com/mobilecms/s372x372_jfs/t1/85661/39/14657/101811/5e688675Eac2619e9/ef3550e8642515f1.jpg!q70.dpg.png',
        name: '中兴 ZTE Blade 20 Smart 孝心版 松石绿 4GB+1中兴',
        price: 50,
        sharePrice: 0.3,
        isLook: 1
      },{
        img: '//img10.360buyimg.com/mobilecms/s372x372_jfs/t1/80566/8/14692/261857/5dc28fa7E2f6994e7/def73a3dbd49cc16.jpg!q70.dpg.png',
        name: '中兴 ZTE Blade 20 Smart 孝心版 松石绿 4GB+1中兴',
        price: 50,
        sharePrice: 0.3
      },
    ]
  },
  lifetimes: {
    attached() {}
  },
  methods: {

  }

});