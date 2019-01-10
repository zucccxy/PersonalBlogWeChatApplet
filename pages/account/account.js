// pages/account/account.js
const app=getApp()
const common = require('../../utils/common.js');
const util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,//判断是否登录
    isSign:false,//判断是否签到
    NewsBool:false,//判断是否有消息
avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/YOuw0zia8s4pk7yz4XXqIkyQAlyzDzib8m1tHibiaCkiaSOH5BpTOSybBQbKOR7zd8HNiczQkialNLktfkWoaA8XPArkA/132",
    username:"游客",
    signCountTime:0,
    signTime:"",
    NewsCount:0
  },
  //进入消息界面
  enterMyNews:function(event){
    wx.navigateTo({
      url: '/pages/account/news/news',
    })
  },
  //进入我收藏界面
  enterMyCollection:function(event){
    wx.navigateTo({
      url: '/pages/account/collection/collection?type="1"',
    })
  },
  //进入消息反馈界面
  enterFeedback:function(event){
    wx.navigateTo({
      url: '/pages/account/feedback/feedback?type="1"',
    })
  },
  //点击展示关于界面
  showAbout:function(event){
    wx.showModal({
      title: '关于',
      content: '本项目仅供交流学习使用',
      showCancel:false
    })
  },
  //点击登录
  enterLogIn:function(event){
    wx.navigateTo({
      url: '/pages/logIn/logIn',
    })
  },
  //退出登录
  backLogIn:function(event){
    app.globalData.isLogin=false;
    app.globalData.username="游客";
    app.httpForm('user/logOut',{},"POST").then(res=>{
     if(res.code === 1){
      wx.clearStorageSync();
      wx.navigateTo({
        url: '/pages/logIn/logIn',
      })
     }else{
       common.showModal(res.message, "提示");
     }
    })
  },
  //用户签到
  userSign:function(event){
    let userId=wx.getStorageSync("userId");
    let that=this;
    let signTime = util.formatTime(new Date())
    let data={
      signTime: signTime,
      userId:userId
    }
    app.httpForm("user/addSign",data,"POST").then(res=>{
      if(res.code === 1){
            that.setData({
              signTime:signTime,
              isSign:true 
            })
        that.getUserSignCount();
      }else{
        common.showModal(res.message, "提示");
      }
    })
  },
  //获取用户签到次数
  getUserSignCount:function(){
    let that = this;
    let userId=wx.getStorageSync("userId");
    let data={
      userId: userId
    }
    app.httpForm("user/countSign",data,"GET").then(res=>{
      if(res.code === 1){
        that.setData({
          signCountTime: res.data.dataCount,
        })
      }else{
        common.showModal(res.message, "提示");
      }
    })
  },
  //判断用户今日是否签到（一天只能签到一次）
  getIsSign:function(){
    let userId=wx.getStorageSync("userId");
    let that=this;
    let data={
        userId:userId
    }
    app.httpForm("user/getIsSign",data,"GET").then(res=>{
      if(res.code === 1){
         that.setData({
           isSign:!res.data.dataResult,
           signTime:res.data.dataList[0].signTime
         })
      }else{
        common.showModal(res.message, "提示");
      }
    })
  },
  //获取消息条数
  getNewsCount:function(){
    let that=this;
    let data={
      userId: wx.getStorageSync("userId")
    }

    app.httpForm("user/getUnReadNew",data,"GET").then(res=>{
      if(res.code === 1){
          if(res.data.resultCount != 0){
          that.setData({
            NewsCount: res.data.resultCount,
            NewsBool:true
          })
          }
      else{
        that.setData({
          NewsBool:false
        })
      }
      }else{
        common.showModal(res.message, "提示");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let url = wx.getStorageSync('avatarUrl');
      this.setData({
        islogin: app.globalData.isLogin,
        username:app.globalData.username
      })
    if (url != undefined && url != '')
      this.setData({
        avatarUrl: url
      })
    //如果用户登录了
    if(this.data.islogin){
    this.getUserSignCount();
    this.getIsSign();
    this.getNewsCount();  
    }
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
   return {
     title:"不忘初心，方得始终。",
     path: "/pages/index/index",
     imageUrl:"/image/kobe.png"
     
   }
  }
})