// pages/account/news/news.js
const app = getApp();
const common = require('../../../utils/common.js');
const util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsList:[]
  },
  getNewsList:function(){
    let data={
      userId: wx.getStorageSync("userId")
    }
    let that=this;
    app.httpForm("user/getNewsList",data,"GET").then(res=>{
      if(res.code === 1){
       that.setData({
         newsList: res.data.dataList
       })
      }else{
        common.showModal(res.message, "提示");
      }
    })
  },
  updateNewsStatus:function(){
    let data={
      userId:wx.getStorageSync("userId")
    }
    app.httpForm("user/updateNewsStatus",data,"POST").then(res=>{
      if(res.code === 1){
      }else{
        common.showModal(res.message, "提示");
      }
    })
  },
  enterArticleDetial:function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.redirectTo({
      url: '/pages/article/articleDetail/articleDetail?articleId=' + id,
    })
  },
  deleteItem:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: '确认要删除改消息记录吗？',
      success(res){
        let data={
          newsId:id
        }
        if(res.confirm){
          app.httpForm("user/deleteNew", data, "POST").then(res => {
            if (res.code === 1) {
              that.getNewsList();
            } else {
              common.showModal(res.message, "提示");
            }
          })
        }
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
    this.updateNewsStatus();
    this.getNewsList();
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