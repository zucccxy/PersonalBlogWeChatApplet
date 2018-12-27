//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo);
              wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请完成授权',
            success: function(res) {

            }
          })
        }
      }
    })
  },
  httpJSON: function(url, data, method) { //封装http请求
    const apiUrl = "http://localhost:12080/api/";
    return new Promise((resolve, reject) => {
      wx.request({
        url: apiUrl + url,
        header: getApp().globalData.header,
        // data: Object.assign(currency,data),
        data: data,
        method: method,
        success: function(res) {
          if (res.data.code === 1) {} 
          else if (res.data.code === 2 || res.data=== "noLogIn" ) {
            wx.showToast({
              title: '自动登录中',
            })
            var userAccount = wx.getStorageSync('userAccount');
            var userPwd = wx.getStorageSync('userPwd');
            if (userAccount === null || userPwd === null) {
              wx.redirectTo({
                url: '../logIn/logIn',
              })
            }
          else{
              wx.request({
              url: 'http://localhost:12080/api/user/userLogIn',
              data: "userAccount=" + userAccount + "&userPwd=" + userPwd,
              header: getApp().globalData2.header,
              method: method,
              success: function(res) {
                if (res.data.code === 1) {
                  // 同步方式存储表单数据
                  getApp().globalData.header.Cookie = 'server=' + res.data.data.data;
                  getApp().globalData2.header.Cookie = 'server=' + res.data.data.data;

                }
              }
            })
          }
          } else {
            wx.showModal({
              title: '加载失败',
              content: res.data.message,
              success: function(res) {
                if (res.confirm) {
                  console.log("用户点击确定")
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          resolve(res.data)
        },
        fail: function(res) {
          reject(res);
        },
        complete: function() {
          console.log('complete');
        }
      })
    })
  },
  httpForm: function(url, data, method) { //封装http请求
    const apiUrl = 'http://localhost:12080/api/' //请求域名
    console.log("post")

    return new Promise((resolve, reject) => {
      wx.request({
        url: apiUrl + url,
        data: data,
        header: getApp().globalData2.header,
        method: method,
        success: function(res) {

          if (res.data.code === 1) {

         } else if (res.data.code === 2 || res.data === 
         "noLogIn") {
            wx.showToast({
              title: '自动登录中',
            })
            var userAccount = wx.getStorageSync('userAccount');
            var userPwd = wx.getStorageSync('userPwd');
            if (userAccount === null || userPwd === null) {
              wx.redirectTo({
                url: '../logIn/logIn',
              })
            }
            else{
            wx.request({
              url: 'http://localhost:10010/api/user/userLogIn',
              data: "userAccount=" + userAccount + "&userPwd=" + userPwd,
              header: getApp().globalData2.header,
              method: method,
              success: function(res) {
                if (res.data.code === 1) {
                  // 同步方式存储表单数据
                  getApp().globalData.header.Cookie = 'server=' + res.data.data.data;
                  getApp().globalData2.header.Cookie = 'server=' + res.data.data.data;

                }
              }
            })
            }
          } else {
            wx.showModal({
              title: '操作失败',
              content: res.data.message,
              success: function(res) {
                if (res.confirm) {
                  console.log("用户点击确定")
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          resolve(res.data)
        },
        fail: function(res) {
          reject(res);
        },
        complete: function() {
          console.log('complete');

        }
      })
    })
  },
  globalData: {
    userPwd: null,
    openid: null,
    header: {
      'Cookie': '',
      'content-type': 'application/json'
    }
  },
  globalData2: {
    userInfo: null,
    openid: null,
    header: {
      'Cookie': '',
      'content-type': 'application/x-www-form-urlencoded'
    }
  }

})