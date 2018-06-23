const app = getApp();
const baseUrl = 'http://localhost:8899/';

function loginCheck(url,data){
  return post(url,data);
}
/**
 * 所有请求走post
 */
function post(path, data) {
  var promise = new Promise((resolve, reject) => {
    //init
    var that = this;
    var postData = data;
    /*
    //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
    postData.signature = that.makeSign(postData);
    */
    //网络请求
    wx.request({
      url: baseUrl + path,
      data: postData,
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {//服务器返回数据
        if (res.data.code == 200) {
          //res.data 为 后台返回数据
          resolve(res.data.data);
        } else {//返回错误提示信息
          reject(res.data.message);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
module.exports = {
  loginCheck
}