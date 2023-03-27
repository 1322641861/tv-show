<template>
    <view class="container">
        <view class="card-set">
            <view class="u-flex u-row-between u-padding-22" v-for="(item,index) in cardList" :key="index"
                @click="goDetail(item.name)">
                <view class="u-flex-1 card-left u-flex">
                    <image class="set-sty u-margin-right-20" :src="item.icon" mode="aspectFill"></image>
                    <text class="u-font-32">{{item.name}}</text>
                </view>
                <view class="u-flex-1 card-right u-text-right">
                    <text v-if="item.name == '实名认证'" class="u-margin-right-20">已认证</text>
                    <image class="right-icon" src="../../../static/img/right.png" mode="aspectFill"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                cardList: [{
                        icon: '../../../static/img/set1.png',
                        name: '实名认证'
                    },
                    {
                        icon: '../../../static/img/set2.png',
                        name: '支付宝管理'
                    },
                    {
                        icon: '../../../static/img/set3.png',
                        name: '开发票'
                    },
                    {
                        icon: '../../../static/img/set4.png',
                        name: '银行卡管理'
                    },
                    {
                        icon: '../../../static/img/set5.png',
                        name: '常见问题'
                    },
                    {
                        icon: '../../../static/img/set6.png',
                        name: '提现协议'
                    },
                    {
                        icon: '../../../static/img/set7.png',
                        name: '完税证明'
                    },
                ]
            }
        },
        methods: {
            // 详情页
            goDetail(name) {
                if (name == '实名认证') {
                    this.goauthentication();
                } else if (name == '银行卡管理') {
                    this.goMyCard();
                }  else if (name == '退出登录') {
                    this.exit();
                } else {
                    uni.showToast({
                        title: '功能测试中，即将上线！',
                        icon: 'none',
                        duration: 1000
                    });
                }
            },
            // 实名认证
            goauthentication() {
                uni.navigateTo({
                    url: 'authentication?sessionId=' + uni.getStorageSync('sessionId') + '&userId=' + uni
                        .getStorageSync('userId')
                });
            },
            // 银行卡
            goMyCard() {
                uni.navigateTo({
                    url: 'MyCard'
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
        background-color: #f5f5f5;

        .card-set {
            background: #fff;
            border-radius: 24rpx;

            .card-left {
                color: #000;

                .set-sty {
                    width: 64rpx;
                    height: 64rpx
                }
            }

            .card-right {
                color: #000;

                .right-icon {
                    width: 14rpx;
                    height: 24rpx;
                    color: #000;
                }
            }
        }
    }
</style>
