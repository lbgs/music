<template>
	<view class="songMain">
		<h1>{{name}}</h1>
		<audio :src="url" controls :name="name" :poster="bgUrl"></audio>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				name:"",
				url: "",
				bgUrl: ""
			}
		},
		onLoad: function(opting) {
			this.name = opting.name;
			uni.request({
				url: "http://localhost:3000/song/url",
				data: {
					id: opting.id
				},
				success: res => {
					this.url = res.data.data[0].url
				}
			})
			uni.request({
				url: "http://localhost:3000/song/detail",
				data:{ids: opting.id},
				success: res => {
					this.bgUrl = res.data.songs[0].al.picUrl
				}
			})
		},
		methods:{
		}
	}
</script>
<style scoped="scss">
	.songMain{
		text-align: center;
		h1{
			margin: 20upx 0;
		}
	}
</style>
