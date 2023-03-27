export function getToken(){
	return uni.getStorageSync('token')
}

export function getAddress(){
	return uni.getStorageSync('w_address')
}

export function getLocalLang(){
	var lang = uni.getStorageSync('system_info').language;
	var value = null;
	if(lang == 'en'){
		value = 'en_US'
	}else if(lang == 'zh_CN' || lang == 'zh-CN'){
		value = 'zh_CN'
	}else{
		value = 'zh_CN'
	}
	return value
}

export function getUserId(){
	return uni.getStorageSync('userId');
}

export function getUserInfo(){ // 获取 c2c 用户信息
	return uni.getStorageSync('userInfo')
}

export function getLoginStatus(){ // 获取用户是否登录
	return uni.getStorageSync('isLogin')
}

export function getDatetime(timestamp) {
   var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
   var Y = date.getFullYear() + '-';
   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
   var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
   var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
   var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
   var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
   return Y + M + D + h + m + s;
}

export function istype(obj, type) { //判断包装类型的原型
  return Object.prototype.toString.call(obj).indexOf(type) != -1
}

export function intercept(str,n){ // 钱包地址字符串截取位数 str 要截取的字符，n 位数
	var n = n || 6;
	if(str){
		var str = str.toString();
		return str.substring(0,n) + '******' + str.substring(str.length - n , str.length)
	}else{
		return '-'
	}
}


export function deepClone(initalObj) {
	  if (typeof initalObj !== 'object') { //如果是基本类型直接返回值
	    return initalObj
	  }
	  if (istype(initalObj, 'String') || istype(initalObj, 'Number') || istype(initalObj, 'Boolean'))
	    return initalObj.valueOf();
	  if (istype(initalObj, 'Date'))
	    return new Date(initalObj.valueOf());
	  if (istype(initalObj, 'RegExp')) {
	    let pattern = initalObj.valueOf();
	    let flags = '';
	    flags += pattern.global ? 'g' : '';
	    flags += pattern.ignoreCase ? 'i' : '';
	    flags += pattern.multiline ? 'm' : '';
	    return new RegExp(pattern, flags);
	  }
	  const obj = Array.isArray(initalObj) ? [] : {}; //可能是对象或者数组
	  for (const key in initalObj) {
	    if (typeof initalObj[key] === 'object') { //对于对象元素，deepclone
	      //递归返回新的对象
	      obj[key] = deepClone(initalObj[key]);
	    } else if (typeof initalObj[key] === 'function') { //对于函数,用bind拷贝
	      //返回新函数
	      obj[key] = initalObj[key].bind(obj);
	    } else {
	      //基本类型直接返回
	      obj[key] = initalObj[key];
	    }
	  }
	  return obj;
}


// 保存图片
export function saveHeadImgFile(base64, quality) {
    const bitmap = new plus.nativeObj.Bitmap("test");
    return new Promise((resolve, reject) => {
        // 从本地加载Bitmap图片
        bitmap.loadBase64Data(base64, function() {
            const url = "_doc/" + getTimeStamps() + ".png";  // url为时间戳命名方式
            bitmap.save(url, {
                overwrite: true,  // 是否覆盖
                quality: quality || 80,  // 图片清晰度
            }, (i) => {
                uni.saveImageToPhotosAlbum({
                    filePath: url,
                    success: function() {
                        resolve({
                            code: 0,
                            msg: '保存成功',
                            filePath: url
                        });
                    }
                });
            }, (e) => {
                reject('保存图片失败：' + JSON.stringify(e));
            });
        }, (e) => {
            reject('加载图片失败：' + JSON.stringify(e));
        });
    })
}