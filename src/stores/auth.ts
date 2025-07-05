import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id?: string | number
  name?: string
  email?: string
  // Add other user properties as needed
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const isAuthenticated = ref<boolean>(localStorage.getItem('isAuthenticated') === 'true')

  const login = (userData: User): void => {
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  const logout = (): void => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  const register = (userData: User): void => {
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

export type { User }
