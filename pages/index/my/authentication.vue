<template>
    <view class="whole-page">
        <view class="auth-whole" v-if="userInfo.isRealName == 2">
            <view class="auth-item">
                <input placeholder="请输入姓名" type="text" v-model="name" :adjust-position="false" />
            </view>
            <view class="auth-item">
                <input placeholder="请输入您本人身份证号码" type="idcard" v-model="IDcard" maxlength="18"
                    :adjust-position="false" />
            </view>
            <view class="auth-button" @click="goauthentication">确认</view>
            <view class="auth-hun" @click="gomy()">暂不更新</view>
            <view class="auth-text">
                注：请正确填写您的实名认证信息，如发现盗用他人身份信息导致的相关问题责任，由您自行承担。密盒星球保证您的认证信息仅用于平台验证使用，不会泄露给第三方。认证信息通过之后，暂不支持修改和查看。
            </view>
        </view>
        <view class="cation-whole" v-if="userInfo.isRealName == 1">
            <view class="cat-img">
                <image src="../../../static/images/ywc.png"></image>
            </view>
            <view class="cat-text">已完成实名认证</view>
            <view class="back-coant">
                <view class="coant-top" style="padding-bottom: 20upx;">姓名：{{userInfo.realName}}</view>
                <view class="coant-buttom">身份证号：{{userInfo.cardId}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        getUserInfo
    } from '@/utils'
    export default {
        data() {
            return {
                name: "",
                IDcard: "",
                userId: "",
                sessionId: "",
                userInfo: "",
                //http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api // 测试 test
            }
        },
        onLoad(e) {
            if (e.sessionId) {
                this.sessionId = e.sessionId
            } else {
                this.sessionId = uni.getStorageSync('sessionId')
            }
            if (e.userId) {
                this.userId = e.userId
            } else {
                this.userId = uni.getStorageSync('userId')
            }
            this.getUserINFO()
        },
        methods: {
            // 获取用户详情
            async getUserINFO() {
                this.userInfo = await getUserInfo();
            },
            gomy() {
                uni.switchTab({
                    url: 'my'
                });
            },
            goauthentication() {
                let that = this
                console.log(that.name)
                if (that.name == '') {
                    uni.showToast({
                        title: '真实姓名不能为空',
                        icon: 'none',
                        duration: 1000
                    });
                } else if (that.IDcard == '') {
                    uni.showToast({
                        title: '身份证号码不能为空',
                        icon: 'none',
                        duration: 1000
                    });
                } else {
                    uni.showLoading({
                        title: '加载中',
                        icon: 'none'
                    });
                    uni.request({
                        url: getApp().globalData.http_url + 'mine/index/realNameAuthentication',
                        method: 'GET',
                        header: {
                            'content-type': 'text/json;charset=UTF-8',
                            'sessionId': uni.getStorageSync('sessionId')
                        },
                        data: {
                            realName: that.name,
                            cardId: that.IDcard
                        },
                        success: (res) => {
                            uni.hideLoading();
                            console.log(res.data, '实名认证');
                            if (res.data.code == 200) {
                                uni.showToast({
                                    title: '验证成功',
                                    icon: 'none',
                                    duration: 1500
                                });
                                setTimeout(() => {
                                    uni.switchTab({
                                        url: 'my'
                                    });
                                }, 1000)
                            } else {
                                uni.showToast({
                                    title: res.data.message,
                                    icon: 'none',
                                    duration: 1500
                                });
                            }
                        }
                    });
                }
            }
        }
    }
</script>

<style>
    page {
        background-color: #f2f2f2;
    }

    .whole-page {
        padding: 32upx 24upx;
    }

    .auth-whole {
        width: 100%;
        padding: 60upx 32upx;
        background-color: #fff;
        border-radius: 24upx;
    }

    .auth-item {
        width: 100%;
        height: 96upx;
        background: #F2F2F2;
        border-radius: 8upx;
        margin-bottom: 40upx;
        padding: 26upx 40upx;
    }

    .auth-button {
        width: 100%;
        height: 96upx;
        line-height: 96upx;
        background: #222;
        border-radius: 8upx;
        font-weight: 500;
        font-size: 32upx;
        color: #FFFFFF;
        text-align: center;
    }

    .auth-hun {
        padding-top: 30upx;
        text-align: center;
        font-size: 28upx;
        color: #999999;
    }

    .auth-text {
        width: 100%;
        padding-top: 32upx;
        font-size: 26upx;
        color: #999999;
    }

    .cation-whole {
        width: 100%;
        padding: 60upx 0;
    }

    .cat-img {
        width: 82upx;
        height: 94upx;
        margin: 20upx auto;
    }

    .cat-img image {
        width: 100%;
        height: 100%;
    }

    .cat-text {
        width: 100%;
        text-align: center;
        padding-bottom: 80upx;
        font-size: 32upx;
    }

    .back-coant {
        width: 100%;
        padding: 40upx 32upx;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
        border-radius: 40upx;
    }

    .coant-top {
        font-weight: 500;
        font-size: 32upx;
        color: #000000
    }

    .coant-buttom {
        font-weight: 400;
        font-size: 32upx;
        color: #000000
    }
</style>
