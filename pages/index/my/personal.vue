<template>
    <view class="container">
        <view class="header">
            <view class="header-left" v-if="!is_login">
                <image src="../../../static/img/my-icon.png" mode=""></image>
                <text class="unlogin" @click="login">未登录</text>
            </view>
            <view class="header-left" v-if="is_login">
                <image :src="userInfo.avatarUrl" mode="aspectFill"></image>
                <text class="unlogin">{{userInfo.nickName}}</text>
            </view>
            <image class="header-right" src="../../../static/img/set.png" mode="" @click="set"></image>
        </view>
        <view class="u-flex u-row-around u-margin-bottom-24 u-relative menu" v-if="walletInfo!=null && is_login">
            <view class="u-flex u-flex-col" @click="goDetail(1)">
                <text class="col-f">{{walletInfo.redBalance}}</text>
                <text class="col-1">红包</text>
            </view>
            <view class="u-flex u-flex-col" @click="goDetail(2)">
                <text class="col-f">{{walletInfo.balance}}</text>
                <text class="col-1">余额</text>
            </view>
            <view class="u-flex u-flex-col u-col-top" @click="goDetail(3)">
                <text class="col-f">{{walletInfo.mbBalance}}</text>
                <text class="col-1">蜜宝 </text>
                <!-- <text class="go-recharge">去充值 &gt;</text> -->
            </view>
            <text class="go-recharge u-absolute" style="right: 30rpx;bottom: 0;">去充值 &gt;</text>
        </view>
        <!-- 未开通 -->
        <view class="star-info u-flex u-row-between un-open" v-if="is_login&& userInfo.vipStatus!=1">
            <view style="margin-top: 5px;">
                <view class="star-name u-flex">
                    <text>开通VIP</text>
                </view>
                <view class="star-end u-margin-top-10">
                    <text style="color: #5DE89B;font-size: 28rpx;">#</text>
                    <text class="end-text u-margin-left-8" v-if="userInfo.vipStatus == 0">全网短剧免费看</text>
                    <text class="end-text u-margin-left-8" v-if="userInfo.vipStatus == 2">已过期 </text>
                </view>
            </view>
            <view class="goVip u-margin-left-18">
                <image v-if="userInfo.vipStatus == 0" src="../../../static/img/personal/open.png" mode=""
                    @click="gomember"></image>
                <image v-if="userInfo.vipStatus == 2" src="../../../static/img/personal/xufei.png" mode=""
                    @click="gomember"></image>
            </view>
        </view>
        <view class="star-info star-info-new u-flex u-row-between" v-if="is_login&& userInfo.vipStatus==1"
            @click="gomember">
            <view class="">
                <view class="star-name u-flex">
                    <text>黄金会员</text>
                </view>
                <view class="star-end u-margin-top-10">
                    <text style="color: #5DE89B;font-size: 28rpx;">#</text>
                    <text class="end-text u-margin-left-8">到期：{{userInfo.vipExpiresTime}}</text>
                </view>
            </view>
            <view class="goVip u-margin-left-18">
                <image src="../../../static/img/personal/xufei.png" mode=""></image>
            </view>
        </view>
        <view class="u-flex u-row-between u-margin-left-36 u-margin-right-36 u-margin-bottom-80" v-if="is_login">
            <view class="u-flex u-flex-col u-col-center" v-for="(item,index) in menuList" :key="index"
                @click="menuClick(item.name)">
                <image style="width: 84rpx;height: 84rpx;" :src="item.icon" mode=""></image>
                <text class="u-font-24" style="color: #95F7B6;">{{item.name}}</text>
            </view>
        </view>
        <view class="my-watching">
            <text class="title">我的追剧</text>
            <image src="../../../static/img/right-icon.png" mode="aspectFill"></image>
        </view>
        <view class="watching-content" v-if="!is_login">
            <image src="../../../static/img/movie-icon.png" mode="aspectFill"></image>
            <text class="nomsg" @click="login">暂无追任何剧，请先登录</text>
        </view>
        <view class="watching-content" v-if="is_login&&myCareListData.length==0">
            <image src="../../../static/img/movie-icon.png" mode="aspectFill"></image>
            <text class="nomsg">暂无追任何剧</text>
        </view>
        <view class="history u-margin-bottom-68 u-row-center" v-if="is_login&& myCareListData.length>0"
            @click="gotoDetail(item.playletId)">
            <scroll-view class="no-wrap" scroll-x="true" enable-flex show-scrollbar="false">
                <view class="history-list" v-for="(item,index) in myCareListData">
                    <view class="his-item col-center">
                        <image :src="item.newImg"></image>
                        <text class="main-title">{{item.playletName}}</text>
                        <text class="sub-title">更新至<text class="main-color">{{item.currentNum}}</text> 集</text>
                    </view>
                </view>
            </scroll-view>
        </view>

        <view class="my-watching">
            <text class="title">播放历史</text>
            <image src="../../../static/img/right-icon.png" mode="aspectFill"></image>
        </view>
        <view class="history">
            <view class="watching-content" v-if="playHistory.length==0">
                <image src="../../../static/img/movie-icon.png" mode="aspectFill"></image>
                <text class="nomsg">暂无追任播放历史</text>
            </view>
            <scroll-view class="no-wrap" scroll-x="true" enable-flex show-scrollbar="false"
                v-if="playHistory.length>0 && playHistory.previewVideos!= null">
                <view class="history-list" v-for="(item,index) in playHistory" @click="gotoDetail(item.playletId)">
                    <view class="his-item">
                        <image :src="item.newImg"></image>
                        <text class="main-title">{{item.playletName}}</text>
                        <text class="sub-title">观看至第{{item.previewVideos.num}}集</text>
                    </view>
                </view>
            </scroll-view>

        </view>
        <tabbar :pagePath='pagePath'></tabbar>
    </view>
</template>

<script>
    import {
        getPlayHistory
    } from '@/api/api.js';
    import {
        userInfo,
    } from '@/api/officer.js';
    import {
        wallet
    } from '@/utils/index.js'
    import tabbar from '@/components/tabbar.vue';
    export default {
        data() {
            return {
                pagePath: "pages/index/my/personal",
                menuList: [{
                        name: '数字合约',
                        icon: '../../../static/img/per-icon1.png'
                    },
                    {
                        name: '我的钱包',
                        icon: '../../../static/img/per-icon1.png'
                    },
                    {
                        name: '创客空间',
                        icon: '../../../static/img/per-icon1.png'
                    },
                    {
                        name: '星推官',
                        icon: '../../../static/img/per-icon1.png'
                    },
                ],
                is_login: false,
                userInfo: {},
                myCareListData: [],
                playHistory: [],
                walletInfo: {
                    balance: null,
                    mbBalance: null,
                    redBalance: null
                },
            }
        },
        components: {
            tabbar,
        },
        onShow() {
            let that = this
            that.getHistoryData();
            this.getPlayHistoryData();
            this.getWallet();
            let sessionId = uni.getStorageSync('sessionId')
            that.getaccess_token()
            if (sessionId || sessionId != "") {
                that.is_login = true
                that.getUserInfo()
            } else {
                that.is_login = false
            }
            console.log('islogin', that.is_login);
        },
        methods: {
            // 获取余额
            async getWallet() {
                const res = await wallet();
                this.walletInfo.redBalance = res.redBalance;
                this.walletInfo.mbBalance = res.mbBalance;
                this.walletInfo.balance = res.balance;
                console.log('wallet', this.walletInfo);
            },
            // 获取播放
            getPlayHistoryData() {
                uni.showLoading({
                    title: '加载中',
                })
                getPlayHistory({
                    history: true
                }).then(res => {
                    uni.hideLoading()
                    console.log('res222', res);
                    if (res && res.code == 200) {
                        this.playHistory = res.data.rows;
                        this.playHistory.filter(res => {
                            res.newImg = 'https://jkyx-test.chiguavod.com/res/' + res.cover
                        })
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: 'error',
                            duration: 1500
                        })
                    }
                })
            },
            goDetail(index) {
                console.log('11', index)
                if (index == 1) {
                    uni.navigateTo({
                        url: "/pages/index/my/walletDetail?index=3&&title=红包"
                    })
                } else if (index == 2) {
                    uni.navigateTo({
                        url: "/pages/index/my/walletDetail?index=0&&title=我的余额"
                    })
                } else {
                    uni.navigateTo({
                        url: '/pages/index/my/rechargeBalance'
                    })
                }
            },
            // 获取追剧历史
            getHistoryData() {
                uni.showLoading({
                    title: '加载中',
                })
                getPlayHistory({
                    action: 2
                }).then(res => {
                    uni.hideLoading()
                    if (res && res.code == 200) {
                        this.myCareListData = res.data.rows;
                        this.myCareListData.filter(res => {
                            res.newImg = 'https://jkyx-test.chiguavod.com/res/' + res.cover
                        })
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: 'error',
                            duration: 1500
                        })
                    }
                })
            },
            gotoDetail(id) {
                uni.navigateTo({
                    url: "/pages/index/videoPage/videoPage?vid=" + id
                })
            },
            login() {
                uni.navigateTo({
                    url: '/pages/index/longin/longin'
                })
            },
            gomember() {
                uni.navigateTo({
                    url: '/pages/index/my/member/member'
                })
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
            getUserInfo() {
                let that = this
                userInfo(uni.getStorageSync('userId')).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        that.userInfo = res.data
                        that.userInfo.vipExpiresTime = that.userInfo.vipExpiresTime.split(' ')[0];
                        if (uni.getStorageSync('is_Have') == 2) {
                            that.account_toggle('center')
                        }
                    } else if (res.code == 403) {
                        uni.showToast({
                            title: '登录已失效，重新登录',
                            icon: 'none',
                            duration: 1000
                        });
                        that.is_login = false;
                        uni.navigateTo({
                            url: '/pages/index/longin/longin'
                        })
                    } else {
                        uni.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 850
                        });
                    }
                })
            },
            // 设置
            set() {
                uni.navigateTo({
                    url: '/pages/index/my/setup'
                });
            },
            menuClick(name) {
                if (name == '我的钱包') {
                    uni.navigateTo({
                        url: '/pages/index/my/wallet'
                    })
                } else if (name == '星推官') {
                    uni.navigateTo({
                        url: '/pages/index/my/PushOfficer/PushOfficer'
                    })
                } else {
                    uni.showToast({
                        title: '功能优化中',
                        icon: 'error'
                    })
                }
            },
            singleUploadvideo() {
                let that = this
                uni.chooseVideo({
                    count: 1, //默认9
                    sourceType: ['album'], //从相册选择
                    success: (res) => {
                        console.log(res)
                        let igmFile = res.tempFilePath;
                        const imgSize = res.size ? res.size : 0;
                        var size = imgSize / 1024 / 1024
                        console.log(size.toFixed(2), imgSize, '视频大小')
                        if (size.toFixed(2) > 200) {
                            uni.showToast({
                                title: '视频太大，请重新选择',
                                icon: "none",
                                duration: 1000
                            })
                            return
                        }
                        // uni.showLoading({
                        //     title: '上传中...',
                        //     mask: true,
                        // })
                        uni.uploadFile({
                            url: 'https://h5.chaojishe.com/api/common/upload',
                            method: "POST",
                            filePath: igmFile,
                            header: {
                                token: uni.getStorageSync('token')
                            },
                            name: 'file',
                            success: (res) => {
                                // uni.hideLoading();
                                console.log(res)
                                let data = res.statusCode == 200 ? JSON.parse(res.data) : {}
                                if (data.code == 0) {
                                    console.log(data)
                                    uni.showToast({
                                        title: '上传成功！',
                                        icon: "success",
                                        duration: 1000
                                    })
                                } else {
                                    let title = '上传失败'
                                    if (res.statusCode == 413) {
                                        title = '视频太大,���传失败'
                                    }
                                    uni.showToast({
                                        title,
                                        icon: 'none',
                                        duration: 1000
                                    });
                                }
                            },
                            fail: (err) => {
                                uni.hideLoading();
                                console.log(err);
                            },
                        })
                    }
                });
            },
        }
    }
</script>
<style scoped lang="scss">
    $padding: 0 36rpx;

    .container {
        width: 100%;
        padding-top: calc(var(--status-bar-height) + 10px);
        min-height: 100%;
        overflow-x: hidden;
        position: relative;
        padding-bottom: 200rpx;
        background-color: #11191E;

        .col-f {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
        }

        .col-1 {
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
        }

        .go-recharge {
            color: #EA357F;
            font-size: 10px;
            font-weight: 500;
            margin-left: 4rpx;
        }

        .scroll-Y {
            height: 300rpx;
        }



        .star-info {
            background-image: url('../../../static/img/personal/per-bg1.png');
            height: 130rpx;
            background-size: 100%;
            margin-bottom: 40rpx;


            .star-name {
                color: #FFDE80;
                font-size: 14px;
                font-weight: 500;
            }

            .star-end {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8rpx;
                height: 40rpx;
                line-height: 40rpx;
                text-align: left;
                padding-left: 5px;
                padding-right: 5px;

                .end-text {
                    color: #91949A;
                    font-size: 12px;
                }
            }

            .goVip {
                margin-top: 22rpx;

                image {
                    width: 146rpx;
                    height: 44rpx;
                }
            }
        }

        .star-info-new {
            background-image: url('../../../static/img/personal/per-bg3.png');
            padding-left: 60rpx;
            padding-right: 80rpx;
        }

        .un-open {
            padding-left: 174rpx;
            padding-right: 80rpx;
        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background: #11191E;
            position: relative;
            padding: $padding;
            margin-bottom: 48rpx;

            .header-left {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                .unlogin {
                    font-weight: 500;
                    font-size: 20px;
                    color: #d8d8d8;
                    margin-left: 24rpx;
                }

                image {
                    width: 100rpx;
                    height: 100rpx;
                }
            }

            .header-right {
                width: 50rpx;
                height: 50rpx;
            }
        }

        .menu {
            padding: 0 38rpx;
        }

        .my-watching {
            padding: $padding;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;


            .title {
                font-size: 18px;
                font-weight: 500;
                color: #fff;
            }

            image {
                width: 16rpx;
                height: 28rpx;
            }
        }

        .watching-content {
            height: 500rpx;
            display: flex;
            justify-content: center;
            align-items: center;

            image {
                width: 50rpx;
                height: 50rpx;
                margin-right: 20rpx;
            }

            .nomsg {
                color: #5DE89B;
                font-size: 18px;
                font-weight: 500;
            }
        }

        .history {
            height: 466rpx;
            padding: $padding;
            margin-top: 48rpx;

            .no-wrap {
                white-space: nowrap;
                width: 100%;


                .history-list {
                    display: inline-block;

                    .his-item {
                        height: 100%;
                        margin-right: 32rpx;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;

                        image {
                            width: 252rpx;
                            height: 280rpx;
                            border-radius: 16rpx;
                        }

                        .max-width {
                            width: 380rpx;
                            height: 420rpx;
                        }

                        .main-title {
                            font-weight: 500;
                            font-size: 12px;
                            color: #fff;
                            margin: 24rpx 0;
                        }

                        .sub-title {
                            font-weight: 500;
                            font-size: 12px;
                            color: #959595;

                            // .main-color {
                            //     color: #5DE89B;
                            // }

                        }
                    }

                    .col-center {
                        align-items: center;
                    }

                }

            }
        }
    }
</style>