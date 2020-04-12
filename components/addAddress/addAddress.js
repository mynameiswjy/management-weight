import {findAllProvince, findByParentCode} from "../../api/index"
let app = getApp();

Component({
  properties: {

  },
  options: {
    // addGlobalClass: true,
  },
  data: {
    province: [],
    selectIndex: [0, 0, 0]
  },
  attached() {
    /*this.initData()*/
    this.cityData()
  },
  methods: {
    bindchange(e) {
      console.log(e, 'bindchange');
    },
    bindcolumnchange(e) {
      console.log(e);
    },
    cityData() {
      /*Promise.all([this.provinceData()]).then((res) => {
        console.log(res);
      })*/
      this.provinceData()
    },
    provinceData() {
      return new Promise((resolve, reject) => {
        findAllProvince({}, (res) => {
          if (res.data.code === 200) {
            let data = res.data.object;
            let province = data.map((item) => {
              return item.name
            });
            this.setData({
              province: [province, ['请选择'], ['请选择']]
            });
            resolve(data)
          } else {
            reject(res)
          }
        })
      }).then((res) => {
        return new Promise((resolve, reject) => {
          findByParentCode({parentCode: res[0].code}, (res) => {
            if (res.data.code === 200) {
              let data = res.data.object;
              let city = data.map((item) => {
                return item.name
              });
              this.data.province[1] = city;
              this.setData({
                province: this.data.province
              });
              resolve(data)
            }
          })
        })
      }).then((res) => {
        findByParentCode({parentCode: res[0].code}, (res) => {
          let data = res.data.object;
          let district = data.map((item) => {
            return item.name
          });
          this.data.province[2] = district;
          this.setData({
            province: this.data.province
          });
        })
      })

     .catch(() => {
        console.log('省级数据有问题')
      })
    }
  }
});