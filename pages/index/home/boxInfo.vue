<template>
	<view class="whole-page">
	      <swiper :indicator-dots="true" indicator-active-color="#fff" :autoplay="true"
		          class="swiper-whole">
	      	 <swiper-item v-for="(item,index) in goodsInfo.goodsIcons">
	      		  <image :src="img_url+item"></image>
	      	 </swiper-item>
	      </swiper> 
		 <!-- <view class="banner-top">
			    <view class="banner-img" :class="bannerindex == index ? 'border':''"
				     v-for="(item,index) in goodsInfo.goodsIcons">
					  <image :src="img_url+item" mode="aspectFit"></image>
				</view>
		  </view> -->
		 <view class="goods-top">
			   <view class="shipping-right">
				     <text v-for="(item,index) in goodsInfo.goodsLabels">{{item}}</text>
			   </view>
		 </view>
		 <view class="goods-title">{{goodsInfo.itemName}}</view>
		 <view class="goods-info">
			  {{goodsInfo.itemIdeas}}
	     </view>
		 <view class="whole-tiem" v-if="goodsInfo.isOpen > 5">
		       <view class="item-top">
				     <view class="left-item">预约流程</view>
					 <view class="right-item">已预约{{goodsInfo.reservePeople}}人</view>
			   </view>
			   <view class="spot-top">
				     <view class="top-item" style="text-align: left;">预约抽签</view>
					 <view class="top-item" style="padding-right: 30upx;">预约结束</view>
					 <view class="top-item" style="padding-left: 30upx;">抽签付款</view>
					 <view class="top-item" style="text-align: right;">开放购买</view>
			   </view>
			   <view class="tiem-conet">
				     <image src="../../../static/images/cq.png" mode="aspectFit" style="width: 100%;height: 12upx;"></image>
			   </view>
			   <view class="spot-top">
					 <view class="item-button" style="text-align: left;">{{goodsInfo.drawLotsStartTime}}</view>
					 <view class="item-button">{{goodsInfo.drawLotsEndTime}}</view>
					 <view class="item-button">{{goodsInfo.priorityBuyTime}}</view>
					 <view class="item-button" style="text-align: right;">{{goodsInfo.publicBuyTime}}</view>
			   </view>
		 </view>
		 <view class="Friends-whole" v-if="goodsInfo.isOpen == 7 && goodsInfo.isParticipate == 1">
			   <view class="Friends-title">邀请好友增加中签机会</view>
			    <view class="Friends-coent">
					 <view class="Friends-left">
						   <view class="Friends-img" v-for="(item,index) in goodsInfo.inviteUsers"
						         v-if="index < 11">
							    <image :src="item.avatarUrl"></image>
						   </view>
						   <view class="tj-img"  @click="puttoggle('center')">
							    <image src="../../../static/images/tj.png"></image>
						   </view>
					 </view>
					 <view class="Friends-right">中签率X{{goodsInfo.inviteUsers.length}}</view>
				</view>
		  </view>
		  <view class="Friends-whole" v-if="goodsInfo.isParticipate == 1">
			   <view>
		  	       <view class="Friends-title" style="float:left;">
					    已获得抽签号码（{{goodsInfo.lotteryCodes.length}}个）</view>
				   <view class="right-chat" @click="gocode('bottom')">
					    查看所有号码<image src="../../../static/images/you2.png"></image>
				   </view>
			   </view>
			   <view class="whole-code">
				     <view class="codeitem" v-if="index < 4"
					     v-for="(item,index) in goodsInfo.lotteryCodes">{{item}}</view>
			   </view>
			   <view class="Friends-title" style="float:left;margin:10upx 20upx 0 0;">抽签结果</view>
			   <view class="codeitem" style="font-size:28upx;" 
			         v-if="goodsInfo.winNumbering!=''">{{goodsInfo.winNumbering}}</view>
			   <view class="codeitem" style="font-size:28upx;color: rgba(34, 34, 34, 0.4);border-color:rgba(34, 34, 34, 0.4);"
				     v-if="goodsInfo.winNumbering ==''">未中签</view>   
		  </view>
		  <view class="whole-back" style="padding-bottom: 120upx;">
		       <view class="back-title">商品详情</view>
			   <view class="goods-html" v-html="goodsInfo.itemDesc"></view>
			   <view class="goodsDes" v-for="(item,index) in goodsInfo.goodsDes">
				     <image :src="img_url+item" style="width: 100%;" mode="widthFix"></image>
			   </view>
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
		  <!-- gopurchase()  -->
		  <view class="post-bottom">
			     <view class="goods-Price">￥{{goodsInfo.salePrice}}</view>
				 <view class="share-button" @click="choicePayType('bottom')" v-if="goodsInfo.isOpen == 1">
					    立即购买
				 </view>
				<view class="share-button back" v-if="goodsInfo.isOpen == 2 && goodsInfo.firstTime == 0">
				 		{{goodsInfo.startTime}}开售
				 </view>
				 <view class="share-button back advance" v-if="goodsInfo.isOpen == 2 && goodsInfo.firstTime > 0">
				       <view class="advance-item">{{goodsInfo.startTime}}开售</view>
				  	   <view class="advance-text">可提前{{goodsInfo.firstTime}}分钟购买</view>					
				  </view>
				 <view class="share-button back" v-if="goodsInfo.isOpen == 3">
				  		 已售罄
				  </view>
				  <view class="share-button back" v-if="goodsInfo.isOpen == 4">
				   		已结束
				   </view>
				   <view class="share-button advance" @click="choicePayType('bottom')"
				         v-if="goodsInfo.isOpen == 5">
						  <view class="advance-item">提前购买</view>
				    	 <view class="advance-text">{{goodsInfo.startTime}}</view>  		
				  </view>
				  <view class="share-button backh draw"  v-if="goodsInfo.isOpen == 6">
				  	     <view class="advance-item">预约抽签</view>
				    	 <view class="advance-text" style="padding:0;">{{goodsInfo.drawLotsStartTime}} 开始</view>	   		
				  </view>
				  <view class="share-button draw"  @click="golottery('bottom')" 
				        v-if="goodsInfo.isOpen == 7 && goodsInfo.isParticipate == 2">
					      <view class="advance-item">预约抽签</view>
				    	 <view class="advance-text" style="padding:0;">{{goodsInfo.drawLotsEndTime}}结束</view>	   		
				  </view>
				  <!-- 邀请好友 -->			  
				  <view class="share-button draw" @click="puttoggle('center')" style="width:280upx;"
				         v-if="goodsInfo.isOpen == 7 && goodsInfo.isParticipate == 1 && goodsInfo.useOrNotWin == 2">
				         <view class="advance-item">邀请好友预约</view>
				      	 <view class="advance-text" style="padding:0;">{{goodsInfo.drawLotsEndTime}}结束</view>	   		
				  </view> 
				  <view class="zhonq-button"  @click="golottery('bottom')"
				        v-if="goodsInfo.isOpen == 7 && goodsInfo.isParticipate == 1 && goodsInfo.userRightsId > 0 && goodsInfo.useOrNotWin == 2">使用中签卡</view>
				  <view class="share-button draw"
				        v-if="goodsInfo.isOpen == 7 && goodsInfo.useOrNotWin == 1">
					    <view class="advance-item">已使用中签卡</view>
					    <view class="advance-text" style="padding:0;">{{goodsInfo.publicBuyTime}} 前付款</view>	
				   </view>
				  <view class="share-button draw"  v-if="goodsInfo.isOpen == 8">
				         <view class="advance-item">抽签中</view>
				    	 <view class="advance-text" style="padding:0;">{{goodsInfo.priorityBuyTime}} 公布结果</view>	   		
				  </view>
				  <view class="share-button draw"  v-if="goodsInfo.isOpen == 9" @click="choicePayType('bottom')">
				         <view class="advance-item">已中签去购买</view>
				    	 <view class="advance-text" style="padding:0;">请在{{goodsInfo.publicBuyTime}} 前付款</view>	   		
				  </view>
				  <view class="share-button backh"  v-if="goodsInfo.isOpen == 10">
				         中签已购买	
				  </view> 
				  <view class="share-button backh"  v-if="goodsInfo.isOpen == 11">
				         未中签	
				  </view>
				 
		  </view>
		  <view class="Outside-img" v-if="is_Outside">
		  	   <image src="../../../static/images/wdk.png"></image>
		  </view>
		  <view class="Outside-img" v-if="is_Outside1">
		  	   <image src="../../../static/images/wdk1.png"></image>
		  </view>
		 <uni-popup ref="popup"  @change="change">
				<view class="PayType-content" :class="{ 'popup-height': type === 'bottom'}">	
			          <view class="PayType-title">确认订单</view>
					  <view class="order-item">
						   <view class="order-left">购买数量</view>
						   <view class="order-right">
								 <view class="num-item" @click="goplus()">
									   <image src="../../../static/images/jia.png"></image>
								 </view>
								 <view class="num-item" style="min-width:56upx;">{{purch}}</view>
								 <view class="num-item" @click="goreduce()">
									   <image src="../../../static/images/jian.png"></image>
								 </view>
						   </view>
					  </view>
					  <view class="order-item" v-if="goodsInfo.isOpen == 5">
						   <view class="order-left">可用优先抢购卡</view>
						   <view class="order-right">X{{goodsInfo.userRightsNum}}</view>
					  </view>
					  <view v-if="honey_index == 1">
						    <view class="order-item">
								  <view class="order-left">使用蜜糖</view>
								  <view class="order-right">{{goodsInfo.salePrice}}</view>
						    </view>
							<view class="PayType-whole">
							      <view class="PayType-button">
									   <view class="button-item colt" @click="gohoney(2)">其他支付方式</view>
									   <view class="button-item" @click="gopurchase()">自动消耗蜜糖</view>
								  </view>
							</view>
					  </view>  
					  <view v-if="honey_index == 2" style="padding-bottom:240upx;">
						  <view class="order-item">
								<view class="order-left">支付方式</view>			 						   
						  </view>
						  <view class="PayType-item">
								   <view class="PayType-img">
										 <image src="../../../static/images/ll.png"></image>
								   </view>
								   <view class="PayType-text">连连（银行卡支付）</view>
								   <view class="PayType-dunt"  @click="gochoice(4)"
										 :class="payType == 4 ? 'none':''">
										 <image src="../../../static/images/xz2.png" v-if="payType == 4"></image>
								   </view>
							</view> 
						   <view class="card-text" v-if="bankData ==''">
							   <view class="card-left" @click="gomycard()">
									<image src="../../../static/images/tj2.png"></image>
									 添加银行卡
							   </view>
						   </view>
						   <view class="card-text" v-if="bankData!=''">
								   <view class="card-left">
										 {{bankData.bankName}}{{bankData.cardCategory}}({{bankData.cardnum}})
								   </view>
								  <text @click="goxuans('center')">更换</text>
						   </view>
						   <view class="PayType-whole">
						         <view class="PayType-button" @click="gopurchase()">确认支付</view>
						   </view>
					   </view>
				 </view>
		  </uni-popup>
		  <uni-popup ref="popup_gont"  @change="change">
				   <view class="popup-content" :class="{ 'popup-height': gont_type === 'center'}">	
						<view class="popup-title" style="padding-top:10upx;">邀请好友助力</view>  
						<view class="popup-text">
							  {{invitePageUrl}}
						</view>
						<view class="popup-button" @click="gocopy()">复制链接发给好友</view>
				   </view> 
		   </uni-popup>
		   <uni-popup ref="popup_card"  @change="change">
				<view class="popup-content" :class="{ 'popup-height': card_type === 'center'}">	
					  <view class="popup-title" style="padding-top:20upx;">选择银行卡</view>  
					  <view class="whole-card"> 
						    <view class="card-list" v-for="(item,index) in banklist" :key="index" @click="goxunz(index)">
								  <view class="card-img">
									    <image :src="item.bankPic"></image>
								  </view>
								  <view class="card-name">{{item.bankName}}{{item.cardCategory}}({{item.cardnum}})</view>	
								  <view class="card-dui" v-if="bankData.bankName == item.bankName">
									    <image src="../../../static/images/dg.png" style="width:30upx;height:20upx;"></image>
								  </view>
							</view>
							<view class="card-bottom" @click="gomycard">
								 <view class="img-tj">
									   <image src="../../../static/images/tj3.png"></image>
								 </view>
								 添加银行卡
								 <image src="../../../static/images/you.png" style="float:right;width:16upx;height:24upx;margin-top:10upx;"></image>
							</view>
					  </view>
				 </view>
		   </uni-popup>
		   <uni-popup ref="popup_yanz"  @change="change">
		   			 <view class="popup-content" :class="{ 'popup-height': yanz_type === 'center'}">	
					       <view class="popup-title" style="padding-top:20upx;">确认支付</view>
						   <view class="yanz-text">短信验证码已发送预留手机号({{phone_new}})请将6位数字验证码填写到下方</view>
						   <view class="yanz-shur">
							     <input :class="Verif.length == 6 ? 'windt':''" 
								       type="number" maxlength="6" v-model="Verif" focus 
							     	    @input="goinput" :adjust-position="false"/>
						   </view>
						   <view class="yanz-whole">
						   		 <view class="yanz-item"></view>
								 <view class="yanz-item"></view>
								 <view class="yanz-item"></view>
								 <view class="yanz-item"></view>
								 <view class="yanz-item"></view>
								 <view class="yanz-item"></view>
						   </view>
						   <view class="yanz-coed" @click="Verifications">{{text}}</view>
			         </view>
		   </uni-popup>
		   <uni-popup ref="popup_lottery"  @change="change">
		   			 <view class="PayType-content" style="min-height:440upx;"
					     :class="{ 'popup-height': lotterytype === 'bottom'}">
						   <view class="lottery-text" style="margin-top:40upx;">你有{{goodsInfo.userRightsNumber}}张中签卡</view>
						   <view class="lottery-text">本次预约抽签是否使用中签卡？</view>
						   <view class="PayType-whole">
						         <view class="PayType-button">
						   		    <view class="button-item colt" @click="godrawLots()">不使用继续抽签</view>
						   		     <view class="button-item" @click="gochoujqian()">使用1张中签卡</view>
						   	    </view>
						   </view>
					 </view>
		  </uni-popup> 
		  <uni-popup ref="popup_code"  @change="change">
			      <view class="PayType-content" style="min-height:440upx;"
				       :class="{ 'popup-height': codetype === 'bottom'}">
						<view class="popup-title" style="padding-top:0;">已获得抽签号码</view>  
						<view class="whole-quantity"> 
							  <view class="quantity-item" 
							        v-for="(item,index) in goodsInfo.lotteryCodes">{{item}}</view>
						</view>
				  </view>
		  </uni-popup>
	</view>
</template>

<script>
	var times = 60;
	export default {
		data() {
			return {
				honey_index:1,
				is_Outside:false,
				is_Outside1:false,
				is_Outside2:false,
				bannerindex:0,
				goodsInfo:"",
				blindBoxId:"",
				isRealName:"",
				img_url:"",
				// img_url:'https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/', // 正式 prod // 测试 test
				// http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api 测试 test
				bannerTop:[{},{},{},{},{},{},{},{},{}],
				type:'bottom',
				lotterytype:'bottom',
				codetype:'bottom',
				gont_type: 'center',
				card_type:'center',
				yanz_type:'center',
				payType:4,
				isHaveDDCAddress:"",
				sessionId:"",
				userId:"",
				parentUserId:"",
				invitePageUrl:"",
				banklist:[],
				bankData:"",
				Verif:"",
				honeydata:"",
				Verif_1:"211345",
				Verif_2:"",
			    Verif_3:"",
			    Verif_4:"",
				Verif_5:"",
				Verif_6:"",
				focus_1:true,
				focus_2:false,
				focus_3:false,
				focus_4:false,
				focus_5:false,
				focus_6:false,
				phone_new:"",
				phone:"",
				text:'重新发送验证码',
				orderId:"",
				purch:1,
				userRightsId:""
			}
		},
		onLoad(e) {
			this.img_url = getApp().globalData.img_url
	    	this.blindBoxId = e.blindBoxId
			this.sessionId = uni.getStorageSync('sessionId')
			this.userId = uni.getStorageSync('userId')
			if(uni.getStorageSync('parentUserId')){
				this.parentUserId = uni.getStorageSync('parentUserId')
			}
			this.getuserInfo()
		    this.getgoodsDetail()			  
		},
		onShow(){
		   this.gethoneyinfo()
		   this.getbanklist()
		},
		methods: {
			gohoney(e){
			  this.honey_index = e
			},
			goreduce(){
			   if(this.purch == 1){
				   return
			   }else{
				   this.purch--
			   }
			}, 
			goplus(){
			   var num = ''
			   if(this.goodsInfo.isOpen == 2 || this.goodsInfo.isOpen == 5){
				   num = this.goodsInfo.userRightsNum
			   }else{
				    num = this.goodsInfo.limitNum
			   }
			   console.log(num)
			   if(this.purch == num){
				   return
			   }else{
				   this.purch++
			   }
			},
			goinput_num1(e){
			  if(e.detail.value.length == 1){
			  	  this.focus_2 = true
			  }	
			},
			goinput_num2(e){
			  console.log(e)
			  if(e.detail.value.length == 1){
			  	  this.focus_3 = true
			  }	
			},
			goinput_num3(e){
			  console.log(e)
			  if(e.detail.value.length == 1){
			  	  this.focus_4 = true
			  }	
			},
			goinput_num4(e){
			  console.log(e)
			  if(e.detail.value.length == 1){
			  	  this.focus_5 = true
			  }	
			},
			goinput_num5(e){
			  console.log(e)
			  if(e.detail.value.length == 1){
			  	  this.focus_6 = true
			  }	
			},
			goinput_num6(e){
			  console.log(e)
			  if(e.detail.value.length == 1){
			  	  this.Verif = this.Verif_1 + this.Verif_2 + this.Verif_3 + this.Verif_4 + this.Verif_5 + this.Verif_6
				  this.goconfirm()
			  }	
			  console.log(this.Verif)
			},
			goinput(e){			
				if(e.detail.value.length == 6){
					 this.goconfirm()
				}
			},
			goconfirm(){
			   let that = this
			   if(that.Verif.length != 6){
				   uni.showToast({
						title:'请输入正确的验证码',
						icon: 'none',
						duration: 1500
				   });
				   return
			   }
			   uni.showLoading({
					title: '支付中',
					mask:true
			    });
			    uni.request({
			    	 url: getApp().globalData.http_url + 'goods/pay/jdConfirmPay', 
			    	 method:'GET',
			    	 header:{
			    		 'content-type': 'text/json;charset=UTF-8',
			    		  'sessionId':  uni.getStorageSync('sessionId')
			    	 },
					data:{
						orderId:that.orderId,
						code:that.Verif,
						type:2
					},
			    	success: (res) => {
			    		console.log(res.data,'银行卡支付')
			    		uni.hideLoading()
						that.Verif = ''
			    		if(res.data.code == 200){		
			    			uni.showToast({
			    				title: '支付成功！',
			    				icon: "success",
			    				duration: 1500
			    			})		
			    			that.getuserInfo()
			    			that.getgoodsDetail()	
							that.close_card()
							that.close()
							that.close_yanz()
							
			    		}else{
			    			uni.showToast({
			    				title:res.data.msg,
			    				icon: 'none',
			    				duration: 1500
			    			});	 
			    		} 			
			    	 },
			   });
			},
			gopaySendCode(){
			   let that = this
			   uni.showLoading({
					title: '发送中',
					mask:true
			    });
			    uni.request({
			    	 url: getApp().globalData.http_url + 'goods/pay/paySendCode', 
			    	 method:'GET',
			    	 header:{
			    		 'content-type': 'text/json;charset=UTF-8',
			    		  'sessionId':  uni.getStorageSync('sessionId')
			    	 },
					data:{
						orderId:that.orderId,
						clientType:1,
						bankId:that.bankData.id,   
						type:2
					},
			    	success: (res) => {
			    		console.log(res.data,'重新发送')
			    		uni.hideLoading()
			    		if(res.data.code == 200){		
			    			uni.showToast({
			    				title: '验证码已发送！',
			    				icon: "success",
			    				duration: 1000
			    			})							
			    		}else{
			    			uni.showToast({
			    				title:res.data.msg,
			    				icon: 'none',
			    				duration: 1500
			    			});	 
			    		} 			
			    	 },
			   });
			},
			goxunz(e){
				this.bankData = this.banklist[e]
				console.log(this.bankData)
				this.close_card()
			},
			gomycard(){
				uni.navigateTo({
					 url: '../my/MyCard'
				});
			},
			Verifications(){
			   let that = this
			    if(times!=60){
			    }else{
					 that.setHtml()
					 that.gopaySendCode() 
			    }
			},
			setHtml(){
				let that = this
			   -- times;
			   if(times!=0){
				   that.text = '重新发送验证码'+'('+ times + 's' + ')'
				   setTimeout(function () {
					 that.setHtml()
				   }, 1000)
			   }else{
				 that.text = '重新发送验证码'
				 times = 60
			   }
			 },
			gocopy(){
				let that = this
				uni.setClipboardData({
					data: that.invitePageUrl,
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
			},
			goyanz(type){
				this.yanz_type = type
				this.$refs.popup_yanz.open(type)
			},
			close_yanz(){
				this.$refs.popup_yanz.close()
			},
			goxuans(type){
				this.card_type = type
				this.$refs.popup_card.open(type)
			},
			close_card(){
				this.$refs.popup_card.close()
			},
			puttoggle(type){
				this.gont_type = type
				this.$refs.popup_gont.open(type)
			},
			close_gont(){
				this.$refs.popup_gont.close()
			},
			golottery(type){
			  if(this.goodsInfo.userRightsId > 0){
				  this.lotterytype = type
				  this.$refs.popup_lottery.open(type)
			  }else{
				   this.godrawLots()
			  }	 
			},
			close_lottery(){
				this.userRightsId = ''
				this.$refs.popup_lottery.close()
			},
			gocode(type){
			  this.codetype = type
			  this.$refs.popup_code.open(type)
			},
			close_code(){
				this.$refs.popup_code.close()
			},
			gochoice(type){
				this.payType = type
			},
			choicePayType(type){
				let that = this
				that.honey_index = 1
				if(that.isRealName == 2){
					uni.hideToast()
					uni.showModal({
						title: '提示',
						content: '暂未实名认证',
						confirmText:'去认证',
						success: function (res) {
							if (res.confirm) {
				                uni.navigateTo({
				                	 url: '../my/authentication?sessionId='+ that.sessionId + '&userId='+ that.userId 
				                });
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				if(that.isHaveDDCAddress == 2){
					uni.hideToast()
					uni.showModal({
						title: '提示',
						content: '暂未创建区块链账户',
						confirmText:'去创建',
						success: function (res) {
							if (res.confirm) {
								uni.setStorageSync('is_Have',2);
				                uni.switchTab({
				                	 url: '../my/my'
				                });
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				that.type = type
				that.$refs.popup.open(type)
			},
			gethoneyinfo(){
			   let that = this
			   uni.request({
			     url: getApp().globalData.http_url + 'mine/honey/info', 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId':  uni.getStorageSync('sessionId')
			   	 },
			     success: (res) => {
			   		console.log(res.data.data,'我的蜜糖');	
					  if(res.data.code == 200){				 
						 that.honeydata = res.data.data.honeyBalance
						
					  }
			       }
			   });
			},
			getbanklist(){
			   let that = this
			   uni.request({
			   	 url: getApp().globalData.http_url + 'mine/bank/list', 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
			   	 },
				 data:{
					type:2 
				 },
			   	success: (res) => {
			   		console.log(res.data,'银行卡列表')
			   		if(res.data.code == 200){
						for(var i in res.data.data){
							res.data.data[i].cardnum = res.data.data[i].cardNo.substr(12,4)
						}
			   			 that.banklist = res.data.data
						 if(res.data.data!=''){
							 that.bankData = res.data.data[0]
						 } 
			   		}				
			   	 },
			  });	
			},
			close(){
				this.$refs.popup.close()
				this.is_Outside = false
				this.is_Outside1 = false
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
				if(!e.show){
					this.is_Outside = false
					this.is_Outside1 = false
				}
			},
		   getuserInfo(){
		      let that = this
		      uni.request({
		           url: getApp().globalData.http_url + 'mine/index/list/' + that.userId, 
		      	 method:'GET',
		      	 header:{
		      		 'content-type': 'text/json;charset=UTF-8',
		      		 'sessionId':  that.sessionId
		      	 },
		        success: (res) => {
		      		console.log(res.data.data,'用户信息');	
					    if(res.data.code == 200){ 
							that.invitePageUrl = "https://jkyx-api.chiguavod.com/blindBoxMate/?parentUserId=" + that.userId
							console.log(that.invitePageUrl)
							that.isRealName = res.data.data.isRealName
							that.isHaveDDCAddress = res.data.data.isHaveDDCAddress
							that.phone = res.data.data.phone
							that.phone_new = res.data.data.phone.substr(0,3) + '****' + res.data.data.phone.substr(7,4)
					    }else{
							uni.showToast({
								title:'登录已失效，重新登录',
								icon: 'none',
								duration: 1000
							});
							setTimeout(() => {
							   uni.reLaunch({
								  url: '../home/home'
							   });
							}, 1000)
						}
		        		
		          }
		      });
		   },
		   gochoujqian(){
			  this.userRightsId = this.goodsInfo.userRightsId
			  this.godrawLots()
		   },
		   godrawLots(){
			   let that = this
			   uni.showLoading({
			   	title: '抽签中',
			   	mask:true
			   });
			   uni.request({
			        url: getApp().globalData.http_url + 'blindBox/drawLots', 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId': that.sessionId
			   	 },
			   	 data:{
			   	    parentUserId:that.parentUserId,
					id:that.blindBoxId,
					userRightsId:this.userRightsId
			   	 },
			        success: (res) => {   			
			   		console.log(res.data);
			   		uni.hideLoading()
			   		if(res.data.code == 200){		
						uni.showToast({
							title: res.data.msg,
							icon: "success",
							duration: 1500
						})		
						that.getuserInfo()
						that.getgoodsDetail()	
					    that.close_lottery()
			   		}else{
			   			uni.showToast({
			   				title:res.data.msg,
			   				icon: 'none',
			   				duration: 1500
			   			});	 
			   		} 
			       }
			   });	
		   },
		   gopurchase(){
		   	let that = this
			if(that.honey_index == 1){
				uni.showLoading({
				 	title: '支付中',
				 	mask:true
				 });
				 uni.request({
				      url: getApp().globalData.http_url + 'goods/pay/appBlindBoxCreateOrder', 
				 	 method:'GET',
				 	 header:{
				 		 'content-type': 'text/json;charset=UTF-8',
				 		 'sessionId': that.sessionId
				 	 },
				 	 data:{
				 		userId:that.userId,
				 		blindBoxId:that.blindBoxId,
				 		payMoney: that.goodsInfo.salePrice,
				 	    payType:6,
						clientType:1,
						bankId:that.bankData.id,
						num:that.purch
				 	 },
				   success: (res) => {   			
				 		console.log(res.data);
				 		uni.hideLoading()
				 		if(res.data.code == 200){		
							uni.showToast({
								title: '支付成功！',
								icon: "success",
								duration: 1000
							})	
							that.close()	
							that.getuserInfo()
							that.getgoodsDetail()			  
						    that.gethoneyinfo()
						    that.getbanklist()
				 		}else{
				 			uni.showToast({
				 				title:res.data.msg,
				 				icon: 'none',
				 				duration: 1500
				 			});	 
				 		} 
				  }
				});
				return
			}
			if(that.payType == 4){
				if(that.bankData == ''){
					uni.showToast({
					  title: '请先添加绑定银行卡！',
					  icon: "none",
					  duration: 2000
				   })
				   return
				}
			   uni.showLoading({
			   	title: '支付中',
			   	mask:true
			   });
			   uni.request({
			        url: getApp().globalData.http_url + 'goods/pay/appBlindBoxCreateOrder', 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId': that.sessionId
			   	 },
			   	 data:{
			   		userId:that.userId,
			   		blindBoxId:that.blindBoxId,
			   		payMoney: that.goodsInfo.salePrice,
			   	    payType:that.payType,
					clientType:1,
					bankId:that.bankData.id,
					num:that.purch
			   	 },
			     success: (res) => {   			
			   		console.log(res.data);
			   		uni.hideLoading()
			   		if(res.data.code == 200){		
			   			if(that.goodsInfo.salePrice == 0){
			   				uni.showToast({
			   					title: '购买成功！',
			   					icon: "success",
			   					duration: 1000
			   				})	
			   				setTimeout(() => {
			   				  uni.navigateTo({
			   				  	 url: '../my/mybox?sessionId='+ that.sessionId + '&userId='+ that.userId
			   				   });
			   				}, 1000)
			   				return
			   			} 
						uni.showToast({
							title: '验证码已发送！',
							icon: "success",
							duration: 1000
						})	
						that.setHtml()
						that.orderId = res.data.data.orderId
						that.goyanz('center')						
			   		}else{
			   			uni.showToast({
			   				title:res.data.msg,
			   				icon: 'none',
			   				duration: 1500
			   			});	 
			   		} 
			    }
			  });
			  return
			}	
			if(that.payType == 2 || that.payType == 1){
				var me =  navigator.userAgent.toLowerCase();
				if(me.match(/MicroMessenger/i) == "micromessenger"){
					  if(that.payType == 1){
						  console.log('微信浏览器')
						  that.is_Outside = true
						  that.is_Outside1 = false
						  that.is_Outside2 = false
					  }else if(that.payType == 2){
						  that.is_Outside1 = true
						  that.is_Outside = false
						  that.is_Outside3 = false		  
					  }
					 return
				}		
			}
			uni.showLoading({
				title: '支付中',
				mask:true
			});
		   	uni.request({
		   	     url: getApp().globalData.http_url + 'goods/pay/appBlindBoxCreateOrder', 
		   		 method:'GET',
		   		 header:{
		   			 'content-type': 'text/json;charset=UTF-8',
		   			 'sessionId': that.sessionId
		   		 },
		   		 data:{
		   			userId:that.userId,
		   			blindBoxId:that.blindBoxId,
		   			payMoney: that.goodsInfo.salePrice,
		   		    payType:that.payType
				    
		   		 },
		   	     success: (res) => {   			
		   			console.log(res.data);
					uni.hideLoading()
		   			if(res.data.code == 200){		
		   				if(that.goodsInfo.salePrice == 0){
		   					uni.showToast({
		   						title: '购买成功！',
		   						icon: "success",
		   						duration: 1000
		   					})	
		   					setTimeout(() => {
		   					  uni.navigateTo({
		   					  	 url: '../my/mybox?sessionId='+ that.sessionId + '&userId='+ that.userId
		   					   });
		   					}, 1000)
		   					return
		   				}  
						// 微信支付
						if(that.payType == 1){
							console.log(res.data.data)
						    var me =  navigator.userAgent.toLowerCase();		 
							if(me.match(/MicroMessenger/i) == "micromessenger"){
							       console.log('微信浏览器')    
								   that.is_Outside = true
							       that.is_Outside1 = false
								   that.is_Outside3 = false
							}else{
								window.location.href = res.data.data
							}		
	
							// WeixinJSBridge.invoke(
							// 'getBrandWCPayRequest', {
							// 	 "appId": res.data.data.appId,      //公众号id，由商户传入     
							// 	 "timeStamp":res.data.data.timeStamp, //时间戳，自1970年以来的秒数     
							// 	 "nonceStr": res.data.data.nonceStr,   //随机串     
							// 	 "package": res.data.data.package,    //订单详情扩展字符串
							// 	 "signType":res.data.data.signType,   //微信签名方式：     
							// 	 "paySign":  res.data.data.paySign,//微信签名 
							// 	 // "total_fee":res.data.data.total_fee
							//  },
							//  function(res){
							//   console.log(res,"支付成功")
							//   if(res.err_msg == "get_brand_wcpay_request:ok" ){
							// 		 uni.showToast({
							// 			title: '支付成功！',
							// 			icon: "success",
							// 			duration: 1000
							// 		 })	
							// 		 setTimeout(() => {
							// 		   uni.navigateTo({
							// 			 url: '../my/mybox'
							// 			});
							// 		 }, 1000)			
							//   }else{
							// 	  uni.showToast({
							// 		  title: '支付失败！',
							// 		  icon: "none",
							// 		  duration: 1000
							// 	  })	
							//   } 
							// }); 
						}else if(that.payType == 2){
							//支付宝
							 var payPath = res.data.data
							 console.log(payPath)	
							 var me =  navigator.userAgent.toLowerCase();
							 if(me.match(/MicroMessenger/i) == "micromessenger"){
									console.log('微信浏览器')    
								    that.is_Outside1 = true
								    that.is_Outside = false
									that.is_Outside3 = false
							 }else{
								document.querySelector('body').innerHTML = payPath;
								      // 调用submit方法
								document.forms[0].submit()
							 }	
						//	window.location.href = payPath						
						}else{
							//杉德支付
							 var payPath = res.data.data
							 console.log(payPath)	
							 window.location.href = res.data.data
							 
							 // var me =  navigator.userAgent.toLowerCase();
							 // if(me.match(/MicroMessenger/i) == "micromessenger"){
								// 	console.log('微信浏览器')    
								//     that.is_Outside1 = false
								//     that.is_Outside = false
								// 	that.is_Outside2 = true
							 // }else{
								// window.location.href = res.data.data
							 // }	
							
						}
		   			}else{
		   				uni.showToast({
		   					title:res.data.msg,
		   					icon: 'none',
		   					duration: 1500
		   				});	 
		   			} 
		   	    }
		   	});	
		   },
		   getgoodsDetail(){
		     let that = this
		   	 uni.request({
		   	     url: getApp().globalData.http_url + 'goods/blindBoxDetail', 
		   		 method:'GET',
		   		 header:{
		   			 'content-type': 'text/json;charset=UTF-8',
		   			 'sessionId': that.sessionId
		   		 },
		   		 data:{
		   			userId: that.userId,
		   			blindBoxId:that.blindBoxId
		   		 },
		   	    success: (res) => {
		   			console.log(res.data,'详情');
		   			that.goodsInfo = res.data.data
		   	    }
		   	 });
		   },
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
	image {
		width: 100%;
		height: 100%;
	}
	.swiper-whole,swiper-item {
		width: 100%;
		height: 100vw;
	}
	.swiper-whole image {
		width: 100%;
		height: 100%;
	}
	.banner-top {
		width: 100%;
		padding:12upx;
	}
	.banner-img {
		float: left;
		width: 100upx;
		height: 100upx;
		margin: 0 10upx;
	}
	.banner-img image {
		width: 100%;
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.border {
		border: 2upx solid #E02E24;
	}
	.goods-top {
		width: 100%;
		padding: 20upx 24upx 0 24upx;
	
	}
	.goods-Price {
		float: left;
		font-weight: 600;
		font-size: 48upx;
		color: #222222;
		margin-top: 20upx;
	}
	.shipping-right {
		float: left;
		padding:10upx 0 0 32upx;
	}
	.shipping-right text{
		color: #E02E24;
		font-size: 26upx;
		padding-right: 10upx;
	}
	.goods-title {
		width: 100%;
		padding: 20upx 24upx;
		font-weight: 500;
		font-size: 36upx;
		color: #4F4F4F;
	}
	.goods-info {
		padding: 0 24upx 20upx 24upx;
		font-size: 32upx;
		color: #4F4F4F;
	}
	.whole-back {
		width: 100%;
		padding: 0 24upx;
		background-color: #fff;
		margin-bottom: 12upx;
	}
	.back-title {
		width: 100%;
		font-weight: 500;
		font-size: 28upx;
		color: #000000;
		padding: 20upx 0;
	}
	.spell-whole {
		width: 100%;
		padding: 14upx 0;
	}
	.spell-list {
		width: 100%;
		padding: 14upx 0;
	}
	.spell-user {
		float: left;
		width: 352upx;
	}
	.item-user {
		float: left;
		width: 64upx;
		height: 64upx;
		margin-right: 4upx;
		border-radius: 50%;
	}
	.item-user image {
		width: 100%;
		height: 100%;
	}
	.item-add {
		float: left;
		width: 64upx;
		height: 64upx;
		text-align: center;
		line-height: 64upx;
		background: #F2F2F2;
		border-radius: 50%;
	}
	.item-add image{
		width: 22upx;
		height: 22upx;	
	}
	.spell-button {
		float: right;
		width: 124upx;
		height: 48upx;
		text-align: center;
		line-height: 48upx;
		font-weight: 500;
		font-size: 28upx;
		color: #FFFFFF;
		background: #FF724F;
		border-radius: 40upx;
		margin-top: 10upx;
	}
	.spell-tiem {
		float: left;
		margin-left: 28upx;
	}
	.tiem-top {
		font-size: 28upx;
		color: #000000;
	}
	.tiem-text {
		font-size: 24upx;
		color: #949494;
	}
	.goods-html {
		width: 100%;
		padding: 20upx;
		background: #F1F1F1;
		border-radius: 12upx;
		font-size: 24upx;
		color: #000000;
		margin-bottom: 20upx;
	}
	.goodsDes {
		width: 100%;
	}
	.post-bottom {
		width: 100%;
		background-color: #fff;
		padding: 24upx;
		position: fixed;
		bottom: 0;
		z-index: 99;
	}
	.left-share {
		float: left;
		text-align: center;	
		margin: 12upx 0 0 0;
	}
	.left-share view {
		color: #F40009;
		font-weight: 500;
		font-size: 26upx;
	}
	.share-button {
		float: right;
		width: 440upx;
		background: #222222;
		height: 94upx;
		line-height: 94upx;
		font-size: 32upx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 48upx;
	}
	.zhonq-button {
		float: right;
		width: 200upx;
		height: 94upx;
		text-align: center;
		line-height: 94upx;
		background: #222222;
		border-radius: 52upx;
		font-size: 28upx;
		color: #FFFFFF;
		margin-right: 18upx;
	}
	.button-item {
		width: 50%;
		float: left;
		height: 100%;
	}
	.left {
		float: left;
		background: #F2C94C;
	}
	.right {
		float: right;
		background: #FF724F;
	}
	.button-top {
		color: #FFFFFF;
		font-weight: 500;
		font-size: 22upx;
		text-align: center;
		margin-top: 8upx;
	}
	.button-bottom {
		font-size: 28upx;
		text-align: center;
		color: #FFFFFF;
	}
	.whole-post {
		width: 100%;
		height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.4);
	}
	.back {
		background: rgba(34, 34, 34,0.4);
	}
	.PayType-content {
		width: 100%;
		padding: 40upx 0;
		min-height: 660upx;
		background-color: #FFF;
		position: relative;
		border-radius: 40upx 40upx 0px 0px;
	}
	.PayType-title{
		font-weight: 500;
		font-size: 34upx;
		color: #000000;
		text-align: center;
		padding-bottom:80upx;
	}

	.PayType-item {
		width: 100%;
		padding: 16upx 40upx;
		margin-bottom: 20upx;
	}
	.PayType-img {
		width: 48upx;
		height: 44upx;
		float: left;
	}
	.PayType-text {
		float: left;
		margin-left: 20upx;
		font-size: 32upx;
		color: #000000;
	}
	.PayType-dunt {
		float: right;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		border: 1upx solid #999999;
	}
	.none {
		border: none;
	}
	.PayType-whole {
		width: 100%;
		position: absolute;
		bottom: 20upx;
		left: 0;
		padding: 32upx 40upx;
		border-top: 1upx solid #f0f0f0;
	}
	.PayType-button {
		width: 100%;
		height: 96upx;
		background: #222222;
		border-radius: 48upx;
		line-height: 96upx;
		color: #FFFFFF;
		font-weight: 500;
		font-size: 32upx;
		display: flex;
		text-align: center;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: 1upx solid #222222;
	}
	.button-item {
		width: 50%;
		color: #fff;
	}
	.colt {
		color: #222222;
		background-color: #FFFFFF;
	}
	.Outside-img {
		position: absolute;
		right: 20upx;
		top: 160upx;
		width: 414upx;
		height: 162upx;
		z-index: 999;
	}
	.advance {
		line-height: 36upx;
	}
	.draw {
		line-height: 36upx;
	}
	.backh {
		background: #C4C4C4;;
	}
	.advance-text {
		font-size: 24upx;
		color: #FFFFFF;
		padding-top: 4upx;
	}
	.advance-item {
		font-size: 32upx;
		color: #FFFFFF;
		padding-top: 12upx;
	}
	.popup-text {
		width: 100%;
		padding: 30upx 0;
		color: #666666;
	}
	.Friends-whole {
		width: 100%;
		padding: 32upx;
	}
	.Friends-title {
		font-weight: 500;
		font-size: 30upx;
		color: #222222;
		padding-bottom: 20upx;
	}
	.Friends-coent {
		width: 100%;
	}
	.Friends-left {
		float: left;
	    padding-right: 20upx;	
	}
	.Friends-img {
		float: left;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		margin-right: -10upx;
	}
	.tj-img {
		float: left;
		width: 40upx;
		height: 40upx;
		margin-left: 26upx;
	}
	.Friends-right {
		float: right;
		font-size: 26upx;
		color: #222222;
	}
	.right-chat {
		float: right;
		font-size: 24upx;
		margin-top: 4upx;
	}
	.right-chat image{
		float: right;
		width: 12upx;
		height: 18upx;
		margin: 6upx 0 0 6upx;
	}
	.whole-code {
	   width: 100%;	
	   padding: 32upx 0;
	}
	.codeitem {
		float: left;
		border: 1upx solid rgba(34, 34, 34, 0.12);
		border-radius: 24upx;
		padding: 6upx 18upx;
		margin-right: 20upx;
		font-weight: 500;
		font-size: 24upx;
		color: #222222;
	}
	
	.guide-whole {
		width: 100%;
		padding:100upx;
		color: #fff;
		padding-bottom: 20vh;
		position: absolute;
		right: 20upx;
		top: 160upx;
		z-index: 999;
		
	}
	.guide-title {
		float: left;		
	}
	.guide-title view{
		color: #fff;
	}
	.whole-tiem {
		width: 100%;
		padding: 30upx 32upx 10upx 32upx;
	}
	.item-top {
		width: 100%;
		padding-bottom:30upx;
	}
	.left-item {
		float: left;
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
	}
	.right-item {
		float: right;
		font-size: 24upx;
		color: #222222;
	}
	.spot-top {
		width: 100%;
		display: flex;	
	}
	.item-button {
		flex: 1;
		font-size: 20upx;
		text-align: center;
		color: #666666;
	}
	.top-item {
		flex: 1;
		font-size: 26upx;
		color: #222222;
		text-align: center;
	}
	.tiem-conet {
		width: 100%;
	}
	.card-text {
		width: 100%;
		padding: 0 40upx;
	}
	.card-text text {
		font-size: 24upx;
		color: #222222;
		float: left;
		padding-top: 4upx;
	}
	.card-left {
		float: left;
		padding: 6upx 16upx;
		background: rgba(201, 147, 98, 0.12);
		border-radius: 4upx;
		font-size: 22upx;
		color: #5D3F24;
		margin-right: 10upx;
	}
	.card-left image {
		float: left;
		width: 20upx;
		height: 20upx;
		margin: 6upx 4upx 0 0;
	}
    .whole-card {
		width: 100%;
		max-height: 400upx;
		overflow-y: scroll;
		padding-bottom: 40upx;
	}
	.card-list {
		width: 100%;
		margin-bottom: 20upx;
	}
	.card-img {
		float: left;
		width: 42upx;
		height: 42upx;
	}
	.card-name {
		float: left;
		margin-left: 14upx;
	}
	.card-dui {
		float: right;	
	}
	.card-img image{
		width: 100%;
		height: 100%;
	}
	.card-bottom {
		width: 100%;
		color: #222222;
		margin-bottom: 20upx;
	}
	.img-tj {
		float: left;
		width: 44upx;
		height: 44upx;
		margin-right: 14upx;
	}
	.img-tj image {
		width: 100%;
		height: 100%;
	}
	.yanz-text {
		width: 100%;
		font-size: 26upx;
		color: #222222;
		opacity: 0.4;
		padding-bottom:20upx;
	}
	.yanz-shur {
		width: 100%;
	}
	.yanz-shur input {
		display: inline-block;
		padding-left: 34upx;
		font-weight: 500;
		font-size: 48upx;
		width: 90%;
		color: #222222;
		letter-spacing:66upx;
	}
	.windt {
		width: 70%;
		padding-left:0;
		float: left;
	}
	.yanz-whole {
		width: 100%;
		display: flex;
	}
	.yanz-item {
		flex: 1;
		margin: 0 12upx;
		border-bottom: 1upx solid rgba(34, 34, 34, 0.12);
	}
	.yanz-item input {
		font-weight: 500;
		font-size: 48upx;
		width: 100%;
		color: #222222;
		text-align: center;
	}
	.yanz-coed {
		width: 100%;
		font-size: 26upx;	
		color: #222222;
		opacity: 0.28;
		text-align: center;
		margin: 40upx 0;
	}
	.order-item {
		width: 100%;
		padding:0 40upx 48upx 40upx;
	}
	.order-left {
		float: left;
		font-size: 32upx;
		color: #222222;
	}
	.order-right {
		float: right;	
		font-size: 28upx;
		color: #222222
	}
	.num-item {
		float: right;
		margin-left: 6upx;
		background: rgba(34, 34, 34, 0.05);
		border-radius: 6upx;
		padding: 8upx 12upx;
		font-size: 28upx;
		text-align: center;
		color: #222222
	}
	.num-item image{
		width: 24upx;
		height: 24upx;
	}
	.lottery-text {
		text-align: center;
		width: 100%;
		margin-top: 10upx;
		font-size: 32upx;
		color: #222222;
	}
	.whole-quantity {
		width: 100%;
		border-top: 1upx solid #F0F0F0;
		padding: 30upx 0 0 40upx;
		min-height: 300upx;
		max-height:600upx;
		overflow-y:scroll;
	}
	.quantity-item {
		float: left;
		border: 1upx solid rgba(34, 34, 34, 0.12);
		border-radius: 24upx;
		padding: 6upx 18upx;
		margin-right: 20upx;
		font-weight: 500;
		font-size: 28upx;
		color: #222222;
		margin: 0 20upx 30upx 0; 
	}
</style>
