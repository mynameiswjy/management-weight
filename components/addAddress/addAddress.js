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
    provinceData: [],
    cityCode: '',
    districtCode: ''
  },
  attached() {
    /*this.initData()*/
    this.provinceData();
  },
  methods: {
    bindchange(e) {
      console.log(e, 'bindchange');
    },
    bindcolumnchange(e) {
      const target = e.detail;
      const column = target.column;
      const value = target.value;
      const code = this.data.provinceData[column][value].code;
      switch (column) {
        case 0:
          this.data.cityCode = code;
          this.cityData(code, 'city');
          this.data.province[2] = ['请选择'];
          this.data.provinceData[2] = [];
          break;
        case 1:
          this.data.districtCode = code;
          this.cityData(code, 'district');
          break;
        case 2:
          break;
        default:
          console.log(e, '有问题')
      }
    },
    cityData(code, type) {
      return new Promise((resolve, reject) => {
        findByParentCode({parentCode: code}, (res) => {
          if (res.data.code === 200) {
            let data = res.data.object;
            let city = data.map((item) => {
              return item.name
            });
            if (type === 'city') {
              this.data.province[1] = city;
              this.data.provinceData[1] = data;
              this.setData({
                province: this.data.province
              });
              resolve(data)
            } else if (type === 'district') {
              this.data.province[2] = city;
              this.data.provinceData[2] = data;
              this.setData({
                province: this.data.province
              });
              resolve(data)
            }
          }
        });
      })
    },
    provinceData() {
      return new Promise((resolve, reject) => {
        findAllProvince({}, (res) => {
          if (res.data.code === 200) {
            let data = res.data.object;
            let province = data.map((item) => {
              return item.name
            });
            this.data.provinceData[0] = data;
            this.setData({
              province: [province, ['请选择'], ['请选择']]
            });
            resolve(data)
          } else {
            reject(res)
          }
        })
      }).then((res) => {
         return this.cityData(res[0].code, 'city')
      }).then((res) => {
        this.cityData(res[0].code, 'district')
      })
    }
  }
});