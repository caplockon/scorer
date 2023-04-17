import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import {i18n, router} from "@/utils/modules";

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
