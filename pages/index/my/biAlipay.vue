<template>
    <view class="whole-page">
        <view class="whole-padd">
            <view class="alipay-text">支付宝绑定仅用于余额提现使用</view>
            <view class="alipay-conet">
                <view class="alipay-left">支付宝账号</view>
                <view class="alipay-info">{{aliPayInfo.alipay}}</view>
                <view class="alipay-right" @click="unBInding()">解绑</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        aliPay
    } from '@/utils/index.js'
    export default {
        data() {
            return {
                aliPayInfo: {}
            }
        },
        onShow() {
            this.getAliPay()
        },
        methods: {
            // 获取支付宝
            async getAliPay() {
                this.aliPayInfo = await aliPay();
            },
            // 解绑
            unBInding() {
                uni.navigateTo({
                    url: "unBindingAliPay"
                })
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

    .head-whole {
        background: #F5F5F5;
        /*#ifdef H5*/
        padding-top: 30upx;
        /*#endif*/
        /*#ifdef APP-PLUS*/
        padding-top: 90upx;
        /*#endif*/

    }

    .whole-padd {
        width: 100%;
        padding: 40upx;
    }

    .alipay-text {
        width: 100%;
        font-size: 26upx;
        color: #999999;
        padding-bottom: 24upx;
    }

    .alipay-conet {
        width: 100%;
        padding: 26upx 32upx;
        background-color: #fff;
        border-radius: 12upx;
    }

    .alipay-left {
        float: left;
        font-size: 30upx;
    }

    .alipay-info {
        float: left;
        font-size: 30upx;
        color: #666666;
        padding-left: 48upx;
    }

    .alipay-right {
        float: right;
        font-size: 26upx;
        color: #80C839;
        padding-top: 4upx;
    }
</style>
