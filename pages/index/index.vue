<template>
	<view class="find-control">
		<!-- <h1>发现主页</h1> -->
		<view class="list-control" v-for="item in listAll">
			<view class="title-control">
				<view class="title">{{item.name}}</view>
				<view class="more">
					<navigator :url="`../list/index?id=${item.id}`">更多</navigator>
				</view>
			</view>
			<view class="hot-gtid">
				<uni-grid :column="3" :showBorder="false">
					<uni-grid-item v-for="items in item.list.filter((t, i) =>{if(i<6){return t}})" :key="items.id" style="height: auto;"
					 :index="items.id">
						<view class="flex-item" :data-bid="item.id" :data-id="items.id" @click="getDtail">
							<image :src="items.al.picUrl" mode="aspectFit"></image>
							<view class="text">{{items.name + "-" + items.ar[0].name}}</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	const app = getApp().globalData
	export default {
		data: function() {
			return {
				list: [],
				hotList: [],
				listAll: [],
			}
		},
		components: {
			uniGrid,
			uniGridItem
		},
		onLoad: function() {
			this.getHot()
		},
		methods: {
			getHot: function() {
				let apiUrl = getApp().globalData.apiUrl;
				Promise.all([
					this.getData(27, "新歌榜", apiUrl + "/top/list?idx=27"),
					this.getData(1, "热歌榜", apiUrl + "/top/list?idx=1"),
					this.getData(3, "飙升榜", apiUrl + "/top/list?idx=3"),

				]).then(res => {
					res.forEach(item => this.listAll.push(item))
				})
			},
			getDtail: function(e) {
				let el = e.currentTarget.dataset
				this.listAll.forEach(item => {
					if (item.id == el.bid) {
						console.log(item)
						app.list = item.list.map(item => item.id)
						console.log(app.list)
					}
				})

				uni.navigateTo({
					url: `../playing/index?id=${el.id}`
				})
			},
			getData: function(id, name, url) {
				//创建Promise 实例时立即执行
				return new Promise((resolve, reject) => {
					uni.request({
						url: url,
						success: (res) => {
							let arr = res.data.playlist.tracks
							resolve({
								id,
								name: name,
								list: arr.filter((item, index) => {
									return item
								})
							})
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.find-control {
		padding: 20upx;

		.list-control {
			margin-bottom: 30rpx;
		}

		.title-control {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 20upx 20upx;

			.more {
				font-size: 24upx;
				color: #969896;
			}
		}

		.hot-gtid {
			.flex-item {
				margin: 0 auto;

				image {
					border-radius: 20upx;
					width: 180upx;
					height: 180upx;
				}

				.text {
					width: 180upx;
					font-size: 24upx;
					margin-bottom: 20upx;
				}
			}
		}
	}
</style>
