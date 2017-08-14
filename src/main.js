// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

//import store from './vuex/store'
import Vuex from 'vuex'
import Mock from './mock'

Mock.bootstrap();

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

router.beforeEach((to, from, next) => {
	if(to.path == '/login') {
		sessionStorage.removeItem('user');
	}
	let user = JSON.parse(sessionStorage.getItem('user'));
	if(!user && to.path != '/login') {
		next({path: '/login'})
	} else {
		next()
	}
})

//Vue.config.silent = true
Vue.config.errorHandler = function(err, vm) {
	var componentName = Vue.util.formatComponentName(vm);
	var propsData = vm.$options.propsData;
	fundebug.notifyError(err, {
		metaData: {
			componentName: componentName,
			propsData: propsData
		}
	})
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
