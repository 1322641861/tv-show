const videoMap = {
	state: {
		vaasList: [], // 首页短视频列表
		k: 0, // 短视频下标
		vaasAuthorList: [], // 作者作品列表
		aK: 0, // 查看当前作者作品的第ak个视频
		authorPage: 1, // 作者作品查询page参数
	},
	mutations: {
		// 从首页跳转短视频详情
		SET_VAAS_LIST: (state, vaasList) => {
			state.vaasList = vaasList.vaasList
			// uni.setStorageSync('vaasList', vaasList)
		},
		SET_VAAS_K: (state, k) => {
			state.k = k.k;
		},
		SET_VAAS_AUTHOR_LSIT: (state, vaasList) => {
			state.vaasAuthorList = vaasList.vaasAuthorList
		},
		SET_VAAS_AK: (state, ak) => {
			state.aK = ak.aK;
		},
		SET_VAAS_PARAMS: (state, params) => {
			state.authorPage = params.authorPage;
			state.authorId = params.authorId;
		},
	},
	actions: {},

}
export default videoMap
