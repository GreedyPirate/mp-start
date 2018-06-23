//app.js
/**
 * 引入api，供全局使用
 */
const util = require('./utils/util.js');
const fetch = require('./utils/api.js');
App({
  util:util,
  fetch:fetch,
  onLaunch: function () {
    // 展示本地同步存储能力
    var logs = wx.getStorageSync('logs') || []
    // 头部追加时期
    logs.unshift(Date.now())
    // 重新设施会缓存
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        fetch.loginCheck('user/wxLogin').then((res)=>{
          
        })
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

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})