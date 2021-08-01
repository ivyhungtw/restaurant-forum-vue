import { createApp } from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.globalProperties.$filter = {
  fromNow(value) {
    if (!value) return '-';
    return moment(value).fromNow();
  }
};
app.use(store);
app.use(router);

app.mount('#app');
