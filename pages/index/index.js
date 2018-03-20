//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    array: [],
    timeList: [],
    motto: 'Hello World',
    userInfo: {},
    show: 'none',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 获取最新一版时间
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          imgwidth: res.windowWidth,
          imgheight: res.windowHeight
        })
      }
    })
    wx.request({
      url: `${getApp().data.url}?epaper=homePaper`,
      method: 'POST',
      data: {

      },
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
        //1、 根据时间获取所有版次
        wx.request({
          url: `${getApp().data.url}?epaper=homeVerOrderName`,
          method: 'POST',
          data: {
            "Sj": getApp().data.publishDate
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            var result = res.data
            var array = []
            result.forEach(function (item) {
              array.push(item.verOrder + '版-' + item.verName)
            })
            // 数组去重
            var r = array.filter(function (element, index, self) {
              return self.indexOf(element) === index;
            });
            // console.log(r);
            that.setData({
              array: r
            })
            // 2、默认显示最新一期的版面
            wx.request({
              // url: `${getApp().data.url}?epaper=homeVerOrderName&Sj=${getApp().data.publishDate}`,
              url: `${getApp().data.url}?epaper=homeVerOrder`,
              method: 'POST',
              data: {
                "Sj": getApp().data.publishDate,
                "verOrder": "01"
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res.data)
                that.setData({
                  newList: res.data,
                  imgurl: res.data[0].perVerImgUrl,
                  folder: getApp().data.folder,
                  url: "http://xcx.joyhua.cn:4336/"
                })
                console.log(that.data.url + '/' + that.data.folder + '/html/' + that.data.imgurl)
                that.setData({
                  imgUrl: that.data.url + '/' + that.data.folder + '/html/' + that.data.imgurl
                })
                var result = res.data
                var newArr = [];
                for (var i = 0; i < result.length; i++) {
                  var item = result[i];
                  var arr = (result[i].coordinate.toString()).replace(";", ",").replace(";", ",").replace(";", ",").split(",");
                  // console.log(arr)
                  item.x1 = arr[0];
                  item.x2 = arr[1];
                  item.x3 = arr[2];
                  item.x4 = arr[3];
                  item.x5 = arr[4];
                  item.x6 = arr[5];
                  item.x7 = arr[6];
                  item.x8 = arr[7];
                  newArr.push(item);
                }
                console.log(newArr);
                that.setData({
                  areaItem: newArr
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
  jumpPageInfo: function (e) {
    console.log(e),
    console.log(e.currentTarget.dataset.publishdate)
    console.log(e.currentTarget.dataset.title)
    console.log(e.currentTarget.dataset.verorder)
    var publishdate = e.currentTarget.dataset.publishdate
    var title = e.currentTarget.dataset.title
    var verorder = e.currentTarget.dataset.verorder
    wx.navigateTo({
      url: '../newsInfo/newsInfo?publishdate=' + publishdate + '&&title=' + title + '&&verorder=' + verorder,
    })
  },

  // 3、点击版次的时候默认日期为最新一版日期
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value])
    var index = this.data.array[e.detail.value].substring(0, 2)
    var that = this
    //4、 再根据日期和版次查出一个版所有的文章列表
    wx.request({
      // url: `${getApp().data.url}?epaper=homeVerOrderName&Sj=${getApp().data.publishDate}`,
      url: `${getApp().data.url}?epaper=homeVerOrder`,
      method: 'POST',
      data: {
        "Sj": getApp().data.publishDate,
        "verOrder": index
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newList: res.data
        })

        console.log(res.data[0].perVerImgUrl)
        that.setData({
          newList: res.data,
          imgurl: res.data[0].perVerImgUrl,
          folder: getApp().data.folder,
          url: "http://xcx.joyhua.cn:4336/"
        })
        console.log(that.data.url + '/' + that.data.folder + '/html/' + that.data.imgurl)
        that.setData({
          imgUrl: that.data.url + '/' + that.data.folder + '/html/' + that.data.imgurl
        })
        var result = res.data
        var newArr = [];
        for (var i = 0; i < result.length; i++) {
          var item = result[i];
          var arr = (result[i].coordinate.toString()).replace(";", ",").replace(";", ",").replace(";", ",").split(",");
          // console.log(arr)
          item.x1 = arr[0];
          item.x2 = arr[1];
          item.x3 = arr[2];
          item.x4 = arr[3];
          item.x5 = arr[4];
          item.x6 = arr[5];
          item.x7 = arr[6];
          item.x8 = arr[7];
          newArr.push(item);
        }
        console.log(newArr);
        // console.log(newArr[0].content.replace(/\r\n/g,"<br>"))
        that.setData({
          areaItem: newArr
        })

      }
      ,
      fail: function (err) {

      },
      complete: function (data) {

      }
    })
  },


  // 5、点击时间的时候查出所有的版次，在根据当前日期查出该日期对应的第一版次的新闻
  bindTimeChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', this.data.timeList[e.detail.value])
    getApp().data.publishDate = this.data.timeList[e.detail.value]
    // this.setData({
    //   time: this.data.timeList[e.detail.value]
    // })
    console.log(getApp().data.publishDate, "时间")
    var that = this;
    wx.request({
      url: `${getApp().data.url}?epaper=homeVerOrderName`,
      method: 'POST',
      data: {
        "Sj": getApp().data.publishDate,
        // "verOrder": "04"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        var result = res.data
        var array = []
        result.forEach(function (item) {
          array.push(item.verOrder + '版-' + item.verName)
          // console.log(item.verOrder + '版-' + item.verName)
        })
        // 数组去重
        var r = array.filter(function (element, index, self) {
          return self.indexOf(element) === index;
        });
        console.log(r);
        that.setData({
          array: r
        })

        wx.request({
          // url: `${getApp().data.url}?epaper=homeVerOrderName&Sj=${getApp().data.publishDate}`,
          url: `${getApp().data.url}?epaper=homeVerOrder`,
          method: 'POST',
          data: {
            "Sj": getApp().data.publishDate,
            "verOrder": "04"
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data, '结果')
            that.setData({
              newList: res.data,
              imgurl: res.data[0].perVerImgUrl,
              folder: getApp().data.folder,
              url: "http://xcx.joyhua.cn:4336/"
            })
            console.log(that.data.url + '/' + that.data.folder + '/html/' + that.data.imgurl)
            that.setData({
              imgUrl: that.data.url + '/' + that.data.folder + '/html/' + that.data.imgurl
            })
            var result = res.data
            var newArr = [];
            for (var i = 0; i < result.length; i++) {
              var item = result[i];
              var arr = (result[i].coordinate.toString()).replace(";", ",").replace(";", ",").replace(";", ",").split(",");
              // console.log(arr)
              item.x1 = arr[0];
              item.x2 = arr[1];
              item.x3 = arr[2];
              item.x4 = arr[3];
              item.x5 = arr[4];
              item.x6 = arr[5];
              item.x7 = arr[6];
              item.x8 = arr[7];
              newArr.push(item);
            }
            console.log(newArr);
            that.setData({
              areaItem: newArr
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
  },
  onShow: function () {
    this.setData({
      show: 'none'
    })
    var that = this
    // 获取时间列表
    wx.request({
      url: `${getApp().data.url}?epaper=homePaperDate`,
      method: 'POST',
      data: {

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res, "实间");
        that.setData({
          timeList: res.data
        })
      }
      ,
      fail: function (err) {

      },
      complete: function (data) {

      }
    })
  },
})
