import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Global directive for scroll reveal
app.directive('reveal', {
  mounted(el) {
    el.classList.add('reveal-hidden')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.remove('reveal-hidden')
          el.classList.add('fade-in')
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    observer.observe(el)
  }
})

app.mount('#app')

