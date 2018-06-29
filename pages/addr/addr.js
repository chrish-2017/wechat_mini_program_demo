var util = require('../../utils/util.js');
var app = getApp()
var hostString = app.globalData.hostString
var userInfo = app.globalData.userInfo
Page({
  data: { 
    address: {
      proIndex: 0,
      cityIndex: 0,
      areaIndex: 0,
      isDefault: true
    },
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png'
  },
  onLoad: function(e){
    var addressId = e.addressId;
    var that = this;
    if(addressId > 0){
      wx.request({
        url: hostString + '/intranet/address/get',
        data: {id: addressId},
        success: function(res) {
          console.log("address==");
          console.log(res);
          that.setData({
            address:res.data.o
          });
          that.init();
        }
      });
    }else{
      that.init();
    }
  },
  init: function(){
    var that = this;
    util.getAddrInfo(function (data) {
      var address = that.data.address;
      var proArray = data;
      var cityArray = proArray[address.proIndex].sub;
      var areaArray = cityArray[address.cityIndex].sub || [];
      that.setData({
        proArray: proArray,
        cityArray: cityArray,
        areaArray: areaArray,
        hostString: hostString,
        userInfo: userInfo
      });
    });
  },
  fullNameChange: function(e){
    var address = this.data.address;
    address.fullName = e.detail.value;
    this.setData({
      address:address
    })
  },
  phoneChange: function(e){
    var address = this.data.address;
    address.phone = e.detail.value;
    this.setData({
      address:address
    })
  },
  detailedAddressChange: function(e){
    var address = this.data.address;
    address.detailedAddress = e.detail.value;
    this.setData({
      address:address
    })
  },
  bindProChange: function(e){
    var address = this.data.address;
    var proArray = this.data.proArray;
    var index = e.detail.value;
    address.proIndex = index;
    this.setData({
      address:address,
      cityArray:proArray[index].sub,
      areaArray:(proArray[index].sub)[0].sub
    })
  },
  bindCityChange: function(e){
    var address = this.data.address;
    var cityArray = this.data.cityArray;
    var index = e.detail.value;
    address.cityIndex = index;
    this.setData({
      address:address,
      areaArray:cityArray[index].sub
    })
  },
  bindAreaChange: function(e){
    var address = this.data.address;
    var index = e.detail.value;
    address.areaIndex = index;
    this.setData({
      address:address
    })
  },
  bindCheckbox: function(){
    var address = this.data.address;
    address.isDefault = !address.isDefault;
    this.setData({
      address: address
    })
  },
  addrFormSubmit: function(e){
    var data = e.detail.value;
    var that = this;
    var oper = 'add';
    if(data.id > 0){
      oper = 'update';
    }
    /*wx.request({
      url: hostString + '/intranet/address/'+oper,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if(res.statusCode == 200){
          wx.navigateBack();
        }
      }
    })*/
    wx.navigateBack();
  }
})