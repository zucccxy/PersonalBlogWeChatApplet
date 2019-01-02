// pages/article/articleDetail/articleDetail.js
const app = getApp()
const common = require('../../../utils/common.js');
const util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indexs:true,
    articleDetail: {},
    articleCategoryList: [],
    commentList:[],
    replayList:[],
    commentCount: 0,
    selectCommentId: -1,
    articleId:-1,
    userId:-1,
    collect:false,
    hiddenModal: true,
    replayContent:"",
    repliedName:"",
  },
  //获取文章信息
  getArticleDetail: function(articleId) {
    let that = this;
    var data = {};
    if (articleId == undefined) {
      data = {
        articleId: this.data.articleId
      }
    } else {
      data = {
        articleId: articleId
      }
    }
    app.httpForm("article/articleDetail", data, "GET").then(res => {
      if (res.code === 1) {
        that.setData({
          articleDetail: res.data.data
        })
        this.getarticleCategoryList(data);
        this.getArticleCount(data);
        this.getCommentList(data);
      } else {
        common.showModal(res.message, "提示");
      }
    })
  },
  //获取文章标签
  getarticleCategoryList:function(data){
    let that=this;
    app.httpForm("article/articleCategories", data, "GET").then(res => {
      if (res.code === 1) {
        that.setData({
          articleCategoryList: res.data.dataList
        })
      } else {
        common.showModal(res.message, "提示");
      }
    })
  },
  //获取评论总数
  getArticleCount:function(data){
    let that=this;
    app.httpForm("article/articleCommentCount",data,"GET").then(res=>{
      if(res.code === 1){
        that.setData({
          commentCount:res.data.dataCount
        })
      }else{
         common.showModal(res.message,"提示");
      }
    })
  },
  //获取评论列表
  getCommentList:function(data){
    let that=this;
    if(data === undefined){
      data={
        articleId: this.data.articleId
      }
    }
    app.httpForm("article/articleCommentList",data,"GET").then(res=>{
      if(res.code === 1){
           that.setData({
             commentList:res.data.dataList
           })
      }else{
        common.showModal(res.message, "提示");
      }
    })
  },
  //获取回复列表
  getReplayList:function(data){
   let that=this;
    if (data === undefined) {
      data = {
        commentId: this.data.selectCommentId
      }
    }
    app.httpForm("article/commentReplayList",data,"GET").then(res=>{
      if(res.code === 1){
        let result = res.data.dataList;
        let newResult=new Array();
        newResult[data.commentId]=result;
         that.setData({
           replayList: newResult
         })
      }else{
        common.showModal(res.message,"提示");
      }
    })
  },
  //处理收藏/取消收藏
  hangdleCollect: function () {
    let that=this;
    let data={
      articleId:this.data.articleId,
      userId:this.data.userId,
      collectionResult: this.data.collect
    }
    app.httpForm("article/collectionAction",data,"GET").then(res=>{
       if(res.code === 1){
           if(res.data.dataResult === "collect"){
             that.setData({
               collect:true
             })
             common.showTip("收藏成功", "success");
           }
           else{
             that.setData({
               collect:false
             })
             common.showTip("取消成功", "success");
           }
       }else{
         common.showModal(res.message, "提示");
       }
    })
  },
  // 给文章增加阅读量
  addReadCount:function(articleId){
    let data={
      articleId:articleId
    };
      app.httpForm("article/addReadCount",data,"POST").then(res=>{
        if(res.code === 1){
          
        }else{
          common.showModal(res.message,"提示")
        }
      })
  },
  //判断该篇文章是否已经被用户收藏
  getIsCollect:function(articleId){
    let that=this;
    let data={
    articleId:articleId,
     userId:this.data.userId
    }
    app.httpForm("article/getIsCollect",data,"GET").then(res=>{
      if(res.code === 1){
          that.setData({
            collect: res.data.dataResult
          })
         
      }else{
         common.showModal(res.message,"提示") 
      }
   
    })
  },
  //处理更多回复按钮事件
  more:function(event){
    let data={
      commentId: event.currentTarget.dataset.commentid
    }
    this.getReplayList(data);
   
    let index = 0;
    let arrayItem = this.data.commentList;
    for (let item of arrayItem) {
      //如果当前点击的对象id和循环对象里的id一致
      if (item.commentId === event.currentTarget.dataset.commentid) {
        //判断当前对象中的isShow是否为true（true为显示，其他为隐藏） 
        if (arrayItem[index].isShow === "" || arrayItem[index].isShow == undefined) {
          arrayItem[index].isShow = "show"
        }
        else {
          arrayItem[index].isShow = ""
        }
      }
      index++;
    }
    this.setData({
      commentList: arrayItem
    })
  },
  //未登录状态点击登录
  switchLogin:function(){
    // wx.redirectTo({
    //   url: '/pages/logIn/logIn',
    // })
    wx.reLaunch({
      url: '/pages/logIn/logIn',  
    })
  },
  //提交评论
  submitComment:function(event){
    if (!event.detail.value.commentContent) {
      common.showModal("请输入内容！", "提示") 
      return false;
    }
    let that=this;
    let data={
      articleId: this.data.articleId,
      userId:this.data.userId,
      commentContent: event.detail.value.commentContent,
    }
    wx.showLoading({
      title: '上传中',
      mask:true 
    })
    app.httpForm("article/addComment",data,"POST").then(res=>{
      if(res.code === 1){
          wx.hideLoading();
          that.setData({
            form_info:""
          })
          common.showTip("评论成功", "success");
          that.getCommentList();     
           }else{
          common.showModal(res.message, "提示") 
      }
    })
  },
  //弹出回复模态框
  handleReply:function(e){
    this.data.repliedName=e.currentTarget.dataset.repliedname;
    this.data.selectCommentId=e.currentTarget.dataset.commentid;
    this.setData({ hiddenModal: false })
  },
  //取消回复
  modelCancel:function(){
    this.setData({hiddenModal:true})
  },
  //处理回复
  modelConfirm:function(){
    let that=this;
    if (!this.data.replayContent) {
      common.showModal("请输入内容！", "提示")
      return false;
    }
    wx.showLoading({
      title: '上传中',
      mask: true
    })
   let data={
     replyContent: that.data.replayContent,
     userId: that.data.userId,
     commentId: that.data.selectCommentId,
     repliedName: that.data.repliedName
   }
    app.httpForm("article/addReplay",data,"POST").then(res=>{
      if(res.code === 1){
          wx.hideLoading();
          common.showTip("评论成功", "success");
          that.setData({ hiddenModal: true });
          that.getReplayList();
      }else{
        common.showModal(res.message, "提示") 
      }
    }) 
  },
  replayContentInput:function(e){
    this.data.replayContent=e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
        userId: wx.getStorageSync("userId")
        });
    this.data.articleId =parseInt(options.articleId);
    this.getArticleDetail(parseInt(options.articleId));
    this.addReadCount(parseInt(options.articleId));
    //只有用户登录时触发
    if (this.data.userId) {
    this.getIsCollect(options.articleId);
    }
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