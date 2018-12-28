// pages/article/article.js
const app = getApp()
const common = require('../../utils/common.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],
    categoryList:[],
    selectedCategory:{
        categoryName: "全部",
        categoryId: -1
    },
    currentItemId:-1,
    imgUrls: [
      '../../image/school.jpg', 
      '../../image/kobe.png',
      '../../image/zhaopin.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    disabled: false,
    hasmoreData:true,
    hiddenloading:true,
    pageNo:1,
    pageSize:3,
    totalCount:0,
  },
  enterDetail: function (options){
    var id = options.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/article/articleDetail/articleDetail?articleId='+id,
    })
  },
  categoryChoose:function(options){
   var id=options.currentTarget.dataset.id;
    this.data.selectedCategory={
     categoryId:id,
     categoryName:"测试标签"
   }
   this.setData ({
      currentItemId:id,
      hasmoreData: true,
     hiddenloading: true,
   })
  this.data.pageNo=1;
  this.data.articleList=[];
  this.getArticleList();
  },
  getArticleList: function(){
    let  that=this;
    that.setData({
      hiddenloading: false
    })
    var data={
      pageIndex: that.data.pageNo,
      pageSize:that.data.pageSize,
      categoryId: that.data.selectedCategory.categoryId,
    categoryName:that.data.selectedCategory.categoryName
    }
    app.httpForm("article/articleList",data, "GET").then(res => {
      if (res.code === 1) {
        let resultList=res.data.dataList;
        resultList.forEach(function(item){
          that.data.articleList.push(item)
          })
        that.setData({
          articleList:that.data.articleList,
          totalCount: res.data.totalCount,
          hiddenloading: true
        });
    
     
      } else {
        common.showModal(res.message, "提示");
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.getArticleList();
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
          categoryName:"全部",
          categoryId: -1
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
    if (this.data.hiddenloading && this.data.articleList.length < this.data.totalCount) {
      this.data.pageNo++;
      this.getArticleList();
    }
    
    if ( this.data.totalCount !=0 &&this.data.articleList.length >= this.data.totalCount){
      this.setData({
         hasmoreData: false, 
         hiddenloading: true })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})