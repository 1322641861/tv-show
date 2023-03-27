import request from '@/utils/request.js'
// 星推官信息
export function SpreadInfo(data) {
    return request.get('applet/app/starSpread/info',data);
}
//邀请记录
export function inviteInfo(data) {
    return request.get('applet/app/starSpread/inviteInfo',data);
}
//推广素材
export function spreadMaterial(data) {
    return request.get('applet/app/starSpread/spreadMaterial',data);
}
//增速or流水排行榜
export function rankingList(data) {
    return request.get('applet/app/starSpread/rankingList',data);
}
//推广收益信息
export function incomeInfo(data) {
    return request.get('applet/app/starSpread/incomeInfo',data);
}
//海报or推广用语
export function posterOrLanguage(data) {
    return request.get('applet/app/starSpread/posterOrLanguage',data);
}
// 查询会员类型（新）列表
export function systemList(data) {
    return request.get('applet/system/type/list',data);
}
//查询用户会员详情
export function userInfo(data) {
    return request.get('applet/system/type/getUserInfo',data);
}
// 开通会员下单
export function buyVip(data) {
    return request.post('applet/system/type/buyVip',data);
}
// 开通会员连连确认支付
export function llNotify(data) {
    return request.get('applet/system/type/jdConfirmPay',data);
}
