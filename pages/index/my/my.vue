<template>
    <view class="whole-page">
        <view class="my-back">
            <image src="../../../static/images/mybj.png" mode="widthFix" style="width:100%;"></image>
        </view>
        <view class="my-padd">
            <view class="imge-sz" @click="goright('right')">
                <image src="../../../static/images/zk.png"></image>
            </view>
            <view class="my-whole" v-if="is_longin">
                <view class="post-top">
                    <view class="my-img" style="border: none; float:left;">
                        <image src="../../../static/images/mr.png"></image>
                    </view>
                    <view class="class-flex">
                        <view class="flex-item">
                            <view class="flex-text">获赞</view>
                            <view class="flex-num">0</view>
                        </view>
                        <view class="flex-item">
                            <view class="flex-text">关注</view>
                            <view class="flex-num">0</view>
                        </view>
                        <view class="flex-item">
                            <view class="flex-text">粉丝</view>
                            <view class="flex-num">0</view>
                        </view>
                        <view class="flex-item">
                            <view class="flex-text">好友</view>
                            <view class="flex-num">0</view>
                        </view>
                    </view>
                </view>
                <view class="longin-text" @click="toggle('center')">点击登录</view>
            </view>
            <view class="my-whole" v-if="!is_longin">
                <view class="post-top">
                    <view class="my-img" @click="go_isuser()">
                        <image :src="userInfo.avatarUrl"></image>
                    </view>
                    <view class="class-flex">
                        <view class="flex-item">
                            <view class="flex-text">获赞</view>
                            <view class="flex-num">0</view>
                        </view>
                        <view class="flex-item">
                            <view class="flex-text">关注</view>
                            <view class="flex-num">0</view>
                        </view>
                        <view class="flex-item" @click="gofansList">
                            <view class="flex-text">粉丝</view>
                            <view class="flex-num">{{directFans}}</view>
                        </view>
                        <view class="flex-item">
                            <view class="flex-text">好友</view>
                            <view class="flex-num">0</view>
                        </view>
                    </view>
                </view>
                <view class="my-top">
                    <view class="my-title">{{userInfo.nickName}}</view>
                    <!-- <view class="my-text">
						   	  <view class="text-left">
						   		    ID：213434
						   	  </view> 
						   	  <image src="../../../static/images/fz.png"></image>
						    </view> -->
                </view>
                <view class="my-bottom">
                    <!--    <view class="my-brief">
						    	  简介啊	🍌 美食小博主			    
						    </view> -->
                    <view class="my-label">
                        <view class="label-it">
                            <image src="../../../static/images/na.png" v-if="userInfo.gender == 1"></image>
                            <image src="../../../static/images/nv.png" v-if="userInfo.gender == 2"></image>
                            {{userInfo.gender == 1 ? '男':'女'}}
                        </view>
                        <view class="label-it" v-if="userInfo.province != null">
                            {{userInfo.province}} {{userInfo.city}}
                        </view>
                    </view>
                    <!-- 	<view class="my-label">
								 <view class="label-item">用户标签</view>
								 <view class="label-item">用户标签</view>
								 <view class="label-item">用户标签</view>
							</view> -->
                </view>
            </view>
        </view>
        <view class="Honey-item" @click="goHoney()">
            <view class="Honey-left">蜜糖</view>
            <view class="Honey-right">
                {{honeydata.honeyBalance}}
                <image src="../../../static/images/you.png"></image>
            </view>
        </view>
        <view class="Honey-back" @click="gointegralShop()">
            <image src="../../../static/images/jf24.gif" style="width:100%;" mode="widthFix"></image>
        </view>
        <view class="type-flex">
            <view class="type-item" @click="gotype(0)" :class="type_index == 0 ? 'whot':''">
                艺术品
                <view class="type-borde" v-if="type_index == 0"></view>
            </view>
            <view class="type-item" @click="gotype(1)" :class="type_index == 1 ? 'whot':''">
                盲盒
                <view class="type-borde" v-if="type_index == 1"></view>
            </view>
            <view class="type-item" @click="gotype(2)" :class="type_index == 2 ? 'whot':''">
                喜欢
                <view class="type-borde" v-if="type_index == 2"></view>
            </view>
            <view class="type-item" @click="gotype(3)" :class="type_index == 3 ? 'whot':''">
                作品
                <view class="type-borde" v-if="type_index == 3"></view>
            </view>
            <view class="type-item" @click="gotype(4)" :class="type_index == 4 ? 'whot':''">
                动态
                <view class="type-borde" v-if="type_index == 4"></view>
            </view>
        </view>
        <view class="box-whole-flex" v-if="type_index == 0">
            <view class="box-list-item" v-for="(item,index) in work_list">
                <view class="box-list-flex">
                    <view class="post-num" v-if="item.count > 1">x{{item.count}}</view>
                    <view class="box-img-flex" @click="goworkinfo(item.oneCategory,item.ddcId)">
                        <image :src="item.pic" mode="aspectFill"></image>
                    </view>
                    <view class="box-title-flex">{{item.goodsName}}</view>
                    <view class="box-text-flex">
                        <image :src="item.creatorUrl"></image>
                        <view class="box-text-left">{{item.creatorName}}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="box-whole" v-if="type_index == 1">
            <view class="box-chou" @click="gomybox">盲盒抽奖</view>
            <view class="Blind-list" v-for="(item,index) in draw_list" :key="index">
                <view class="Blind-img">
                    <image :src="img_url+item.pic" mode="aspectFill"></image>
                </view>
                <view class="Blind-conet">
                    <view class="Blind-title">{{item.orderName}}</view>
                    <view class="Blind-button" @click="goreceive(index,item.blindBoxIsReceive)"
                        :class="item.blindBoxIsReceive == 1 ? 'funs':''">{{item.blindBoxIsReceive == 1 ? '已领完':'待领取'}}
                    </view>
                </view>
            </view>
        </view>
        <uni-popup ref="popup_gont" @change="change">
            <view class="popup-content" :class="{ 'popup-height': gont_type === 'center'}">
                <view class="popup-title">联系客服</view>
                <view class="popup-text">
                    微信扫描下方二维码关注公众号联系客服。
                </view>
                <view class="put-img">
                    <image src="../../../static/images/gzh.jpg"></image>
                </view>
            </view>
        </uni-popup>
        <uni-popup ref="popup_account" @change="change">
            <view class="popup-content" style="padding:0;" :class="{ 'popup-height': account_type === 'center'}">
                <view class="popup-title">创建区块链账户</view>
                <view class="popup-input">
                    <input placeholder="请输入区块链名称,且不可修改" v-model="clientName" maxlength="12" :adjust-position="false" />
                </view>
                <view class="button-bottom">
                    <view class="item-button" @click="close_account()">稍后再看</view>
                    <view class="item-button cuont" @click="bindcreateDDCAddress()">立即创建</view>
                </view>
            </view>
        </uni-popup>
        <uni-popup ref="popup_right" @change="change">
            <view class="popup-right" :class="{ 'popup-height': right_type === 'right'}">
                <view class="pots-img" @click="close_right()">
                    <image src="../../../static/images/xx.png"></image>
                </view>
                <view class="right-item" @click="goeditInfo()">
                    <view class="right-img">
                        <image src="../../../static/images/my10.png"></image>
                    </view>
                    <view class="right-title">编辑资料</view>
                </view>
                <view class="right-item" @click="goauthentication(userInfo.isRealName)">
                    <view class="right-img">
                        <image src="../../../static/images/my1.png"></image>
                    </view>
                    <view class="right-title" :class="userInfo.isRealName == 1 ? 'cols':''">
                        {{userInfo.isRealName == 1 ? '已实名认证':'实名认证'}}
                    </view>
                </view>
                <view class="right-item" @click="goaccount()">
                    <view class="right-img">
                        <image src="../../../static/images/my2.png"></image>
                    </view>
                    <view class="right-title">区块链账户</view>
                </view>
                <view class="right-item" @click="gomyorder()">
                    <view class="right-img">
                        <image src="../../../static/images/my11.png"></image>
                    </view>
                    <view class="right-title">我的订单</view>
                </view>
                <view class="right-item" @click="goknapsack()">
                    <view class="right-img">
                        <image src="../../../static/images/my12.png"></image>
                    </view>
                    <view class="right-title">我的背包</view>
                </view>
                <view class="right-item" @click="goinvitation()">
                    <view class="right-img">
                        <image src="../../../static/images/my5.png"></image>
                    </view>
                    <view class="right-title">邀请好友</view>
                </view>
                <view class="right-item" @click="goMyCard()">
                    <view class="right-img">
                        <image src="../../../static/images/my9.png"></image>
                    </view>
                    <view class="right-title">银行卡</view>
                </view>
                <view class="right-item" @click="gorank()">
                    <view class="right-img">
                        <image src="../../../static/images/my8.png"></image>
                    </view>
                    <view class="right-title">排行榜</view>
                </view>
                <view class="right-item" @click="puttoggle('center')">
                    <view class="right-img">
                        <image src="../../../static/images/my6.png"></image>
                    </view>
                    <view class="right-title">联系客服</view>
                </view>
                <view class="right-item" @click="gosetup()">
                    <view class="right-img">
                        <image src="../../../static/images/my7.png"></image>
                    </view>
                    <view class="right-title">设置</view>
                </view>
            </view>
        </uni-popup>
        <tabbar :pagePath='pagePath'></tabbar>
    </view>
</template>
<script>
    import tabbar from '@/components/tabbar.vue';
    import QRCode from 'qrcode'
    export default {
        components: {
            tabbar
        },
        data() {
            return {
                pagePath: "pages/index/my/my",
                honeydata: "",
                if_dist: false,
                disabled: false,
                type_index: 0,
                is_longin: true,
                userInfo: "",
                directFans: "",
                clientName: "",
                lincode: '',
                ifagree: true,
                type: 'center',
                gont_type: 'center',
                account_type: 'center',
                right_type: 'right',
                code_img: "",
                QRlink: "",
                randomtext: [],
                img_url: "",
                // img_url:'https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/',
                // http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api 测试 test
                bannerTop: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
                draw_list: [],
                work_list: [],
                address: "",
                work_num: 1,
                box_num: 1,
            }
        },
        onLoad() {
            let that = this
            that.img_url = getApp().globalData.img_url
            that.getuserCollections()
        },
        onShow() {
            let that = this
            let sessionId = uni.getStorageSync('sessionId')
            console.log(sessionId)
            that.getaccess_token()
            if (sessionId || sessionId != "") {
                that.is_longin = false
                that.getuserInfo()
            } else {
                that.is_longin = true
            }
        },
        onPullDownRefresh() {
            console.log('下拉刷新')
            let that = this
            that.type_index = 0
            that.draw_list = []
            that.work_list = []
            that.getuserInfo()
            that.getuserCollections()
        },
        onReachBottom() {
            let that = this
            if (!that.is_longin) {
                if (that.type_index == 1) {
                    console.log('触底刷新')
                    uni.showLoading({
                        title: '加载中...',
                        mask: true
                    });
                    that.box_num++
                    console.log(that.box_num)
                    that.getuserorderList()
                }
            }

        },
        methods: {
            gosetup() {
                if (this.is_longin) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 1000
                    });
                    return
                }
                uni.navigateTo({
                    url: 'setup'
                });
            },
            goright(type) {
                this.right_type = type
                this.$refs.popup_right.open(type)
            },
            goreceive(e, i) {
                console.log(i)
                if (i == 2) {
                    this.gomybox()
                } else {
                    uni.navigateTo({
                        url: 'receive?index=' + e
                    })
                }

            },
            gotype(e) {
                this.type_index = e
            },
            goworkinfo(type, id) {
                uni.navigateTo({
                    url: 'myArtworkInfo?id=' + id + '&oneCategory=' + type
                });
            },
            getlogin() {
                console.log("授权")
                var appid = "wxd4b7962df63b4e98";
                var redirect_uri = encodeURIComponent(
                "https://jkyx-api.chiguavod.com/blindBoxMate/#/pages/index/my/my");
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid +
                    "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_userinfo#wechat_redirect"
            },
            getaccess_token() {
                let that = this
                var code = that.getRequest().code
                var lincode = that.getRequest().inviteCode
                if (code) {
                    uni.request({
                        url: getApp().globalData.http_url + 'mine/index/oauth',
                        method: 'GET',
                        header: {
                            'content-type': 'text/json;charset=UTF-8',
                        },
                        data: {
                            code: code
                        },
                        success: (res) => {
                            console.log(res.data, 'code换取微信信息')
                            if (res.data.code == 200) {
                                var nickName = res.data.data.nickName
                                var nickUrl = res.data.data.url
                                that.updateUser(nickName, nickUrl)
                            }
                        },
                    });
                }
                if (lincode) {
                    console.log(lincode, '邀请码')
                    that.lincode = lincode
                }
            },
            updateUser(nickName, nickUrl) {
                let that = this
                uni.request({
                    url: getApp().globalData.http_url + 'mine/index/updateUser',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    data: {
                        avatarUrl: nickUrl,
                        nickName: nickName
                    },
                    success: (res) => {
                        console.log(res, '更新资料');
                        if (res.data.code == 200) {
                            that.getuserInfo()
                        } else {
                            uni.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 1000
                            });
                        }
                    }
                });
            },
            bindcreateDDCAddress() {
                let that = this
                uni.showLoading({
                    title: '加载中',
                    mask: true
                });
                if (that.clientName == '') {
                    uni.showToast({
                        title: '请输入地址',
                        icon: 'none',
                        duration: 1000
                    });
                    return
                }
                uni.request({
                    url: getApp().globalData.http_url + 'bsn/ddc/createDDCAddress',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    data: {
                        clientName: that.clientName
                    },
                    success: (res) => {
                        console.log(res, '用户创建ddc地址');
                        uni.hideLoading()
                        if (res.data.code == 200) {
                            uni.showToast({
                                title: '创建成功',
                                icon: 'none',
                                duration: 1000
                            });
                            that.close_account()
                            setTimeout(function() {
                                uni.navigateTo({
                                    url: 'account'
                                });
                            }, 1000)
                        } else {
                            uni.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 1000
                            });
                        }
                    }
                });
            },
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
            },
            gorank() {
                if (this.is_longin) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 1000
                    });
                    this.toggle('center')
                    return
                }
                uni.navigateTo({
                    url: 'Ranking'
                });
                //window.location.href = 'https://jkyx-api.chiguavod.com/rank/index.html?sessionId=' + uni.getStorageSync('sessionId')
            },
            goauthentication() {
                if (this.is_longin) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 1000
                    });
                    this.toggle('center')
                    return
                }
                uni.navigateTo({
                    url: 'authentication?sessionId=' + uni.getStorageSync('sessionId') + '&userId=' + uni
                        .getStorageSync('userId')
                });
            },
            goeditInfo() {
                if (this.is_longin) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 1000
                    });
                    this.toggle('center')
                    return
                }
                uni.navigateTo({
                    url: 'editInfo'
                });
            },
            gofansList() {
                uni.navigateTo({
                    url: 'fansList'
                });
            },
            goaccount() {
                let that = this
                if (that.is_longin) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 1000
                    });
                    this.toggle('center')
                    return
                }
                if (that.userInfo.isHaveDDCAddress == 1) {
                    uni.navigateTo({
                        url: 'account?sessionId=' + uni.getStorageSync('sessionId') + '&userId=' + uni
                            .getStorageSync('userId')
                    });
                } else {
                    that.account_toggle('center')
                    that.close_right()
                }

            },
            goMyCard() {
                if (this.is_longin) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 1000
                    });
                    this.toggle('center')
                    return
                }
                if (this.userInfo.isRealName == 2) {
                    uni.showToast({
                        title: '请先实名认证',
                        icon: 'none',
                        duration: 1000
                    });
                    return
                }
                uni.navigateTo({
                    url: 'MyCard'
                });
            },
            gomember() {
                uni.showToast({
                    title: '功能即将开通',
                    icon: 'none',
                    duration: 1000
                });
            },
            gomyorder() {
                uni.navigateTo({
                    url: 'myorder'
                });
            },
            goknapsack() {
                uni.navigateTo({
                    url: 'knapsack'
                });
            },
            gocreation() {
                uni.showToast({
                    title: '功能即将开通',
                    icon: 'none',
                    duration: 1000
                });
            },
            goinvitation() {
                if (this.is_longin) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 1000
                    });
                    this.toggle('center')
                    return
                }
                uni.navigateTo({
                    url: 'invitation?inviteCode=' + this.userInfo.inviteCode
                });
            },
            gointegralShop() {
                uni.navigateTo({
                    url: '../synthesis/integralShop'
                });
            },
            goHoney() {
                uni.navigateTo({
                    url: 'Honey'
                });
            },
            getuserorderList() {
                let that = this
                uni.request({
                    url: getApp().globalData.http_url + 'blindBox/orderList',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    data: {
                        pageNum: that.box_num,
                        pageSize: 20
                    },
                    success: (res) => {
                        console.log(res.data, '历史抽奖信息列表');
                        uni.hideLoading()
                        if (res.data.data == '' && that.box_num > 1) {
                            uni.showToast({
                                title: '已经到底了',
                                icon: 'none',
                                duration: 1000
                            });
                        } else {
                            that.draw_list = that.draw_list.concat(res.data.data)
                        }
                    }
                });
            },
            getuserCollections() {
                let that = this
                uni.request({
                    url: getApp().globalData.http_url + 'bsn/ddc/myCollections',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    success: (res) => {
                        console.log(res.data, '用户藏品列表');
                        uni.hideLoading()
                        that.work_list = res.data.data
                    }
                });
            },
            noRepeat1(arr) {
                for (var i = 0; i < arr.length - 1; i++) {
                    for (var j = i + 1; j < arr.length; j++) {
                        if (arr[i].goodsName === arr[j].goodsName) {
                            arr[i].num++;
                            arr.splice(j, 1);
                            j--;
                        }
                    }
                }
                return arr;
            },
            getuserInfo() {
                let that = this
                uni.request({
                    url: getApp().globalData.http_url + 'mine/index/list/' + uni.getStorageSync('userId'),
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    success: (res) => {
                        console.log(res.data.data, '用户信息');
                        uni.stopPullDownRefresh();
                        that.box_num = 1
                        that.draw_list = []
                        if (res.data.code == 200) {
                            that.userInfo = res.data.data
                            that.getuserorderList()
                            that.getfansCount()
                            that.gethoneyinfo()
                            if (uni.getStorageSync('is_Have') == 2) {
                                that.account_toggle('center')
                            }
                        } else {
                            uni.showToast({
                                title: '登录已失效，重新登录',
                                icon: 'none',
                                duration: 1000
                            });
                            that.toggle('center')
                            that.is_longin = true
                        }
                    }
                });
            },
            gethoneyinfo() {
                let that = this
                uni.request({
                    url: getApp().globalData.http_url + 'mine/honey/info',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    success: (res) => {
                        console.log(res.data.data, '我的蜜糖');
                        if (res.data.code == 200) {
                            that.honeydata = res.data.data

                        }
                    }
                });
            },
            getfansCount() {
                let that = this
                uni.request({
                    url: getApp().globalData.http_url + 'mine/fans/fansCount',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    success: (res) => {
                        console.log(res, '粉丝');
                        that.directFans = res.data.data.allFans
                    }
                });
            },
            goanth(type) {
                if (type == 2) {
                    uni.navigateTo({
                        url: 'authentication?inviteCode=' + this.userInfo.inviteCode
                    });
                }
            },
            gomybox() {
                let that = this
                if (that.is_longin) {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 1000
                    });
                    that.toggle('center')
                    return
                }
                uni.navigateTo({
                    url: 'mybox'
                    // url:'mybox?sessionId='+ uni.getStorageSync('sessionId') + '&userId='+ uni.getStorageSync('userId')
                })
            },
            gomyArtwork() {
                uni.navigateTo({
                    url: 'myArtwork'
                })
            },
            go_isuser() {
                let that = this
                uni.showModal({
                    title: '更新用户昵称头像',
                    content: '是否确认更新为微信头像和昵称？',
                    confirmText: "确定",
                    cancelText: "取消",
                    cancelColor: "#C4C4C4",
                    confirmColor: "#000000",
                    success: function(res) {
                        if (res.confirm) {
                            that.getlogin()
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            account_toggle(type) {
                uni.setStorageSync('is_Have', 1);
                this.account_type = type
                this.$refs.popup_account.open(type)
            },
            puttoggle(type) {
                this.gont_type = type
                this.$refs.popup_gont.open(type)
            },
            toggle(type) {
                // this.type = type
                // this.$refs.popup.open(type)
                // this.randomnum()
                uni.navigateTo({
                    url: '../longin/longin'
                })
            },
            close() {
                this.$refs.popup.close()
            },
            close_account() {
                this.clientName = ''
                this.$refs.popup_account.close()
            },
            close_right() {
                this.$refs.popup_right.close()
            },
            close_buttom() {
                this.$refs.popup_buttom.close()
            },
            change(e) {
                console.log('当前模式：' + e.type + ',状态：' + e.show);
            },
            goifagree() {
                this.ifagree = !this.ifagree
                console.log(this.ifagree)
            },
            goyh() {
                window.location = "http://chigua-official-site.chiguazixun.com/privacy/privacy1.html"
            },
            goys() {
                window.location = "http://chigua-official-site.chiguazixun.com/privacy/privacy2.html"
            },
            randomnum() {
                this.randomtext = this.getCode(4)
                console.log(this.randomtext)
            },
            getCode(n) {
                var all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
                var b = [];
                var a = ''
                for (var i = 0; i < n; i++) {
                    var index = Math.floor(Math.random() * 62);
                    b.push(all.charAt(index));
                    a += all.charAt(index)
                }
                return a;
            }
        }
    }
</script>

<style>
    .whole-page {
        min-height: 100vh;
        background-color: #FFFFFF;
    }

    image {
        width: 100%;
        height: 100%;
    }

    .my-back {
        width: 100%;
        position: absolute;
        top: 0;
    }

    .my-padd {
        width: 100%;
        margin-top: 20upx;
        position: relative;
    }

    .imge-sz {
        width: 40upx;
        height: 40upx;
        float: right;
        margin: 50upx 40upx 120upx 40upx;
    }

    .my-whole {
        width: 100%;
        background-color: #fff;
        height: 300upx;
        border-radius: 40upx 40upx 0 0;
        padding: 40upx 40upx 30upx 40upx;
    }

    .post-top {
        width: 90%;
        left: 50upx;
        position: absolute;
        top: 160upx;
        z-index: 9;
        display: flex;
    }

    .my-img {
        width: 144upx;
        height: 144upx;
        border-radius: 50%;
        position: relative;
        border: 2upx solid #FFFFFF;
    }

    .class-flex {
        flex: 1;
        padding-top: 60upx;
        display: flex;
    }

    .flex-item {
        flex: 1;
        text-align: center;
    }

    .flex-text {
        font-size: 22upx;
        color: #666666;
    }

    .flex-num {
        font-weight: 500;
        font-size: 26upx;
        color: #222222;
        padding-top: 4upx;
    }

    .my-top {
        width: 100%;
        margin-top: 50upx;
        padding: 40upx 0 20upx 0;
    }

    .my-top image {
        float: left;
    }

    .my-title {
        float: left;
        font-weight: 500;
        font-size: 36upx;
        color: #000000;
        margin-right: 10upx;
    }

    .my-text {
        width: 100%;
        padding-top: 6upx;
    }

    .text-left {
        float: left;
        font-size: 24upx;
        color: #666666;
        padding: 2upx 14upx;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: inset 0px 0px 1px #FFFFFF, inset 0px 0px 1px #FFFFFF;
        border-radius: 4upx;
        margin-right: 16upx;
    }

    .my-text image {
        width: 24upx;
        height: 24upx;
        float: left;
        padding: 4upx 0 0 0;
    }

    .my-button {
        float: right;
        width: 184upx;
        height: 60upx;
        background: linear-gradient(90deg, #EF7FDF 0%, #7AB9EF 100%);
        box-sizing: border-box;
        border-radius: 30upx;
        text-align: center;
        line-height: 60upx;
        font-size: 30upx;
        color: #FFFFFF;
    }

    .my-bottom {
        width: 100%;
    }

    .my-brief {
        width: 100%;
        font-size: 22upx;
        color: #222222;
    }

    .my-label {
        padding-top: 10upx;
    }

    .label-it {
        float: left;
        padding: 2upx 10upx;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: inset 0px 0px 1px #FFFFFF, inset 0px 0px 1px #FFFFFF;
        border-radius: 4upx;
        font-size: 20upx;
        color: #666666;
        margin: 0 10upx 10upx 0;
    }

    .label-it image {
        width: 18upx;
        height: 26upx;
        float: left;
        margin: 4upx 4upx 0 0;
    }

    .back-padd {
        width: 100%;
        padding: 0 20upx;
    }

    .type-flex {
        width: 100%;
        padding: 0 0 10upx 0;
        display: flex;
    }

    .type-item {
        flex: 1;
        color: rgba(34, 34, 34, 0.6);
        text-align: center;
    }

    .type-borde {
        background: #222222;
        border-radius: 2px;
        width: 40upx;
        height: 4upx;
        margin: 20upx auto;
    }

    .whot {
        font-weight: 500;
        font-size: 32upx;
        color: #222222;
    }

    .whole-order {
        width: 100%;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
        border-radius: 40upx;
        margin-bottom: 10upx;
    }

    .order-top {
        width: 100%;
        padding: 24upx 32upx;
    }

    .top-title {
        float: left;
        font-weight: 500;
        font-size: 32upx;
        color: #000000;
    }

    .right-more {
        float: right;
        font-size: 26upx;
        color: #999999;
    }

    .right-more image {
        float: right;
        width: 16upx;
        height: 26upx;
        margin: 4upx 0 0 6upx;
    }

    .order-for {
        width: 100%;
        padding-left: 32upx;
        overflow-x: scroll;
        overflow-y: hidden;
        display: -webkit-box;
        padding-bottom: 30upx;
    }

    .order-list {
        width: 138upx;
        margin-right: 8upx;
    }

    .order-img {
        width: 100%;
        height: 138upx;
        border-radius: 16upx;
    }

    .order-title {
        width: 100%;
        padding: 10upx 0;
        font-weight: 400;
        font-size: 26upx;
        color: #000000;
        text-align: center;
        height: 46upx;
        font-weight: 500;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .order-button {
        width: 124upx;
        height: 44upx;
        text-align: center;
        margin: 0 auto;
        background: #FF7B00;
        border-radius: 8upx;
        font-size: 26upx;
        line-height: 44upx;
        color: #FFFFFF;
    }

    .bor {
        background: none;
        color: #FF7B00;
        border: 1upx solid #FF7B00;
    }

    .non {
        border: none;
        color: #FF7B00;
        opacity: 0.5;
    }

    .whole-class {
        width: 100%;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
        border-radius: 40upx;
        padding: 16upx;
        margin-bottom: 30upx;
    }

    .class-item {
        width: 20%;
        float: left;
        padding: 12upx 0;
    }

    .class-img {
        width: 54upx;
        height: 54upx;
        margin: 0 auto;
    }

    .class-title {
        width: 100%;
        text-align: center;
        font-size: 26upx;
        color: #000000;
        padding-top: 12upx;
    }

    .user-button {
        width: 146upx;
        height: 50upx;
        background: linear-gradient(90deg, #EF7FDF 0%, #7AB9EF 100%);
        border-radius: 28upx;
        font-size: 22upx;
        color: #FFFFFF;
        text-align: center;
        line-height: 48upx;
        margin-top: 10upx;
        float: right;
    }

    .huit {
        background: #C4C4C4;
    }

    .longin-text {
        float: left;
        font-size: 32upx;
        font-weight: 500;
        padding: 70upx 0 0 30upx;
    }

    .put-img {
        width: 440upx;
        height: 440upx;
        margin: 30upx auto;
    }

    .popup-text {
        width: 100%;
        padding: 0 70upx;
        margin: 0 auto;
    }

    .cols {
        color: #999999;
    }

    .popup-input {
        width: 90%;
        margin: 20upx auto 50upx auto;
        padding: 30upx 40upx;
        background: #F0F0F0;
        border-radius: 8upx;
    }

    .button-bottom {
        width: 100%;
        margin-top: 20upx;
        border-top: 2upx solid #F2F2F2;
    }

    .item-button {
        float: left;
        width: 50%;
        padding: 34upx 0;
        font-weight: 400;
        font-size: 32upx;
        color: #C4C4C4;
        text-align: center;
    }

    .cuont {
        color: #000000;
        border-left: 2upx solid #F2F2F2;
    }

    .dius {
        border-radius: 16upx;
    }

    .box-whole {
        width: 100%;
        min-height: 600upx;
        padding: 0 20upx 160upx 20upx;
    }

    .box-whole-flex {
        width: 100%;
        min-height: 600upx;
        padding: 0 24upx 160upx 24upx;
    }

    .box-list-item {
        float: left;
        width: 50%;
        padding: 10upx;
    }

    .box-list-flex {
        width: 100%;
        height: 500upx;
        box-shadow: inset 0px -1px 2px rgba(0, 0, 0, 0.25);
        border-radius: 16upx;
        position: relative
    }

    .post-num {
        position: absolute;
        right: 16upx;
        top: 16upx;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 20upx;
        font-size: 20upx;
        color: #FFFFFF;
        padding: 4upx 16upx;
        z-index: 9;
    }

    .box-img-flex {
        width: 100%;
        height: 360upx;
        border-radius: 16upx;
    }

    .box-img-flex image {
        width: 100%;
        height: 100%;
        border-radius: 16upx;
    }

    .box-title-flex {
        width: 100%;
        font-weight: 500;
        font-size: 30upx;
        color: #222222;
        padding: 16upx 14upx 0 14upx;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .label-item {
        float: left;
        background: linear-gradient(90deg, #EC84C1 0%, #6277E0 101.54%);
        border-radius: 8upx;
        font-weight: 500;
        font-size: 28upx;
        color: #FFFFFF;
        padding: 4upx 20upx;
    }

    .box-text-flex {
        width: 100%;
        display: flex;
        padding: 12upx 14upx 0 14upx;
    }

    .box-text-flex image {
        width: 32upx;
        height: 32upx;
        margin: 2upx 10upx 0 0;
        border-radius: 50%;
    }

    .box-text-left {
        font-size: 24upx;
        color: #999999;
        flex: 1;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .bot-img {
        float: left;
        width: 32upx;
        height: 32upx;
        border-radius: 50%;
        margin-right: -10upx;
    }

    .bot-img:last-child {
        margin-right: 0;
    }

    .bot-nun {
        float: left;
        font-size: 26upx;
        color: #666666;
        padding: 0 0 6upx 6upx;
    }

    .box-give {
        float: left;
        margin-top: 14upx;
        font-size: 30upx;
        color: #666666;
    }

    .box-give image {
        float: left;
        width: 32upx;
        height: 28upx;
        margin: 6upx 10upx 0 0;
    }

    .pot-text {
        width: 100%;
        text-align: center;
        font-size: 26upx;
        padding: 26upx 0;
        color: #666666;
    }

    .Blind-list {
        width: 100%;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 1px #FFFFFF, inset -1px 0px 1px #FFFFFF, inset 1px 0px 1px #FFFFFF;
        border-radius: 32upx;
        margin-bottom: 16upx;
        display: flex;
    }

    .Blind-img {
        width: 190upx;
        height: 190upx;
        border-radius: 32upx;
    }

    .Blind-conet {
        flex: 1;
        padding: 22upx;
    }

    .Blind-title {
        width: 100%;
        font-weight: 500;
        font-size: 32upx;
        color: #222222;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .Blind-button {
        width: 160upx;
        height: 54upx;
        line-height: 54upx;
        font-size: 26upx;
        color: #FFFFFF;
        text-align: center;
        background: #222222;
        border-radius: 44upx;
        float: right;
        margin-top: 40upx;
    }

    .box-chou {
        float: right;
        padding: 14upx 40upx;
        color: #FFFFFF;
        text-align: center;
        background: #222222;
        border-radius: 44upx;
        margin-bottom: 30upx;

    }

    .funs {
        background: #C4C4C4;
    }

    .zhuan-text {
        width: 100%;
        padding-bottom: 20upx;
    }

    .popup-right {
        width: 300upx;
        height: 100vh;
        padding: 20upx 40upx;
        background-color: #FFF
    }

    .pots-img {
        width: 44upx;
        height: 44upx;
        margin: 20upx 0 44upx 0;
    }

    .right-item {
        width: 100%;
        margin-bottom: 44upx;
    }

    .right-img {
        float: left;
        width: 48upx;
        height: 48upx;
        margin-right: 20upx;
    }

    .right-title {
        float: left;
        margin-top: 4upx;
        font-size: 28upx;
        color: #222222;
    }

    .bot-item {
        width: 96%;
        margin: 0 auto;
        text-align: center;
        border-radius: 30upx;
        background-color: rgba(255, 255, 255);
    }

    .bot-text {
        width: 100%;
        padding: 30upx 0;
        font-size: 32upx;
    }

    .bot-button {
        width: 96%;
        padding: 30upx 0;
        font-size: 32upx;
        background-color: #FFFFFF;
        border-radius: 30upx;
        color: #999999;
        text-align: center;
        margin: 20upx auto 180upx auto
    }

    .box-text text {
        float: right;
        color: #333333;
        font-size: 34upx;
        padding-right: 30upx;
    }

    .Honey-item {
        width: 686upx;
        background: #F9F9F9;
        border-radius: 8upx;
        padding: 32upx;
        margin: 0 auto 30upx auto;
    }

    .Honey-back {
        width: 100%;
        margin-bottom: 20upx;
    }

    .Honey-left {
        float: left;
        font-weight: 500;
        font-size: 28upx;
        color: #222222;
    }

    .Honey-right {
        float: right;
        font-size: 28upx;
        color: #222222;
    }

    .Honey-right image {
        float: right;
        width: 16upx;
        height: 28upx;
        margin: 4upx 0 0 8upx;
    }
</style>
