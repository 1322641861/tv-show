<template>
    <view class="whole-page">
        <view class="whole-padd">
            <view class="alipay-text">支付宝绑定仅用于余额提现使用</view>
            <view class="alipay-title">快捷绑定</view>
            <view class="alipay-conet">
                <view class="alipay-left">支付宝账号</view>
                <view class="alipay-right" @click="gojiebind()">去绑定</view>
            </view>
            <view class="alipay-title">手动绑定</view>
            <view class="alipay-bind">
                <view class="bind-title">支付宝账号 <text @click="getOpenpay">（如何查找支付宝账号？）</text></view>
                <view class="bind-input">
                    <input type="text" v-model="alipay" placeholder="请填写支付宝账号" placeholder-style="color:#CCCCCC;" />
                </view>
                <view class="bind-title">支付宝实名认证姓名</view>
                <view class="bind-input">
                    <input type="text" v-model="alipayUsername" placeholder="请填写支付宝姓名"
                        placeholder-style="color:#CCCCCC;" />
                </view>
                <view class="bind-button" @click="gobinding()">绑定</view>
                <view class="button-text">温馨提示：请确认您填写的支付宝账号和姓名是正确的，如因您填写错误导致打款失败，密盒星球不负任何责任</view>
            </view>
        </view>
        <!-- 如何查找支付宝账号？ -->
        <uni-popup ref="popuppay" type="center" @maskClick="getclosepaypoupu">
            <view class="popupay-box">
                <view class="popupay-title">如何查找支付宝账号？</view>
                <view>
                    <image src="../../../static/img/paysh.png" mode="widthFix"></image>
                </view>
                <view class="popupay-button" @click="getclosepaypoupu">我知道了</view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import {
        bindingAlipay
    } from '../../../api/api.js';
    export default {
        data() {
            return {
                alipay: "",
                alipayUsername: "",
            }
        },
        methods: {
            gobinding() {
                let that = this
                uni.showLoading({
                    title: '绑定中...',
                    mask: true,
                })
                bindingAlipay({
                    alipay: that.alipay,
                    alipayUsername: that.alipayUsername
                }).then(res => {
                    console.log(res, '绑定支付宝')
                    if (res.code == 0) {
                        uni.hideLoading();
                        uni.showToast({
                            title: '绑定成功',
                            duration: 2000
                        })
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 1, //返回层数，2则上上页
                            })
                        }, 1000)
                    } else {
                        uni.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 1500
                        });
                    }
                })
            },
            gojiebind() {
                uni.showToast({
                    title: '暂未开放',
                    icon: 'none',
                    duration: 1500
                });
            },
            //关闭弹框
            getclosepaypoupu() {
                this.$refs.popuppay.close()
            },
            //打开弹框
            getOpenpay() {
                this.$refs.popuppay.open("center")
            },
            getRutrun() {
                // #ifdef  APP-PLUS
                uni.navigateBack({
                    delta: 1, //返回层数，2则上上页
                })
                // #endif
                // #ifdef H5
                history.back();
                // #endif
            },
        }
    }
</script>

<style>
    page {
        background: #F5F5F5;
    }

    image {
        width: 100%;
        height: 100%;
    }

    view {
        font-family: 'PingFang SC';
        font-style: normal;
        overflow: hidden;
        color: #222222;
    }

    .whole-page {
        width: 100%;
        min-height: 99vh;
        background: #F5F5F5;
    }

   
    .whole-padd {
        width: 100%;
        padding: 40upx;
    }

    .alipay-text {
        width: 100%;
        font-size: 26upx;
        color: #999999;
        padding-bottom: 32upx;
    }

    .alipay-title {
        width: 100%;
        font-size: 30upx;
        color: #222222;
        padding-bottom: 24upx;

    }

    .alipay-conet {
        width: 100%;
        padding: 26upx 32upx;
        background-color: #fff;
        border-radius: 12upx;
        margin-bottom: 48upx;
    }

    .alipay-left {
        float: left;
        font-size: 30upx;
    }

    .alipay-right {
        float: right;
        font-size: 26upx;
        color: #80C839;
        padding-top: 4upx;
    }

    .alipay-bind {
        width: 100%;
        border-radius: 12upx;
        padding: 24upx 32upx;
        background-color: #fff;
    }

    .bind-title {
        width: 100%;
        font-size: 30upx;
        color: #222222;
        padding-bottom: 24upx;
    }

    .bind-title text {
        font-size: 26upx;
        color: #FF8400;
    }

    .bind-input {
        width: 100%;
        height: 96upx;
        line-height: 96upx;
        background: #F9F9F9;
        border-radius: 12upx;
        margin-bottom: 24upx;
        padding: 0 32upx;
    }

    .bind-input input {
        width: 100%;
        height: 100%;
        font-size: 30upx;
        color: #222222;
    }

    .bind-button {
        width: 100%;
        height: 96upx;
        background: linear-gradient(90deg, #81C839 0%, #39BDC8 100%);
        border-radius: 12upx;
        line-height: 96upx;
        text-align: center;
        font-size: 32upx;
        color: #FFFFFF;
        margin-top: 40upx;
    }

    .button-text {
        width: 100%;
        font-weight: 400;
        font-size: 24upx;
        color: #999999;
        padding-top: 24upx;
    }

    .popupay-box {
        width: 590upx;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 48upx 40upx;
    }

    .popupay-title {
        width: 100%;
        text-align: center;
        font-weight: 500;
        font-size: 32upx;
        color: #222222;
        padding-bottom: 60upx;
    }

    .popupay-button {
        width: 400upx;
        height: 88upx;
        line-height: 88upx;
        text-align: center;
        background: #F0F0F0;
        border-radius: 8upx;
        font-size: 30upx;
        color: #222222;
        margin: 40upx auto 0 auto;
    }
</style>
