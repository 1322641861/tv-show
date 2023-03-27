const user = {
	state: {
		nickName: uni.getStorageSync("nickName"), //用户名 及手机号
	},
	mutations: {
		//用户名
		SET_NAME: (state, nickName) => {
			state.nickName = nickName
			uni.setStorageSync('nickName', nickName)
		},
	},
	actions: {
		// //登录
		logins({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				commit('SET_NAME', data.nickName)
				resolve()
			})
		},
	

		
		// 退出
		logOut({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				commit('SET_NAME', '')
				uni.clearStorage();
				resolve()
			})
		},
	}

}
export default user
