function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getAddrInfo(func) {
  wx.request({
    url: 'http://housecall.sipingsoft.com/resources/addr.json',
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      func(res.data);
    }
  })
}

function showAnimation(){
  var that = this;

  var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in-out',
  })

  that.animation = animation;

  animation.bottom('0').step();

  that.setData({
    animationData:animation.export()
  })

  var shadowAnimation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in-out',
  })

  that.animation = shadowAnimation;

  shadowAnimation.opacity(1).step();

  that.setData({
    animationShadowData:shadowAnimation.export()
  })
}

 function hideAnimation(){
  var that = this;

  var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in-out',
  })

  that.animation = animation;

  animation.bottom('-400px').step();

  that.setData({
    animationData:animation.export()
  })

  var shadowAnimation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in-out',
  })

  that.animation = shadowAnimation;

  shadowAnimation.opacity(0).step();

  that.setData({
    animationShadowData:shadowAnimation.export()
  })
  
  setTimeout(function(){
    that.setData({
      showLayer:!that.data.showLayer
    })
  },401)
  
}

module.exports = {
  formatTime: formatTime,
  getAddrInfo: getAddrInfo,
  showAnimation: showAnimation,
  hideAnimation: hideAnimation
}
