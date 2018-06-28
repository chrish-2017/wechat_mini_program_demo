var app = getApp()
Page({
  data: {
    categoryInfos: [
      {url:'../../images/love.png', des:'L.O.V.E', name:'情人热恋'},
      {url:'../../images/love.png', des:'L.O.V.E', name:'情人热恋'},
      {url:'../../images/love.png', des:'L.O.V.E', name:'情人热恋'},
      {url:'../../images/love.png', des:'L.O.V.E', name:'情人热恋'}
    ]
  },
  bindCategoryItem: function(){
    wx.navigateTo({
      url: '../goodsList/goodsList',
    })
  }
})

