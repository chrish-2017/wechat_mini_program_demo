var app = getApp()
Page({
  data: {
    goodsList:[{
      id:'1',picUrl:'../../images/goods.jpg',name:'[NIID]多功能单肩斜跨背包',tag:'中号',price:'199',num:1,selected:false
    },{
      id:'2',picUrl:'../../images/goods.jpg',name:'[NIID]多功能单肩斜跨背包',tag:'中号',price:'199',num:1,selected:false
    }],
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    addIcon:'../../images/addIcon.png',
    minusIcon:'../../images/minusIcon.png',
    deleteIcon:'../../images/delete.png',
    selectedAllStatus:true,
    totalPrice:0
  },
  onLoad: function(){
    this.init();
  },
  init: function(){
    var goodsList = this.data.goodsList;
    var totalPrice = 0;
    var selectedAllStatus = true;
    for(var i=0; i<goodsList.length; i++){
      if(goodsList[i].selected){
        totalPrice += parseInt(goodsList[i].price*goodsList[i].num);
      }else{
        selectedAllStatus = false;
      }
    }
    this.setData({
      totalPrice: totalPrice,
      selectedAllStatus: selectedAllStatus
    })
  },
  bindAddIcon: function(e){
    var goodsList = this.data.goodsList;
    var totalPrice = this.data.totalPrice;
    var index = e.target.dataset.index;
    goodsList[index].num++;
    totalPrice += parseInt(goodsList[index].price);
    this.setData({
      goodsList: goodsList,
      totalPrice: totalPrice
    })
  },
  bindMinusIcon: function(e){
    var goodsList = this.data.goodsList;
    var totalPrice = this.data.totalPrice;
    var index = e.target.dataset.index;
    if(goodsList[index].num > 1){
      goodsList[index].num--;
      totalPrice -= parseInt(goodsList[index].price);
      this.setData({
        goodsList: goodsList,
        totalPrice: totalPrice
      })
    }
  },
  bindDelIcon: function(e){
    var goodsList = this.data.goodsList;
    var index = e.target.dataset.index;
    goodsList.splice(index, 1);
    this.setData({
      goodsList: goodsList
    })
    this.init();
  },
  bindCheckbox: function(e){
    var goodsList = this.data.goodsList;
    var index = e.target.dataset.index;
    goodsList[index].selected = !goodsList[index].selected;
    this.setData({
      goodsList: goodsList
    })
    this.init();
  },
  bindSelectAll: function(){
    var goodsList = this.data.goodsList;
    var selectedAllStatus = this.data.selectedAllStatus;
    for(var i=0; i<goodsList.length; i++){
      goodsList[i].selected = !selectedAllStatus;
    }
    selectedAllStatus = !selectedAllStatus;
    this.setData({
      goodsList: goodsList,
      selectedAllStatus: selectedAllStatus
    })
    this.init();
  },
  bindToIndex: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  bindToDetail: function(){
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail',
    })
  },
  bindToPay: function(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  }
})
