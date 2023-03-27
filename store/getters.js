/**
 * 在这里则是state.文件名.状态名
 */
const getters = {
	nickName: state => state.user.nickName,
	vaasList: state => state.videoMap.vaasList,
	vaasAuthorList: state => state.videoMap.vaasAuthorList,
	k: state => state.videoMap.k,
	aK: state => state.videoMap.aK,
	authorPage: state => state.videoMap.authorPage,
	authorId: state => state.videoMap.authorId,
}
export default getters
