// pages/share/shareDetail/shareDetail.js
const app = getApp()
const common = require('../../../utils/common.js');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: -1,
    movie: {},
    loading:false
  },
  getMovieDetail: function() {
    let that = this;
    var result = "";
    //分割list组成"/ / /"形式的字符串
    function myfunction(item, index) {
      // result="";
      if (index === 0) {
        result += item;
      } else {
        result += "/" + item;
      }
    };
    //分割list组成", , ,"形式的字符串
    function myfunction2(item, index) {
      var arr = "";
      // result = "";
      if (index === 0) {
        arr = item.split(" ");
        result += arr[0];
      } else {
        arr = item.split(" ");
        result += ", " + arr[0];
      }
    };
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/' + that.data.movieId,
      //必须要设置"content-type":"json",不然会报错 400 (Bad Request)
      header: {
        "content-type": "json"
      },
      success: function(res) {
        var item = res.data;
        item.attrs.director.forEach(myfunction2);
        item.attrs.director = result;
        result = "";
        item.attrs.writer.forEach(myfunction2);
        item.attrs.writer = result;
        result = "";
        item.attrs.cast = item.attrs.cast.slice(0, 4);
        item.attrs.cast.forEach(myfunction2);
        item.attrs.cast = result;
        result = "";
        item.attrs.movie_type.forEach(myfunction);
        item.attrs.movie_type = result;
        result = "";
        item.attrs.country.forEach(myfunction);
        item.attrs.country = result;
        result = "";
        item.attrs.language.forEach(myfunction);
        item.attrs.language = result;
        result = "";
        item.attrs.pubdate.forEach(myfunction);
        item.attrs.pubdate = result;
        result = "";
        item.attrs.movie_duration.forEach(myfunction);
        item.attrs.movie_duration = result;
        result = "";
        that.setData({
          movie: res.data,
          loading:true 
        })
        console.log(res.data);
      },
      fail: function(res) {
        common.showModal(res.message, "提示");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.movieId = options.id;
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getMovieDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})