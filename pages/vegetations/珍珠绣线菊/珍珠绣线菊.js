Page({ 
 data: {
name:"珍珠绣线菊",
 nameit:"Spiraea thunbergii",
markers: [

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%8F%8D%E7%8F%A0%E7%BB%A3%E7%BA%BF%E8%8F%8A.png",
id:"0",
name:"珍珠绣线菊",
latitude:"39.995591",
longitude:"116.310143",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%8F%8D%E7%8F%A0%E7%BB%A3%E7%BA%BF%E8%8F%8A.png",
id:"1",
name:"珍珠绣线菊",
latitude:"39.991813",
longitude:"116.30798",
width: 50,
height: 50
},

{iconPath: "https://7665-vegetation-9g07cn1j2fc808a2-1305114445.tcb.qcloud.la/%E7%8F%8D%E7%8F%A0%E7%BB%A3%E7%BA%BF%E8%8F%8A.png",
id:"2",
name:"珍珠绣线菊",
latitude:"39.991469",
longitude:"116.307976",
width: 50,
height: 50
},
],
 items:[ 
{category:"属",
 content:" 绣线菊属",},
{category:"科",
 content:" 蔷薇科",},
{category:"目",
 content:" 蔷薇目",},
{category:"纲",
 content:" 双子叶植物纲",},
{category:"门",
 content:" 被子植物门",},
{category:"观赏时间",
 content:" 花期4-5月，果期7月。",},
{category:"地点",
 content:" 未名湖北边；静园；",},

], 
relationship:[], 
nums:[
{ num: 1 },
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

