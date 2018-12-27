// pages/logIn/logIn.js
const app=getApp();
const  common = require('../../utils/common.js');
const util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  logIn:function(event){
    var account = event.detail.value.account;
    var password=event.detail.value.password;
    var data={
      userAccount:account,
      userPwd:password
    }
    app.httpForm("user/userLogIn", util.json2Form(data),"POST").then(res=>{
      if(res.data.code==='1'){
        wx.setStorageSync("userAccount",account);
        wx.setStorageSync("userPwd",password);
        wx.setStorageSync("isLogin", true);
        common.showTip("登录成功,正在跳转", "success", function () {
          console.log("登陆成功！");
          wx.switchTab({
            url: '../index/index',
          })
        });    
      }else{
        common.showModal(res.data.message,"提示");
      }
    }  
    )
  },
  register:function(event){
    wx.navigateTo({
      url: '/pages/register/register',
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