<template>
	<view>
		<image class="topImg" :src="list.coverImgUrl" mode=""></image>
		<uni-list>
			<uni-list-item class="circular" v-for="item in list.tracks" :key="item.id" :title="item.name" :note="item.ar[0].name"
			 :showArrow="false" @click="detailed(item.id)">
				<view class="arrow" @click.stop="playBtn(item.id)"></view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	const app = getApp().globalData;
	export default {
		data() {
			return {
				list: [],
				top: [{
					id: 27,
					name: "新歌榜"
				}, {
					id: 1,
					name: "热歌榜"
				}, {
					id: 3,
					name: "飙升榜"
				}]
			}
		},
		onLoad: function(option) {
			uni.request({
				url: `${app.apiUrl}/top/list?idx=${option.id}`,
				success: res => {
					let data = res.data.playlist
					this.list = data
					console.log(data)
					app.list = data.tracks.map(item => item.id)
					console.log(app.list)
				}
			})
			this.top.forEach(item => {
				if (option.id == item.id) {
					uni.setNavigationBarTitle({
						title: item.name
					})
				}
			})
		},
		methods: {
			playBtn: function(id) {
				console.log(`播放${id}`)
				this.$bgmPlay(id);
				app.bgm.onEnded(() => {
					console.log("自动停止播放")
					let index = app.list.findIndex(item => item == app.id)
					this.$bgmPlay(app.list[index + 1])
				})
			},
			detailed: function(id) {
				uni.navigateTo({
					url: `../playing/index?id=${id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.topImg {
		width: 100%;
		height: 420upx;
	}

	.circular {
		position: relative;

		.arrow {
			position: absolute;
			top: 38upx;
			right: 26upx;
			width: 40upx;
			height: 40upx;
			border: 2upx solid #404040;
			border-radius: 50%;
		}

		.arrow::after {
			content: "";
			position: absolute;
			top: 10upx;
			left: 15upx;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 12upx 0 12upx 18upx;
			border-color: transparent transparent transparent #404040;
		}
	}
</style>
