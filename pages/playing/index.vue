<template>
	<view class="main">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="titleNav">
			<view class="back" @click="back()"></view>
			{{obj.name}} - {{obj.ar ? obj.ar[0].name : ''}}
		</view>
		<view class="mask" v-if="obj.al">
			<image :src="obj.al.picUrl"></image>
		</view>
		<!-- <view> 状态栏下的文字 </view> -->
		<view class="img-control" v-if="obj.al">
			<image :src="obj.al.picUrl" :class="play_status ? 'play':'pause'" @click="bgmPlay(obj.id,play_status)"></image>
		</view>
		<!-- 分享按钮 -->
		<view class="share" hover-class="share-hover" @click="share()">
			分享给好友
		</view>
	</view>
</template>

<script>
	let bgm = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				apiUrl: getApp().globalData.apiUrl,
				obj: {},
				url: "",
				leftNum: 50,
				play_status: false,
				pauseTime: 0,
				animationData: {}
			}
		},
		onLoad: function(option) {
			this.getDetail(option.id)
			let data = getApp().globalData
			if (option.id == data.id) {
				console.log("旋转起来")
				this.play_status = true
			}

		},
		methods: {
			//自定义导航返回
			back: function() {
				uni.navigateBack()
			},
			share: function(id) {
				console.log("全局事件")
				console.log(id)
			},
			getDetail: function(id) {
				uni.request({
					url: `${this.apiUrl}/song/detail?ids=${id}`,
					success: res => {
						this.obj = res.data.songs[0]
						console.log(this.obj)

					}
				})
			},
			//播放和暂停
			bgmPlay: function(id) {
				this.$bgmPlay(id);
				this.play_status = getApp().globalData.status
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		position: relative;
		text-align: center;

		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.titleNav {
			padding: 10upx 0 10upx;
			color: #FFFFFF;
			line-height: 60upx;
			background-color: #ffffff44;
			position: relative;
		}

		.back {
			content: "";
			position: absolute;
			top: 26upx;
			left: 40upx;
			width: 20upx;
			height: 20upx;
			border: 4upx solid;
			border-color: transparent transparent white white;
			transform: rotate(45deg);
		}

		.mask {
			position: absolute;
			filter: blur(10px);
			z-index: -2;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;

			image {
				width: 100vh;
				height: 100vh;
				margin-left: -20vh;
			}
		}

		.img-control {
			margin: 200upx 0 200upx;

			image {
				width: 400upx;
				height: 400upx;
				border-radius: 50%;
				animation: rotate 10s linear infinite;
				box-shadow: 0 0 100upx #CCCCCC;
			}

			.play {
				animation-play-state: running;
			}

			.pause {
				animation-play-state: paused;
			}

			@keyframes rotate {
				0% {
					transform: rotate(0);
				}

				100% {
					transform: rotate(360deg);
				}

			}
		}

		.bgimg {
			margin: 0 auto 100upx;
			padding: 100upx 0 0;

			img {
				width: 500upx;
				height: 500upx;
				border-radius: 50%;
			}
		}

		.share {
			width: 500upx;
			line-height: 100upx;
			margin: 0 auto;
			color: white;
			border-radius: 200rpx;
			background-color: #ffffff66;
		}

		.share-hover {
			box-shadow: 0px -2px 80upx 20upx #666;
		}
	}
</style>
