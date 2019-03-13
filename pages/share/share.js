// pages/share/share.js
const app = getApp()
const common = require('../../utils/common.js');
const util = require('../../utils/util.js');
const timeago = require('../../miniprogram_npm/timeago.js/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieList:{},
    loading:false,
    hasmoreData:true
  },
  enterMovieDetail:function(e){
  var movieId=e.currentTarget.dataset.id;
  var name=e.currentTarget.dataset.name;
  wx.navigateTo({
    url: '/pages/share/shareDetail/shareDetail?id='+movieId+"&name="+name,
  })
  },
  getMovieList:function(e){
    let that=this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data:{
        start:0,
        count:10
      },
      //必须要设置"content-type":"json",不然会报错 400 (Bad Request)
      header: {
        "content-type": "json"
      },
      success:function(res){
        // res.data.subjects.forEach(function(item){
        //   item.title=item.title.split(" ")[0];
        // });
       that.setData({
         loading:true,
          movieList:res.data.subjects

      })
      },
      fail:function(res){
        common.showModal("网络连接失败", "提示");
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
    this.getMovieList();
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
    this.setData({
      hasmoreData:false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})