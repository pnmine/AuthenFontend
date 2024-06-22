import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user.js'

import App from './App.vue'
import router from './router'
import 'boxicons'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use('boxicons')

// เพิ่ม store เป็น global property ของ Vue instance ทำให้เข้าถึงได้จากทุก component
app.config.globalProperties.$userStore = useUserStore()

app.mount('#app')
