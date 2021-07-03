Page({
 data: {
 vege_list:[
{name:"山桃"},
{name:"狗尾草"},
{name:"秋英"},
{name:"紫藤"},
{name:"多花紫藤"},
{name:"迎春花"},
{name:"蒲公英"},
{name:"连翘"},
{name:"蜡梅"},
{name:"杏"},
{name:"西府海棠"},
{name:"珍珠绣线菊"},
{name:"早开堇菜"},
{name:"紫荆"},
{name:"黄刺玫"},
{name:"诸葛菜"},
{name:"东京樱花"},
{name:"金钟花"},
{name:"德国鸢尾"},
{name:"白鹃梅"},
{name:"牡丹"},
{name:"美洲稠李"},
{name:"重瓣棣棠花"},
{name:"流苏树"},
{name:"抱茎小苦荬"},
],
  },
   navbarTap: function (e) {
     this.setData({
       currentTab: e.currentTarget.dataset.idx
     })
   },

   iconType: [
     'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
   ],

  onPullDownRefresh:function(){
    wx.stopPullDownRefresh()
  },

  //转发跳转页面设置
  onLoad: function (options) {
    if (options.pageId) {
      wx.navigateTo({
        url: '/pages/vegetations/' + options.pageId + '/' + options.pageId,
      })
    }
  },

  //转发此页面的设置
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      path: 'pages/index/index',  // 路径，传递参数到指定页面。
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  // 转发到朋友圈
  onShareTimeline: function (res) {
    if (ops.from === 'button') {
        // 来自页面内转发按钮
        console.log(ops.target)
      }
      return {
        path: 'pages/index/index',  // 路径，传递参数到指定页面。
        success: function (res) {
          // 转发成功
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {
          // 转发失败
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
  },

  // 搜索栏输入名字后页面跳转
  bindconfirmT: function (e) {
    console.log("e.detail.value");
    if(e.detail.value) {
    wx.navigateTo({
      url: '/pages/vegetations/' + e.detail.value + '/' + e.detail.value,
    })
  }
   },
   copyTBL: function (e) {
     var self = this;
     wx.setClipboardData({
       data: '北大猫协',//需要复制的内容
       success: function (res) {
         // self.setData({copyTip:true}),

       }
     })
   },

   naviToMini:function(e){
    wx.navigateToMiniProgram({
      appId: '',
      path: 'page/index/index?id=123',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
   }
   

})

