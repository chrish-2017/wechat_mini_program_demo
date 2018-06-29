var app = getApp()
Page({
  data: {
    
  },
  onLoad: function(e){
    var globalData = app.getGlobalData()
    this.setData({
      hostString: globalData.hostString,
      userInfo: globalData.userInfo
    });
    var parentTypeId = e.parentTypeId;
    var goodsTypeId = e.goodsTypeId;
    var that = this;
    if(parentTypeId > 0){
      wx.request({
        url: this.data.hostString + '/intranet/goods/getChildrenType',
        data: { goodsTypeId: parentTypeId },
        success: function (res) {
          console.log("goods==");
          console.log(res);
          var goodsList = res.data.records;
          that.setData({
            goodsList: goodsList
          });
        }
      })
    }else{
      wx.request({
        url: this.data.hostString + '/intranet/goods/getListByPage',
        data: { goodsTypeId: goodsTypeId },
        success: function (res) {
          console.log("goods==");
          console.log(res);
          var goodsList = res.data.o.records;
          that.setData({
            goodsList: goodsList
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