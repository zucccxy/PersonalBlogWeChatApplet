// pages/article/article.js
const app = getApp()
const common = require('../../utils/common.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
    imgUrls: [
      '../../image/school.jpg', 
      '../../image/kobe.png',
      '../../image/zhaopin.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    disabled: false
  },
  enterDetail: function(event){
    wx.navigateTo({
      url: '/pages/article/articleDetail/articleDetail?type="1"',
      
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
    var that = this;
    app.httpForm("article/categoryList", {}, "GET").then(res => {
      if (res.code === 1) {
        res.data.dataList.unshift({
          categoryName:"全部"
        })
        that.setData({
          categoryList: res.data.dataList
        });
      } else {
        common.showModal(res.message, "提示");
      }
    });
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

  }
})