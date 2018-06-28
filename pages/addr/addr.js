var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    proIndex:0,
    cityIndex:0,
    areaIndex:0,
    proArray:[],
    cityArray:[],
    areaArray:[],
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    checked:false
  },
  onLoad: function(){
    var that = this;
    util.getAddrInfo(function(data){
      console.log(data);
      that.setData({
        proArray: data
      });
    });
  },
  bindProChange: function(e){
    var proArray = this.data.proArray;
    var index = e.detail.value;
    this.setData({
      proIndex:index,
      cityArray:proArray[index].sub,
      areaArray:(proArray[index].sub)[0].sub,
      cityIndex:0,
      areaIndex:0
    })
  },
  bindCityChange: function(e){
    var cityArray = this.data.cityArray;
    var index = e.detail.value;
    this.setData({
      cityIndex:index,
      areaArray:cityArray[index].sub,
      areaIndex:0
    })
  },
  bindAreaChange: function(e){;
    var index = e.detail.value;
    this.setData({
      areaIndex:index
    })
  },
  bindCheckbox: function(e){
    this.setData({
      checked: !this.data.checked
    })
  },
  addrFormSubmit: function(e){
    var data = e.detail.value;
    console.log(data);
    wx.switchTab({
      url: '../mine/mine',
    })
  }
})