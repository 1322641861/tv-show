// 本地开发
// const baseUrl = "http://192.168.3.167:8200";
// 本地2开发
// const baseUrl = "http://m40593s324.zicp.vip:13450";
// 线上
const baseUrl = "http://localhost:8200";

const socketUrl = "";

const courtConfig = {
	//微信公众号APPID
	publicAppId: "",
	//请求接口
	baseUrl: baseUrl,
	//webSocket地址
	socketUrl: socketUrl,
	//平台名称
	platformName: "uniApp",
	//项目 logo 
	logoUrl: "",
	//页面分享配置
	share: {
		title: 'uniApp',
		// #ifdef MP-WEIXIN
		path: '/pages/home/home', //小程序分享路径
		// #endif
		// #ifdef H5 || APP-PLUS
		//公众号||APP分享
		desc: "uniApp", // 分享描述
		link: "https://www.kemean.com/sameCity/18031201/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: "http://qn.kemean.cn/upload/201901/28/23bedfc34597482292ecd6dc107f6342", // 分享图标
		// #endif
	}
};

//手机号验证正则表达式
const phoneReg = /^1\d{10}$/;
//邮箱验证正则表达式
const mailReg = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
//密码验证正则表达式
const passwordRegular = /^[a-zA-Z0-9]{4,10}$/;
// 身份证号正则验证
const idcardCode = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
export default Object.assign({
	phoneReg,
	mailReg,
	passwordRegular,
}, courtConfig);


/**
 * @min Number
 * @max Number
 * */ 
export function getRandomNum_AB(min, max) {
    const num = Math.random() * (max - min + 1) + (min);
    const randomNum = Math.floor(num);
    return randomNum;
}


export class GL {
    /**
     * 构造函数
     * @param {object} opt
     * @param {number} opt.min 最小整数值
     * @param {number} opt.max 最大整数值
     * @param {Map} opt.fenpei 自定义概率 
     */
    constructor({ min, max, fenpei = new Map() }) {
        this.min = min;
        this.max = max;
        this.fenpei = fenpei;
    }

    /**
     * 可分配百分比
     */
    get baifenbi() {
        return (1 - this.peizhi) / (this.max - this.min - this.fenpei.size);
    }

    /**
     * 匹配百分比
     */
    get peizhi() {
        let result = 0;
        for (let i of this.fenpei.values()) {
            if (0 < i && i < 1) result += i;
        }
        return result;
    }


    /**
     * 随机数
     * @returns {number} [min,max)
     */
    random() {
        let t = 0, r = Math.random();
        for (let i = this.min; i < this.max; i++) {
            this.fenpei.has(i) ? t += this.fenpei.get(i) : t += this.baifenbi;
            if (t > r) return i;
        }
        return null;
    }
}