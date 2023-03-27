import baseUrl from '@/basecall/utils.js'
import { getToken,getLocalLang } from '@/common/common.js'
const request = (url = '', date = {}, type = 'POST', header = {}) => {
	
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: baseUrl.baseUrl + url,
            data: date,
            header: {
				'Content-Type':'application/x-www-form-urlencoded',
				
        // 'Content-Type': 'application/json;charset=UTF-8;',
				header,
				token:getToken()
			},
            dataType: 'json',         
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;        
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

export default request