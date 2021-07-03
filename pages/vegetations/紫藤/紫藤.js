Page({ 
 data: {
name:"紫藤",
 nameit:"Wisteria sinensis",
markers: [

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%B4%AB%E8%97%A4.png",
id:"0",
name:"紫藤",
latitude:"39.991674",
longitude:"116.308628",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%B4%AB%E8%97%A4.png",
id:"1",
name:"紫藤",
latitude:"39.992149",
longitude:"116.308641",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%B4%AB%E8%97%A4.png",
id:"2",
name:"紫藤",
latitude:"39.992119",
longitude:"116.307637",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%B4%AB%E8%97%A4.png",
id:"3",
name:"紫藤",
latitude:"39.991603",
longitude:"116.307637",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%B4%AB%E8%97%A4.png",
id:"4",
name:"紫藤",
latitude:"39.991219",
longitude:"116.307636",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%B4%AB%E8%97%A4.png",
id:"5",
name:"紫藤",
latitude:"39.993888",
longitude:"116.3096",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%B4%AB%E8%97%A4.png",
id:"6",
name:"紫藤",
latitude:"39.987951",
longitude:"116.309634",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%B4%AB%E8%97%A4.png",
id:"7",
name:"紫藤",
latitude:"39.990854",
longitude:"116.310115",
width: 50,
height: 50
},
],
 items:[ 
{category:"属",
 content:" 紫藤属",},
{category:"科",
 content:" 豆科",},
{category:"目",
 content:" 豆目",},
{category:"纲",
 content:" 双子叶植物纲",},
{category:"门",
 content:" 被子植物门",},
{category:"观赏时间",
 content:" 4月中旬至5月上旬",},
{category:"地点",
 content:" 燕南食堂北侧的走廊，未名湖南，未名湖东北，红湖",},

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

