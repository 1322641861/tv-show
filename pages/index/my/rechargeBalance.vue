<template>
    <view class="container">
        <view class="recharge-card">
            <view class="text1 font-w5 u-font-27 u-text-center u-margin-bottom-80">选择充值数量
            </view>
            <view class="u-flex u-row-between u-relative" style="flex-wrap: wrap;">
                <view class="recharge-item u-flex u-flex-col" :class="{'active':index==currentIndex}"
                    v-for="(item,index) in rechargeList" :key="index" @click="quickChoose(item.money,index)">
                    <text>{{item.money}}元</text>
                    <text class="u-font-24 font-w5 u-margin-top-20"
                        style="color: #A6AEB6;">得{{item.money*100}}{{item.giveNumber==0?'':'+'+item.giveNumber}}蜜宝</text>
                </view>
                <image class="ind" src="../../../static/img/ind.png" mode=""></image>
            </view>
            <view class="u-flex u-row-between u-relative">
                <view class="recharge-item recharge-vip u-flex u-flex-col" v-for="(item,index) in vipList"
                    @click="golevelType(index,item)" :class="{'activeVIP':currentVIPIndex==index}">
                    <text class="title">{{item.typeName}}</text>
                    <text>¥ <text class="money">{{item.typePrice}}</text> </text>
                    <text v-if="item.preferentialFlag == 0" class="cut">立减{{item.originPrice*1-item.typePrice*1}}元 <del
                            style="color: #777;font-size: 12px;margin-left: 10px;">¥{{item.originPrice}} </del></text>
                    <text class="info">海量短剧免费看</text>
                </view>
            </view>
        </view>
        <view class="total u-margin-top-72">
            <text class="font-w5 u-font-30" style="color: #A6AEB6;">总计：</text>
            <text class="font-w5" style="color: #FF8080;font-size: 44rpx;">{{rechargeValue}}</text>
            <text class="font-w5 u-font-30 u-margin-left-6" style="color: #A6AEB6;">元</text>
        </view>
        <view class="chg-rectype">
            <view class="u-text-left col-2 font-w5 u-font-32 u-margin-bottom-16">
                选择支付方式
            </view>
            <!-- <view class="u-text-left col-9 u-font-24">
                选择后不可更改，如因银行卡错误导致打款失败，平台不负任何责任，有问题请联系客服
            </view> -->
        </view>
        <view class="recharge-type u-flex u-flex-col u-margin-top-60">
            <radio-group @change="radioChange" style="width: 100%;">
                <view class="u-flex u-row-between w100 u-margin-bottom-60" v-for="(item,index) in rachargeDataList"
                    :key="index">
                    <view class="u-flex">
                        <image :src="item.icon" mode="aspectFill" style="width: 46rpx;height: 46rpx;"></image>
                        <text class="u-margin-left-20 text1 u-font-32">{{item.name}}</text>
                    </view>
                    <label class="radio" v-if="index!=2">
                        <radio :value="item.value" color="#FED429" :checked="item.checked" />
                    </label>
                </view>
                <view class="w100 u-padding-left-60" v-if="bankList.length > 0">
                    <view class="u-flex u-row-between w100 u-margin-bottom-60" v-for="(item,index) in bankList">
                        <view class="u-flex">
                            <image :src="item.bankPic" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
                            <text class="u-margin-left-20 col-9 u-font-32">{{item.bankName}}({{item.cardNo}})</text>
                        </view>
                        <label class="radio">
                            <radio :value="item.id" color="#FED429" :checked="item.checked" />
                        </label>
                    </view>
                </view>
            </radio-group>
            <view class="u-flex w100 u-padding-left-60" @click="addCard">
                <image class="u-margin-right-20" style="width: 40rpx;height: 40rpx;"
                    src="../../../static/img/addCard-icon.png" mode=""></image>
                <text class="u-font-32">添加银行卡</text>
            </view>
        </view>
        <!-- <view class="u-margin-top-60">
            <u-checkbox-group>
                <u-checkbox v-model="isChecked" active-color="#FED429">
                    <text class="u-font-24 col-8">我已经阅读并同意</text>
                    <text class="u-font-24 col-3 font-w5">《蜜宝充值协议》</text>
                </u-checkbox>
            </u-checkbox-group>
        </view> -->
        <view class="submit bg2" :class="[mibaoValue!=null?'':'disabled']" @click="$noMultipleClicks(submit)">
            确认
        </view>
        <uni-popup ref="popup_yanz" @change="change">
            <view class="popup-content" :class="{ 'popup-height': yanz_type === 'center'}">
                <view class="popup-title" style="padding-top:20upx;">确认支付</view>
                <view class="yanz-text">短信验证码已发送预留手机号({{phone_new}})请将6位数字验证码填写到下方</view>
                <view class="yanz-shur">
                    <input :class="Verif.length == 6 ? 'windt':''" type="number" maxlength="6" v-model="Verif" focus
                        @input="goinput" :adjust-position="false" />
                </view>
                <view class="yanz-whole">
                    <view class="yanz-item"></view>
                    <view class="yanz-item"></view>
                    <view class="yanz-item"></view>
                    <view class="yanz-item"></view>
                    <view class="yanz-item"></view>
                    <view class="yanz-item"></view>
                </view>
                <view class="yanz-coed" @click="Verifications">{{text}}</view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import {
        getBindCardList,
        getUserInfo,
    } from '@/utils/index.js'
    import {
        getBaseMoney,
        honeyPayList,
        rechargeMiBao,
        llRecharge,
    } from '../../../api/api.js'
    import {
        systemList,
        buyVip
    } from '@/api/officer.js';
    var times = 60;
    export default {
        data() {
            return {
                rechargeList: [],
                // 0 余额充值 1 充值秘宝
                currentType: 0,
                // isChecked: false,
                rechargeValue: 0,
                total: null,
                Verif: "",
                text: '重新发送验证码',
                isChooseVip: false,
                list: [{
                        name: 'apple',
                        disabled: false
                    },
                    {
                        name: 'banner',
                        disabled: false
                    },
                    {
                        name: 'orange',
                        disabled: false
                    }
                ],
                rachargeDataList: [{
                    name: '余额支付',
                    icon: '../../../static/img/recharge-icon2.png',
                    checked: true,
                    value: '6',
                }, {
                    name: '支付宝',
                    icon: '../../../static/img/recharge-icon3.png',
                    checked: false,
                    value: '2',
                }, {
                    name: '银行卡',
                    icon: '../../../static/img/recharge-icon3.png',
                    checked: false,
                    value: '4',
                }],
                // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
                value: 'orange',
                mibaoValue: null,
                payType: 6,
                bankList: [],
                paydata: "", //连连支付回调
                btnbindtitle: "获取验证码", ////绑定手机号获取验证码
                disablebind: false, //绑定手机号获取验证码
                noClick: true,
                orderId: "",
                yanz_type: 'center',
                phone: null,
                phone_new: "",
                currentIndex: null,
                currentVIPIndex: null,
                vipList: [],
                vipData: "",
                bankData:"",
            }
        },
        onLoad(e) {

        },
        onShow() {
            this.getsystemList();
            this.getBaseMoneyList();
            this.getBindCard();
            this.getUserInfoData();
        },
        methods: {
            async getUserInfoData() {
                this.userInfo = await getUserInfo()
                this.phone = this.userInfo.phone
                this.phone_new = this.userInfo.phone.substr(0, 3) + '****' + this.userInfo.phone.substr(7, 4)
            },
            // 获取绑定的银行卡列表
            async getBindCard() {
                this.bankList = await getBindCardList();
                this.bankList.filter(s => {
                    s.cardNo = this.getLastFourDigits(s.cardNo);
                })
                this.bankData = this.bankList[0]
            },
            getsystemList() {
                let that = this
                systemList().then(res => {
                    console.log(res, '会员列表')
                    this.vipList = res.data
                    this.vipData = res.data[0]
                    console.log('this.vipData',this.vipData)
                    // 	优惠价格是否开启 0 不开启 1开启
                    if (this.vipData.preferentialFlag == 0) {
                        this.orderMoney = this.vipData.originPrice
                    } else {
                        this.orderMoney = this.vipData.typePrice
                    }
                })
            },
            getLastFourDigits(cardNumber) {
                // 检查输入是否为字符串，如果不是，将其转换为字符串
                cardNumber = String(cardNumber);
                // 截取字符串最后四个字符
                const lastFourDigits = cardNumber.substr(-4);
                return lastFourDigits;
            },
            // chooseVip(index, num) {
            //     this.currentVIPIndex = index;
            //     this.rechargeValue = num;
            //     this.currentIndex = null;
            //     this.mibaoValue = num * 100 + 1000;
            //     this.isChooseVip = false;
            // },
            golevelType(index, num) {
                this.currentVIPIndex = index;
                this.rechargeValue = num.typePrice;
                this.currentIndex = null;
                this.mibaoValue = num.typePrice * 100 + 1000;
                this.isChooseVip = true;
                this.levelType = index
                this.vipData = num
            },
            // 会员下单
            gobuyVip() {
                let that = this
                var clientType = ''
                // #ifdef H5
                clientType = 1
                // #endif
                // #ifdef APP-PLUS
                clientType = 2
                //#endif
                uni.showLoading({
                    title: '加载中'
                });
                console.log('that.vipData.id',that.vipData.id);
                buyVip({
                    clientType: clientType,
                    bankId: that.payType == 4 ? that.bankData.id * 1 : '',
                    bankType: that.payType == 4 ? that.bankData.bankName : '',
                    orderMoney: that.rechargeValue,
                    orderType: that.userInfo.vipStatus == 0 ? 1 : 2,
                    payType: that.payType,
                    typeId: that.vipData.id
                }).then(res => {
                    console.log(res, '下单')
                    uni.hideLoading();
                    if (res.code == 200) {
                        //余额
                        if (res.data.data.orderId && that.payType == 6) {
                            uni.showToast({
                                title: '开通成功！',
                                icon: "success",
                                duration: 1500
                            })
                            that.getsystemList()
                            that.getUserInfo()
                            that.closePopupGoods()
                            that.getmyWallet()
                        }
                        //银行卡
                        if (res.data.data.orderId && that.payType == 4) {
                            that.orderId = res.data.data.orderId
                            that.setHtml()
                            that.goPopupyanz()
                        }
                        //支付宝
                        if (that.payType == 2) {
                            document.querySelector('body').innerHTML = res.data.data;
                            document.forms[0].submit()
                            return;
                        }

                    } else {
                        uni.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 2000
                        });
                    }
                })
            },
            getHoneyPayList() {
                let that = this;
                uni.showLoading({
                    title: '加载中'
                });
                honeyPayList({
                    currencyCategory: -2,
                    pageNum: 1,
                    pageSize: 10
                }).then(res => {
                    uni.hideLoading();
                    if (res && res.code == 200) {
                        this.rechargeList = res.data.data;
                    }
                    console.log('res', res);
                })
            },
            close_yanz() {
                this.$refs.popup_yanz.close()
            },
            goconfirm() {
                let that = this
                if (that.Verif.length != 6) {
                    uni.showToast({
                        title: '请输入正确的验证码',
                        icon: 'none',
                        duration: 1500
                    });
                    return
                }
                uni.showLoading({
                    title: '支付中',
                    mask: true
                });
                uni.request({
                    url: getApp().globalData.http_url + '/mine/honey/jdConfirmPay',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    data: {
                        orderId: that.orderId,
                        code: that.Verif,
                        type: 2
                    },
                    success: (res) => {
                        console.log(res.data, '银行卡支付')
                        uni.hideLoading()
                        that.Verif = ''
                        if (res.data.code == 200) {
                            uni.showToast({
                                title: '充值成功！',
                                icon: "success",
                                duration: 1500
                            })
                            that.getUserInfoData()
                            that.close_yanz()

                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none',
                                duration: 1500
                            });
                        }
                    },
                });
            },
            getBaseMoneyList() {
                uni.showLoading({
                    title: '加载中'
                });
                getBaseMoney().then(res => {
                    console.log('res', res);
                    uni.hideLoading();
                    if (res && res.code == 200) {
                        this.rechargeList = res.data;
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: 'none',
                            duration: 1500
                        });
                    }
                })
            },
            goinput(e) {
                if (e.detail.value.length == 6) {
                    this.goconfirm()
                }
            },
            change(e) {
                console.log('当前模式：' + e.type + ',状态：' + e.show);
            },
            // 添加银行卡
            addCard() {
                uni.navigateTo({
                    url: 'AddCard'
                })
            },
            onKeyInput: function(event) {
                this.rechargeValue = event.target.value / 100
            },
            // 快捷选择金额
            quickChoose(item, index) {
                this.isChooseVip = false;
                this.currentIndex = index;
                this.currentVIPIndex = null;
                this.rechargeValue = item;
                this.mibaoValue = item * 100 + 1000
            },
            // 选中某个单选框时，由radio时触发
            radioChange(e) {
                console.log('e',e)
                this.payType = e.detail.value
                // this.bankData = {}
            },
            // 充值
            submit() {
                // if (!this.isChecked) {
                //     uni.showToast({
                //         title: '请先阅读充值协议',
                //         icon: 'error',
                //         duration: 1500
                //     })
                //     return;
                // } else if (this.rechargeValue == 0) {
                //     uni.showToast({
                //         title: '请选择充值蜜宝数量',
                //         icon: 'error',
                //         duration: 1500
                //     })
                //     return;
                // }
                if (this.rechargeValue == 0) {
                    uni.showToast({
                        title: '请选择充值蜜宝数量',
                        icon: 'error',
                        duration: 1500
                    })
                    return;
                }
                if(this.isChooseVip){
                    this.gobuyVip();
                    return;
                }
                uni.showLoading({
                    title: '加载中'
                });
                let params = {};
                if (this.payType.length > 1) {
                    params = {
                        money: this.rechargeValue,
                        payType: 4,
                        bankId: this.payType
                    }
                } else {
                    params = {
                        money: this.rechargeValue,
                        payType: this.payType
                    }
                }
                rechargeMiBao({
                    params
                }).then(res => {
                    uni.hideLoading();
                    if (res && res.code == 200) {
                        if (this.payType.length > 1) {
                            this.setHtml()
                            this.goyanz('center')
                            this.orderId = res.data.orderId
                            return;
                        }
                        if (this.payType == '2') {
                            document.querySelector('body').innerHTML = res.data;
                            document.forms[0].submit()
                            return;
                        }
                        uni.showToast({
                            title: '充值成功',
                            icon: 'error',
                            duration: 1500
                        })

                        this.mibaoValue = null
                        this.rechargeValue = 0
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: 'error',
                            duration: 1500
                        })
                    }
                    console.log('res', res);
                })
            },

            setHtml() {
                let that = this
                    --times;
                if (times != 0) {
                    that.text = '重新发送验证码' + '(' + times + 's' + ')'
                    setTimeout(function() {
                        that.setHtml()
                    }, 1000)
                } else {
                    that.text = '重新发送验证码'
                    times = 60
                }
            },
            goyanz(type) {
                console.log('tangechuang')
                this.yanz_type = type
                this.$refs.popup_yanz.open(type)
            },
            Verifications() {
                let that = this
                if (times != 60) {} else {
                    that.setHtml()
                    that.submit()
                }
            },
        },

        //关闭弹框
        getClosecode() {
            this.$refs.popupcode.close()
            clearTimeout(this.timer)
        },
    }
</script>

<style scoped lang="scss">
    $padding: 0 36rpx;

    .container {
        width: 100%;
        background-color: #f6f6f6;
        padding: $padding;
        padding-bottom: 200rpx;

        .recharge-card {
            background: #f9f9f9;
            border-radius: 24rpx;
            margin-top: 40rpx;

            .recharge-item {
                padding: 20rpx;
                width: 45%;
                background: #fff;
                border-radius: 24rpx;
                text-align: center;
                color: #1D252B;
                margin-bottom: 56rpx;
            }

            .recharge-vip {
                background: #FFFAF5;
                border: 2px solid #E7D0B6;
                height: 242rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                .title {
                    color: #333;
                    font-size: 13px;
                    font-weight: 500;
                }

                .money {
                    font-size: 24px;
                    color: #333;
                    margin-left: 10rpx;
                }

                .info {
                    color: #aaa;
                    font-size: 12px;
                }

                .cut {
                    font-size: 12px;
                    color: #333;
                }
            }

            .activeVIP {
                background: linear-gradient(126.36deg, #F5D1A1 0%, #FFE9CE 45.67%, #FFCF8E 100%);
            }

            .active {
                border: 1px solid #FEDA48;
            }

            .ind {
                position: absolute;
                width: 84rpx;
                height: 84rpx;
                top: 0;
                right: 0;
            }
        }

        .input-box {
            border-bottom: 1px solid #A6AEB6;
            padding-bottom: 24rpx;

            .yuan {
                width: 80rpx;
                color: #333;
                font-size: 32rpx;
                font-weight: 500;
            }
        }

        .chg-rectype {
            margin-top: 96rpx;
        }

        .submit {
            border-radius: 8rpx;
            height: 96rpx;
            line-height: 96rpx;
            text-align: center;
            margin-top: 60rpx;
            color: #fff;
        }

        //短信验证弹框
        .yanz-text {
            width: 100%;
            font-size: 26upx;
            color: #222222;
            opacity: 0.4;
            padding-bottom: 20upx;
        }

        .yanz-shur {
            width: 100%;
        }

        .yanz-shur input {
            display: inline-block;
            padding-left: 34upx;
            font-weight: 500;
            font-size: 48upx;
            width: 90%;
            color: #222222;
            letter-spacing: 66upx;
        }

        .windt {
            width: 70%;
            padding-left: 0;
            float: left;
        }

        .yanz-whole {
            width: 100%;
            display: flex;
        }

        .yanz-item {
            flex: 1;
            margin: 0 12upx;
            border-bottom: 1upx solid rgba(34, 34, 34, 0.12);
        }

        .yanz-item input {
            font-weight: 500;
            font-size: 48upx;
            width: 100%;
            color: #222222;
            text-align: center;
        }

        .yanz-coed {
            width: 100%;
            font-size: 26upx;
            color: #222222;
            opacity: 0.28;
            text-align: center;
            margin: 40upx 0;
        }

        .bg1 {
            background: linear-gradient(0.04deg, #35D28A 1.25%, #95F7B6 100.38%);
        }

        .bg2 {
            background: linear-gradient(351.73deg, #FECE0A 6.08%, rgba(254, 232, 142, 0.83) 93.43%);
        }

        .disabled {
            background: #ccc;
        }

        .text1 {
            color: #1D252B;
        }
    }
</style>