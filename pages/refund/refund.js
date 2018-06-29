var app = getApp()
Page({
  data: {
    checkboxIcon:'../../images/checkbox.png',
    selectedCheckboxIcon:'../../images/selectedCheckbox.png',
    dropIcon:'../../images/drop.png',
    waitIcon:'../../images/wait.png',
    markIcon:'../../images/location.png',
    scanIcon:'../../images/scan.jpg',
    reasonArray: ["质量问题", "材质、面料与商品描述不符", "大小尺寸与商品描述不符", "尺寸拍错/不喜欢/效果不好", "假冒品牌", "少件/商品破损/有污渍", "剪裁/做工瑕疵", "颜色/款式/图案与描述不符", "卖家发错货", "其他"]
  },
  onLoad: function(e){
    var globalData = app.getGlobalData()
    this.setData({
      hostString: globalData.hostString,
      userInfo: globalData.userInfo
    });
    var orderId = e.orderId;
    var mainView = e.mainView;
    var that = this;
    wx.request({
      url: this.data.hostString + '/intranet/address/get',
      data: { id: 1 },
      success: function (res) {
        console.log("address==");
        console.log(res);
        that.setData({
          address: res.data.o
        });
      }
    });
    wx.request({
      url: this.data.hostString + '/intranet/express/getAll',
      success: function (res) {
        console.log("express==");
        console.log(res);
        that.setData({
          orderId: orderId,
          mainView: mainView,
          status: 1,
          choosedReason: -1,
          choosedCompany: -1,
          companyArray: res.data.o
        });
      }
    });
  },
  bindCheckbox: function(){
    var status = this.data.status;
    if (1 == status){
      status = 2;
    }else{
      status = 1;
    }
    this.setData({
      status: status
    });
  },
  bindReasonChange: function(e){
    var index = e.detail.value;
    this.setData({
      choosedReason: parseInt(index)
    });
  },
  refundFormSubmit: function(e){
    var data = e.detail.value;
    var that = this;
    /*wx.request({
      url: this.data.hostString + '/intranet/returnorder/applyReturn',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            mainView: 2
          })
        }
      }
    });*/
    that.setData({
      mainView: 3
    })
  },
  bindCompanyChange: function (e) {
    var index = e.detail.value;
    this.setData({
      choosedCompany: parseInt(index)
    });
  },
  toScan: function(){
    wx.scanCode({
      success: (res) => {
        this.setData({
          transportNo: res.result
        })
      }
    })
  },
  transFormSubmit: function(e){
    var data = e.detail.value;
    var that = this;
    /*wx.request({
      url: this.data.hostString + '/intranet/returnorder/writeExpress',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 3000
          })
        }
      }
    });*/
    wx.showToast({
      title: '操作成功',
      icon: 'success',
      duration: 3000
    })
  }
})