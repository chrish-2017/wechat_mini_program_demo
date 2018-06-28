//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    load:[
      {
        no:'10010575',
        startTime:'16.02.2017 08:00',
        endTime:'18.02.2017 18:00'
      },
      {
        no:'10010575',
        startTime:'16.02.2017 08:00',
        endTime:'18.02.2017 18:00'
      },
      {
        no:'10010575',
        startTime:'16.02.2017 08:00',
        endTime:'18.02.2017 18:00'
      },
      {
        no:'10010575',
        startTime:'16.02.2017 08:00',
        endTime:'18.02.2017 18:00'
      },
      {
        no:'10010575',
        startTime:'16.02.2017 08:00',
        endTime:'18.02.2017 18:00'
      }
    ],
    userInfo: {}
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
      //console.log(userInfo.nickName)
      wx.setNavigationBarTitle({
        title: "Hi, "+ userInfo.nickName
      })
    })
  },
  onReady: function(){
    
  },
 //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
})
