var util = require("../../utils/util.js");
var app = getApp()
Page({
  data: {
    carouselImages: [
      '../../images/slide.jpg',
      '../../images/slide.jpg',
      '../../images/slide.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    goods:{name:'英国KOOOOOO18寸防水双肩包防水双肩包防水双肩包',price:'129',tag:'英国KOOOOOO18寸|防水双肩包|防水双肩包|防水双肩包|防水双肩包|防水双肩包',stock:'127',picUrl:'../../images/goods.jpg'},
    chooseTips:'请选择颜色/尺码',
    rightIcon:'../../images/right.png',
    showLayer:false,
    animationData:{},
    animationShadowData:{},
    minusIcon:'../../images/minusIcon.png',
    addIcon:'../../images/addIcon.png',
    closeIcon:'../../images/close.png',
    colorArray:['黄色','红色','绿色'],
    sizeArray:['14寸','16寸','18寸'],
    num:1,
    mainView:1,
    contactIcon:'../../images/Customerservice.png',
    cartIcon:'../../images/productCart.png',
  },
  bindShowLayer: function(){
    this.setData({
      showLayer:!this.data.showLayer
    })
    var that = this;
    util.showAnimation.call(that);
  },
  bindCloseIcon:function(){
    var that = this;
    util.hideAnimation.call(that);
  },
  typeFormSubmit: function(e){
    var data = e.detail.value;
    if(data.color && data.size){
      var chooseTips = '已选择 '+data.color+'/'+data.size+'/'+data.number+'件';
      this.setData({
      chooseTips:chooseTips
    })
    }
    var that = this;
    util.hideAnimation.call(that);
  },
  bindChooseType:function(e){
    var data = e.target.dataset;
    if(data.color >= 0){
      this.setData({
        choosedColor:data.color
      })
    }
    if(data.size >= 0){
      this.setData({
        choosedSize:data.size
      })
    }  
  },
  bindAddIcon: function(e){
    var num = this.data.num;
    num++;
    this.setData({
      num: num
    })
  },
  bindMinusIcon: function(e){
    var num = this.data.num;
    if(num > 1){
      num--;
    }
    this.setData({
      num: num
    })
  },
  bindNavItem: function(e){
    this.setData({mainView: e.target.dataset.view})
  },
  bindAddCart: function(){
    /*wx.showToast({
    title: '添加成功',
    icon: 'success',
    duration: 3000
    })*/
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  bindToPay: function(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  }
})
