//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['A01版', 'A02版', 'A03版', 'A04版'],
    motto: 'Hello World',
    userInfo: {},
    show:'none',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  onShow:function(){
    this.setData({
      show: 'none'
    })
  },
  onLoad: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log()
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      }
    })
  },
  banci:function(){

  },
  mulu:function(){
    if(this.data.show=='none'){
      this.setData({
        show: ''
      })
    }else{
      this.setData({
        show: 'none'
      })
    }
  },
  newsInfo:function(){
    wx.navigateTo({
      url: '../newsInfo/newsInfo',
    })
  }
})
