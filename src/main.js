import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {deleteRequest, getRequest, postKeyValueRequest, postRequest, putRequest} from "@/utils/api";
import {initMenu} from "@/utils/menus";
import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;

Vue.config.productionTip = false

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next()
    } else {
        initMenu(router, store)
        next()
    }
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

