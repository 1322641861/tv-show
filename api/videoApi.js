import request from '@/utils/request.js';

/// 短视频
// 视频反馈上报：用户在对视频进行反馈时上报
export function postVaasFeedback(data) {
    return request.post('applet/vaas/log/feedback', data);
}
// 获取用户反馈列表: like喜欢，collect收藏，follow关注
export function getVaasFeedbackList(data) {
    return request.get('applet/vaas/log/feedback/list', data);
}
// 点击播放上报：用户点击视频，视频进入播放状态时上报
export function postVaasPlay(data) {
    return request.post('applet/vaas/log/play', data);
}
// 播放时长上报：视频正常结束播放或提前停止播放时上报
export function postVaasPlayTm(data) {
    return request.post('applet/vaas/log/playTm', data);
}
// 视频曝光上报：视频在屏幕中出现，即被算展现一次曝光
export function postVaasShow(data) {
    return request.post('applet/vaas/log/show', data);
}
// 短视频历史记录
export function getVaasHistory(data) {
    return request.get('applet/vaas/log/history', data);
}
// 获取播放地址
export function postVaasVideoPlay(data) {
    return request.post('applet/vaas/video/play', data);
}
// 获取作者信息
export function postVaasVideoCpinfo(data) {
    return request.post('applet/vaas/video/cpinfo', data);
}
// 获取作者视频列表
export function postVaasVideoCpvideos(data) {
    return request.post('applet/vaas/video/cpvideos', data);
}
// 点击播放上报：用户点击视频，视频进入播放状态时上报
export function postVaasLogPlay(data) {
    return request.post('applet/vaas/log/play', data);
}
// 播放时长上报：视频正常结束播放或提前停止播放时上报
export function postVaasLogPlayTm(data) {
    return request.post('applet/vaas/log/playTm', data);
}
// 视频曝光上报：视频在屏幕中出现，即被算展现一次曝光
export function postVaasLogShow(data) {
    return request.post('applet/vaas/log/show', data);
}
/// 短剧
// 短剧第几集观看次数加+1
export function postPlayetWatchNumAdd(data) {
    return request.post('applet/playlet/watchNum/add', data);
}