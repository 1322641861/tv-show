<template>
    <view class="whole-page">

        <view class="whole-padd">
            <view class="alipay-text">请输入实名认证的身份证号码</view>
            <view class="bind-input">
                <input type="text" v-model="idcard" placeholder="请输入实名认证的身份证号码" placeholder-style="color:#CCCCCC;" />
            </view>
            <view class="bind-button" @click="gojiebind()" :class="idcard == '' ? 'cikt':''">确认解绑</view>
        </view>
    </view>
</template>

<script>
    import {
        unBindingAlipay
    } from '../../../api/api.js';
    export default {
        data() {
            return {
                idcard: ""
            }
        },
        onShow() {

        },
        methods: {
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
            gojiebind() {
                let that = this
                if (that.idcard == '') {
                    uni.showToast({
                        title: '请输入身份证号码',
                        icon: 'none',
                        duration: 1500
                    });
                    return
                }
                uni.showLoading({
                    title: '解绑中...',
                })
                unBindingAlipay({
                    cardId: that.idcard,
                }).then(res => {
                    console.log(res, '解绑支付宝')
                    if (res.code == 0) {
                        uni.hideLoading();
                        uni.showToast({
                            title: '解绑成功',
                            duration: 2000
                        })
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 2, //返回层数，2则上上页
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
            }
        }
    }
</script>

<style>
    page {
        background: #FFF;
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
        background: #FFF;
    }

    .whole-padd {
        width: 100%;
        padding: 40upx;
    }

    .alipay-text {
        width: 100%;
        padding: 24upx 0;
        font-size: 30upx;
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
        width: 320upx;
        height: 88upx;
        background: linear-gradient(90deg, #81C839 0%, #39BDC8 100%);
        border-radius: 12upx;
        line-height: 88upx;
        text-align: center;
        font-size: 32upx;
        color: #FFFFFF;
        margin: 80upx auto;
    }

    .cikt {
        background: linear-gradient(90deg, rgba(129, 200, 57, 0.5) 0%, rgba(57, 189, 200, 0.5) 100%);
    }
</style>
