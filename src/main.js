import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'boxicons'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use('boxicons')

app.mount('#app')
