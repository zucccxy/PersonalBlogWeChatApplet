// pages/register/register.js
const app=getApp();
const common = require('../../utils/common.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  handleRegister:function(event){
   console.log(event.detail.value);
   var account=event.detail.value.account;
   var username=event.detail.value.username;
   var password=event.detail.value.password;
   var passwordAgain=event.detail.value.passwordAgain;
    var avatarurl = wx.getStorageSync("avatarUrl");
   if(account === ""){
     common.showModal("账号不能为空！");
   } else if(username === ""){
     common.showModal("用户名不能为空！");
   }else if(password === ""||passwordAgain === ""){
     common.showModal("密码不能为空！");
   }else if(password != passwordAgain){
     common.showModal("两次输入密码不一致");
   }else{
     wx.showLoading({
      title: '用户注册中，请稍后！',
       mask: true 
    });
    var data={
      username:username,
      account:account,
      authority:1,
      password:password,
      avatarurl:avatarurl
    }
    app.httpForm("user/userRegister",util.json2Form(data),"POST").then(res=>{
      wx.hideLoading();
      if(res.code === 1){
        common.showTip("注册成功","success",function(){
          wx.redirectTo({
            url: "../logIn/logIn"
          })
        })
      }else{
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