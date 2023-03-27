<template>
    <view class="whole-page">
        <view class="card-list" v-for="item in bankList" :style="{background:item.bankColor}">
            <view class="card-top">
                <image :src="item.bankPic"></image>
                {{item.bankName}}
            </view>
            <view class="card-conet">
                <view class="card-title">{{item.cardCategory}}</view>
                <view class="card-button" @click="toggle('center',item.id)">解绑</view>
            </view>
            <view class="card-text">****{{item.cardNo}}</view>
        </view>
        <view class="card-add" @click="goAddCard">+添加银行卡</view>
        <uni-popup ref="popup" @change="change">
            <view class="popup-content" :class="{ 'popup-height': type === 'center'}">
                <view class="popup-title">确认要解绑？</view>
                <view class="popup-text" style="color: #666666;">
                    解绑后不能再使用该银行卡进行支付或者提现</view>
                <view class="popup-button" @click="close">保持绑定</view>
                <view class="popup-shuo" @click="godelete">确认解绑</view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import {
        getUserInfo,
        getBindCardList
    } from '@/utils'
    export default {
        data() {
            return {
                bankList: [],
                bank_id: "",
                type: "center",
                userInfo: {},
            }
        },
        onLoad(e) {

        },
        onShow() {
            this.getBindCard()
            this.getUserINFO();
        },
        methods: {
            // 获取用户详情
            async getUserINFO() {
                this.userInfo = await getUserInfo();
            },
            // 获取绑定的银行卡列表
            async getBindCard() {
                this.bankList = await getBindCardList();
                this.bankList.filter(s => {
                    s.cardNo = this.getLastFourDigits(s.cardNo);
                })
            },
            godelete() {
                let that = this
                uni.request({
                    url: getApp().globalData.http_url + 'mine/bank/jdUnBind',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    data: {
                        id: that.bank_id,
                        type: 2
                    },
                    success: (res) => {
                        console.log(res.data)
                        if (res.data.code == 200) {
                            uni.showToast({
                                title: '解绑成功!',
                                icon: 'success',
                                duration: 1500
                            });
                            that.close()
                            that.getBindCard()
                        } else {
                            uni.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 1500
                            });
                        }
                    },
                });
            },
            getLastFourDigits(cardNumber) {
                // 检查输入是否为字符串，如果不是，将其转换为字符串
                cardNumber = String(cardNumber);
                // 截取字符串最后四个字符
                const lastFourDigits = cardNumber.substr(-4);
                return lastFourDigits;
            },
            toggle(type, id) {
                this.bank_id = id
                this.type = type
                this.$refs.popup.open(type)
            },
            close() {
                this.$refs.popup.close()
            },
            change(e) {
                console.log('当前模式：' + e.type + ',状态：' + e.show);
            },
            goAddCard() {
                if (this.userInfo.realName == null) {
                    uni.navigateTo({
                        url: '/pages/index/my/authentication'
                    })
                } else {
                    uni.navigateTo({
                        url: 'AddCard'
                    });
                }

            }
        }
    }
</script>

<style>
    .whole-page {
        padding: 32upx;
    }

    .card-list {
        width: 100%;
        padding: 40upx 30upx;
        background: #342A59;
        border-radius: 20upx;
        margin-bottom: 20upx;
    }

    .card-top {
        width: 100%;
        padding-bottom: 20upx;
        font-size: 30upx;
        color: #FFFFFF;
    }

    .card-top image {
        float: left;
        width: 42upx;
        height: 42upx;
        margin-right: 20upx;
    }

    .card-conet {
        width: 100%;
        padding-bottom: 20upx;
    }

    .card-title {
        float: left;
        color: #C4C4C4;
    }

    .card-button {
        float: right;
        width: 132upx;
        height: 48upx;
        text-align: center;
        line-height: 48upx;
        border: 1upx solid rgba(255, 255, 255, 0.5);
        border-radius: 28upx;
        font-size: 26upx;
        color: #C4C4C4;
        margin-top: 16upx;
    }

    .card-text {
        width: 100%;
        font-size: 40upx;
        color: #FFFFFF;
    }

    .card-add {
        width: 100%;
        height: 100upx;
        border: 1upx dashed #999999;
        border-radius: 20upx;
        text-align: center;
        line-height: 100upx;
    }

    .popup-shuo {
        color: #999999;
        width: 100%;
        text-align: center;
        padding: 20upx 0;
    }
</style>
