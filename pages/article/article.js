// pages/article/article.js
const app = getApp()
const common = require('../../utils/common.js');
const util = require('../../utils/util.js');
const timeago = require('../../miniprogram_npm/timeago.js/index.js')
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
      '../../image/blog_3.jpg',
      '../../image/blog_1.jpg', 
      '../../image/blog_2.jpg',
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
    // style:"shadow",
  },
  // //触发改变样式
  // changeStyle:function(){
  //   console.log("触发了吗")
  //   this.setData({
  //     style: "shadow-large"
  //   })
  // },
  //进入详情界面
  enterDetail: function (options){
    var id = options.currentTarget.dataset.id;
    // this.setData({
    //   style: "shadow"
    // })
    wx.navigateTo({
      url: '/pages/article/articleDetail/articleDetail?articleId='+id,
    })
  },
  //根据标签筛选文章
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
  //获取文章列表
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
          item.createTime = timeago.format(item.createTime, "zh_CN");
          item.createTime = item.createTime.replace(/\s+/g, "");
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
  
    // this.getArticleList();
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
    this.data.pageNo=1;
    this.data.articleList=[];
    this.getArticleList();
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