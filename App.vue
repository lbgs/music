<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniList,
			uniListItem
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			apiUrl: "http://localhost:3000",
			id: 0,
			pauseTime: 0,
			bgm: uni.createInnerAudioContext(),
			list: []
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./static/font/iconfont.css");

	.main {}
</style>
