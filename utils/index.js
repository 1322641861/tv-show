import {
    userInfo,
    bindCardList,
    myWallet,
    Alipay,
    walletList
} from '../api/api.js';
// 获取用户详情
export function getUserInfo() {
    return new Promise((resolve, reject) => {
        userInfo(uni.getStorageSync('userId')).then(res => {
            if (res && res.code == 200) {
                resolve(res.data)
            } else if (res.code == 403) {
                uni.showToast({
                    title: '登录已失效，重新登录',
                    icon: 'none',
                    duration: 1000
                });
                uni.navigateTo({
                    url: '/pages/index/longin/longin'
                })
            } else {
                uni.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 850
                });
            }
        })
    })
}

// 获取绑定的银行卡列表
export function getBindCardList() {
    return new Promise((resolve, reject) => {
        bindCardList().then(res => {
            console.log('res', res);
            if (res && res.code == 200) {
                resolve(res.data)
            } else {
                uni.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 850
                });
            }
        })
    })
}

// 获取余额
export function wallet() {
    return new Promise((resolve, reject) => {
        myWallet().then(res => {
            if (res && res.code == 200) {
                resolve(res.data)
            } else {
                uni.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 850
                });
            }
        })
    })
}

// 获取绑定的支付宝账号
export function aliPay() {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: '加载中'
        })
        Alipay().then(res => {
            uni.hideLoading();
            if (res && res.code == 200) {
                resolve(res.data)
            } else {
                uni.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 850
                });
            }
        })
    })
}

// 获取账单列表
export function getWalletList() {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: '加载中'
        });
        walletList({
            pageNum: 1,
            pageSize: 20,
        }).then(res => {
            uni.hideLoading();
            if (res && res.code == 200) {
                resolve(res.data);
            } else {
                uni.showToast({
                    title: res.message,
                    icon: 'error',
                    duration: 1500
                })
            }
        })
    })
}
// 获取当前年月
export function getYearMonth() {
    // 获取当前年月
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始，需要加1

    // 拼接成"年-月"格式
    const yearMonth = year + '-' + (month < 10 ? '0' + month : month);

    return yearMonth
}
