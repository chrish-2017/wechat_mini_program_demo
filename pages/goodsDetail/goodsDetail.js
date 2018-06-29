var WxParse = require('../../wxParse/wxParse.js')
var util = require("../../utils/util.js")
var app = getApp()
var hostString = app.globalData.hostString
var userInfo = app.globalData.userInfo
Page({
  data: {
    chooseTips: '请选择规格/数量',
    rightIcon: '../../images/right.png',   
    contactIcon:'../../images/Customerservice.png',
    cartIcon:'../../images/productCart.png',
    closeIcon:'../../images/close.png', 
    minusIcon:'../../images/minusIcon.png',
    addIcon:'../../images/addIcon.png',
    mainView:1,
    choosed:0,
    counts:1
  },
  onLoad: function(e){
    var goodsId = e.goodsId;
    var that = this;
    wx.request({
      url: hostString + '/intranet/goods/get',
      data: {goodsId: goodsId},
      success: function(res) {
        console.log("goods==");
        console.log(res);
        var goodsInfo = res.data.o;
        var goodsAttrs = goodsInfo.goodsAttrs;
        var goodsImgs = goodsInfo.goodsImgs;
        var description = goodsInfo.description;
        var specificationsModel = goodsInfo.specificationsModel;
        var carouselImages = [];
        var brandImage;
        for(var i=0; i<goodsAttrs.length; i++){
          var orderClosingTime = goodsInfo.goodsAttrs[i].orderClosingTime;
          if (new Date(orderClosingTime) < new Date()){
            goodsAttrs[i].orderClose = true;
          }
        }
        for(var i=0; i<goodsImgs.length; i++){
          var imageType = goodsImgs[i].imageType;
          var imgName = goodsImgs[i].image.imgName;
          if(imageType == 1){
            carouselImages.push(imgName);
          }else if(imageType == 3) {
            brandImage = imgName;
          }
        }
        WxParse.wxParse('description', 'html', description, that, 0);
        specificationsModel = specificationsModel.split("\n");
        goodsInfo.specificationsModel = specificationsModel;
        that.setData({
          carouselImages:carouselImages,
          goodsInfo:goodsInfo,
          goodsAttrs:goodsAttrs,
          brandImage:brandImage,
          hostString:hostString
        });    
      }
    })
  },
  bindNavItem: function(e){
    this.setData({
      mainView: e.target.dataset.view
    })
  },
  bindShowLayer: function(e){
    var oper = e.currentTarget.dataset.oper;
    this.setData({
      oper: oper,
      showLayer:!this.data.showLayer
    })
    var that = this;
    util.showAnimation.call(that);
  },
  bindCloseIcon:function(){
    var that = this;
    util.hideAnimation.call(that);
  },
  bindChooseType:function(e){
    var choosed = e.currentTarget.dataset.choosed;
    this.setData({
      choosed:choosed
    })
  },
  bindAddIcon: function(e){
    var counts = this.data.counts;
    counts++;
    this.setData({
      counts: counts
    })
  },
  bindMinusIcon: function(e){
    var counts = this.data.counts;
    counts--;
    this.setData({
      counts: counts
    })
  },
  typeFormSubmit: function(e){
    var oper = this.data.oper;
    var data = e.detail.value;
    /*wx.request({
      url: hostString + '/intranet/cart/addGoodsAttr',
      data: {userId: userInfo.id, goodsAttrId: data.goodsAttrId, counts: data.counts},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if(res.statusCode == 200){
          if(oper == 1){
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 3000
            }) 
          }else{
            wx.navigateTo({
              url: '../pay/pay?oper=1&goodsAttrId='+data.goodsAttrId+'&count='+data.counts,
            }) 
          }
        }
      }
    })*/
    if (oper == 1) {
      wx.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 3000
      })
    } else {
      wx.navigateTo({
        url: '../pay/pay?oper=1&goodsAttrId=' + data.goodsAttrId + '&count=' + data.counts,
      })
    }
    var that = this;
    util.hideAnimation.call(that);
  },
  toCart: function(){
    wx.switchTab({
      url: '../cart/cart',
    })
  }
})
