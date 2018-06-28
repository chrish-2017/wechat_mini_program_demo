var util = require("../../utils/util.js");
var app = getApp();
Page({
  data: {
    chooseTips:'收货地址',
    rightIcon:'../../images/right.png',
    showLayer:false,
    animationData:{},
    animationShadowData:{},
    addrList:[{name:'鱼香茄子不甜',number:'18380447856',addr:'成都高新区天府软件园',check:false}],
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    editIcon:'../../images/edit.png',
    orderList:[{id:'1',number:'123456789',status:'已取消',name:'[90分]户外休闲双肩包',tag:'灰色',price:'249',num:'1',picUrl:'../../images/goods.jpg'}],
    num:0,
    totalPrice:0
  },
  onLoad: function(){
    var orderList = this.data.orderList;
    var num = 0;
    var totalPrice = 0;
    for(var i=0; i<orderList.length; i++){
        num += parseInt(orderList[i].num);
        totalPrice += parseInt(orderList[i].price);
    }
    this.setData({
        num: num,
        totalPrice: totalPrice
    })
  },
  bindShowLayer:function(){
    this.setData({
      showLayer:!this.data.showLayer
    })
    var that = this;
    util.showAnimation.call(that);
  },
  addrFormSubmit:function(e){
    var data = e.detail.value;
    if(data.name){
      var chooseTips = data.name+' '+data.number+' \n'+data.addr;
      this.setData({
        chooseTips:chooseTips
      })
    }
    var that = this;
    util.hideAnimation.call(that);
  },
  bindCheckbox: function(e){
    var addrList = this.data.addrList;
    var index = e.target.dataset.index;
    addrList[index].check = !addrList[index].check;
    this.setData({
      addrList: addrList
    })
  },
  bindToAddr: function(){
    wx.navigateTo({
      url: '../addr/addr',
    })
  },
  bindPay:function(){
    /*wx.showModal({
        title: '提示',
        content: '请选择收货地址',
        showCancel:false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
    })*/
    wx.switchTab({
      url: '../mine/mine',
    })
  }
})