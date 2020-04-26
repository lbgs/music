<template>
	<view>
		<uniSearchBar maxlength="100" @input="getBtn"></uniSearchBar>
		<uni-list>
			<uni-list-item v-for="item in list" :title="item.name" @click="getUrl(item.id,item.name)"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniSearchBar from "../../components/uni-search-bar/uni-search-bar.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
				list: [],
				name: "",
				url: "",
			}
		},
		components: {
			uniSearchBar,
			uniList,
			uniListItem,
		},
		methods: {
			getBtn: function(e) {
				this.list = [];
				let that = this
				if (e.value) {
					uni.request({
						url: "http://localhost:3000/search",
						method: "GET",
						data: {
							keywords: e.value
						},
						success(res) {
							res.data.result.songs.forEach(res => {
								that.list.push(res);
							})
						}
					})
				}
			},
			getUrl: function(id, name) {
				uni.navigateTo({
					url: `../playing/index?id=${id}&name=${name}`,
				})
			},
		}
	}
</script>

<style>
</style>
