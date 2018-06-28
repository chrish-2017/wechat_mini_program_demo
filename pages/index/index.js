//index.js
//获取应用实例
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
    categoryInfos: [
      {url:'../../images/slide.jpg', des:'双肩背包'},
      {url:'../../images/slide.jpg', des:'双肩背包'},
      {url:'../../images/slide.jpg', des:'双肩背包'},
      {url:'../../images/slide.jpg', des:'双肩背包'},
      {url:'../../images/slide.jpg', des:'双肩背包'},
      {url:'../../images/slide.jpg', des:'双肩背包'},
      {url:'../../images/slide.jpg', des:'双肩背包'},
      {url:'../../images/slide.jpg', des:'双肩背包'}
    ],
    goodsInfo: [
      {url:'../../images/goods.jpg', des:'双肩背包', price:'30.00'},
      {url:'../../images/goods.jpg', des:'双肩背包', price:'30.00'},
      {url:'../../images/goods.jpg', des:'双肩背包', price:'30.00'},
      {url: '../../images/goods.jpg', des: '双肩背包', price: '30.00'}
    ]
  },
  bindCategoryItem: function(){
    wx.navigateTo({
      url: '../goodsList/goodsList',
    })
  },
  bindGoodsItem: function(){
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail',
    })
  }
})
