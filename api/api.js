
import request from '@/utils/request.js'
// 密盒
// 发送短信上传票据
export function setCode(data) {
    return request.get('applet/app/user/send_code', data);
}
// 登录
export function orlogin(data) {
    return request.get('applet/app/user/register_or_login', data);
}

// 获取用户信息
export function userInfo(data) {
    return request.get('applet/mine/index/list/' + data);
}
// 我的钱包
export function myWallet() {
    return request.get('applet/mine/newWallet/getWallet');
}
// 我的账单列表
export function walletList(data) {
    return request.get('applet/mine/newWallet/list', data);
}
// 获取钱包,蜜宝基础充值金额
export function getBaseMoney() {
    return request.get('applet/mine/userHoneyMbrecharge/list');
}
// 获取钱包充值列表
export function honeyPayList() {
    return request.get('applet/mine/userHoneyPay/list');
}
// 首页推荐列表
export function getPlayletRecommend() {
    return request.get('applet/playlet/recommend');
}
// 获取已绑定银行卡列表
export function bindCardList() {
    return request.get('applet/mine/bank/list');
}
// 绑定提现支付宝
export function bindingAlipay(data) {
    return request.post('applet/mine/info/bindingAlipay', data)
}
// 解绑支付宝
export function unBindingAlipay(data) {
    return request.get('applet/mine/info/unBindingAlipay', data)
}
// 获取支付宝信息
export function Alipay(data) {
    return request.get('applet/mine/info/getAlipay', data)
}
// 余额提现到支付宝
export function withdrawAliPay(data) {
    return request.post('applet/mine/withdrawal/alipay', data)
}
// 蜜宝充值
export function rechargeMiBao(data) {
    return request.post('applet/mine/honey/mbOrder', data.params)
}
// 保存记录，第一次调用标记（喜欢、收藏），重复调用取消
export function postPlayletAction(data) {
    return request.post(`applet/playlet/action?action=${data.action}&playletId=${data.playletId}`);
}
// 获取视频信息流
export function postVaasVideoFeed(data) {
    return request.post('applet/vaas/video/feed', data);
}
// 获取视频频道
export function postVaasVideoChannels(data) {
    return request.post('applet/vaas/video/channels', data);
}
// 查询短剧详情，会判断是否有合约
export function getPlayletDetail(playletId) {
    return request.get('applet/playlet/detail/' + playletId);
}
// 短剧分类列表
export function getClassifyList() {
    return request.get('applet/playlet/classify/list');
}
// 用户短剧最后观看记录
export function getPlayletWactchLast(data) {
    return request.get('applet/playlet/watch/record/last' + data);
}
// 保存记录，如果存在即更新
export function postPlayletWatchSave(data) {
    return request.post('applet/playlet/watch/record/save' + data);
}
// 连连充值
export function llRecharge(data) {
    return request.post('applet/recharge/llRecharge', data)
}
// 连连确认支付
export function llConfirmPay(data) {
    return request.get('applet/recharge/llConfirmPay', data)
}
// 查询追剧历史
export function getPlayHistory(data) {
    return request.get('applet/playlet/list', data);
}
// 红包提现到余额
export function withdrawRedPaper(data) {
    return request.post('applet/mine/withdrawal/redWithdrawal', data);
}

