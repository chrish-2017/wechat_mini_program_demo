var app = getApp()
Page({
  data: {
    goodsInfo: [
      {url:'../../images/goods.jpg', des:'双肩背包', price:'30.00'},
      {url:'../../images/goods.jpg', des:'双肩背包', price:'30.00'},
      {url:'../../images/goods.jpg', des:'双肩背包', price:'30.00'},
      {url: '../../images/goods.jpg', des: '双肩背包', price: '30.00'}
    ]
  },
  bindGoodsItem: function(){
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail',
    })
  }
})