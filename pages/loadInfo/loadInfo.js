// pages/test/test.js
Page({
  data:{
    logo:'../../images/logo.png',
    welcomeMsg:'欢迎关注我们的公众号，请点击屏幕下方按钮扫描装载二维码，谢谢',
    gpsUploadMsg:'为确保GPS正常上传，请激活设置"提供位置信息"，详情请见：帮助-地图问题',
    scanFailMsg:'当前测试公众号无法加载LSALPHA环境的装载二维码，请检查。',
    inform:{
      date:'11月24日',
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
        }
      ]
    }
  },
  toDetail: function(){
    wx.navigateTo({
      url: '../loadInformation/loadInformation',
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})