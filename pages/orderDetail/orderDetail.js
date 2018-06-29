var app = getApp()
var hostString = app.globalData.hostString
var userInfo = app.globalData.userInfo
Page({
  data:{
    stateArray: ["", "待付款", "订单已取消", "待发货", "已发货", "交易成功", "已申请退款", "部分发货", "", "", "", "已申请退货", "已申请退款", "店铺允许退货", "退款成功", "退货成功", "再次发货", "退货成功", "退款成功", "退货中"]
  },
  onLoad: function(e){
    var numberNo = e.numberNo;
    this.setData({
      numberNo: numberNo || ''
    });
    this.init();
  },
  onShow: function () {
    this.init();
  },
  init: function(){
    var numberNo = this.data.numberNo;
    var that = this;
    wx.request({
      url: hostString + '/intranet/order/getMyOrderDetails',
      data: { numberNo: numberNo },
      success: function (res) {
        console.log("orderDetail==");
        console.log(res);
        var orderList = res.data.o;
        var addrInfo = orderList.orderList[0].address;
        var chooseTips = addrInfo.fullName + ' ' + addrInfo.phone + ' \n' + addrInfo.province + addrInfo.city + addrInfo.county + addrInfo.detailedAddress;
        that.setData({
          orderList: orderList,
          chooseTips: chooseTips,
          hostString: hostString
        });
      }
    });
  },
  cancelOrder: function (e) {
    var numberNo = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: hostString + '/intranet/order/cancelOrder',
      data: { numberNo: numberNo, userId: userInfo.id },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.navigateBack();
        }
      }
    });
  },
  confirmOrder: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    var ids = [];
    ids.push(id);
    wx.request({
      url: hostString + '/intranet/order/changeOrder',
      data: { userId: userInfo.id, stauts: 5, ids: ids },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.navigateBack();
        }
      }
    });
  },
  bindCheckTransInfo: function (e) {
    var id = e.currentTarget.dataset.id;
    var transportNo = e.currentTarget.dataset.no;
    wx.navigateTo({
      url: '../transInfo/transInfo?id=' + id + '&transportNo=' + transportNo,
    })
  },
  bindApplyRefund: function (e) {
    var orderId = e.currentTarget.dataset.id;
    var mainView = e.currentTarget.dataset.view;
    wx.navigateTo({
      url: '../refund/refund?orderId=' + orderId + '&mainView=' + mainView,
    })
  }
})
