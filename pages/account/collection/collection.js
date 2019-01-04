// pages/account/collection/collection.js
const app = getApp()
const common = require('../../../utils/common.js');
const util = require('../../../utils/util.js');
const timeago = require("../../../miniprogram_npm/timeago.js/index.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:[]
  },
  getCollectionList:function(){
     let that=this;
     let userId=wx.getStorageSync("userId");
     let data={
       userId:userId
     }
    app.httpForm("user/collectionList",data,"GET").then(res=>{
      if(res.code === 1){
         res.data.dataList.forEach((resEach)=>{
           resEach.createTime = timeago.format(resEach.createTime,"zh_CN")
           resEach.createTime=resEach.createTime.replace(/\s+/g,"");
         })
          that.setData({
            collectionList:res.data.dataList
          })
      }else{
        common.showModal(res.message, "提示");
      }
    })
  },
  enterArticleDetail:function(e){
    var articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/articleDetail/articleDetail?articleId=' + articleId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getCollectionList();
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
    this.getCollectionList();
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