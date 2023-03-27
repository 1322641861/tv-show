<script>
    export default {
        globalData: {
            http_url: "https://jkyx-test.chiguavod.com/applet/", // 正式 api // 测试 test
			http_add:"https://jkyx-test.chiguavod.com/",
            //   http_url:"https://mmhh.m2gee.com/applet/", //超数藏
            //	img_url:"https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/" // 正式 prod // 测试 test
            // img_url: "https://jkyx-oss.chiguavod.com/res/",
			img_url: "https://jkyx-test.chiguavod.com/res/",
            audiotext: '',
            captchaAppId: "199229427", //----
            isDev: false
        },
        onLaunch: function() {
            console.log('App Launch')
            // this.audiotext = uni.createInnerAudioContext();
            // console.log(this.audiotext)

            // this.audiotext.autoplay = true
            // this.audiotext.loop = true

            // testBlindBox 不维护  blindBoxMate // 维护  testMhxq  测试
            // https://jkyx-api.chiguavod.com 发布域名 正式 api 测试 test
            // https://jkyx-test.chiguavod.com
            //  var strs = ""
            //  var url = location.href; //获取url中"?"符后的字符串
            //  var theRequest = new Object();
            //  if (url.indexOf("?") != -1) {
            // var str = url.substr(1);
            // strs = str.split("&");
            // 	console.log(strs,852)
            // if(strs == undefined ){
            // 	strs = ""
            // 	return
            // }
            // var lincode = ''
            // for(var i = 0; i < strs.length; i ++) {
            // 	 theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            // 	 lincode = theRequest[strs[i].split("=")[0]]

            // }
            //    uni.setStorageSync('inviteCode', lincode);
            //  }		
            var parentUserId = this.getRequest().parentUserId
            if (parentUserId) {
                console.log(parentUserId, '抽签id')
                uni.setStorageSync('parentUserId', parentUserId)
            }
            let script = document.createElement('script');
            script.src = 'https://ssl.captcha.qq.com/TCaptcha.js'
            document.head.appendChild(script)
        },
        methods: {
            getRequest() {
                var url = window.location.search;
                var theRequest = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1); //获取url中"?"符后的字串 		
                    var strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            }
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style lang="scss">
	/* #ifndef APP-PLUS-NVUE */
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
    @import "uview-ui/index.scss";
    @import "my.scss";

    /*每个页面公共css */
    page {
        /* 	background-image: url(static/images/back.png);
		background-size: cover;
		background-position:center;
		background-repeat: no-repeat; */
        background: #F5F5F5;
        font-family: 'PingFang SC';
        // color: $uni-theme-textcolor;
        height: 100%;
        // background: $uni-theme-bgcolor;
    }

    .whole-page {
        width: 100%;
        height: 100%;
        position: relative;

    }

    .uni-tabbar-border {
        height: 0 !important;
    }

    view {
        box-sizing: border-box;
        font-size: 30upx;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        // color: #fff;
        overflow: hidden;
    }

    .fl-left {
        float: left;
    }

    .fl-right {
        float: right;
    }

    /* 登录弹窗 */
    /* 遮罩 */
    .whole-Mask {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);

    }

    .content-back {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .content-verify {
        width: 600upx;
        padding: 40upx 50upx 60upx 50upx;
        background-color: #fff;
        border-radius: 24upx;
        margin: 45vh auto 0 auto;
        z-index: 99;
    }

    .popup-content {
        background-color: #fff;
        border-radius: 24upx;
        padding: 20upx 48upx;
        width: 650upx;
    }

    .agreement-whole {
        width: 100%;
        padding: 24upx 0;
    }

    .agreement-radius {
        float: left;
        width: 30upx;
        height: 30upx;
        border-radius: 50%;
        margin: 2upx 10upx 0 0;
        border: 2upx solid #C4C4C4;
    }

    .agreement-radius image {
        width: 100%;
        height: 100%;
    }

    .bord {
        border: none;
    }

    .agreement-text {
        float: left;
        font-size: 24upx;
        color: #000000;
    }

    .agreement-text text {
        color: #4664F5;
    }

    .popup-title {
        width: 100%;
        padding: 40upx 0;
        font-size: 32upx;
        color: #000000;
        text-align: center;
    }

    .popup-text {
        padding-bottom: 20upx;
    }

    .popup-item {
        width: 100%;
        padding: 28upx 40upx;
        background: #F2F2F2;
        border-radius: 8upx;
        margin-bottom: 16upx;
    }

    .popup-item input {
        width: 100%;
        height: 100%;
        float: left;
        font-size: 28upx;
    }

    .right-input {
        float: right;
        font-size: 28upx;
        color: #333333;
    }

    .popup-button {
        width: 574upx;
        height: 96upx;
        background: #222222;
        border-radius: 8upx;
        text-align: center;
        line-height: 96upx;
        font-size: 32upx;
        color: #FFFFFF;
        margin-top: 40upx;
    }

    .longin-text {
        float: left;
        font-size: 32upx;
        padding: 6upx 0 0 20upx;
    }

    /* 维护样式 */
    .maintain-img {
        width: 300upx;
        height: 300upx;
        margin: 10vh auto 40upx auto;
    }

    .maintain-text {
        width: 100%;
        text-align: center;
        color: #999999;
        font-size: 34upx;
		
    }

    .right-random {
        float: right;
        padding: 0 50upx;
    }

    .right-random text:nth-child(1) {
        color: #EF7FDF;
        display: inline-block;
        transform: rotate(30deg);
        margin: -4upx -6upx 0 0;
        float: left;
        font-size: 34upx;
    }

    .right-random text:nth-child(2) {
        color: #007AFF;
        display: inline-block;
        float: left;
        font-size: 34upx;
    }

    .right-random text:nth-child(3) {
        color: #FC4444;
        display: inline-block;
        transform: rotate(10deg);
        float: left;
        font-size: 34upx;
    }

    .right-random text:nth-child(4) {
        color: #FF7B00;
        display: inline-block;
        transform: rotate(-10deg);
        float: left;
        margin: 4upx 0 0 -4upx;
        font-size: 34upx;
    }

    .random-text {
        float: right;
        font-size: 26upx;
        color: #666666;
    }

    /* 详情 */
    .title-whole {
        font-weight: 700;
        font-size: 36upx;
        letter-spacing: 0.08em;
        color: #222222;
        width: 100%;
        padding: 60upx 0;
    }

    .whole-text {
        width: 100%;
        display: flex;
    }

    .text-img {
        width: 160upx;
    }

    .text-right {
        flex: 1;
        padding-left: 24upx;
    }

    .text-item {
        width: 100%;
        font-weight: 400;
        font-size: 24upx;
        color: #222222;
        padding-bottom: 24upx;
    }

    .code-img {
        width: 160upx;
        margin: 0 auto;
    }

    .code-text {
        font-size: 28upx;
        color: #222222;
        padding-top: 20upx;
        text-align: center;
    }

    .title-weiy {
        width: 100%;
        padding-bottom: 20upx;
        font-weight: 700;
        font-size: 32upx;
        letter-spacing: 0.08em;
        color: #222222;
    }

    .title-weiy image {
        float: left;
        width: 40upx !important;
        height: 40upx !important;
        margin-right: 12upx;
    }

    .text-weiy {
        font-size: 28upx;
        color: #222222;
        padding-bottom: 40upx;
    }

    .weiy-bottom {
        font-size: 28upx;
        color: #222222;
        font-weight: 500;
        padding-bottom: 20upx;
    }

    .explain-text {
        width: 100%;
        padding: 4upx 0;
        color: #999999;
        font-size: 26upx;
        text-align: center;
    }

    .common-title {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 44rpx;
        padding: 60rpx 36rpx 40rpx;
        color: $uni-theme-textcolor;
    }
	/* #endif */
</style>
