// pages/newsInfo/newsInfo.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().data.folder)
    console.log(options);
    var publishdate = options.publishdate
    var title = options.title
    var verorder = options.verorder;

    // 转换时间戳
    var time = new Date(parseInt(publishdate));

    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var data = y + '-' + m + '-' + d
    publishdate = data

    var that = this
    wx.request({
      // http://xcx.joyhua.cn:4336/?epaper=homeTitle&Sj=2018-03-06&verOrder=1&Wz=十三届全国人大一次会议在京开幕
      url: `${getApp().data.url}?epaper=homeTitle&Sj=${publishdate}&verOrder=${verorder}&Wz=${title}`,
      method: 'GET',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.data.length == 0) {
          wx.showLoading({
            title: '加载中',
          })
          console.log(res)
        } else {
          console.log(res.data,"详情")
          // console.log(res.data[0].images)
          let imgUrl = res.data[0].images
          let imgList = imgUrl.split(",")
          let show = imgList[0].indexOf(".jpg")
          console.log(imgList.length,'长度')
          that.setData({
            title: res.data[0].title,
            content: res.data[0].content.replace(/\r\n/g, "<br>"),
            time: publishdate.replace("-", "年").replace("-", "月") + '日',
            verName: res.data[0].verName,
            click: res.data[0].click,
            imgList:imgList,
            show:show,
            floder: getApp().data.folder
          })

          var article = res.data[0].content.replace(/\r\n/g, "<br>&nbsp;&nbsp;");
          /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)18509161516
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
          // var that = this;
          WxParse.wxParse('article', 'html', article, that, 5);
        }
        
      }
      ,
      fail: function (err) {

      },
      complete: function (data) {

      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  
})