<template>
	<view class="whole-page">
		 <view class="info-img">
			   <image :src="img_url+combineData.itemIcon" style="width: 100%;" mode="widthFix"></image>
		 </view>
		 <view class="info-title">{{combineData.itemName}}</view>
		 <view class="info-label">
			 <view class="amount-conet">
			 		<view class="amount-left">限量</view>
			 		<view class="amount-text">{{combineData.combineNum}}/{{combineData.combineRemainNum}}</view>	 
			 </view>
			  <view class="label-num" v-for="item in combineData.rarenessList">{{item}}</view>
		 </view>
		 <view class="whole-mode" v-if="combineData.ruleList.length == 2">
			   <view class="mode-item" @click="gomode(0)"
			        :class="mode_index == 0 ? 'ciks':''">合成方式一</view>
			  <view class="mode-item" @click="gomode(1)" 
			       :class="mode_index == 1 ? 'ciks':''">合成方式二</view>
		 </view>
		 <!-- <view class="mode-text">
			   (需要吕洞宾X1、张果老X1、汉钟离X1、铁拐李X1、何仙姑X1、蓝采和X1、韩湘子X1、曹国舅X1，加上合成剂密盒勋章X1、原石X1)
		 </view> -->
		 <view class="mode-title">合成材料</view>
		 <view class="whole-Science">
			    <view class="Science-item" v-for="(item,index) in ruleData.materialList" :key="index">
					 <view class="Science-img"  @click="choicePayType('bottom',item.nfrArtworkDtoList,index,1)">
						  <view class="post-text">{{item.xunNum}}/{{item.num}}</view>
						  <view class="post-secience" v-if="item.xunNum==0">选择</view>
						  <image :src="img_url+item.itemIcon" mode="aspectFill"></image>
					 </view>
					 <view class="Science-title">{{item.itemName}}</view>
				</view>
		 </view>
		 <view class="mode-title" v-if="ruleData.catalystList != ''">合成剂</view>
		 <view class="whole-Science" v-if="ruleData.catalystList != ''">
				<view class="Science-item"  v-for="(item,index) in ruleData.catalystList" :key="index">
					 <view class="Science-img"  @click="choicePayType('bottom',item.nfrArtworkDtoList,index,2)">
						 <view class="post-text">{{item.xunNum}}/{{item.num}}</view>
						 <view class="post-secience" v-if="item.xunNum==0">选择</view>
						  <image :src="img_url+item.itemIcon" mode="aspectFill"></image>
					 </view>
					 <view class="Science-title">{{item.itemName}}</view>
				</view>
		 </view>
		 <view class="Science-buttom" @click="goScience()" v-if="combineData.combineRemainNum != 0">一键合成</view>
		  <view class="Science-buttom bunts" v-if="combineData.combineRemainNum == 0">合成已结束</view>
		 <view class="Science-shuo">
			   <view class="shuo-title">合成说明：</view>
			   <view class="shuo-text">{{ruleData.ins}}</view>
		 </view>
		 <uni-popup ref="popup"  @change="change">
				<view class="PayType-content" :class="{ 'popup-height': type === 'bottom'}">	
					  <view class="PayType-title">
						    选择合成材料 <image src="../../../static/images/xx2.png" @click="close"></image>
					  </view>
					   <scroll-view scroll-y="true" class="whole-work">		     
						     <view class="list-work" v-for="(item,index) in synthlist" :kye="index">
								  <view class="work-conet">
									    <view class="work-img">
											 <image :src="img_url+item.itemIcon" mode="aspectFill"></image>
										</view>
										<view class="work-left">
											 <view class="work-name">{{item.itemName}}</view>
											 <view class="work-text">编号：#{{item.numbering}}</view>
										</view>
								  </view>
								  <view class="work-radius" @click="goradius(index)">
									    <view class="radius-dina" v-if="item.is_xuan == 1"></view>
								  </view>
							 </view>
					   </scroll-view>
					   <view class="work-buttom" @click="goquerun()">确定</view>
				 </view>
		  </uni-popup>
		  <uni-popup ref="popup_content"  @change="change">
				 <view class="cheang-content"  :class="{ 'popup-height': content_type === 'center'}">
					   <view v-if="thumbStatus == 200">
						   <view class="cheang-img">
								 <image :src="img_url+combineData.itemIcon" 
								 style="width:100%;border-radius:32upx;"  mode="widthFix"></image>
						   </view>
						   <view class="cheang-title">合成成功</view>
						   <view class="cheang-text" >艺术品已自动发放，请返回查看</view>
					   </view>
					   <view v-if="thumbStatus == 201">
						     <view class="cheang-img" style="height: 480upx;">
						     	   <view class="fail-img">
									     <image src="../../../static/images/sb.png"></image>
								   </view>					
						     </view>
						     <view class="cheang-title">合成失败</view>
						     <view class="cheang-text" >不要气馁，胜败乃兵家常事</view>
					   </view>
					   <view class="cheang-center"  @click="close_type">关闭</view>
				 </view>
		   </uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'bottom',
				content_type:'center',
				mode_index:0,
				artworkId:"",
				combineData:"",
				ruleData:"",
				img_url:"",
				userCollections:[],
				synthlist:[],
				thumbStatus:'',
				choiceindex:0,
				class_type:1,
			}
		},
		onLoad(e) {
			console.log(e)
			this.img_url = getApp().globalData.img_url
			this.artworkId = e.id
			this.getcombineInfo()
		},
		methods: {
			goScience(){
				let that = this
			//	var list = JSON.stringify(that.userCollections)
				var data = {
					artworkId:that.artworkId,
					ruleId:that.ruleData.id,
					userCollections:that.userCollections
				}
				console.log(JSON.stringify(data))
				uni.showLoading({
					title: '合成中',
					mask:true
				});
				uni.request({
				     url: getApp().globalData.http_url+'NfrArtwork/combine',
					 method:'POST',
					 header:{
					    'content-type': 'application/json',
						'sessionId':  uni.getStorageSync('sessionId')
					 },	
					// data:{
					// 	artworkId:that.artworkId,
					// 	ruleId:that.ruleData.id,
					// 	userCollections:list
					// },
					 data:JSON.stringify(data),
					 success: (res) => {
						console.log(res,'合成');
						uni.hideLoading()
						if(res.data.code == 200 || res.data.code == 201){
							that.thumbStatus = res.data.code
							 that.choet_type('center')			 
						}else{
							 uni.showToast({
								title:res.data.msg,
								icon: 'none',
								duration: 1000
							 });			
						 }		 
					 }
				});
			},
			getcombineInfo(){
				 let that = this
				 uni.request({
				     url: getApp().globalData.http_url+'NfrArtwork/combine/rule/'+that.artworkId,
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						  'sessionId':  uni.getStorageSync('sessionId')
					 },					 
					 success: (res) => {
						console.log(res,'合成详情');
						if(res.data.code == 200){
							// var list = []
							// var list2 =[]
							for(var i in  res.data.data.ruleList[0].materialList){
								 res.data.data.ruleList[0].materialList[i].xunNum = 0
								for(var c in  res.data.data.ruleList[0].materialList[i].nfrArtworkDtoList){
									 res.data.data.ruleList[0].materialList[i].nfrArtworkDtoList[c].is_xuan = 0
								}
							}
							for(var j in  res.data.data.ruleList[0].catalystList){
								 res.data.data.ruleList[0].catalystList[j].xunNum = 0
								for(var e in  res.data.data.ruleList[0].catalystList[j].nfrArtworkDtoList){
									 res.data.data.ruleList[0].catalystList[j].nfrArtworkDtoList[e].is_xuan = 0
								}
							}
							that.ruleData = res.data.data.ruleList[0]
							that.combineData = res.data.data
							console.log(that.ruleData)
						}else if(res.data.msg == '合成已结束'){
							uni.showToast({
								title:res.data.msg,
								icon: 'none',
								duration: 1000
							});
							setTimeout(() => {
							    uni.switchTab({
							    	 url: 'synthesis'
							    });
							}, 500)
						}else{
							 uni.showToast({
								title:res.data.msg,
								icon: 'none',
								duration: 1000
							 });			
						 }		 
					 }
				}); 
			},
			goradius(i){
				let that = this
				var e = that.choiceindex
				console.log(that.ruleData.materialList[e])
				if(that.class_type == 1){
					if(that.ruleData.materialList[e].num == that.ruleData.materialList[e].xunNum){
						return
					}
					if(that.ruleData.materialList[e].nfrArtworkDtoList[i].is_xuan == 0){
						that.ruleData.materialList[e].nfrArtworkDtoList[i].is_xuan = 1
						that.synthlist[i].is_xuan = 1
						that.userCollections.push(that.synthlist[i].userCollectionsId)
						that.ruleData.materialList[e].xunNum++
					}else{
						that.ruleData.materialList[e].nfrArtworkDtoList[i].is_xuan = 0
						that.synthlist[i].is_xuan = 0
						that.ruleData.materialList[e].xunNum--
					}
				}else{
	               if(that.ruleData.catalystList[e].num == that.ruleData.catalystList[e].xunNum){
	               	return
	               }
	               if(that.ruleData.catalystList[e].nfrArtworkDtoList[i].is_xuan == 0){
	               	that.ruleData.catalystList[e].nfrArtworkDtoList[i].is_xuan = 1
	               	that.synthlist[i].is_xuan = 1
	               	that.ruleData.catalystList[e].xunNum++
					that.userCollections.push(that.synthlist[i].userCollectionsId)
	               }else{
	               	that.ruleData.catalystList[e].nfrArtworkDtoList[i].is_xuan = 0
	               	that.synthlist[i].is_xuan = 0
	               	that.ruleData.catalystList[e].xunNum--
	               }
				}
			   
			},
			choicePayType(type,item,i,s){
				let that = this
				that.choiceindex = i 
				that.class_type = s
				that.type = type
				that.synthlist = item
				that.$refs.popup.open(type)
			},
			goquerun(){
				let that = this
				// for(var i in that.synthlist){
				// 	if(that.synthlist[i].is_xuan == 1){
				// 		that.userCollections.push(that.synthlist[i].userCollectionsId)
				// 	}
				// }
				that.close()		
				console.log(that.userCollections)
			},
			close(){
				this.$refs.popup.close()			
			},
			choet_type(type){
				let that = this
				that.content_type = type
				that.$refs.popup_content.open(type)
			},
			close_type(){
				this.$refs.popup_content.close()
				setTimeout(() => {
				   uni.navigateBack(-1)
				}, 1000)	
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			gomode(e){
				this.mode_index = e
				this.ruleData = this.combineData.ruleList[e] 
			}
		}
	}
</script>

<style>
 .info-img {
	 width: 480upx;
	 margin: 40upx auto 20upx auto;
 }
 .info-img image{
	 border-radius: 20upx;
 }
 .info-title {
	 width: 100%;
	 padding: 12upx 0;
	 font-weight: 500;
	 font-size: 36upx;
	 color: #222222;
	 text-align: center;
 }
 .info-label {
	 width: 100%;
	 display: flex;
	 flex-direction: row;
	 align-items: center;
	 justify-content: center;
 }

 .label-num {	
	 margin-left:10upx;
	 padding: 2upx 14upx;
	 font-size: 24upx;
	 color: #222222;
	 border: 1upx solid #222222;
	 border-radius: 4upx;
 }
 .amount-conet {
 	   border-radius: 6upx;
 	  border: 1upx solid #222222;
 }
 .amount-left {
 	   float: left;
 	   background: #222222;
 	   border-radius: 4upx;
 	   padding: 2upx 14upx;
 	   font-size: 24upx;
 	   color: #FFFFFF;
 }
 .amount-text {
 	   float: left;
 	   font-size: 22upx;
 	   color: #222222;
 	   border-radius: 4upx;
 	  padding: 2upx 10upx;
 	  font-size: 24upx;
 }
 .whole-mode {
	 width: 100%;
	 padding: 20upx 120upx;
	 display: flex;
 }
 .mode-item {
	 flex: 1;
	 text-align: center;
	 font-size: 32upx;
	 color: #222222;
 }
 .ciks {
	font-weight: 500;
	font-size: 32upx;
	color: #C99362; 
 }
 .mode-text {
	 width: 100%;
	 padding: 20upx;
	font-size: 24upx;
	color: #666666; 
 }
 .mode-title {
	 width: 100%;
	 padding: 10upx 20upx;
	 font-weight: 500;
	 font-size: 32upx;
	 color: #222222;
 }
 .whole-Science {
	 width: 100%;
	 padding: 15upx;
 }
 .Science-item {
	 width: 170upx;
	 background: rgba(255, 255, 255, 0.4);
	 border-radius: 16upx;
	 float: left;
	 margin: 6upx;
 }
 .Science-img {
	 width: 100%;
	 height: 170upx;
	 position: relative;
	 border-radius: 16upx;
 }
 .post-text {
	 position: absolute;
	 right: 10upx;
	 top: 10upx;
	 padding: 4upx 14upx;
	 font-size: 20upx;
	 border-radius: 20upx;
	 color: #FFFFFF;
	 z-index: 1;
	 background-color: rgba(0,0,0,0.5);
 }
  .Science-img image {
	  width: 100%;
	  height: 100%;
  }
  .post-secience {
	  width: 100%;
	  height: 100%;
	  position: absolute;
	  top: 0;
	  left: 0;
	  text-align: center;
	  line-height: 170upx;
	  font-size: 26upx;
	  color: #FFFFFF;
	  z-index: 1;
	  background-color: rgba(0,0,0,0.5);
  }
 .Science-title {
	 width: 100%;
	 text-align: center;
	 padding: 14upx 0;
	 font-weight: 500;
	 font-size: 26upx;
	 color: #222222;
 }
 .Science-buttom {
	 width: 480upx;
	 height: 94upx;
	 text-align: center;
	 line-height: 94upx;
	 background: #222222;
	 border-radius: 60upx;
	 font-size: 32upx; 
	 color: #FFFFFF;
	 margin: 40upx auto;
 }
 .PayType-content {
 	width: 100%;
 	padding:0 40upx;
 	background-color: #FFF;
 	border-radius: 40upx 40upx 0px 0px;
 }
 .PayType-title{
 	font-weight: 500;
 	font-size: 32upx;
 	color: #000000;
 	text-align: center;
 	padding:40upx 0;
	position: relative;
 }
 .PayType-title image {
 	   width:30upx;
 	   height:30upx;
	    position: absolute;
		right: 30upx;
		top: 46upx;
 }
 .whole-work {
 	  width: 100%;
 	  max-height:600upx;
	  min-height:400upx;
 }
 .work-buttom {
	 width: 100%;
	 height: 92upx; 
	 margin: 40upx 0;
	 text-align: center;
	 line-height: 92upx;
	 font-size: 32upx;
	 color: #FFFFFF;
	 background: #222222;
	 border-radius: 60upx;
 }
 .list-work {
	 width: 100%;
	 margin-bottom: 20upx;
 }
 .work-conet {
	 float: left;
	 width: 550upx;
	 background: rgba(201, 147, 98, 0.28);
	 border-radius: 16upx;
 }
 .work-img {
	 float: left;
	 width: 134upx;
	 height: 134upx;
	 border-radius: 16upx;
 }
 .work-img image{
  width: 100%;
  height: 100%;
 }
 .work-left {
	 float: left;
	 padding: 20upx 0 20upx 26upx;
 } 
 .work-name {
	padding-bottom: 6upx;
	color: #222222; 
 }
 .work-text {
	font-size: 26upx;
	color: #5E3F24; 
 }
 .work-radius {
	 float: right;
	 width: 34upx;
	 height: 34upx;
	 border-radius: 50%;
	 padding: 6upx;
	 margin: 46upx 30upx 0 0;
	 border: 2upx solid #C99362;
 }
 .radius-dina {
	 width: 100%;
	 height: 100%;
	 background-color: #C99362;
	 border-radius: 50%;
 }
 .Science-shuo {
	 width: 100%;
	 padding: 30upx;
 }
 .shuo-title {
	width: 100%;
	color: #222222;
	padding-bottom: 10upx;
 }
 .shuo-text {
	 width: 100%;
	 font-size: 26upx;
	 color: #666666;
	padding-bottom: 10upx; 
 }
 .cheang-content {
 	  width: 480upx;
 	  text-align: center;
 }
 .cheang-img {
	 width: 100%;
	 margin-bottom: 20upx;
 }
 .fail-img {
	 width: 232upx;
	 height: 290upx;
	 margin: 140upx auto 0 auto;
 }
 .fail-img image {
	 width: 100%;
	 height: 100%;
	 border-radius: 20upx;
 }
 .cheang-title {
	 width: 100%;
	 font-weight: 500;
	 font-size: 36upx;
	 color: #FFFFFF;
     padding: 20upx 0;
 }
 .cheang-text {
	 width: 100%;
	 color: #FFFFFF;
 }
 .cheang-buttom {
	margin: 60upx auto;
	width: 340upx;
	border-radius: 60upx;
	background-color: #000000;
 }
 .cheang-center {
	margin: 60upx auto;
	 width: 288upx;
	 padding: 24upx 0;
	 background: #C99362;
	 border-radius: 60upx;
	 font-size: 32upx;
	 color: #FFFFFF; 	 
 }
 .bunts {
	 background-color: rgba(48, 57, 105, 0.4)
 }
</style>
