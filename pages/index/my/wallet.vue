<template>
    <view class="container">
        <view class="header">
            <view class="u-flex u-row-between">
                <text class="text1 u-font-40">钱包</text>
                <image class="mang" src="../../../static/img/mang.png" mode=""></image>
            </view>
            <view class="u-flex u-row-between">
                <view v-if="cardList.length == 0">
                    <text class="text1 u-font-24 u-margin-right-20">绑定银行卡，支付更便捷</text>
                    <text class="text1 u-font-24" style="color:#FF4C4C;" @click="bindCard">去绑定</text>
                </view>
                <view v-if="cardList.length > 0"></view>
                <text class="man-text u-font-24" @click="management">管理</text>
            </view>
        </view>
        <view class="message u-flex u-row-between u-margin-top-48" v-if="orderInfo !=null">
            <view class="u-flex">
                <image class="u-margin-right-24" style="width: 104rpx;height: 104rpx;"
                    src="../../../static/img/money.png" mode=""></image>
                <text class="text2 u-font-28 font-w5">
                    你有一笔
                    <text v-if="orderInfo.flowDirection == 1">支出</text>
                    <text v-if="orderInfo.flowDirection == 2">收入</text>
                    <text class="u-margin-left-10 u-margin-right-10" style="color: #1d252b;">{{orderInfo.tradeNumber}}</text>
                    <text v-if="orderInfo.currencyCategory != 2&&orderInfo.currencyCategory != 3">元</text>
                    <text v-if="orderInfo.currencyCategory == 2">蜜糖</text>
                    <text v-if="orderInfo.currencyCategory == 3">蜜宝</text>
                </text>
            </view>
            <text class="u-font-28 font-w5" style="color:#1D252B;" @click="billDetail">查看</text>
        </view>
        <view class="type-list u-flex u-row-left u-margin-top-60">
            <view class="u-flex u-flex-col u-col-center u-margin-right-70" @click="realName">
                <image src="../../../static/img/wallet/real-name.png" mode="aspectFill"></image>
                <text>实名认证</text>
            </view>
            <view class="u-flex u-flex-col u-col-center u-margin-right-70" @click="bindAliPay">
                <image src="../../../static/img/wallet/alpay.png" mode="aspectFill"></image>
                <text>绑定支付宝</text>
            </view>
            <view class="u-flex u-flex-col u-col-center" @click="bindCard">
                <image src="../../../static/img/wallet/bind-card.png" mode="aspectFill"></image>
                <text>绑定银行卡</text>
            </view>
        </view>
        <view class="wall-list u-margin-top-80">
            <view v-for="(item,index) in wallList" :key="index" class="u-flex u-row-between u-margin-bottom-40"
                @click="enterDetail(item.name,index)">
                <view class="u-flex">
                    <image class="u-margin-right-24" style="width: 102rpx;height: 102rpx;" :src="item.icon"
                        mode="aspectFill"></image>
                    <view class="u-flex u-flex-col u-col-top">
                        <text class="text1 u-font-32 font-w5">{{item.balance}}</text>
                        <text class="text2 u-font-28 font-w5">{{item.name}}</text>
                    </view>
                </view>
                <text class="u-font-28 font-w5 "
                    :class="[item.type=='充值'?'recharge':item.type=='提现'?'withdraw':'text-3']"
                    @click.stop="recharge(item.name,item.type)">{{item.type}}</text>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        getBindCardList,
        wallet,
        aliPay,
    } from '@/utils/index.js'
    export default {
        data() {
            return {
                wallList: [{
                        name: '余额(元)',
                        balance: "0",
                        type: '提现',
                        icon: '../../../static/img/wallet/wall-1.png'
                    },
                    {
                        name: '蜜宝',
                        balance: "0",
                        type: '充值',
                        icon: '../../../static/img/wallet/wall-2.png'
                    },
                    {
                        name: '蜜糖',
                        balance: "0",
                        type: '获得收入后30天解冻',
                        icon: '../../../static/img/wallet/wall-3.png'
                    },
                    {
                        name: '红包',
                        balance: "0",
                        type: '满100元可提现',
                        icon: '../../../static/img/wallet/wall-4.png'
                    },
                    {
                        name: '合约收入',
                        balance: "0",
                        type: '每月月底结算',
                        icon: '../../../static/img/wallet/wall-5.png'
                    },
                    // {
                    //     name: '分销收益',
                    //     balance: "0",
                    //     type: '冻结中，兴权后自动解冻',
                    //     icon: '../../../static/img/wallet/wall-6.png'
                    // },
                ],
                walletInfo: {},
                // 已绑定银行卡列表
                cardList: [],
                // 支付宝
                aliPay: null,
                orderInfo: null,
            }
        },
        onLoad() {},
        onShow() {
            this.getBindCard();
            this.getWallet();
            this.getAliPay();
        },
        methods: {

            // 获取绑定的银行卡列表
            async getBindCard() {
                this.cardList = await getBindCardList();
            },
            // 获取支付宝
            async getAliPay() {
                this.aliPay = await aliPay();
            },
            // 获取余额
            async getWallet() {
                this.walletInfo = await wallet();
                this.orderInfo = this.walletInfo.detailList[0];
                this.wallList[0].balance = this.walletInfo.balance;
                this.wallList[1].balance = this.walletInfo.mbBalance;
                this.wallList[2].balance = this.walletInfo.honeyBalance;
                this.wallList[3].balance = this.walletInfo.redBalance;
                this.wallList[4].balance = this.walletInfo.creationBalance;
                // this.wallList[5].balance = this.walletInfo.distributionBalance;
            },

            // 绑定银行卡
            bindCard() {
                uni.navigateTo({
                    url: 'MyCard'
                })
            },
            // 实名认证
            realName() {
                uni.navigateTo({
                    url: 'authentication'
                })
            },
            // 绑定支付宝
            bindAliPay() {
                if (this.aliPay.alipayname) {
                    uni.navigateTo({
                        url: 'biAlipay'
                    })
                } else {
                    uni.navigateTo({
                        url: 'bindingAlipay'
                    })
                }
            },
            // 充值,提现
            recharge(name, type) {
                if (name == '蜜宝') {
                    uni.navigateTo({
                        url: '/pages/index/my/rechargeBalance?title=' + name
                    })
                    // uni.navigateTo({
                    //     url:'/pages/index/my/reHoney'
                    // })
                } else if (type == '提现') {
                    if (this.aliPay.alipayname == null) {
                        uni.showToast({
                            title: '请先绑定支付宝',
                            icon: 'none'
                        })
                        return;
                    }
                    uni.navigateTo({
                        url: '/pages/index/my/withdraw'
                    })
                }
            },
            // 钱包管理
            management() {
                uni.navigateTo({
                    url: '/pages/index/my/set'
                })
            },
            // 头部右侧按钮点击事件
            onNavigationBarButtonTap(e) {
                console.log('sss')
                uni.navigateTo({

                })
            },
            // 查看账单明细
            billDetail() {
                uni.navigateTo({
                    url: '/pages/index/my/billDetail'
                })
            },
            // 钱包详情
            enterDetail(name, index) {
                if (index == 5) {
                    return;
                }
                uni.navigateTo({
                    url: '/pages/index/my/walletDetail?index=' + index + '&&title=' + name
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    $padding: 0 36rpx;

    .container {
        width: 100%;
        padding-top: calc(var(--status-bar-height) + 10px);
        background-color: #fff;

        .text1 {
            color: #2F2D3D;
        }

        .text2 {
            color: #A39FB9;
        }

        .text-3 {
            color: #A6AEB6;
        }

        .recharge {
            color: #FF8080;
        }

        .withdraw {
            color: #5DE89B;
        }

        .header {
            padding: $padding;

            .mang {
                width: 48rpx;
                height: 48rpx;
            }

            .man-text {
                color: #A39FB9;
            }
        }

        .message {
            background: #fbfbff;
            border-radius: 8rpx;
            margin: 0 24rpx;
            height: 152rpx;
            padding: $padding;
        }

        .type-list {
            padding: $padding;

            image {
                width: 96rpx;
                height: 96rpx;
            }

            text {
                color: #A6AEB6;
                font-size: 12px;
            }
        }

        .wall-list {
            padding: $padding;
        }
    }
</style>
