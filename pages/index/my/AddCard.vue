<template>
    <view class="whole-page">
        <view class="add-title">请绑定持卡人本人的银行卡</view>
        <view class="add-item">
            <view class="add-left">持卡人</view>
            <view class="add-input">
                {{userInfo.realName}}
            </view>
        </view>
        <view class="add-item">
            <view class="add-left">身份证号</view>
            <view class="add-input">
                {{userInfo.cardId}}
            </view>
        </view>
        <view class="add-item">
            <view class="add-left">选择银行</view>
            <view class="add-input">
                <picker @change="bindPickerChange" :value="card_index" :range="card_array">
                    <view class="uni-input" :class="card_conet.bankName == '请选择' ? 'cik':''">
                        {{card_conet.bankName}}
                    </view>
                </picker>
            </view>
        </view>
        <view class="add-item">
            <view class="add-left">银行卡类型</view>
            <view class="add-input" v-if="card_conet.type == 0">
                <picker @change="bindtypeChange" :value="type_index" :range="type_array">
                    <view class="uni-input" :class="card_type == '请选择' ? 'cik':''">
                        {{card_type}}
                    </view>
                </picker>
            </view>
            <view class="add-input" v-if="card_conet.type == 1">
                {{card_type}}
                <view class="post-shuo">此银行仅支持信用卡</view>
            </view>
            <view class="add-input" v-if="card_conet.type == 2">
                {{card_type}}
                <view class="post-shuo">此银行仅支持储蓄卡</view>
            </view>
        </view>
        <view class="add-item">
            <view class="add-left">银行卡号</view>
            <view class="add-input">
                <input placeholder="请输入银行卡号" maxlength="19" type="number" v-model="cardNo" :adjust-position="false" />
            </view>
        </view>
        <view class="add-item" v-if="card_type == '信用卡'">
            <view class="add-left">
                有效期<image src="../../../static/images/wh.png" @click="toggle('center')"></image>
            </view>
            <view class="add-input">
                <input placeholder="银行卡背面四位有效数字如0102" maxlength="4" v-model="cardtiem" :adjust-position="false" />
            </view>
        </view>
        <view class="add-item" v-if="card_type == '信用卡'">
            <view class="add-left">
                安全码<image src="../../../static/images/wh.png" @click="toggle('center')"></image>
            </view>
            <view class="add-input">
                <input placeholder="请输入三位数安全码如123" maxlength="3" v-model="cardcode" :adjust-position="false" />
            </view>
        </view>
        <view class="add-item">
            <view class="add-left">预留手机号</view>
            <view class="add-input">
                <input placeholder="请输入手机号" maxlength="11" type="number" v-model="phone" :adjust-position="false" />
            </view>
        </view>
        <view class="add-item">
            <view class="add-left">手机验证码</view>
            <view class="add-input">
                <input placeholder="请输入验证码" type="number" maxlength="6" v-model="Verif" style="width:60%;"
                    :adjust-position="false" />
                <view class="right-input" @click='Verifications()'>{{text}}</view>
            </view>
        </view>
        <view class="add-button" @click="gobankCardAuth">确认绑定</view>
        <uni-popup ref="popup" @change="change">
            <view class="popup-content" :class="{ 'popup-height': type === 'center'}">
                <image src="../../../static/images/yhk.png" style="width:100%;" mode="widthFix"></image>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    var times = 60;
    import {
        getUserInfo
    } from '@/utils'
    export default {
        data() {
            return {
                type: "center",
                card_index: 0,
                type_index: 0,
                cardNo: "",
                phone: "",
                Verif: "",
                cardtiem: "",
                cardcode: "",
                userInfo: "",
                card_conet: {
                    bankName: "请选择",
                    type: 0,
                },
                card_type: "请选择",
                card_array: [],
                card_list: [],
                type_array: ['储蓄卡', '信用卡'],
                text: '获取验证码',
            }
        },
        onLoad(e) {
            this.getUserINFO();
            this.getJdBank();
        },
        methods: {
            // 获取用户详情
            async getUserINFO() {
                this.userInfo = await getUserInfo();
            },
            change(e) {
                console.log('当前模式：' + e.type + ',状态：' + e.show);
            },
            toggle(type) {
                this.type = type
                this.$refs.popup.open(type)
            },
            close() {
                this.$refs.popup.close()
            },
            bindtypeChange(e) {
                var i = e.detail.value
                this.card_type = this.type_array[i]
            },
            bindPickerChange: function(e) {
                var i = e.detail.value
                let that = this
                that.card_conet = that.card_list[i]
                console.log(that.card_conet)
                if (that.card_conet.type == 1) {
                    that.card_type = '信用卡'
                } else {
                    that.card_type = '储蓄卡'
                }

            },
           
            getJdBank() {
                let that = this
                uni.request({
                    url: getApp().globalData.http_url + 'mine/bank/getJdBank',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    data: {
                        type: 2
                    },
                    success: (res) => {
                        console.log(res.data.data, '京东支持银行卡');
                        if (res.data.code == 200) {
                            var list = []
                            for (var i in res.data.data) {
                                list.push(res.data.data[i].bankName)
                            }
                            that.card_array = list
                            that.card_list = res.data.data
                        } else {
                            uni.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 1000
                            });
                        }
                    }
                });
            },
            gobankCardAuth() {
                let that = this
                var ser = ''
                if (that.cardNo == '') {
                    ser = '请输入银行卡号'
                } else if (that.phone == '') {
                    ser = '请输入手机号'
                } else if (that.Verif == '') {
                    ser = '请输入验证码'
                }

                if (ser != '') {
                    uni.showToast({
                        title: ser,
                        icon: 'none',
                        duration: 1500
                    });
                    return
                }
                uni.showLoading({
                    title: '绑定中',
                    mask: true
                });
                uni.request({
                    url: getApp().globalData.http_url + 'mine/bank/jdConfirmBind',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    data: {
                        id: that.cardId,
                        code: that.Verif,
                        type: 2
                    },
                    success: (res) => {
                        console.log(res.data)
                        uni.hideLoading()
                        if (res.data.code == 200) {
                            uni.showToast({
                                title: '绑定成功 !',
                                icon: 'success',
                                duration: 1500
                            });
                            setTimeout(() => {
                                uni.navigateBack(-1)
                            }, 1000)
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
            Verifications() {
                let that = this
                if (times != 60) {} else {
                    that.sendcode();
                }
            },
            setHtml() {
                let that = this
                    --times;
                if (times != 0) {
                    that.text = times + 's'
                    setTimeout(function() {
                        that.setHtml()
                    }, 1000)
                } else {
                    that.text = '获取验证码'
                    times = 60
                }
            },
            sendcode() {
                let that = this

                if (that.card_conet.bankName == '请选择') {
                    uni.showToast({
                        title: '请先选择所属银行 !',
                        icon: 'none',
                        duration: 1000
                    });
                    return
                } else if (that.card_type == '请选择') {
                    uni.showToast({
                        title: '请先选择银行卡类型 !',
                        icon: 'none',
                        duration: 1000
                    });
                    return
                } else if (that.cardNo == '') {
                    uni.showToast({
                        title: '请输入银行卡号 !',
                        icon: 'none',
                        duration: 1000
                    });
                    return
                }
                var regex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; //手机号正则
                if (regex.test(that.phone)) {
                    console.log(that.phone)
                    that.setHtml()
                    that.get_code()
                } else {
                    uni.showToast({
                        title: '请输入正确的手机号码 !',
                        icon: 'none',
                        duration: 1000
                    });
                }
            },
            get_code() {
                let that = this
                var month = that.cardtiem.substr(0, 2)
                var year = that.cardtiem.substr(2, 2)
                var coentTiem = '20' + year + '-' + month
                console.log(month, year, that.cardtiem, that.card_conet.bankName)
                uni.request({
                    url: getApp().globalData.http_url + 'mine/bank/jdBankCardAuth',
                    method: 'GET',
                    header: {
                        'content-type': 'text/json;charset=UTF-8',
                        'sessionId': uni.getStorageSync('sessionId')
                    },
                    data: {
                        bankName: that.card_conet.bankName,
                        phone: that.phone,
                        cardNo: that.cardNo,
                        cardType: that.card_type == '储蓄卡' ? 1 : 2,
                        year: coentTiem,
                        cvv2: that.cardcode,
                        type: 2
                    },
                    success: (res) => {
                        console.log(res.data)
                        if (res.data.code == 200) {
                            that.cardId = res.data.data
                            uni.showToast({
                                title: '验证码已发送 !',
                                icon: 'none',
                                duration: 1500
                            });
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
        }
    }
</script>

<style>
    .whole-page {
        padding: 32upx;
        min-height: 100vh;
    }

    .add-title {
        width: 100%;
        font-weight: 500;
        font-size: 32upx;
        text-align: center;
        padding: 60upx 0;
    }

    .add-item {
        width: 100%;
        margin-bottom: 40upx;
    }

    .post-shuo {
        float: right;
        color: #FF0000;
        font-size: 24upx;
    }

    .add-left {
        float: left;
        padding: 30upx 0;
    }

    .add-left image {
        float: right;
        width: 24upx;
        height: 24upx;
        margin: 10upx 0 0 10upx;
    }

    .add-input {
        float: right;
        width: 500upx;
        padding: 30upx 6upx;
        border-bottom: 1upx solid #F0F0F0;
    }

    .add-input picker,
    .uni-input {
        float: left;
    }

    .add-input input {
        width: 100%;
        font-size: 30upx;
        float: left;
    }

    .right-input {
        float: right;
        font-size: 26upx;
        color: #333333;
    }

    .add-button {
        width: 100%;
        height: 94upx;
        line-height: 94upx;
        text-align: center;
        background: #222222;
        border-radius: 8upx;
        font-size: 32upx;
        color: #FFFFFF;
        margin-top: 80upx;
    }

    .cik {
        color: #909399;
    }

    .popup-content {
        width: 480upx;
        padding: 0;
    }
</style>
