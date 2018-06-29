var util = require("../../utils/util.js")
var app = getApp()
Page({
  data: {
    rightIcon:'../../images/right.png',
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    editIcon:'../../images/edit.png',
  },
  onLoad: function(e){
    var globalData = app.getGlobalData()
    var oper = e.oper;
    this.setData({
      hostString: globalData.hostString,
      userInfo: globalData.userInfo,
      oper: oper
    });
    if (oper == 1) {
      var goodsAttrId = e.goodsAttrId;
      var count = e.count;
      this.setData({
        goodsAttrId: goodsAttrId,
        counts: count
      });
      this.init(goodsAttrId, count);
    } else if (oper == 2) {
      var ids = e.ids;
      this.setData({
        ids: ids
      });
      this.initMore(ids);
    }
  },
  onShow: function(){
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/address/getAll',
      data: { userId: this.data.userInfo.id },
      success: function (res) {
        console.log("address==");
        console.log(res);
        var addrList = res.data.o;
        var chooseTips = '你还没添加收货地址，点击添加地址';
        var addressId;
        for (var i = 0; i < addrList.length; i++) {
          if (addrList[i].isDefault) {
            addrList[i].check = true;
            addressId = addrList[i].id;
            chooseTips = addrList[i].fullName + ' ' + addrList[i].phone + ' \n' + addrList[i].province + addrList[i].city + addrList[i].county + addrList[i].detailedAddress;
          }
        }
        that.setData({
          addrList: addrList,
          chooseTips: chooseTips,
          addressId: addressId
        });
      }
    });
  },
  initMore: function (ids){
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/cart/get',
      data: { ids: ids, userId: this.data.userInfo.id },
      success: function (res) {
        console.log("pay==");
        console.log(res);
        var payInfo = res.data.o;
        var addrList = payInfo.defultAddress;
        var orderList = payInfo.orders;
        var chooseTips = '你还没添加收货地址，点击添加地址';
        var addressId;
        for (var i = 0; i < addrList.length; i++) {
          if (addrList[i].isDefault) {
            addrList[i].check = true;
            addressId = addrList[i].id;
            chooseTips = addrList[i].fullName + ' ' + addrList[i].phone + ' \n' + addrList[i].province + addrList[i].city + addrList[i].county + addrList[i].detailedAddress;
          }
        }
        that.setData({
          payInfo: payInfo,
          addrList: addrList,
          orderList: orderList,
          chooseTips: chooseTips,
          addressId: addressId || ''
        })
      }
    })
  },
  init: function (goodsAttrId, count){
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/goodsattr/getGoodsAttr',
      data: { goodsAttrId: goodsAttrId, count: count, userId: this.data.userInfo.id },
      success: function (res) {
        console.log("pay==");
        console.log(res);
        var payInfo = res.data.o;
        var addrList = payInfo.defultAddress;
        var orderList = [];
        var chooseTips = '你还没添加收货地址，点击添加地址';
        var addressId;
        for (var i = 0; i < addrList.length; i++) {
          if (addrList[i].isDefault) {
            addrList[i].check = true;
            addressId = addrList[i].id;
            chooseTips = addrList[i].fullName + ' ' + addrList[i].phone + ' \n' + addrList[i].province + addrList[i].city + addrList[i].county + addrList[i].detailedAddress;
          }
        }
        payInfo.counts = payInfo.totalCounts;
        orderList.push(payInfo);
        that.setData({
          payInfo: payInfo,
          addrList: addrList,
          orderList: orderList,
          chooseTips: chooseTips,
          addressId: addressId
        })
      }
    })
  },
  chooseAddr: function(){
    var addrList = this.data.addrList;
    if (addrList.length > 0){
      this.bindShowLayer();
    }else{
      wx.navigateTo({
        url: '../addr/addr?addressId=',
      })
    }
  },
  bindShowLayer:function(){
    this.setData({
      showLayer:!this.data.showLayer
    })
    var that = this;
    util.showAnimation.call(that);
  },
  bindCheckbox: function(e){
    var addrList = this.data.addrList;
    var index = e.target.dataset.index;
    var check = addrList[index].check;
    addrList[index].check = !check;
    for(var i=0; i<addrList.length; i++){
      if(i != index){
        addrList[i].check = check;
      }
    }
    this.setData({
      addrList: addrList
    })
  },
  toAddr: function (e) {
    var addressId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addr/addr?addressId=' + addressId,
    })
  },
  addrFormSubmit:function(e){
    var data = e.detail.value;
    var chooseTips = data.name+' '+data.number+' \n'+data.addr;
    var addressId = data.id;
    this.setData({
      chooseTips:chooseTips,
      addressId: addressId
    })
    var that = this;
    util.hideAnimation.call(that);
  },
  bindPay:function(){
    var oper = this.data.oper;
    var addressId = this.data.addressId;
    var orderPrice = this.data.payInfo.totalPrice;
    /*if(oper == 1){
      var goodsAttrId = this.data.goodsAttrId;
      var counts = this.data.counts;
      var price = this.data.payInfo.goodsAttr.sellPrice;
      var remark = this.data.payInfo.goodsAttr.description;
      this.createSingleOrder(goodsAttrId, counts, price, orderPrice, orderPrice, remark, addressId);
    } else if (oper == 2) {
      var ids = this.data.ids;
      var orderExpressPrice = this.data.payInfo.freight;
      this.createOrder(ids, addressId, orderPrice, orderExpressPrice);
    }*/
    wx.switchTab({
      url: '../mine/mine',
    })
  },
  createOrder: function (ids, addressId, orderPrice, orderExpressPrice){
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/order/createOrder',
      data: { ids, ids, addressId: addressId, orderPrice: orderPrice, orderExpressPrice: orderExpressPrice},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var result = res.data.o;
        that.doPay(result);
      }
    })
  },
  createSingleOrder: function (goodsAttrId, counts, price, total, orderPrice, remark, addressId) {
    var data = 'goodsAttr.id=' + goodsAttrId + '&store.id=1' + '&counts=' + counts + '&price=' + price + '&total=' + total + '&orderPrice=' + orderPrice + '&remark=' + remark + '&address.id=' + addressId + '&createBy=' + this.data.userInfo.id ;
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/order/createSingleOrder',
      data: data, /*{ 'goodsAttr.id': goodsAttrId, 'store.id': 1, counts: counts, price: price, total: total, orderPrice: orderPrice, remark: remark, address: { id: addressId}, createBy: this.data.userInfo.id }*/
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var result = res.data.o;
        that.doPay(result);
      }
    })
  },
  doPay: function (result){
    var out_trade_no = result.orderNO;
    var total_fee = this.data.payInfo.totalPrice;
    var openid = this.data.userInfo.openId;
    var orderIds = result.orderIds;
    var ids = [];
    for(var i=0; i<orderIds.length; i++){
      ids.push(orderIds[i].orderId);
    }
    var that = this;
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
  },
  payBack: function(ids){
    var data = 'userId=' + this.data.userInfo.id + '&list[0].storeId=1';
    for (var i = 0; i < ids.length; i++) {
      data += '&list[0].ids[' + i + ']=' + ids[i];
    }
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