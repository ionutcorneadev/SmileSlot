import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import components
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import DashboardView from './views/DashboardView.vue'
import SearchView from './views/SearchView.vue'
import ClinicDetailView from './views/ClinicDetailView.vue'
import BookingView from './views/BookingView.vue'

// Initialize Pinia
const pinia = createPinia()

// Router configuration
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/search', component: SearchView },
    { path: '/clinic/:id', component: ClinicDetailView, props: true },
    { path: '/book/:id', component: BookingView, props: true, meta: { requiresAuth: true } },
  ]
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

// Add Google Fonts
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)
