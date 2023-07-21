import './assets/main.css'
import '@mdi/light-font/css/materialdesignicons-light.css'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.use(
  createVuetify({
    components
  })
)

app.mount('#app')
