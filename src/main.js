import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postRequest,getRequest,deleteRequest,putRequest,postKeyValueRequest} from "@/utils/api";

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

