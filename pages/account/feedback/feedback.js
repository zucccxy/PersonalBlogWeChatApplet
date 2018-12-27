// pages/account/feedback/feedback.js
const app = getApp();
const common = require('../../../utils/common.js');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  formSubmit:function(event){
    console.log(event.detail.value);
    var contact = event.detail.value.contact;
    var content = event.detail.value.content;
    var userId= wx.getStorageSync("useId");
    if(userId == ""){
       userId= -1;
    }
    if(contact === ""){
      common.showModal("联系方式不能为空！");
    }else if(content === ""){
      common.showModal("内容不能为空！");
    }else{
      var data={
        userId:userId,
        feedbackContent:content,
        contact:contact
      }
      wx.showLoading({
        title: '反馈提交中，请稍后！',
      });
      app.httpForm("user/submitFeedback", util.json2Form(data),"POST").then(res=>{
        wx.hideLoading();
        if(res.code === 1){
          common.showTip("反馈提交成功，正在跳转","success",function(){
            wx.switchTab({
              url: '../../account/account',
            })
          })
        }else {
          common.showModal(res.message, "提示");
        }
      })
    }
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

  }
})