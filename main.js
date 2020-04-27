import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
//全局事件
Vue.prototype.$bgmPlay = (id) => {
	let app = getApp().globalData
	if (id != app.id) {
		console.log(id)
		app.id = id;
		app.status = false
		if(app.bgm){app.bgm.destroy();}
		app.bgm = uni.createInnerAudioContext()
		uni.request({
			url: `${app.apiUrl}/song/url?id=${id}`,
			success: res => {
				app.bgm.src = res.data.data[0].url
				console.log(res)
			}
		})
	}
	if (app.status) {
		app.bgm.pause();
		app.bgm.startTime = app.pauseTime
		app.status = false
	} else {
		app.bgm.play();
		app.status = true
	}
	app.bgm.onTimeUpdate(() => {
		app.pauseTime = app.bgm.currentTime
	})
}
