var app = getApp()
var hostString = app.globalData.hostString
Page({
  data: {
    
  },
  onLoad: function(){
    var that = this;
    wx.request({
      url: hostString + '/intranet/goodsType/getAllTypeList',
      success: function(res) {
        console.log("goodstype==");
        console.log(res);
        var goodsInfo = res.data.records;
        that.setData({
          goodsInfo:goodsInfo,
          hostString:hostString
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

