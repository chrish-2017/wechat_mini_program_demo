var app = getApp()
Page({
  data: {
    userInfo: {},
    mainView: 1,
    orderList:[{id:'1',number:'123456789',status:'已发货',name:'[90分]户外休闲双肩包',tag:'灰色',price:'249',num:'1',picUrl:'../../images/goods.jpg',count:'249'},{id:'1',number:'123456789',status:'已收货',name:'[90分]户外休闲双肩包户外休闲双肩包户外休闲双肩包户外休闲双肩包',tag:'灰色',price:'249',num:'1',picUrl:'../../images/goods.jpg',count:'249'}],
    addrList:[{name:'鱼香茄子不甜',number:'18380447856',addr:'成都高新区天府软件园',check:false},{name:'鱼香茄子不甜',number:'18380447856',addr:'成都高新区天府软件园',check:false}],
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    editIcon:'../../images/edit.png',
    addIcon:'../../images/addAddr.png'
  },
  onLoad: function (options) {
    console.log(options);
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        mainView: options.mainView
      })
    })
  },
  bindNavItem: function(e){
    this.setData({mainView: e.target.dataset.view})
  },
  bindCheckbox: function(e){
    var addrList = this.data.addrList;
    var index = e.target.dataset.index;
    addrList[index].check = !addrList[index].check;
    this.setData({
      addrList: addrList
    })
  },
  bindToIndex: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  bindToDetail: function(){
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
  },
  bindCheckTransInfo:function(){
    wx.navigateTo({
      url: '../transInfo/transInfo',
    })
  },
  bindApplyRefund:function(){
    wx.navigateTo({
      url: '../refund/refund',
    })
  },
  bindToAddr: function(){
    wx.navigateTo({
      url: '../addr/addr',
    })
  }
})
