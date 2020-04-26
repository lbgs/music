<template>
	<view>

		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData">
			<ul>
				<li v-for="(item,index) of dataList" :key="item.id" v-if="item.mvUrl">
					<view class="mv-control">
						<video id="mVideo" class="voide" :src="item.mvUrl" :title="item.name" :poster="item.cover" object-fit="cover"
						 @play="mvPlay" :data-id="item.id" :id="item.id" controls></video>
						<view class="title" @click="mvPlay">{{`${item.name} - ${item.artistName}`}}</view>
					</view>
				</li>
			</ul>

			<!-- 使用插槽自定义空白布局 -->
			<div slot="empty">
				...
			</div>
		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "../../components/s-pull-scroll/index.vue"
	export default {
		data() {
			return {
				apiUrl: getApp().globalData.apiUrl,
				dataList: [],
			}
		},
		components: {
			sPullScroll
		},
		onLoad: function() {
			this.getMvList(5)
		},
		methods: {
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			// 下拉加载
			pullDown(pullScroll) {
				console.log("pullDown")
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200);
			},
			// 加载
			loadData(pullScroll) {
				console.log("loadData")
				let limit = this.dataList.length;
				if (limit == 30) {
					pullScroll.finish();
				} else {
					limit += 5;
				}
				let ee = this.getMvList(limit, pullScroll);

			},
			getMvList: function(limit, pullScroll = false) {
				uni.request({
					url: `${this.apiUrl}/mv/first?limit=${limit}`,
					success: res => {
						let arr = limit==5 ? res.data.data : res.data.data.filter(item => {
							if (!this.dataList.map(item => item.id).includes(item.id.toString())) {
								return this.getMv(`/mv/url?id=${item.id}`);
							}
						})
						Promise.all(
							arr.map(item => this.getMv(`/mv/url?id=${item.id}`))
						).then(res => {
							arr.forEach((item, index) => {
								res.forEach(items => {
									if (item.id == items.id) {
										item.id = item.id.toString();
										item.mvUrl = items.url
									}
								})
								item.id = item.id.toString();
								this.dataList.push(item)
							})
							if (pullScroll) {
								pullScroll.success()
							};
						})
					}
				})
			},
			//mv播放
			mvPlay: function(el) {
				console.log("播放")
				let currentId = el.currentTarget.dataset.id;
				this.videoContent = uni.createVideoContext(currentId);
				this.dataList.forEach(item => {
					if (item.id != currentId) {
						let v = uni.createVideoContext(item.id);
						v.pause();
					}
				})
			},
			getMv: function(url) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: this.apiUrl + url,
						success: res => {
							resolve(res.data.data)
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	ul {
		list-style: none;
		padding: 0;
	}

	.mv-control {
		margin: 50upx 20upx;
		box-shadow: 0 0 5upx #C0C0C0;
		border-radius: 5upx;

		.voide {
			width: 100%;
			height: 398upx;
			background-color: #0086B3;
		}

		.title {
			padding: 20upx;
		}
	}
</style>
