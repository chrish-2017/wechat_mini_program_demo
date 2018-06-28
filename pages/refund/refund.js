var app = getApp();
Page({
  data: {
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    dropIcon:'../../images/drop.png',
    waitIcon:'../../images/wait.png',
    markIcon:'../../images/location.png',
    check:1,
    mainView:1
  },
  refundFormSubmit: function(){
    this.setData({
      mainView: 2
    })
  },
  bindRefundPass: function(){
    this.setData({
      mainView: 3
    })
  },
  transFormSubmit: function(){
    this.setData({
      mainView: 1
    })
  }
})