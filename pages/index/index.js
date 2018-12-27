//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isPlayMusic:false,
    motto: 'Hello World',
    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/YOuw0zia8s4pk7yz4XXqIkyQAlyzDzib8m1tHibiaCkiaSOH5BpTOSybBQbKOR7zd8HNiczQkialNLktfkWoaA8XPArkA/132',  
  },

//播放音乐  
  onMusicTap:function(event){
    if (this.data.isPlayMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic:false
      })
    }
    else{
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        title:'此时此刻',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
      })
      this.setData({
        isPlayMusic: true
      })
    }
  },
  onLoad: function () {

 },
})
