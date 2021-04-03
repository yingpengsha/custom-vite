import {createApp, h} from 'vue'

const app = createApp({
  render() {
    return h('div', 'Hello, It\'s my Vite!')
  }
}).mount('#app')

export default app