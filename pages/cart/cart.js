var app = getApp()
Page({
  data: {
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    addIcon:'../../images/addIcon.png',
    minusIcon:'../../images/minusIcon.png',
    deleteIcon:'../../images/delete.png'
  },
  onLoad: function(){
    var globalData = app.getGlobalData()
    this.setData({
      hostString: globalData.hostString,
      userInfo: globalData.userInfo
    });
    this.init();
  },
  onShow: function () {
    this.init();
  },
  init: function(){
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/cart/getAllCart',
      data: { createBy: this.data.userInfo.id },
      success: function (res) {
        console.log("myCart==");
        console.log(res);
        var goodsList = res.data.o;
        for (var i = 0; i < goodsList.length; i++) {
          if (goodsList[i].goodsAttr.goods.selected){
            goodsList[i].selected = true;
          }
        }
        that.setData({
          goodsList: goodsList
        });
        that.count();
      }
    });
  },
  count: function(){
    var goodsList = this.data.goodsList;
    var selectedAllStatus = true;
    var allowPay = false;
    var totalPrice = 0;
    for(var i=0; i<goodsList.length; i++){
      if(goodsList[i].selected){
        totalPrice += goodsList[i].goodsAttr.sellPrice * goodsList[i].counts;
        allowPay = true;
      }else{
        if (!goodsList[i].goodsAttr.goods.selected){
          selectedAllStatus = false;
        }
      }
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      allowPay: allowPay,
      totalPrice: totalPrice
    })
  },
  bindCheckbox: function(e){
    var goodsList = this.data.goodsList;
    var index = e.target.dataset.index;
    goodsList[index].selected = !goodsList[index].selected;
    this.setData({
      goodsList: goodsList
    })
    this.count();
  },
  bindSelectAll: function(){
    var goodsList = this.data.goodsList;
    var selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;
    for(var i=0; i<goodsList.length; i++){
      if (goodsList[i].goodsAttr.goods.isPutaway){
        goodsList[i].selected = selectedAllStatus;
      }
    }
    this.setData({
      goodsList: goodsList,
      selectedAllStatus: selectedAllStatus
    })
    this.count();
  },
  bindAddIcon: function(e){
    var cartId = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/cart/updateNumber',
      data: {type: 1, cartId: cartId},
      method: 'POST',
      success: function(res) {
        if(res.statusCode == 200){
          var goodsList = that.data.goodsList;
          var totalPrice = that.data.totalPrice;
          var index = e.target.dataset.index;
          goodsList[index].counts++;
          totalPrice += goodsList[index].price;
          that.setData({
            goodsList: goodsList,
            totalPrice: totalPrice
          })
        }
      }
    })
  },
  bindMinusIcon: function(e){
    var cartId = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/cart/updateNumber',
      data: {type: 2, cartId: cartId},
      method: 'POST',
      success: function(res) {
        if(res.statusCode == 200){
          var goodsList = that.data.goodsList;
          var totalPrice = that.data.totalPrice;
          var index = e.target.dataset.index;
          goodsList[index].counts--;
          totalPrice -= goodsList[index].price;
          that.setData({
            goodsList: goodsList,
            totalPrice: totalPrice
          })
        }
      }
    })
  },
  bindDelIcon: function(e){
    var goodsAttrId = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/cart/deleteOneCartGoods',
      data: { createBy: this.data.userInfo.id, goodsAttrId: goodsAttrId},
      success: function(res) {
        if(res.statusCode == 200){
          var goodsList = that.data.goodsList;
          var index = e.target.dataset.index;
          goodsList.splice(index, 1);
          that.setData({
            goodsList: goodsList
          })
          that.count();
        }
      }
    })
  },
  toPay: function(){
    var that = this;
    var goodsList = that.data.goodsList;
    var ids = [];
    for(var i=0; i<goodsList.length; i++){
      if(goodsList[i].selected){
        ids.push(goodsList[i].id);
      }
    }
    if(ids.length > 0){
      wx.navigateTo({
        url: '../pay/pay?oper=2&ids='+ids,
      })
    }
  },
  bindToIndex: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  bindToDetail: function(e){
    var goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+goodsId,
    })
  }
})
