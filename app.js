//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!this.globalData.userInfo) {
      this.login();
    }
  },
  login: function(){
    var that = this
    //调用登录接口
    wx.login({
      success: function (res) {
        console.log("code==");
        console.log(res);
        that.getUserInfo(res.code);
      }
    })
  },
  getUserInfo: function (wxCode) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log("UserInfo==");
        console.log(res);
        that.getSessionKey(wxCode, res);
      }
    })
  },
  getSessionKey: function (wxCode, data){
    var that = this;
    wx.request({
      url: this.globalData.hostString + '/intranet/wxpay/getSessionKey',
      data: { wxCode: wxCode },
      success: function (res) {
        console.log("SessionKey==");
        console.log(res);
        var result = res.data.o;
        for (var key in result) {
          data.sessionId = key;
          that.deCodeUserInfo(data);
        }
      }
    })
  },
  deCodeUserInfo: function(data){
    var that = this;
    wx.request({
      url: this.globalData.hostString + '/intranet/wxpay/decodeUserInfo',
      data: data,
      success: function (res) {
        console.log("decodeUserInfo==");
        console.log(JSON.parse(res.data.o));
        var userInfo = JSON.parse(res.data.o);
        that.getUserId(userInfo);
      }
    })
  },
  getUserId: function (userInfo){
    userInfo.wechatNo = userInfo.openId;
    var that = this;
    wx.request({
      url: this.globalData.hostString + '/intranet/user/add',
      data: userInfo,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("userId==");
        console.log(res);
        userInfo.id = res.data.billNumber;
        console.log(userInfo);
        that.globalData.userInfo = userInfo;
      }
    })
  },
  getGlobalData: function () {
    return this.globalData;
  },
  globalData:{
    userInfo: {
      id: 88,
      nickName: '鱼香茄子不甜'
    },
    hostString: 'https://easy-mock.com/mock/5b3357dce144ee0b9ede2e12/store'
  }
})
