<template>
    <view class="container">
        <swiper class="swiper-box" @change="change" :current="currentIndex">
            <swiper-item v-for="(item, index) in swiperDataList" :key="index">
                <view class="swiper-item">
                    <view class="swiper-card u-flex u-flex-col u-col-top u-row-between"
                        :style="{'background':item.bgColor}">
                        <text>{{item.first}}</text>
                        <text class="balance">{{item.sec}}<text v-if="index != 1&&index != 2">元</text> </text>
                        <text>{{item.third}}</text>
                    </view>
                    <view class="today u-flex">
                        <!--   <text style="color: #60708F;">今日收益：</text>
                        <text :style="{'color':item.bgColor}">12349元</text> -->
                        <button v-if="index==0" class="withdraw" plain="true" @click="withdraw">提现</button>
                        <button class="recharge" plain="true" :style="{'background':item.bgColor}" v-if="index==1"
                            @click="recharge(index)">充值</button>
                        <button v-if="index==3" class="act" plain="true" :style="{'background':item.bgColor}"
                            @click="withdrawRedPaper">提现</button>
                    </view>
                </view>
            </swiper-item>
        </swiper>
        <view class="swiper-dot">
            <view class="u-flex u-row-center">
                <view class="dot" :class="[index==currentIndex?'active':'']" v-for="(item,index) in 5" :key="index">
                </view>
            </view>
        </view>
        <view class="info u-flex u-row-between" v-if="listData!= null">
            <view class="u-flex">
                <image class="u-margin-right-24" style="width: 84rpx;height: 84rpx;" :src="currentIcon" mode=""></image>
                <view class="text2">
                    <text>收入：</text>
                    <text style="color: #FF724F;"> <text v-if="currentIndex!=1 && currentIndex!=2">¥</text>
                        {{listData.incomeSum}}</text>
                </view>
            </view>
            <view class="text2 u-margin-right-80">
                <text>支出：</text>
                <text style="color: #FF724F;"><text v-if="currentIndex!=1 && currentIndex!=2">¥</text>
                    {{listData.expendSum}}</text>
            </view>
        </view>
        <view class="detail u-padding-20">
            <view class="u-flex detail-title u-row-between u-margin-bottom-24">
                <text>收入明细</text>
                <text>{{currentDate}}</text>
            </view>
            <view v-if="listData!=null &&listData.mpUserHoneyDetailVOPageBean.rows.length >0">
                <view class="detail-list u-margin-bottom-30"
                    v-for="(item,index) in listData.mpUserHoneyDetailVOPageBean.rows">
                    <view class="u-flex u-row-between u-margin-bottom-6">
                        <text class="col-3 u-font-27">{{item.tradeName}}</text>
                        <text class="col-3 u-font-27 font-w5">
                            <text v-if="item.flowDirection == 1">-</text>
                            <!-- <text>¥</text> -->
                            {{item.tradeNumber}}</text>
                    </view>
                    <view class="u-flex u-row-between">
                        <text class="u-font-24" style="color: #bebebe;">{{item.createTime}}</text>
                        <text class="col-3 u-font-28" style="color: #FFA132;"
                            v-if="item.withdrawalState == 0">正在审核</text>
                        <text class="col-3 u-font-28" style="color: #5DE89B;"
                            v-if="item.withdrawalState == 1">审核通过</text>
                        <text class="col-3 u-font-28" v-if="item.withdrawalState == 2">审核失败</text>
                    </view>
                </view>
            </view>
            <u-empty text="暂无数据" mode="list" v-else style="padding-top:60px;"></u-empty>
        </view>
    </view>
</template>

<script>
    import {
        wallet,
        getYearMonth
    } from '@/utils/index.js'
    import {
        walletList,
        withdrawRedPaper
    } from '../../../api/api.js'
    export default {
        data() {
            return {
                currentIndex: 0,
                swiperDataList: [{
                        first: '我的余额',
                        sec: '0',
                        third: '',
                        bgColor: '#51E292',
                        icon: '../../../static/img/wallet/wall-1.png'
                    },
                    {
                        first: '蜜宝',
                        sec: '0',
                        third: '',
                        bgColor: '#FECE0A',
                        icon: '../../../static/img/wallet/wall-2.png'
                    },
                    {
                        first: '蜜糖',
                        sec: '0',
                        third: '获得收入后 30 天解冻',
                        bgColor: '#FF8080',
                        icon: '../../../static/img/wallet/wall-3.png'
                    },
                    {
                        first: '活动红包',
                        sec: '0',
                        third: '金额大于100可提现至余额',
                        bgColor: '#FF3F4D',
                        icon: '../../../static/img/wallet/wall-4.png'
                    },
                    {
                        first: '合约收入',
                        sec: '0',
                        third: '每月月底结算',
                        bgColor: '#8438FF',
                        icon: '../../../static/img/wallet/wall-5.png'
                    },
                ],
                listData: null,
                walletInfo: {},
                currencyCategory: 0,
                // 当前年月
                currentDate: '',
            }
        },
        onLoad(e) {
            console.log('e', e);
            this.currentIndex = e.index;
            this.getWallet();
            this.getListByType(e.index)
            this.currentIcon = this.swiperDataList[this.currentIndex].icon;
            this.currentDate = getYearMonth();
            uni.setNavigationBarTitle({
                title: e.title
            })
        },
        methods: {
            // 获取余额
            async getWallet() {
                this.walletInfo = await wallet();
                this.swiperDataList[0].sec = this.walletInfo.balance;
                this.swiperDataList[1].sec = this.walletInfo.mbBalance;
                this.swiperDataList[2].sec = this.walletInfo.honeyBalance;
                this.swiperDataList[3].sec = this.walletInfo.redBalance;
                this.swiperDataList[4].sec = this.walletInfo.creationBalance;
            },

            // 获取订单详情
            getListByType(type) {
                if (type == '1') {
                    this.currencyCategory = 3
                } else if (type == '2') {
                    this.currencyCategory = 2
                } else if (type == '4') {
                    this.currencyCategory = 7
                } else {
                    this.currencyCategory = Number(type) + 1;
                }
                console.log('this.currencyCategory', this.currencyCategory);
                uni.showLoading({
                    title: '加载中'
                });
                walletList({
                    pageNum: 1,
                    pageSize: 20,
                    currencyCategory: this.currencyCategory
                }).then(res => {
                    uni.hideLoading();
                    console.log('res', res);
                    if (res && res.code == 200) {
                        this.listData = res.data;
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: 'error',
                            duration: 1500
                        })
                    }
                })
            },
            change(e) {
                uni.setNavigationBarTitle({
                    title: this.swiperDataList[e.detail.current].first
                })
                this.currentIcon = this.swiperDataList[e.detail.current].icon;
                console.log('e', e);
                this.currentIndex = e.detail.current
                this.getListByType(e.detail.current);
            },
            // 红包提现到余额
            withdrawRedPaper() {
                uni.showLoading({
                    title: '提现中...'
                })
                withdrawRedPaper({
                    money: this.walletInfo.redBalance
                }).then(res => {
                    uni.hideLoading()
                    console.log('res', res);
                    if (res && res.code == 200) {
                        uni.showToast({
                            title: '提现成功',
                            icon: 'success',
                            duration: 1500
                        })
                    } else {
                        uni.showToast({
                            title: res.msg,
                            icon: 'error',
                            duration: 1500
                        })
                    }
                })
            },
            // 充值
            recharge(index) {
                uni.navigateTo({
                    url: '/pages/index/my/rechargeBalance?title=' + name
                })
            },
            // 提现
            withdraw() {
                uni.navigateTo({
                    url: '/pages/index/my/withdraw'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    $padding: 0 36rpx;

    .container {
        background: #F9F9F9;
        padding: $padding;

        .swiper-box {
            height: 520rpx;
            margin-top: 30rpx;

            .swiper-item {
                background-color: #fff;
                color: #fff;
                border-radius: 36rpx;
                padding: 40rpx;

                .swiper-card {
                    background: #51E292;
                    border: 1px solid #FFFFFF;
                    box-shadow: 0px 10px 40px rgba(93, 232, 155, 0.3);
                    border-radius: 30px;
                    height: 338rpx;
                    width: 100%;
                    padding-top: 40rpx;
                    padding-bottom: 40rpx;
                    padding-left: 60rpx;
                    padding-right: 60rpx;

                    text {
                        color: #F5FFF8;
                        font-size: 28rpx;
                    }

                    .balance {
                        font-size: 44rpx;
                        font-weight: 600;
                    }
                }

                .today {
                    margin-top: 40rpx;

                    .withdraw,
                    .recharge,
                    .act {
                        width: 108rpx;
                        height: 46rpx;
                        line-height: 46rpx;
                        text-align: center;
                        font-size: 22rpx;
                        border-radius: 20rpx;
                        border: 1px solid #5DE89B;
                        color: #5DE89B;
                        margin-right: 0;
                    }

                    .recharge {
                        background: #5DE89B;
                        color: #fff;
                        border: none;
                    }

                    .act {
                        border: none;
                        color: #fff;
                    }
                }

            }
        }

        .info {
            border-radius: 24rpx;
            padding: 16rpx 20rpx;
            margin-top: 48rpx;
            background: #f9f9f9;
        }

        .detail {
            .detail-title {
                color: #bebebe;
                font-size: 32rpx;
                font-weight: 500;
            }
        }

        .swiper-dot {
            margin-top: 16rpx;

            .dot {
                width: 20rpx;
                height: 20rpx;
                border-radius: 50%;
                background: #d4d4d4;
                margin-right: 30rpx;
            }

            .active {
                background: #fff;
            }
        }

        .text2 {
            color: #60708F;
        }
    }
</style>
