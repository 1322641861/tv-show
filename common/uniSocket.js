// import baseUrl from './baseUrl/baseUrl.js'
import store from '@/store/index.js'
// import pako from './pako.js'
const pako = require('pako')

class uniSocket {
	constructor(options) {
		// this.socketUrl = baseUrl
		this.isSocket = false //socket是否存在
		this.monitorClose() //监听关闭
		this.monitirReceive() //监听接收
		this.monitorError() //监听错误
	}
	initType() { //初始化连接对象 火币 gate
		this.socketType = store.state['socket/socket'].judgeSocket
		if (Object.keys(this.socketType).length > 0) {
			if (this.socketType && this.socketType.type == 'huobi') {
				this.socketUrl = 'wss://api.hadax.com/ws';

				// this.socketUrl = 'wss://www.huobi.be/-/s/dm/ws'; //v
				// this.socketUrl = 'wss://www.huobi.be/-/s/swap/ws'; //v
				// this.socketUrl = 'wss://api.huobiasia.vip/ws' //v2
				// this.socketUrl = 'wss://www.huobi.be/-/s/linear/ws' //v
			} else if (this.socketType && this.socketType.type == 'gate') {
				this.socketUrl = 'wss://webws.gateio.live/v3'
			}
		}
	}
	init() { //初始化
		this.initType() //初始化连接对象 火币 gate
		return new Promise((resolve, reject) => {
			if (this.socketUrl) {
				if (this.isSocket) {
					resolve('needStart') //告知页面重新请求
					console.log('socket 已经启动');
				} else {
					uni.connectSocket({
						url: this.socketUrl,
						method: 'GET'
					})
					uni.onSocketOpen((res) => {
						this.isSocket = true
						resolve(true)
						console.log('socket 连接成功');
					})
				}
			} else {
				reject('请先设置socket_url')
			}
		})
	}
	send(data, callback) { //发送
		// console.log(JSON.stringify(data), 'JSON.stringify(data)');
		uni.sendSocketMessage({
			data: JSON.stringify(data),
			success: () => {
				callback && callback(true)
			},
			fail: () => {
				callback && callback(false)
			},
		})
	}
	monitirReceive() { //接收
		uni.onSocketMessage((res) => {
			//gate接收数据处理方式
			if (this.socketType.type == 'gate') {
				let data = JSON.parse(res.data)
				let tickerDataVuex = store.state['gateData/gateData'].tickerData
				if (data.method) {
					switch (data.method) {
						case 'ticker.update':
							store.commit('gateData/gateData/tickerDataSet', data.params)
							break
					}
				}
				//火币接收数据处理方式
			} else if (this.socketType && this.socketType.type == 'huobi') {
				let buffer = res.data
				let blob = new Blob([buffer])
				let reader = new FileReader();
				reader.onload = (res) => {
					let ploydata = new Uint8Array(res.target.result);
					let msg = pako.inflate(ploydata, {
						to: 'string'
					});
					this.receiveHandle(msg) //火币接受数据处理
				};
				reader.readAsArrayBuffer(blob, "utf-8");
			}

		})
	}
	receiveHandle(msg) { //火币接受数据处理
		let data = JSON.parse(msg)
		// console.log(data, 'msg');
		if (data.ping) {
			this.huobiHeadBeat(data)
		} else if (data.status === 'ok') { //第一次处理数据
			if(data.ch && data.ch == "market.overviewv2"){
				if(data.data){
					store.commit('gateData/huobiData/symbolDataState',data.data)
				}
			}
			console.log(data, '订阅数据');
		} else { //之后数据处理
			console.log(data, '推送数据');
		}
	}
	close() { //关闭
		uni.closeSocket()
		this.isSocket = false
	}
	monitorClose() { //监听关闭
		return new Promise((resolve, reject) => {
			uni.onSocketClose((res) => {
				this.isSocket = false //可以打开连接
				let isClose = store.state['socket/socket'].monitorClose
				store.commit('socket/socket/monitorCloseState') //调用方法告知页面socket关闭 请求重新发送请求
				console.log('socket 关闭');
				resolve('close')
			})
		})
	}
	monitorError() { //监听错误
		uni.onSocketError((res) => {
			this.isSocket = false
			store.commit('socket/socket/monitorErrorState') //调用方法告知页面出现错误 请求重新发送请求
			console.log('socket 错误');
		})
	}
	huobiHeadBeat(ping) { //火币需要的心跳
		let pong = {
			pong: ping.ping
		}
		this.send(pong)
	}
	getHearBeat() { //心跳

	}
};
const uni_socket = new uniSocket(); //相当于赋值
export default uni_socket
