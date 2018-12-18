// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  enterMyNews:function(event){
    wx.navigateTo({
      url: '/pages/account/news/news?type="1"',
    })
  },
  enterMyCollection:function(event){
    wx.navigateTo({
      url: '/pages/account/collection/collection?type="1"',
    })
  },
  enterFeedback:function(event){
    wx.navigateTo({
      url: '/pages/account/feedback/feedback?type="1"',
    })
  },
  showAbout:function(event){
    wx.showModal({
      title: '关于',
      content: '本项目仅供交流学习使用',
      showCancel:false
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