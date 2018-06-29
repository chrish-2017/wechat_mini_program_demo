var app = getApp()
Page({
  data:{
    stateArray: ["", "待付款", "订单已取消", "待发货", "已发货", "交易成功", "已申请退款", "部分发货", "", "", "", "已申请退货", "已申请退款", "店铺允许退货", "退款成功", "退货成功", "再次发货", "退货成功", "退款成功", "退货中"]
  },
  onLoad: function(e){
    var globalData = app.getGlobalData()
    var numberNo = e.numberNo;
    this.setData({
      hostString: globalData.hostString,
      userInfo: globalData.userInfo,
      numberNo: numberNo
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
      url: this.data.hostString + '/intranet/order/getMyOrderDetails',
      data: { numberNo: numberNo },
      success: function (res) {
        console.log("orderDetail==");
        console.log(res);
        var orderList = res.data.o;
        var addrInfo = orderList.orderList[0].address;
        var chooseTips = addrInfo.fullName + ' ' + addrInfo.phone + ' \n' + addrInfo.province + addrInfo.city + addrInfo.county + addrInfo.detailedAddress;
        that.setData({
          orderList: orderList,
          chooseTips: chooseTips
        });
      }
    });
  },
  cancelOrder: function (e) {
    var numberNo = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/order/cancelOrder',
      data: { numberNo: numberNo, userId: this.data.userInfo.id },
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
      url: this.data.hostString + '/intranet/order/changeOrder',
      data: { userId: this.data.userInfo.id, stauts: 5, ids: ids },
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
  },
  doPay: function (e) {
    var out_trade_no = e.currentTarget.dataset.id;
    var total_fee = this.data.orderList.orderPrice;
    var openid = this.data.userInfo.openId;
    var orderList = this.data.orderList.orderList;
    var ids = [];
    for (var i = 0; i < orderList.length; i++) {
      ids.push(parseInt(orderList[i].id));
    }
    var that = this;
    that.payBack(ids);
    /*
    wx.request({
      url: this.data.hostString + '/intranet/wxpay/dopay',
      data: { out_trade_no: out_trade_no, total_fee: total_fee, openid: openid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var result = JSON.parse(res.data.o);
        var timeStamp = result.timeStamp;
        var nonceStr = result.nonceStr;
        var package1 = result.package;
        var paySign = result.paySign;
        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': package1,
          'signType': 'MD5',
          'paySign': paySign,
          'success': function (res) {
            console.log("paySuccess==");
            console.log(res);
            that.payBack(ids);
          },
          'fail': function (res) {
            console.log("payFail==");
            console.log(res);
          }
        })
      }
    })
    */
  },
  payBack: function (ids) {
    console.log({ userId: this.data.userInfo.id, list: [{ storeId: 1, ids: ids }] })
    var data = 'userId=' + this.data.userInfo.id + '&list[0].storeId=1';
    for(var i=0; i<ids.length; i++){
      data += '&list[0].ids[' + i + ']=' + ids[i];
    }
    console.log(data);
    wx.request({
      url: this.data.hostString + '/intranet/pay/add',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        wx.switchTab({
          url: '../mine/mine',
        })
      }
    })
  }
})