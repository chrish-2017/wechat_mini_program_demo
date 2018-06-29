var util = require("../../utils/util.js")
var app = getApp()
var hostString = app.globalData.hostString
var userInfo = app.globalData.userInfo
Page({
  data: {
    rightIcon:'../../images/right.png',
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    editIcon:'../../images/edit.png',
  },
  onLoad: function(e){
    var oper = e.oper;
    if (oper == 1) {
      var goodsAttrId = e.goodsAttrId;
      var count = e.count;
      this.initOne(goodsAttrId, count);
    } else if (oper == 2) {
      var ids = e.ids;
      this.initMore(ids);
    }
  },
  onShow: function(){
    var that = this;
    wx.request({
      url: hostString + '/intranet/address/getAll',
      data: { userId: userInfo.id },
      success: function (res) {
        console.log("address==");
        console.log(res);
        var addrList = res.data.o;
        var chooseTips = '你还没添加收货地址，点击添加地址';
        for (var i = 0; i < addrList.length; i++) {
          if (addrList[i].isDefault) {
            addrList[i].check = true;
            chooseTips = addrList[i].fullName + ' ' + addrList[i].phone + ' \n' + addrList[i].province + addrList[i].city + addrList[i].county + addrList[i].detailedAddress;
          }
        }
        that.setData({
          addrList: addrList,
          chooseTips: chooseTips
        });
      }
    });
  },
  initMore: function (ids){
    var that = this;
    wx.request({
      url: hostString + '/intranet/cart/get',
      data: { ids: ids, userId: userInfo.id },
      success: function (res) {
        console.log("pay==");
        console.log(res);
        var payInfo = res.data.o;
        var addrList = payInfo.defultAddress;
        var orderList = payInfo.orders;
        var chooseTips = '你还没添加收货地址，点击添加地址';
        for (var i = 0; i < addrList.length; i++) {
          if (addrList[i].isDefault) {
            addrList[i].check = true;
            chooseTips = addrList[i].fullName + ' ' + addrList[i].phone + ' \n' + addrList[i].province + addrList[i].city + addrList[i].county + addrList[i].detailedAddress;
          }
        }
        that.setData({
          payInfo: payInfo,
          addrList: addrList,
          orderList: orderList,
          chooseTips: chooseTips,
          hostString: hostString
        })
      }
    })
  },
  initOne: function (goodsAttrId, count){
    var that = this;
    wx.request({
      url: hostString + '/intranet/goodsattr/getGoodsAttr',
      data: { goodsAttrId: goodsAttrId, count: count, userId: userInfo.id },
      success: function (res) {
        console.log("pay==");
        console.log(res);
        var payInfo = res.data.o;
        var addrList = payInfo.defultAddress;
        var orderList = [];
        var chooseTips = '你还没添加收货地址，点击添加地址';
        for (var i = 0; i < addrList.length; i++) {
          if (addrList[i].isDefault) {
            addrList[i].check = true;
            chooseTips = addrList[i].fullName + ' ' + addrList[i].phone + ' \n' + addrList[i].province + addrList[i].city + addrList[i].county + addrList[i].detailedAddress;
          }
        }
        payInfo.counts = payInfo.totalCounts;
        orderList.push(payInfo);
        that.setData({
          payInfo: payInfo,
          addrList: addrList,
          orderList: orderList,
          chooseTips: chooseTips,
          hostString: hostString
        })
      }
    })
  },
  chooseAddr: function(){
    var addrList = this.data.addrList;
    if (addrList.length > 0){
      this.bindShowLayer();
    }else{
      wx.navigateTo({
        url: '../addr/addr?addressId=',
      })
    }
  },
  bindShowLayer:function(){
    this.setData({
      showLayer:!this.data.showLayer
    })
    var that = this;
    util.showAnimation.call(that);
  },
  bindCheckbox: function(e){
    var addrList = this.data.addrList;
    var index = e.target.dataset.index;
    var check = addrList[index].check;
    addrList[index].check = !check;
    for(var i=0; i<addrList.length; i++){
      if(i != index){
        addrList[i].check = check;
      }
    }
    this.setData({
      addrList: addrList
    })
  },
  toAddr: function (e) {
    var addressId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addr/addr?addressId=' + addressId,
    })
  },
  addrFormSubmit:function(e){
    var data = e.detail.value;
    var chooseTips = data.name+' '+data.number+' \n'+data.addr;
    this.setData({
      chooseTips:chooseTips
    })
    var that = this;
    util.hideAnimation.call(that);
  },
  bindPay:function(){
    wx.showModal({
      title: '提示',
      content: '请选择收货地址',
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../mine/mine',
          })
        }
      }
    })
  }
})