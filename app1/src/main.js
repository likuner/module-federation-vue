import { createApp } from 'vue'
import { Button } from 'view-ui-plus'
import App from './App.vue'
// import router from './router'
import store from './store'
import './style'
import 'view-ui-plus/dist/styles/viewuiplus.css'

const app = createApp(App)

app.config.globalProperties.$globalProperty = 'Hi, World!'

app.component(Button.name, Button)

app
  // .use(router)
  .use(store)
  .mount('#app')
