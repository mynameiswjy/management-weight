import {findAllProvince, findByParentCode, addAddress} from "../../api/index"
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
    selectIdx: [0, 0, 0],
    cityCode: '',
    districtCode: '',
    addressVal: '',
    areaVal: '',
    UserName: '',
    UserPhone: '',
    IsOpenAddAddrTemp: false
  },
  attached() {
    /*this.initData()*/
    this.provinceData();
  },
  methods: {
    addAddrBtn() {
      const globalData = this.data;
      const provinceData = globalData.provinceData;
      const selectIdx = globalData.selectIdx;
      if (!globalData.UserName||!globalData.UserPhone||!globalData.areaVal||!globalData.addressVal) return;
      if(!(/^1[3456789]\d{9}$/.test(globalData.UserPhone))){
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 1000
        });
        return false;
      }
      addAddress({
        cseName: globalData.UserName,
        csePhone: globalData.UserPhone,
        address: globalData.areaVal,
        defaulted: true,
        province: provinceData[0][selectIdx[0]].code,
        city: provinceData[1][selectIdx[1]].code,
        district: provinceData[2][selectIdx[2]].code,
        town: 0,
        custSno: app.globalData.loginInfo.custSno
      }).then((res) => {
        if (res.data.code === 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1000
          });
          this.triggerEvent('address', {
            cseName: globalData.UserName,
            csePhone: globalData.UserPhone,
            address: globalData.areaVal,
            addressVal: globalData.addressVal
          });
          this.setData({
            IsOpenAddAddrTemp: false
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          });
        }
      })
    },
    bindarea(e) {
      this.setData({
        areaVal: e.detail.value
      })
    },
    bindchange(e) {
      const idxArr = e.detail.value;
      const province = this.data.province;
      this.setData({
        selectIdx: idxArr,
        addressVal: province[0][idxArr[0]] + ' ' + province[1][idxArr[1]] + ' ' + province[2][idxArr[2]]
      })
    },
    getUserName(e) {
      this.setData({
        UserName: e.detail.value
      });
    },
    getUserPhone(e) {
      this.setData({
        UserPhone: e.detail.value
      });
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
    },
    showTemp() {
      this.setData({
        IsOpenAddAddrTemp: true
      })
    },
    closeTemp() {
      this.setData({
        IsOpenAddAddrTemp: false
      })
    }
  }
});