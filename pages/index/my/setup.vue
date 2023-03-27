<template>
    <view class="whole-page">
        <view class="item-input" style="margin: 12upx 0;">
            <view class="left-item">
                设置密码
            </view>
            <view class="right-item" :class="isSetPassword != 1 ? 'giks':''" @click="setpassword()">
                {{isSetPassword == 1 ? '已设置':'未设置'}}
                <image src="../../../static/images/you.png" class="yout"></image>
            </view>
        </view>
        <view class="item-input" @click="goyh">
            <view class="left-item">
                用户协议
            </view>
            <view class="right-item">
                <image src="../../../static/images/you.png" class="yout"></image>
            </view>
        </view>
        <view class="item-input" @click="goys">
            <view class="left-item">
                隐私协议
            </view>
            <view class="right-item">
                <image src="../../../static/images/you.png" class="yout"></image>
            </view>
        </view>
        <view class="item-input" @click="tozhux()">
            <view class="left-item">
                注销账号
            </view>
            <view class="right-item">
                <image src="../../../static/images/you.png" class="yout"></image>
            </view>
        </view>
        <view class="item-input" style="margin: 12upx 0;" @click="totuichu()">
            <view class="left-item">
                退出登录
            </view>
            <view class="right-item">
                <image src="../../../static/images/you.png" class="yout"></image>
            </view>
        </view>
    </view>
</template>

<script>
	import {
	    userInfo
	} from '@/api/api.js';
    export default {
        data() {
            return {
                isSetPassword: "",
            }
        },
        onLoad(e) {
            this.getuserInfo()
        },
        onShow() {

        },
        methods: {
            setpassword() {
                var type = this.isSetPassword == 1 ? '2' : '1'
                uni.navigateTo({
                    url: '../my/setpassword?type=' + type
                });
            },
            tozhux() {
                uni.showToast({
                    title: '暂未开放',
                    icon: 'none',
                    duration: 1000
                });
            },
            totuichu() {
                let that = this
                uni.showModal({
                    title: '提示',
                    content: '是否退出登录',
                    success: function(res) {
                        if (res.confirm) {
                            uni.removeStorage({
                                key: 'sessionId',
                                success: function(res) {
                                    uni.removeStorage({
                                        key: 'userId',
                                        success: function(res) {
                                            console.log('success');
                                            uni.showToast({
                                                title: '已退出登录',
                                                icon: 'none',
                                                duration: 1000
                                            });
                                            uni.setStorageSync('is_Refresh', 1)
                                            setTimeout(() => {
                                                uni.reLaunch({
                                                    url: '../my/personal'
                                                });
                                            }, 1000)
                                        }
                                    });
                                }
                            });

                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            getuserInfo() {
                let that = this
				userInfo(uni.getStorageSync('userId')).then(res => {
					console.log(res)
					if (res.code == 200) {
					   that.isSetPassword = res.data.data.isSetPassword
					}
				})
            },
            goyh() {
                window.location = "http://chigua-official-site.chiguazixun.com/privacy/privacy1.html"
            },
            goys() {
                window.location = "http://chigua-official-site.chiguazixun.com/privacy/privacy2.html"
            },
        }
    }
</script>

<style>
    .item-input {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        padding: 32upx 40upx;
        border-bottom: 1upx solid #f2f2f2;
    }

    .left-item {
        float: left;
        color: #222222;
    }

    .right-item {
        float: right;
        font-size: 28upx;
        color: #222222;
    }

    .yout {
        float: right;
        width: 14upx;
        height: 24upx;
        margin: 8upx 0 0 16upx;
    }

    .giks {
        color: rgba(34, 34, 34, 0.28);
    }
</style>
