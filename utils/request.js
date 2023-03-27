
/**
 * 发送请求 
 */ 
// 正式服务器APP不需要代理 
 // #ifdef H5
    const baseUrl ="/"
 // #endif
// #ifdef APP-PLUS
      // const baseUrl = "https://jkyx-api.chiguavod.com" // 正式
    const baseUrl = "https://jkyx-test.chiguavod.com/" //测试
 
 // #endif   

function baseRequest(url, method, data) { 
	return new Promise((reslove, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method || 'GET',
			data: data || {},
			header:{
				'sessionId': uni.getStorageSync('sessionId'),
			},
			success: (res) => {
					reslove(res.data, res,"#123");	
					if(res.data.code==10020||res.data.code==10021||res.data.code==401){
						uni.showToast({
							title: '登录已过期',
							icon: "error",
							duration: 850
						});
						uni.clearStorage();
						
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/login/login"
							})
						},1000)						
					}
					if(res.data.code == 500){
						 uni.showToast({
						 	title: res.data.message,
						 	icon: "error",
						 	duration: 850
						 });
					}
					
			},
			fail: (msg) => {
				reject('请求失败');
				console.log("请求失败",msg)
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;
