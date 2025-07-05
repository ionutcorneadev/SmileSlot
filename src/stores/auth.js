import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

  const login = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  const register = (userData) => {
    // In a real app, this would make an API call
    login(userData)
  }

  return {
    user,
    isAuthenticated: computed(() => isAuthenticated.value),
    login,
    logout,
    register
  }
})
