// pages/account/editAccount/editUserAccount/editUserAccount.js
const app = getApp()
const common = require('../../../../utils/common.js');
const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAccount:""
  },
  submitAccount:function(e){
    let that=this;
    let account = e.detail.value;
    if (this.userAccount === account){
      common.showModal("账号不能跟之前相同，请修改！", "提示");
    }else if(account.length<3){
     common.showModal("账号长度必须在3-20个字符之间");
    }
else{
      let data={
        userId: wx.getStorageSync("userId"),
        account: account
      }
      wx.showLoading({
        title: '上传中，请稍候！',
        mask: true
      });
      app.httpForm("user/updateUserAccount",data,"POST").then(res=>{
        wx.hideLoading();
        if(res.code === 1){
          wx.setStorageSync("userAccount", account);
          common.showTip("修改成功,正在跳转", "success", function () {
            wx.navigateBack({
              delta: 1
            })
          }); 
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
    this.setData({
      userAccount: wx.getStorageSync("userAccount")
    })
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