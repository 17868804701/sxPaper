//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    array: [],
    motto: 'Hello World',
    userInfo: {},
    show: 'none',
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
    var num = parseInt(this.data.index)+1
    console.log(num)
    if(num<10){
        num = '0'+num
    }else{
      num=num
    }
    console.log(num)
    this.setData({
      num:num
    })
    var that = this
    // 再根据日期和版次查出一个版所有的文章列表
    wx.request({
      // url: `${getApp().data.url}?epaper=homeVerOrderName&Sj=${getApp().data.publishDate}`,
      url: `${getApp().data.url}?epaper=homeVerOrder&Sj=2018-03-06&verOrder=${num}`,
      method: 'GET',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newList:res.data
        })
      }
      ,
      fail: function (err) {

      },
      complete: function (data) {

      }
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    getApp().data.publishDate = e.detail.value
    this.setData({
      time: e.detail.value
    })
    var that = this;
    wx.request({
      url: `${getApp().data.url}?epaper=homeVerOrderName&Sj=${getApp().data.publishDate}`,
      method: 'GET',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        var result = res.data
        var array = []
        result.forEach(function (item) {
          array.push(item.verOrder + '版-' + item.verName)
          console.log(item.verOrder + '版-' + item.verName)
        })
        // 数组去重
        var r = array.filter(function (element, index, self) {
          return self.indexOf(element) === index;
        });
        console.log(r);
        that.setData({
          array: r
        })
      }
      ,
      fail: function (err) {

      },
      complete: function (data) {

      }
    })
  },
  onShow: function () {
    this.setData({
      show: 'none'
    })
  },
  onLoad: function () {
    // 获取最新一版时间
    var that = this
    wx.request({
      url: `${getApp().data.url}?epaper=homePaper`,
      method: 'GET',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        console.log(res.data[0].publishDate)
        // 转换时间戳
        var time = new Date(res.data[0].publishDate);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var data = y + '-' + m + '-' + d
        getApp().data.publishDate = data
        getApp().data.folder = res.data[0].folder
        // 根据时间获取版次
        wx.request({
          url: `${getApp().data.url}?epaper=homeVerOrderName&Sj=${getApp().data.publishDate}`,
          method: 'GET',
          data: {},
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            console.log(res.data)
            var result = res.data
            var array = []
            result.forEach(function(item){
              array.push(item.verOrder+'版-'+item.verName)
              console.log(item.verOrder+'版-'+item.verName)
            })
            // 数组去重
            var r = array.filter(function (element, index, self) {
              return self.indexOf(element) === index;
            });
            console.log(r);
            that.setData({
              array:r
            })

            wx.request({
              // url: `${getApp().data.url}?epaper=homeVerOrderName&Sj=${getApp().data.publishDate}`,
              url: `${getApp().data.url}?epaper=homeVerOrder&Sj=${getApp().data.publishDate}&verOrder=01`,
              method: 'GET',
              data: {},
              header: {
                "Content-Type": "application/json"
              },
              success: function (res) {
                console.log(res.data[0].perVerImgUrl)
                that.setData({
                  newList: res.data,
                  imgurl: res.data[0].perVerImgUrl,
                  folder: getApp().data.folder,
                  url:"http://xcx.joyhua.cn:4336/"
                })
                console.log(that.data.url+'/'+that.data.folder+'/html/'+that.data.imgurl)
                that.setData({
                  imgUrl: that.data.url + '/' + that.data.folder + '/html/' + that.data.imgurl
                })
              }
              ,
              fail: function (err) {

              },
              complete: function (data) {

              }
            })


          }
          ,
          fail: function (err) {

          },
          complete: function (data) {

          }
        })
      }
      ,
      fail: function (err) {

      },
      complete: function (data) {

      }
    })






















    // 使用 wx.createContext 获取绘图上下文 context
    var x1 = 0, x2 = 0, x3 = 100, x4 = 200
    var context = wx.createCanvasContext('firstCanvas')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(1)
    context.rect(x1, x2, x3, x4)
    context.stroke()
    context.draw()
    var y1 = 100, y2 = 200, y3 = 300, y4 = 400
    var context = wx.createCanvasContext('secondCanvas')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(2)
    context.rect(y1, y2, y3, y4)
    context.stroke()
    context.draw()
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
  banci: function () {

  },
  mulu: function () {
    if (this.data.show == 'none') {
      this.setData({
        show: ''
      })
    } else {
      this.setData({
        show: 'none'
      })
    }
  },
  newsInfo: function () {
    wx.navigateTo({
      url: '../newsInfo/newsInfo',
    })
  },
  img: function (e) {
    console.log(e)
    console.log(e.detail.x)
    console.log(e.detail.y)
    let x = e.detail.x
    let y = e.detail.y
    if (x > 0 && x < 144 && y > 0 && y < 70) {
      console.log(1111111111111)
    }
  },


  img1: function (e) {
    console.log(22222222222222222222222222222222)
    console.log(e.detail.x)
    console.log(e.detail.y)
    let x = e.detail.x
    let y = e.detail.y
    if (x > 0 && x < 144 && y > 0 && y < 70) {
      console.log(1111111111111)
    }
  }
})
