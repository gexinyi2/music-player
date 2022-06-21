import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import axios from 'axios'
// import { Swipe,SwipeItem  } from 'vant';
import getVant from '../src/plugins/index'



const app = createApp(App);
getVant(app);
app.use(store);
app.use(router).mount('#app');
//app.use(axios)

