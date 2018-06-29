var app = getApp()
Page({
  data: {
    
  },
  onLoad: function(){
    var globalData = app.getGlobalData()
    this.setData({
      hostString: globalData.hostString,
      userInfo: globalData.userInfo
    });
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/goodsType/getAllTypeList',
      success: function(res) {
        console.log("goodstype==");
        console.log(res);
        var goodsInfo = res.data.records;
        that.setData({
          goodsInfo:goodsInfo
        });    
      }
    })
  },
  toList: function(e){
    var goodsTypeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsList/goodsList?goodsTypeId='+goodsTypeId,
    })
  }
})

