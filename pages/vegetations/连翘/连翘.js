Page({ 
 data: {
name:"连翘",
 nameit:"Forsythia suspensa",
markers: [

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E8%BF%9E%E7%BF%98.png",
id:"0",
name:"连翘",
latitude:"39.989278",
longitude:"116.312111",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E8%BF%9E%E7%BF%98.png",
id:"1",
name:"连翘",
latitude:"39.989888",
longitude:"116.309278",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E8%BF%9E%E7%BF%98.png",
id:"2",
name:"连翘",
latitude:"39.995144",
longitude:"116.309114",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E8%BF%9E%E7%BF%98.png",
id:"3",
name:"连翘",
latitude:"39.994942",
longitude:"116.309055",
width: 50,
height: 50
},
],
 items:[ 
{category:"属",
 content:" 连翘属",},
{category:"科",
 content:" 木犀科",},
{category:"目",
 content:" 捩花目",},
{category:"纲",
 content:" 双子叶植物纲",},
{category:"门",
 content:" 被子植物门",},
{category:"观赏时间",
 content:" 花期3-4月，果期7-9月；",},
{category:"地点",
 content:" 燕南园60号院；湖心岛；",},

], 
relationship:[], 
nums:[
{ num: 1 },
{ num: 2 },
],
},
  previewImage: function (e) {
  let that = this;
  let src = e.currentTarget.dataset.src;
  wx.previewImage({
    current: src,
    urls: [src]
  })
  },

  markertap(event) {
    console.log(event.detail.markerId)
    const markers = this.data.markers;
    for (let i = 0; i < markers.length; i++) { 
      if (event.markerId === markers[i].id) {
            wx.openLocation({
              latitude: parseFloat(markers[i].latitude),
              longitude: parseFloat(markers[i].longitude),
              name: markers[i].name,
              address: markers[i].name
            })

      }
    }
  },
  
  //音频播放  
  audioPlay(e) {
    var that = this,
      id = e.currentTarget.dataset.id,
      key = e.currentTarget.dataset.key,
      audioArr = that.data.audioArr;

    //设置状态
    audioArr.forEach((v, i, array) => {
      v.bl = false;
      if (i == key) {
        v.bl = true;
      }
    })
    that.setData({
      audioArr: audioArr,
      audKey: key,
    })

    myaudio.autoplay = true;
    var audKey = that.data.audKey,
      vidSrc = audioArr[audKey].src;
    myaudio.src = vidSrc;

    myaudio.play();

    //开始监听
    myaudio.onPlay(() => {
      console.log('开始播放');
    })

    //结束监听
    myaudio.onEnded(() => {
      console.log('自动播放完毕');
      audioArr[key].bl = false;
      that.setData({
        audioArr: audioArr,
      })
    })

    //错误回调
    myaudio.onError((err) => {
      console.log(err);
      audioArr[key].bl = false;
      that.setData({
        audioArr: audioArr,
      })
      return
    })

  },

  // 音频停止
  audioStop(e) {
    var that = this,
      key = e.currentTarget.dataset.key,
      audioArr = that.data.audioArr;
    //设置状态
    audioArr.forEach((v, i, array) => {
      v.bl = false;
    })
    that.setData({
      audioArr: audioArr
    })

    myaudio.stop();

    //停止监听
    myaudio.onStop(() => {
      console.log('停止播放');
    })
  }, 

  onPullDownRefresh:function(){
    wx.stopPullDownRefresh()
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.name,
      path: '/pages/index/index?pageId='+this.data.name,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  onShareTimeline: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.name,
      path: '/pages/index/index?pageId='+this.data.name,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

})
//创建audio控件
const myaudio = wx.createInnerAudioContext(); 

