//index.js
//获取应用实例
var app = getApp()
var hostString = app.globalData.hostString
Page({
  data: {
    
  },
  onLoad: function(){
    var that = this;
    wx.request({
      url: hostString + '/intranet/homepage/getListByPage',
      success: function(res) {
        console.log("homepage==");
        console.log(res);
        var carouselImg = res.data.records[0].carouselImg;
        var image = res.data.records[0].image;
        var goodsType = res.data.records[0].goodsType;
        var goodsTypeImgImage = res.data.records[0].goodsTypeImgImage;
        var carouselImages = [];
        var categoryInfos = [];
        for(var i=0; i<carouselImg.length; i++){
          var goodsId = carouselImg[i].goodsId;
          var imgName = image[i].imgName;
          var carouselImage = {
            goodsId:goodsId,
            imgName:imgName
          }
          carouselImages.push(carouselImage);
        }
        for(var i=0; i<goodsType.length; i++){
          var goodsTypeId = goodsType[i].id;
          var typeName = goodsType[i].typeName;
          var imgName = goodsTypeImgImage[i].imgName;
          var categoryInfo = {
            goodsTypeId: goodsTypeId,
            typeName: typeName,
            imgName: imgName
          }
          categoryInfos.push(categoryInfo);
        }
        that.setData({
          carouselImages:carouselImages,
          categoryInfos:categoryInfos,
          hostString:hostString
        });      
      }
    })
    wx.request({
      url: hostString + '/intranet/homepage/getGoodsNoListByPage',
      success: function(res) {
        console.log("goodsList==");
        console.log(res);
        var goodsInfo = res.data.records;
        that.setData({
          goodsInfo:goodsInfo
        });    
      }
    })
  },
  toDetail: function(e){
    var goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId='+goodsId,
    })
  },
  toList: function(e){
    var goodsTypeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsList/goodsList?parentTypeId='+goodsTypeId,
    })
  }
})
