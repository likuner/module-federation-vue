import { createApp } from 'vue'
import { Button } from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import './style'
import 'view-ui-plus/dist/styles/viewuiplus.css'

const app = createApp(App)

app.config.globalProperties.$globalProperty = 'Hi, World!'

import('app1/App').then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err, 'err')
})

// module federation
// const App1 = defineAsyncComponent(() => import('app1/App'))
// app.component('App1', App1)

app.component(Button.name, Button)

app.use(router)
  .use(store)
  .mount('#app')
