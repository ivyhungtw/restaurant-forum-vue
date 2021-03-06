import { createApp } from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidationPlugin from './includes/validation';
import './assets/application.css';

const app = createApp(App);

app.config.globalProperties.$filter = {
  fromNow(value) {
    if (!value) return '-';
    return moment(value).fromNow();
  },
  emptyImageFilter(src) {
    return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image';
  }
};
app.use(store);
app.use(router);
app.use(VeeValidationPlugin);

app.mount('#app');
