// pages/account/editAccount/editUserPassword/editUserPassword.js
const app = getApp()
const common = require('../../../../utils/common.js');
const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submitPassword:function(e){
    let that=this;
    let oldPwd=e.detail.value.oldPwd;
    let newPwd1=e.detail.value.newPwd1;
    let newPwd2=e.detail.value.newPwd2;
    if(oldPwd !== wx.getStorageSync('userPwd')){
      common.showModal("当前密码输入错误，请重新输入！", "提示");
    }else if(newPwd1 !== newPwd2){
      common.showModal("新密码两次输入不一致，请重新输入！", "提示");
    }else{
      let data={
        userId:wx.getStorageSync("userId"),
        password:newPwd1
      }
      wx.showLoading({
        title: '上传中，请稍候！',
        mask:true
      })
      app.httpForm("user/updateUserPassword",data,"POST").then(res=>{
        wx.hideLoading();
        if(res.code === 1){
          common.showTip("修改成功,正在跳转", "success", function () {
            wx.setStorageSync("userPwd", newPwd1);
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