var app = getApp()
var hostString = app.globalData.hostString
var userInfo = app.globalData.userInfo
Page({
  data: {
    mainView: 1,
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    editIcon:'../../images/edit.png',
    deleteIcon:'../../images/delete.png',
    addIcon:'../../images/addAddr.png',
    stateArray: ["", "待付款", "订单已取消", "待发货", "已发货", "交易成功", "已申请退款", "部分发货", "", "", "", "", "已申请退款", "店铺允许退货", "退款成功", "已退货", "再次发货", "退货成功", "退款成功", "退货中"]
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    this.init();
  },
  onShow: function () {
    this.init();
  },
  init: function(){
    var that = this;
    wx.request({
      url: hostString + '/intranet/order/getMyOrder',
      data: {userId: userInfo.id},
      success: function(res) {
        console.log("myOrder==");
        console.log(res);
        var records = [];
        if(res.data.meta.success){
          records = res.data.o.records;
        }
        that.setData({
          records: records,
          hostString: hostString
        });
      }
    });
    wx.request({
      url: hostString + '/intranet/address/getAll',
      data: {userId: userInfo.id},
      success: function(res) {
        console.log("address==");
        console.log(res);
        that.setData({
          addrList:res.data.o
        });
      }
    });
  },
  bindNavItem: function(e){
    this.setData({
      mainView: e.target.dataset.view
    })
  },
  toDetail: function(e){
    var goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+goodsId,
    })
  },
  bindToDetail: function(e){
    var numberNo = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?numberNo='+numberNo,
    })
  },
  cancelOrder: function(e){
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
        if(res.statusCode == 200){
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 3000
          })
          that.init();
        }
      }
    });
  },
  bindCheckbox: function(e){
    var addrList = this.data.addrList;
    var index = e.target.dataset.index;
    addrList[index].isDefault = !addrList[index].isDefault;
    this.setData({
      addrList: addrList
    })
  },
  toAddr: function(e){
    var addressId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addr/addr?addressId='+addressId,
    })
  },
  delAddr: function(e){
    var addressId = e.currentTarget.dataset.id;
    console.log(addressId);
    var that = this;
    wx.request({
      url: hostString + '/intranet/address/delete',
      data: {userId:userInfo.id, addressId:addressId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.statusCode == 200){
          var addrList = that.data.addrList;
          var index = e.target.dataset.index;
          addrList.splice(index, 1);
          that.setData({
            addrList: addrList
          })
        }
      }
    })
  },
  bindToIndex: function(){
    wx.switchTab({
      url: '../index/index',
    })
  }
})
