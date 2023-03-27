<template>
	<view class="whole-page">
		<!-- <view class="artwork-img" id="container" style="width:80%; height:480upx;" v-if="oneCategory == '3D'"> </view> -->
		<view class="artwork-img" v-if="oneCategory == '3D'">
		  	   <image :src="info_data.pic" mode="widthFix"></image>
		  </view>
		<view class="artwork-img" v-if="oneCategory == '图片'">
		  	   <image :src="info_data.pic" mode="widthFix"></image>
		  </view>
		  <view class="whole-video" v-if="oneCategory == '视频'">
				<video :src="info_data.content" :autoplay="true" :loop="true" :controls="false"
					   object-fit="cover"></video>
		  </view>
		  <view class="whole-audio" v-if="oneCategory == '音乐'">
		  	    <image :src="info_data.creatorUrl" style="filter:blur(80rpx)"></image>
				<view class="audio-post">
					<view class="audio-conet">
						  <view class="audio-img funs">
								<image src="../../../static/images/audio2.png"></image>
								<view class="post-conet">
									  <view class="conet-img">
										  <image :src="info_data.creatorUrl"></image>
									  </view>
								</view>
						  </view>
					</view>
					<view class="post-buttom">
						  <image src="../../../static/images/audio3.png"></image>
					</view>
					<view class="page-section">
						  <audio  @play="goplay" @pause="gopause" 
							   :src="info_data.content" :poster="info_data.creatorUrl" controls></audio>
					</view>
				</view>		
				<!-- loop -->
		  </view>
		
		 <view class="artwork-back" style="padding:34upx;margin-bottom:0;">
			   <view class="name-top">
				     <view class="left-title">
			   	          {{info_data.goodsName}}		
				     </view>
			   </view>
			   <view>
				  <text class="title-type"v-for="item in info_data.rareness">{{item}}</text>
			   </view>	
			   <view class="right-title" @click="toggle_number('bottom')">
				     <text>当前编号: {{dunnumber}}</text>  查看所有编号<image src="../../../static/images/you.png"></image>
			  </view>
		  </view>
		  <view class="artwork-back">
			    <view class="artwork-top">
					  <view class="work-img">
					 	   <image :src="info_data.creatorUrl"></image>
					  </view>
					  <view class="work-name">{{info_data.creatorName}}</view>
					  <view class="work-right">创作者</view>
				</view>
			<!-- <view class="artwork-text">创作者北京艺术协会会员，代表著作有《蒙娜丽莎莎莎的微微笑》《雨中的向日葵》《沉静的大鲨鱼》《年迈的乌龟》《曾经的时光》《扭曲的饮料瓶》</view> -->
		  </view>
		  <view class="head-whole">
			   <view class="head-item"  @click="gohead(0)"
					:class="head_index == 0 ? 'colt':''">
					 作品故事介绍
			   </view>
			   <view class="head-item"  @click="gohead(1)"
					:class="head_index == 1 ? 'colt':''">
					 链上信息
			   </view>
		  </view>
		  <view class="whole-artwork" v-if="head_index == 0">
			    <view class="info-img" v-for="item in info_data.descPics">
					  <image :src="item" style="width: 100%;" mode="widthFix"></image>
				</view>
				<view class="back-padd" style="padding: 0 32upx;background-color:#fff;">
					<view class="title-whole">如何查看数字藏品？</view>
					<view class="whole-text">
						  <view class="text-img">
								<image src="../../../static/images/info1.png" mode="widthFix" style="width:100%;"></image>
						  </view>  
						  <view class="text-right">
								 <view class="text-item">1、下载密盒星球APP或打开H5网站</view>
								 <view class="text-item">2、H5网站与APP流程一致，APP为例：点击“我的”，登录后可在“我的艺术品”中查看您的数字艺术品。</view>
								 <view class="text-item">3、点击任一款艺术品，您可查看该数字作品的详细信息，并可在原许可范围内进行欣赏、学习、研究、转赠、下载源文件等操作。</view>
						  </view>
					</view>
					<view class="title-whole">下载密盒星球APP</view>
					<view class="code-img">
						  <image src="../../../static/images/info2.png" mode="widthFix" style="width:100%;"></image>
					</view>
					<view class="code-text">扫码下载APP</view>
					<view class="title-whole">关注公众号，随时了解最新消息</view>
					<view class="code-img">
						  <image src="../../../static/images/info3.png" mode="widthFix" style="width:100%;"></image>
					</view>
					<view class="code-text" style="border-bottom:1upx solid #F2F2F2;padding-bottom:80upx;">
						  关注密盒星球</view>
					<view class="title-whole" style="padding-bottom:40upx;">什么是数字艺术品？ABOUT</view>
					<view class="title-weiy">
						  <image src="../../../static/images/info4.png"></image>
						  唯一性
					</view>
					<view class="text-weiy">
						  密盒星球数字艺术品是使用BSN链所铸造的数字艺术品资产。每个数字艺术品都具有不可拆分、不可替代、独一无二的特点；
						  并具有可追溯的稀缺性。数字艺术品不具备货币支付价值，但承载着独有的体验与收藏价值。BSN区块链联盟是由国家信息中心、中国移动研究院、中国银联等机构联合发起的联盟链。
					</view>
					<view class="title-weiy">
						  <image src="../../../static/images/info5.png"></image>
						  安全性
					</view>
					<view class="text-weiy">
						  所有的创作者信息、作品信息及交易记录都将被完整记录在BSN链上，任何人都无法随意篡改。BSN链提供了多种认证服务，密盒星球发售的数字艺术品的交易信息可做到全生命周期可查询、可追溯。
					</view>
					<view class="title-weiy">
						  <image src="../../../static/images/info6.png"></image>
						  灵活性
					</view>
					<view class="text-weiy">
						  密盒星球的数字艺术品支持图片、视频、音频、3D模型、文本等丰富的数字资产形态，支持在持有特定时长后进行转赠，支持委托第三方担保平台进行委托转让服务。
					</view>
					<view class="title-whole">数字艺术品权益</view>
					<view class="text-weiy" style="font-weight:500;">发售方同意并承诺，在交易完成后，您对该作品的数字版权享有占有、使用、处分等权利，包括不限于以下权益:</view>
					<view class="text-weiy" style="padding-bottom:6upx;">1、作为您在社交平台账号的头像；</view>
					<view class="text-weiy" style="padding-bottom:6upx;">2、作为您在社交平台账号的表情包；</view>
					<view class="text-weiy" style="padding-bottom:6upx;">3、作为您在社交平台所发布的，如微博、公众 号文章、博客文章、视频等内容的封面和配图；</view>
					<view class="text-weiy" style="padding-bottom:6upx;">4、您可在互联网平台中公布或声明该数字艺术作品归属人是您本人; </view>
					<view class="text-weiy" style="padding-bottom:6upx;">5、您还可将其适用于其他非直接商业盈利性质的场合，如自行打印欣赏、插入工作PPT、插入学习课件等;</view>
					<view class="text-weiy" style="padding-bottom:6upx;">6、您可以将数字艺术作品的数字版权权益转让给他人。</view>
				    <view class="title-whole">特别提示</view>
					<view class="text-weiy">您对该数字艺术品的占有、使用、处分不得侵犯作者著作权，即您只能以合理的或著作权人可预见的方式展示、展览、汇编改数字资产中载有的作品，亦可向其他人转让该数字艺术品。如您需要对该数字艺术品做出复制、出租、改编、放映、广播或进行网络传播等涉及作品著作权授权的行为，您应获得著作权人的相应授权，并订立相关的协议。</view>
					<view class="title-whole">特别声明</view>
					<view class="text-weiy">未经特别标注的情况下，本数字艺术作品不得用于其他任何未经授权的商业用于、未经授权的改编、编绘或转授权。</view>
					<view class="title-whole">购买须知</view>
					<view class="text-weiy" style="font-weight:500;">为更好服务密盒星球平台的用户，密盒星球特此公告数字艺术品的交易细则。由于不同属性数字艺术品的交易细则各有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操作，以免造成不必要损失。</view>
					<view class="text-weiy" style="padding-bottom:6upx;">1、依据我国法律要求，特定条件下的数字艺术品的交易。不支持任何形式的变相炒作，我们坚决反对数字艺术品炒作、场外交易、欺诈，或以任何其他非法，侵权方式使用的违法违规行为，请大家注意甄别上述涉嫌网络欺诈的行为及其相关风险；</view>
					<view class="text-weiy" style="padding-bottom:6upx;">2、数字艺术品为虚拟数字商品，未满16周岁人群禁止购买和转赠，不鼓励不支持大学生参与数字艺术品交易。</view>
				    <view class="text-weiy" style="padding-bottom:60upx;">3、本商品一经出售，不支持退换货。</view>
					<view class="weiy-bottom">网站备案号：浙ICP备2021024137号-2</view>
					<view class="weiy-bottom">区块链应用备案：浙网信备33010822584102190011号</view>
					<view class="weiy-bottom">BSN链提供区块链技术支持</view>
					<view class="weiy-bottom">境内区块链备案号：</view>
					<view class="weiy-bottom">京网信备11010519322986960019号</view>
				</view>
		  </view>
		  <view class="whole-artwork" v-if="head_index == 1">
			    <view class="work-title">链上信息</view>
			    <view class="artwork-back"> 
					  <view class="author-item" style="padding-bottom: 26upx;">
						    <view class="left-author" style="padding-bottom: 10upx;">Hash值：</view>
							<view class="right-author">
								 {{info_data.hash}}
								 <image src="../../../static/images/fz.png" class="fuzi" @click="gocopy(info_data.hash)"></image>
							</view>
					  </view>
					  <view class="author-item">
						    <view class="left-author">拥有者:</view>
							<view class="right-author">
								  <image :src="info_data.haveAvatarUrl" class="topx"></image>
								  {{info_data.haveNickName}}
							</view>
					  </view>
				</view>	
			    <view class="work-title">转移记录</view>
				<view class="artwork-back" v-for="item in ferList">
				      <view class="work-top">
						    <view class="work-flex fl-left">
								<view class="record-img">
									  <image :src="item.fromAvatarUrl"></image>
								</view>
								<view class="record-name">{{item.fromNickName}}</view>
							</view>
							<view class="work-text">
								  转移给
							</view>
							<view class="work-flex fl-right">
								<view class="record-img">
									  <image :src="item.toAvatarUrl"></image>
								</view>
								<view class="record-name">{{item.toNickName}}</view>
							</view>
					  </view>
					  <view class="work-tiem">{{item.time}}</view>
					  <view class="work-hash">
						    Hash值：{{item.hash}} <image src="../../../static/images/fz.png" @click="gocopy(item.hash)"></image>
					  </view>
				</view>
		  </view>
		  <view class="post-bottom">
			   <view class="share-img" @click="gosetavatarUrl()">设为头像</view>
		  	   <view class="share-button" @click="toggle_number('bottom')">去转让</view>				  
		  </view>
		  <uni-popup ref="popup"  @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'center'}">	
					  <view class="popup-title">转赠</view>
					  <view class="popup-text">转让的藏品编号</view>
					  <view class="popup-item"  style="margin-bottom: 40upx;">
					  		#{{numbering}}
					  </view>
					  <view class="popup-text">接收方BSN链账户</view>
					  <view class="popup-item" style="margin-bottom: 40upx;">
							<input placeholder="请输入BSN链账户" type="text"  v-model="address"
									:adjust-position="false"/>
					  </view>
					  <view class="popup-text">您手机短信验证码</view>
					  <view class="popup-item">
							<input placeholder="请输入手机验证码" type="number" maxlength="6" v-model="Verif"
								   style="width:60%;" :adjust-position="false"/>
							 <view class="right-input" @click='Verifications()'>{{text}}</view>
					  </view> 
					  <view class="pot-text" style="font-weight: 500;">转赠需要消耗{{ferFee}}个蜜糖</view>
					  <view class="popup-button"  @click='goregister()'>确认转赠</view>
					  <view class="pot-text" style="margin-bottom:20upx;">请检查该藏品是否在bingo上架中，请先下架商品，以防转赠失败。</view>
					  
				 </view>
		  </uni-popup>	  
		  <uni-popup ref="popup_buttom"  @change="change">
				<view class="popup-bottom" :class="{ 'popup-height': type_buttom === 'bottom'}"> 
					  <view class="bot-item">
							 <view class="bot-text" @click="toggle('center')">直接转让</view>
							<!-- <view class="bot-text" style="border-top: 1upx solid #F2F2F2;"
													@click="goguns" >委托转让</view> -->
					  </view>
					  <view class="bot-button" @click="close_buttom()">取消</view>
				</view>
		  </uni-popup>
		  <uni-popup ref="number_buttom"  @change="change">
					<view class="popup-number" :class="{ 'popup-height': type_number === 'bottom'}"> 
						  <view class="popup-title">编号列表</view>
						  <scroll-view scroll-y="true" class="whole-work">
								 <view class="list-work" v-for="(item,index) in info_data.numberings" :kye="index">
										<view class="work-left" @click="goxunnumber(item)">
											 <view class="number-name">{{info_data.goodsName}}</view>
											 <view class="number-text">编号：#{{item.numbering}}</view>
										</view>
										<view class="work-buttom" 
                                             @click="toggle_buttom('bottom',item.id,item.numbering,item.isTransfer)">去转让</view>
									  <!-- <view class="work-buttom" v-if="item.isTransfer == 1"
									        @click="toggle_buttom('bottom',item.id,item.numbering)">去转让</view>
									    <view class="number-buttom" v-if="item.isTransfer == 3">
											  委托转让中 <image src="../../../static/images/sj.png"></image>
										</view>
										<view class="number-leng" v-if="item.isTransfer == 2">冷却中</view> -->
								 </view>
						  </scroll-view>
					</view>
		  </uni-popup>
	</view>
</template>

<script>
	// import * as THREE from "three";
	// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
	// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	// import {OBJLoader}  from 'three/examples/jsm/loaders/OBJLoader';
	// import {MTLLoader}  from 'three/examples/jsm/loaders/MTLLoader';
	var renderer;
	var scene;
	var camera;
	var controls;
	var times = 60;
	export default {
		data() {
			return {
				current: {
					poster: '../../../static/images/audio4.png',
					name: '致爱丽丝',
					author: '暂无',
					src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				},
				audioAction: {
					method: 'pause'
				},
				oneCategory:"",
			   	head_index:0,
				info_data:"",
				text:'获取验证码',
				type: 'center',
				type_buttom:'bottom',
				type_number:'bottom',
				vscode:"",
				randomtext:[],
				address:"",
				Verif:"",
				phone:"",
				work_id:"",
				ddcId:"",
				numbering:"",
				ferFee:"",
				numberId:"",
				dunnumber:'',
				pageNum:1,
				ferList:[],
				audiotext:"",
				is_play:"pause", // 暂停 pause  播放 play
				// camera: null,
			 //    scene: null,
			 //    renderer: null,
			 //    mesh: '../../../static/images/uu.obj',
			 //    controls:null,	    
			//	http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api 测试 test
		
			}
		},
		onLoad(e) {
			// this.audiotext = uni.createInnerAudioContext();
			// console.log(this.audiotext)
			// this.audiotext.autoplay = true
			// this.audiotext.loop = true
			// this.audiotext.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
			// this.audiotext.onPlay()

			this.oneCategory = e.oneCategory
			this.ddcId = e.id
			this.getuserInfo()
			this.getinfoCollections()
			this.gettransferFee()
		},
		onHide(){
			console.log('App Hide')
			this.audiotext = uni.createInnerAudioContext();
			this.audiotext.onPlay()
		},
		// onShow() {
		//     this.audiotext.stop()
		// },
		 mounted() {
		     // this.init();
		     // this.animate();
			 // 新的3d
			// this.initThree();//加载场景
			// this.leadModel();//导入模型
			// this.createControls();//控制模型的缩放、平移、旋转操作
		},
		methods: {
			//开始
			goplay(e){
			  console.log(e)
			  this.is_play = e.type
			},
			//暂停
			gopause(e){
			   console.log(e)
			    this.is_play = e.type
			},
			gosetavatarUrl(){
				let that = this
				uni.request({
				    url: getApp().globalData.http_url + 'mine/index/updateUser', 
					 method:'GET',
					 dataType:"json",
					 header:{
					   'content-type': 'text/json;charset=UTF-8',
					  'sessionId': uni.getStorageSync('sessionId')
					 },
					 data:{
						avatarUrl:that.info_data.pic		
					 },
				    success: (res) => {
						console.log(res.data)
						if(res.data.code == 200){
							uni.showToast({
								title: '设置成功！',
								icon: "success",
								duration: 1000
							})									
						}else{
							uni.showToast({
								title:res.data.message,
								icon: 'none',
								duration: 1500
							});	 
						}				
				    },
				});
			},
			goregister(){
			   let that = this
			   var info = ''	  
			    if(that.address == ''){
				   info = '请输入对方BSN链账户'
			   }else if(that.Verif == ''){
				   info = '请输入验证码'
			   }		 
			   if(info != ''){
				  uni.showToast({
					title:info,
					icon: 'none',
					duration: 1500
				   });	
					return
			   }else{ 
				  uni.showLoading({
				   	title: '转赠中请勿刷新...',
				   	mask:true
				  }); 
				  uni.request({
				     url: getApp().globalData.http_url + 'bsn/ddc/transferDDC', 
				  	 method:'GET',
					 dataType:"json",
				  	 header:{
				  		 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': uni.getStorageSync('sessionId')
				  	 },
				  	 data:{
						id:that.work_id,
						code: that.Verif,
						address:that.address,
						
					 },
				      success: (res) => {
				  		console.log(res.data)
						uni.hideLoading()
				  		if(res.data.code == 200){
							uni.showToast({
								title: '转赠成功！',
								icon: "success",
								duration: 1000
							})
							that.Verif = ''
							that.address = ''
							 that.getuserInfo()  
							 that.getinfoCollections()
							 that.gettransferFee()
						     that.close()
				  		}else{
				  			uni.showToast({
				  				title:res.data.message,
				  				icon: 'none',
				  				duration: 1500
				  			});	 
				  		}				
				      },
				  });
			   }
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			goxunnumber(data){
				this.numberId = data.id
				this.dunnumber= data.numbering
				this.head_index = 1
				this.getmyDDCTransferList()
				this.close_number()
			},
			toggle_buttom(type,id,num,isTransfer){
			  this.close_number()
			  this.work_id = id
			  this.numbering = num
			  this.isTransfer = isTransfer
			  this.type_buttom = type 
			  this.$refs.popup_buttom.open(type)
			},
			
			toggle_number(type){
			  this.type_number = type
			  this.$refs.number_buttom.open(type)
			},
			toggle(type){
				if(this.isTransfer == 2){
					uni.showToast({
						title:'冷却中，不可转赠',
						icon: 'none',
						duration: 1500
					});	
				}else if(this.isTransfer == 3){
					uni.showToast({
						title:'委托转让中，不可转赠',
						icon: 'none',
						duration: 1500
					});	
				}else{
					this.type = type
					this.$refs.popup.open(type)
					this.close_buttom()
					this.randomnum()
				}	
			},
			close_number(){
				this.$refs.number_buttom.close()
			},
			close_buttom(){
				this.$refs.popup_buttom.close()
			},
			close(){
				this.$refs.popup.close()
			},
			randomnum(){
			  this.randomtext = this.getCode(4)
			   console.log(this.randomtext)
			},
			Verifications(){
			   let that = this
			    if(times!=60){
			    }else{
			      that.sendcode();
			    }
			},
			setHtml(){
				let that = this
			   -- times;
			   if(times!=0){
				   that.text = times + 's'
				   setTimeout(function () {
					 that.setHtml()
				   }, 1000)
			   }else{
				 that.text = '获取验证码'
				 times = 60
			   }
			 },
			sendcode(){
				 let that = this
			   if(that.address == ''){
				  uni.showToast({ 
					title:'请输入对方BSN链账户 !',
					icon: 'none',
					duration: 1000
				  });
			   }else{
				  that.setHtml()
				  that.get_code() 
			   } 
			},
			get_code(){
				 let that = this
				uni.request({
				     url: getApp().globalData.http_url + 'app/user/send_code', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
					 },
					 data:{
						phone: that.phone
					 },
				    success: (res) => {
						console.log(res.data)
						if(res.data.code == 200){
							 uni.showToast({
								title:'验证码已发送 !',
								icon: 'none',
								duration: 1500
							 });
						}else{
							uni.showToast({
								title:res.data.message,
								icon: 'none',
								duration: 1500
							});	 
						}				
				    },
				});		
			},
			goguns(){
				 // window.location = 'https://chaoshucang.com/#/'
			},
			getCode(n) {
			   var all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
			   var b = [];
			   var a = ''
			   for (var i = 0; i < n; i++) {
				  var index = Math.floor(Math.random() * 62);
				  b.push(all.charAt(index));
			      a+=all.charAt(index)
			   }
			   return a;
			 },
			gocopy(text){
				let that = this
				if(text != null){
					uni.setClipboardData({
						data: text,
						success: function () {
							console.log('success');
						    uni.hideKeyboard();
							uni.showToast({
								title:'已复制',
								icon: 'none',
								duration: 1500
							});
						}
					});
				}		
			},
			getuserInfo(){
			   let that = this
			   uni.request({
			        url: getApp().globalData.http_url + 'mine/index/list/' +  uni.getStorageSync('userId'), 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId':  uni.getStorageSync('sessionId')
			   	 },
			     success: (res) => {
			   		console.log(res.data.data,'用户信息');	
					  if(res.data.code == 200){
						 that.phone = res.data.data.phone
					  }else{
						 uni.showToast({
						 	title:'登录已失效，重新登录',
						 	icon: 'none',
						 	duration: 1000
						 });
						 uni.switchTab({
						 	 url: 'my'
						 });
					  }
			       }
			   });
			},
			gettransferFee(){
				let that = this
				uni.request({
					 url: getApp().globalData.http_url + 'bsn/ddc/transferFee', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': uni.getStorageSync('sessionId')
					 },
					  success: (res) => {
					   console.log(res.data,'蜜糖')
						  that.ferFee = res.data.data
					  }
				});
			},
			getinfoCollections(){
				let that = this
				uni.request({
					 url: getApp().globalData.http_url + 'bsn/ddc/getMyDDCIDNumbering', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': uni.getStorageSync('sessionId')
					 },
					 data:{
						ddcId: that.ddcId 
					 },
					  success: (res) => {
					   console.log(res.data,'用户藏品详情')
						  that.info_data = res.data.data
						  that.numberId = res.data.data.numberings[0].id
						  that.dunnumber= res.data.data.numberings[0].numbering
						  that.getmyDDCTransferList()
					  }
				});
			},
			getmyDDCTransferList(){
				let that = this
				uni.request({
					 url: getApp().globalData.http_url + 'bsn/ddc/myDDCTransferList', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': uni.getStorageSync('sessionId')
					 },
					 data:{
						id: that.numberId,
						pageNum:that.pageNum,
						pageSize:50,
					 },
					 success: (res) => {
					    console.log(res.data,'藏品编号记录')
						that.ferList = res.data.data
					 }
				});
			},
			
			
			
			createControls() {
				controls = new OrbitControls(camera, renderer.domElement)
			},

			// 导入模型
			leadModel() {
			// // 	let loader = new GLTFLoader();
			//  let loader = new OBJLoader();
			// 	// 导入本地或者服务器上的模型都可以
			//  //   var text = 'static/images/3d.glb'
			//  	  var text = 'static/images/dd.obj'
			// //    var text = 'static/images/3d5.gltf'
			//  //   var text = 'static/images/glb1.glb'
			//     loader.load(text, function(obj) {
			// 	 	// loader.load('https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/2022/05/17/20220517182330995.obj', function(gltf) {
   //                    scene.add(obj);
			// 	   //  scene.add(obj.scene);

			// 	});
			    let that = this
	            // var text  = that.info_data.content
				var text = 'static/images/3d6.gltf'
			   let mtlLoader = new MTLLoader() 
			   // let loader = new OBJLoader()
			   let loader = new GLTFLoader()
			       // mtlLoader.setPath('../../../static/images/')
			  	   mtlLoader.load('static/images/dd.mtl', function (materials){
				       console.log(materials,'222')
					   materials.preload();
					   // loader.setMaterials(materials)
					   loader.load(text, function (object) {
						    object.scene.position.y = -70
							scene.add( object.scene );
						});

				});
			},

			initThree() {
				// 如果返回的不是未定义，说明threejs成功引入
				console.log('打印场景API', THREE.Scene);

				/* 创建场景对象Scene */
				scene = new THREE.Scene();
				// 环境光
				var ambient = new THREE.AmbientLight(0x000000);
				   scene.add(ambient);
				var light = new THREE.PointLight(0xffffff, 1) // 点光源
				    light.position.set(10, 100, 100)
				    scene.add(light)
			   var light2 = new THREE.PointLight(0xffffff, 1) // 点光源
			       light2.position.set(300, 300, 100)
			       scene.add(light2)
				/*
					相机设置
				 */
				// var width = window.innerWidth; // 窗口宽度
				// var height = window.innerHeight; // 高度
				var width = 300; // 窗口宽度
				var height = 300; // 高度
				var k = width / height; // 窗口宽高比
				var s = 1000; // 三维场景显示范围控制系数，系数越大，显示的范围越大
				// 创建相机对象（正射投影）
				camera = new THREE.PerspectiveCamera(10, k, 2, 10000);
				camera.position.set(0, 200, 2000); //设置相机的摆放位置	
				camera.lookAt(new THREE.Vector3(0, 0, 0)); // 控制相机的焦点(镜头)位置，决定相机的朝向（取值为3维坐标对象-THREE.Vector3(x,y,z)）
				/*
					创建渲染器对象
				 */
				renderer = new THREE.WebGLRenderer({
					antialias: true,
					 alpha: true //设置透明，为true时，背景颜色需要注释掉
				});

				renderer.setSize(width, height); // 设置渲染区域尺寸
				//renderer.setClearColor(0XECF1F3, 1); // 设置背景颜色
				const element = document.getElementById('container')
				element.appendChild(renderer.domElement); // body元素中插入canvas对象
				// 执行渲染操作，指定场景，相机作为参数
				renderer.render(scene, camera);
				this.render();
			},

			// 动画
			render() {
				let that = this;
				requestAnimationFrame(function() {
				    scene.rotation.y += 0.03;
					that.render();
					 
				});
				renderer.render(scene, camera); //执行渲染操作
			},
			
			//初始化
		 //   init: function() {
			//   //  创建场景对象Scene
			//   this.scene = new THREE.Scene();
			//   //网格模型添加到场景中
			//   let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
			//   let material = new THREE.MeshNormalMaterial({
			// 	color: "#FFFFFF"
			//   });
			//    this.mesh = new THREE.Mesh(geometry, material);
			//   //  this.mesh = 'https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/2022/05/17/20220517182330995.obj';
			//    this.scene.add(this.mesh);	
			//   /**
			//    * 相机设置
			//    */
			//   let container = document.getElementById("container");
			//   this.camera = new THREE.PerspectiveCamera(
			// 	20,
			// 	container.clientWidth / container.clientHeight,
			// 	0.02,
			// 	20
			//   );
			//   this.camera.position.z = 1; 
			//   /**
			//    * 创建渲染器对象
			//    */
			//   this.renderer = new THREE.WebGLRenderer({ antialias: true });
			//   this.renderer.setSize(container.clientWidth, container.clientHeight);
			//   container.appendChild(this.renderer.domElement);
		 //        console.log(this.renderer,'222')
			//    //创建控件对象
			//   this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		 	
			// },
			
			// // 动画
			// animate: function() {
			//   requestAnimationFrame(this.animate);
			//   this.mesh.rotation.x += 0.01;
			//   this.mesh.rotation.y += 0.02;
			//   this.renderer.render(this.scene, this.camera);
			// },
		   gohead(e){
		   	this.head_index = e
		   },
		}
	}
</script>

<style>
	page{
	  background-color: #f2f2f2;
	}
	 image {
		 width: 100%;
		 height: 100%;
	 }
	.whole-page {
		width: 100%;
	}
	.whole-audio {
		width: 100%;
		height: 100vw;
	}
	.audio-post {
		width: 100%;
		position: absolute;
		top: 130upx;
		left: 0;
		z-index: 9;
	}
	.post-buttom {
		position: absolute;
		right:160upx;
		top:0;
		width: 128upx;
		height: 128upx;
	}
	.audio-conet {
		width: 432upx;
		height:432upx;
		background: radial-gradient(100% 100% at 0% 0.02%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.14) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
		border: 1upx solid rgba(255, 255, 255, 0.5);
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
		backdrop-filter: blur(12px);
		border-radius: 50%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.audio-img {
		width: 384upx;
		height: 384upx;
		border-radius: 50%;
	}
	.funs {
		 animation:fadenum 10s infinite;
	}
	@keyframes fadenum{
	   100%{transform:rotate(360deg);}
	
	}
	.page-section {
		width: 100%;
		padding: 30upx 80upx;
		z-index: 9;
	}
	.uni-audio-default{
		background: radial-gradient(100% 100% at 0% 0.02%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.14) 100%) !important;
		border: 1upx solid rgba(255, 255, 255, 0.5) !important;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05) !important;
		backdrop-filter: blur(12px);
	}
	.post-conet {
		width: 100%;
		height: 100%;
		position: absolute;
	    top: -3upx;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.conet-img {
		width: 174upx;
		height: 174upx;
	    border-radius: 50%;
	}
	
	
	.artwork-img {
		width: 100%;	
	}
	.artwork-img image{
		width: 100%;
	}
	.artwork-back {
		width: 100%;
		padding: 20upx 34upx;
		background: rgba(255, 255, 255, 1);
		margin-bottom: 20upx;
	}
	.left-title {
		font-weight: 500;
		font-size: 36upx;
		color: #000000;
		padding-bottom: 10upx;
	}
	.title-type {
		display: inline-block;
		font-size: 22upx;
		color: #222222;
		padding: 4upx 16upx;
		border: 1upx solid #222222;
		border-radius: 6upx;
		margin-right: 10upx;
	}
	.right-title {
		float: left;
		padding-top:30upx;
		font-size: 28upx;
		color: #222222;		
	}
	.right-title text{
		float: left;
		font-size: 30upx;
		padding-right: 20upx;
		font-weight: 500;
	}
	.right-title image {
		float: right;
		width: 16upx;
		height: 24upx;
		margin: 8upx 0 0 10upx;
	}
	.artwork-top {
		width: 100%;
		/* padding-bottom: 30upx; */
	}
	.work-img {
		float: left;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	.work-name {
		float: left;
		font-size: 32upx;
		color: #000000;
		margin: 20upx 0 0 16upx;
	}
	.work-right {
		float: right;
		font-size: 26upx;	
		color: #666666;
		margin-top: 20upx;
	}
	.artwork-text {
		width: 100%;
		font-size: 26upx;
		color: #666666;
	}
	.head-whole {
		width: 100%;
		display: flex;
		padding: 40upx 60upx;
	}
	.head-item {
		flex: 1;
		text-align: center;
		font-size: 32upx;
		color: #000000;
	}
	.colt {
		font-weight: 600;
	}
	.whole-artwork {
		width: 100%;
		padding-bottom: 130upx;
	}
	.info-img {
		width: 100%;
		margin-bottom: 16upx;
	}
	.work-title {
		font-size: 32upx;
		color: #000000;
		padding: 0 0 20upx 10upx;
	}
	.author-item {
		width: 100%;
	}
	.left-author {
		float: left;
		font-size: 30upx;
		color: #000000;
	}
	.right-author {
		float: right;
		font-size: 30upx;
		color: #000000;
	}
   	.fuzi{
	   width: 24upx;
	   height: 24upx;
	   float: right;
	   margin: 8upx 0 0 6upx;
	}
	.topx {
		width: 48upx;
		height: 48upx;
		border-radius: 50%;
		float: left;
		margin-right: 8upx;
	}
	.work-top {
	   width: 100%;
	}
	.work-flex {
		display: flex;
	}
    .record-img {
		width: 64upx;
		height: 64upx;
		border-radius: 50%;
	}
	.record-name {
		flex: 1;
		font-size: 30upx;		
		color: #000000;
		padding: 10upx 0 0 8upx;
	}
	.work-text {
		float: left;
		width: 140upx;
		text-align: center;
		padding-left: 40upx;
		font-size: 26upx;
		color: #666666;
		margin-top: 10upx;
	}
/* 	.work-text view{
		width: 100%;
		text-align: center;
		color: #FC4343;
	} */
	.work-tiem {
		width: 100%;
		color: #999999;
		padding: 10upx 0;
	}
	.work-hash {
		color: #000000;
	}
	.work-hash image{
		width: 24upx;
		height: 24upx;
		padding-left: 10upx;
	}
	.empty-text {
		width: 100%;
		text-align: center;
		color: #999999;
		padding-top: 50upx;
	}
	.name-top {
		width: 100%;
		padding-bottom:10upx;
	}
	.whole-video {
		width: 100%;
		height: 640upx;
	}
	.post-bottom {
		width: 100%;
		background-color: #fff;
		padding: 24upx;
		position: fixed;
		bottom: 0;
		z-index: 99;
	}
	.share-img {
		float: left;
		font-weight: 500;
		font-size: 28upx;
		color: #222222;
		text-align: center;
		width: 160upx;
		height: 84upx;
		line-height: 84upx;
		border-radius: 48upx;
		border: 1upx solid #222222;
	}
	.share-button {
		background: #222222;
		float: right;
		width: 70%;
		height: 84upx;
		line-height: 84upx;
		font-size: 32upx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 48upx;
	}
	video{
		width: 100%;
		height: 100%;
	}
	.bot-item {
		width: 96%;
		margin: 0 auto;
		text-align: center;
	    border-radius: 30upx;
		background-color: rgba(255, 255, 255);
	}
	.bot-text {
		width: 100%;
		padding: 30upx 0;
		font-size: 32upx;
	}
	.bot-button {
		width: 96%;
		padding: 30upx 0;
		font-size: 32upx;
		background-color: #FFFFFF;
		 border-radius: 30upx;
		 color: #999999;
		 text-align: center;
		margin: 20upx auto
	}
	.pot-text {
		width: 100%;
		text-align: center;
		font-size: 26upx;
		padding-top:26upx;
		color: #666666;
	}
	.popup-number {
		width: 100%;
		background-color: #FFFFFF;
		padding: 0 40upx;
		border-radius: 40upx 40upx 0px 0px;
	}
	.whole-work {
		  width: 100%;
		  padding: 20upx 0;
		  max-height:600upx;
		  min-height:400upx;
	}
	.work-buttom {
		 width: 132upx;
		 height: 52upx; 
		 font-size: 28upx;
		 color: #FFFFFF;
		 line-height: 52upx;
		 background: #222222;
		 border-radius: 26upx;
		 float: right;
		 text-align: center;
		 margin: 40upx 30upx 0 0;
	}
	.number-buttom {
		float: right;
		 margin: 40upx 30upx 0 0;
		 font-size: 28upx;
		 color: #222222;
	}
	.number-buttom image {
		float: right;
		width: 24upx;
		height: 24upx;
		margin: 8upx 0 0 6upx;
	}
	.number-leng {
		float: right;
		margin: 40upx 30upx 0 0;
	    font-size: 28upx;
		color: rgba(34, 34, 34, 0.4);
	}
	.list-work {
		 width: 100%;
		 margin-bottom: 16upx;
		 background: rgba(34, 34, 34, 0.05);
		 border-radius: 8upx;
	}
	.work-left {
		 float: left;
		 padding: 20upx 0 20upx 26upx;
	} 
	.number-name {
		padding-bottom: 6upx;
		color: #222222;
		font-size: 28upx;
	}
	.number-text {
		color: #222222;
		font-size: 28upx; 
	}
</style>
