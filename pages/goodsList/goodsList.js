var app = getApp()
var hostString = app.globalData.hostString
Page({
  data: {
    
  },
  onLoad: function(e){
    var parentTypeId = e.parentTypeId;
    var goodsTypeId = e.goodsTypeId;
    var that = this;
    if(parentTypeId > 0){
      wx.request({
        url: hostString + '/intranet/goods/getChildrenType',
        data: { goodsTypeId: parentTypeId },
        success: function (res) {
          console.log("goods==");
          console.log(res);
          var goodsList = res.data.records;
          that.setData({
            goodsList: goodsList,
            hostString: hostString
          });
        }
      })
    }else{
      wx.request({
        url: hostString + '/intranet/goods/getListByPage',
        data: { goodsTypeId: goodsTypeId },
        success: function (res) {
          console.log("goods==");
          console.log(res);
          var goodsList = res.data.o.records;
          that.setData({
            goodsList: goodsList,
            hostString: hostString
          });
        }
      })
    }
  },
  toDetail: function(e){
    var goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+goodsId,
    })
  }
})