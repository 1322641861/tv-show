<template>
    <view class="container">
       <!-- <view class="header u-flex u-row-center u-margin-top-40">
            <text class="text1 u-margin-right-40 u-font-28" :class="[currentIndex==index?'active':'']"
                v-for="(item,index) in headerTab" @click="changeIndex(index)">{{item}}</text>
        </view>
        <view class="info u-flex u-margin-right-20 u-margin-left-20 u-row-between">
            <view class="u-flex">
                <image class="u-margin-right-24" style="width: 84rpx;height: 84rpx;"
                    src="../../../static/img/wallet-icon.png" mode=""></image>
                <view class="text2">
                    <text>收入：</text>
                    <text style="color: #FF724F;">¥{{billDetailData.incomeSum}}</text>
                </view>
            </view>
            <view class="text2 u-margin-right-80">
                <text>支出：</text>
                <text style="color: #FF724F;">¥{{billDetailData.expendSum}}</text>
            </view>
        </view> -->
        <view class="date">
            {{currentDate}}
        </view>
        <view class="list-content">
            <view class="u-flex u-row-between" style="margin-bottom: 88rpx;">
                <view class="col-3 ">
                    <text class="u-margin-right-60 u-font-32 font-w5" style="color: #1D252B;"
                        @click="filter(0)">账单明细</text>
                    <text class="u-margin-right-60 font-w5" style="color: #D8D8D8;"
                        :class="[currentTab==1?'active-tab':'']" @click="filter(1)">收入</text>
                    <text class="font-w5" style="color: #D8D8D8;" @click="filter(2)"
                        :class="[currentTab==2?'active-tab':'']">支出</text>
                </view>
                <text class="col-3 font-w5 u-font-28" style="color: #D8D8D8;" @click="filter(3)">筛选</text>
            </view>
            <view v-if="orderList.length>0">
                <view style="height: 144rpx;" v-for="(item,index) in copyData">
                    <view class="u-flex u-row-between col-3 u-margin-bottom-16 u-font-28">
                        <text>{{item.tradeName}}</text>
                        <text class="font-w5"> <text v-if="item.flowDirection == 1">-</text>
                            <text v-if="item.currencyCategory!=3&&item.currencyCategory!=2">¥</text>
                            {{item.tradeNumber}}</text>
                    </view>
                    <view class="u-flex u-row-between">
                        <text class="col-9 u-font-24">{{item.createTime}}</text>
                        <text v-if="item.withdrawalState == null"></text>
                        <text v-if="item.withdrawalState == 0" class="u-font-28" style="color: #FFA132;">审核中</text>
                        <text v-if="item.withdrawalState == 1" class="u-font-28" style="color: #FFA132;">审核通过</text>
                        <text v-if="item.withdrawalState == 2" class="u-font-28" style="color: #FFA132;">审核失败</text>
                    </view>
                </view>
            </view>
            <u-empty text="暂无数据" mode="list" v-if="orderList.length==0" style="padding-top:60px;"></u-empty>
        </view>
    </view>
</template>

<script>
    import {
        getWalletList,
        getYearMonth
    } from '@/utils/index.js'
    import {
        walletList
    } from '../../../api/api.js'
    export default {
        data() {
            return {
                headerTab: ['全部', '提现', '充值', '奖励'],
                currentIndex: 0,
                params: {
                    pageNum: 1,
                    pageSize: 100,
                    currencyCategorys: '1,2,3,4,7',
                },
                // 账单详情信息
                billDetailData: {},
                orderList: [],
                copyData: [],
                currentDate: '',
                currentTab: 0,
            }
        },
        onShow() {
            this.getWalletListData();
            this.currentDate = getYearMonth();
        },
        methods: {
            // 获取账单列表
            getWalletListData() {
                uni.showLoading({
                    title: '加载中'
                });
                walletList(this.params).then(res => {
                    uni.hideLoading();
                    if (res && res.code == 200) {
                        this.billDetailData = res.data;
                        this.orderList = this.billDetailData.mpUserHoneyDetailVOPageBean.rows;
                        this.copyData = this.orderList;
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: 'error',
                            duration: 1500
                        })
                    }
                })
            },
            changeIndex(index) {
                this.currentIndex = index;
            },
            // 筛选
            filter(index) {
                this.currentTab = index;
                if (index == 1) {
                    this.copyData = [];
                    this.orderList.filter(s => {
                        if (s.flowDirection == 2) {
                            this.copyData.push(s);
                        }
                    })
                } else if (index == 2) {
                    this.copyData = [];
                    this.orderList.filter(s => {
                        if (s.flowDirection == 1) {
                            this.copyData.push(s);
                        }
                    })
                } else if (index == 0) {
                    this.copyData = [];
                    this.copyData = this.orderList;
                } else {
                    uni.showToast({
                        title: '功能优化中',
                        icon: 'none'
                    })
                }

            },
        }
    }
</script>

<style scoped lang="scss">
    $padding: 0 36rpx;


    .container {
        width: 100%;
        background: #f6f6f6;

        .header {
            .active {
                color: #000;
                font-size: 16px;
            }
        }

        .info {
            border-radius: 24rpx;
            padding: 16rpx 20rpx;
            margin-top: 48rpx;
            background: #f9f9f9;
        }

        .date {
            color: #9f9f9f;
            padding: $padding;
            margin-top: 48rpx;
        }

        .list-content {
            background: #fff;
            margin: 24rpx 20rpx;
            border-radius: 24rpx;
            color: #333;
            padding: 30rpx 66rpx;

            .active-tab {
                color: #333 !important;
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
