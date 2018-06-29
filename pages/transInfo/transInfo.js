var app = getApp()
var hostString = app.globalData.hostString
Page({
  data: {
    goodsIcon:'../../images/goods.jpg',
    stateArray:["运输中", "已签收"]
  },
  onLoad: function(e){
    var id = e.id;
    var transportNo = e.transportNo;
    var that = this;
    wx.request({
      url: hostString + '/intranet/express/searchExpress',
      data: { id: id, transportNo: transportNo},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        var data = JSON.parse(res.data.o);
        var transInfo = data.result;
        if(transInfo){
          var list = transInfo.list;
          list.reverse();
          transInfo.list = list;
        }else{
          var transInfo = {
            status: 0,
            company: '',
            no: '',
            list: []
          };
        }
        that.setData({
          transInfo: transInfo
        });
      }
    });
  }
})