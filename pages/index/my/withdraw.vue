<template>
    <view class="container">
        <view class="info u-flex u-margin-right-20 u-margin-left-20 u-row-between">
            <view class="u-flex">
                <image class="u-margin-right-24" style="width: 84rpx;height: 84rpx;"
                    src="../../../static/img/wallet-icon.png" mode=""></image>
                <view class="text2 u-font-24 font-w5">
                    <text>到账方式：</text>
                    <text v-if="aliPay != null" style="color: #1D252B;">支付宝：{{aliPay.alipay}}</text>
                </view>
            </view>
        </view>
        <view class="col-3 withdraw">
            <view class="col-3 u-text-left u-margin-bottom-60">
                输入提现金额
            </view>
            <view class="u-flex withdraw-box">
                <text class="money">¥</text>
                <input type="number" class="uni-input u-flex-1 col-3" @input="onKeyInput" v-model="withdrawMoney"
                    placeholder-style="color:#C4C4C4;font-size:24px" style="font-size: 24px;" placeholder="输入提现金额" />
            </view>
            <view class="col-3 u-font-32 u-margin-top-40 u-flex u-row-around">
                <text>剩余可提{{this.balance}}元</text>
                <text style="color: #00B574;" @click="allWithdraw">全部提现</text>
            </view>
        </view>
        <view class="submit" :class="[withdrawMoney!=null?'':'disabled']" @click="submit">
            确认
        </view>
       <!-- <view class="u-margin-top-60">
            <u-checkbox v-model="isChecked" active-color="#5DE89B">
                <text class="u-font-24 col-8">我已经阅读并同意</text>
                <text class="u-font-24 col-3 font-w5">《余额提现协议》</text>
            </u-checkbox>
        </view> -->
    </view>
</template>

<script>
    import {
        wallet,
        aliPay
    } from '@/utils/index.js'
    import {withdrawAliPay} from '../../../api/api.js'
    export default {
        data() {
            return {
                currentIndex: 0,
                // isChecked: false,
                withdrawMoney: null,
                balance: 0,
                aliPay: null,
            }
        },
        onLoad() {

        },
        onShow() {
            this.getWallet();
            this.getAliPay()
        },
        methods: {
            // 获取支付宝
            async getAliPay() {
                this.aliPay = await aliPay();
            },
            // 获取余额
            async getWallet() {
                const balance = await wallet();
                this.balance = balance.balance;
                console.log('this.balamce', this.balance);
            },
            changeIndex(index) {
                this.currentIndex = index;
            },
            // 全部提现
            allWithdraw() {
                this.withdrawMoney = this.balance;
            },
            onKeyInput(event) {
                if (event.target.value > this.balance) {
                    uni.showToast({
                        title: '最高金额不能超过' + this.balance + '元',
                        icon: 'error',
                        duration: 2000
                    })
                    this.withdrawMoney = this.balance;
                }
            },
            // 提现
            submit() {
                console.log('this.wihthdisa', this.withdrawMoney)
                if ( this.withdrawMoney > 0) {
                    uni.showLoading({
                        title: '提现中',
                    });
                    withdrawAliPay({money:this.withdrawMoney}).then(res=>{
                        uni.hideLoading();
                        uni.showToast({
                            title: '提现成功!',
                            icon: 'success'
                        })
                        console.log('res',res);
                    })
                    this.getWallet();
                    this.withdrawMoney = null;
                } else {
                    // if (!this.isChecked) {
                    //     uni.showToast({
                    //         title: '请先阅读<<余额提现协议>>',
                    //         icon: 'error'
                    //     })
                    // } else
                     if (this.withdrawMoney > this.balance) {
                        uni.showToast({
                            title: '最高金额不能超过' + this.balance + '元',
                            icon: 'error',
                            duration: 2000
                        })
                        this.withdrawMoney = '';
                    } else if (this.withdrawMoney <= 0) {
                        uni.showToast({
                            title: '请输入提现金额',
                            icon: 'error'
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $padding: 0 36rpx;


    .container {
        width: 100%;
        background: #f6f6f6;
        padding: $padding;

        .info {
            border-radius: 24rpx;
            margin-top: 48rpx;
            background: #f9f9f9;
        }

        .submit {
            background: linear-gradient(0.04deg, #35D28A 1.25%, #95F7B6 100.38%);
            border-radius: 8rpx;
            height: 96rpx;
            line-height: 96rpx;
            text-align: center;
            margin-top: 60rpx;
            color: #fff;
        }

        .disabled {
            background: #ccc;
        }

        .withdraw {
            background: #fff;
            border-radius: 20rpx;
            padding: 60rpx 40rpx;
            margin-top: 48rpx;

            .withdraw-box {
                border-bottom: 1px solid #F4f4f4;
                padding-bottom: 20rpx;

                .money {
                    color: #c4c4c4;
                    font-size: 56rpx;
                    width: 56rpx;
                }
            }
        }

        .text1 {
            color: #ACABB9;
        }

        .text2 {
            color: #60708F;
        }
    }
</style>
