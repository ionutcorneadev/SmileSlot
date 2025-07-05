<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const showMobileMenu = ref(false)
const showChat = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleChat = () => {
  showChat.value = !showChat.value
}

const handleLogout = () => {
  authStore.logout()
  showMobileMenu.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <RouterLink to="/" class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-primary-600">TimeSlot</span>
            </RouterLink>
            <div class="hidden md:ml-10 md:flex md:space-x-8">
              <RouterLink 
                to="/" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-primary-500 text-gray-900"
                exact
              >
                Home
              </RouterLink>
              <RouterLink 
                to="/search" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-primary-500 text-gray-900"
              >
                Find a Dentist
              </RouterLink>
            </div>
          </div>
          
          <div class="hidden md:ml-6 md:flex md:items-center">
            <div v-if="!authStore.isAuthenticated" class="flex items-center space-x-4">
              <RouterLink to="/login" class="btn btn-outline">
                Sign in
              </RouterLink>
              <RouterLink to="/register" class="btn btn-primary">
                Sign up
              </RouterLink>
            </div>
            <div v-else class="ml-4 flex items-center md:ml-6">
              <RouterLink to="/dashboard" class="btn btn-outline mr-4">
                My Appointments
              </RouterLink>
              <button 
                @click="handleLogout"
                class="text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
          
          <!-- Mobile menu button -->
          <div class="-mr-2 flex items-center md:hidden">
            <button
              @click="toggleMobileMenu"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              :aria-expanded="showMobileMenu"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                :class="{ 'hidden': showMobileMenu, 'block': !showMobileMenu }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                class="h-6 w-6"
                :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="showMobileMenu" class="md:hidden" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1">
          <RouterLink
            to="/"
            @click="showMobileMenu = false"
            class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            active-class="bg-primary-50 border-primary-500 text-primary-700"
            exact
          >
            Home
          </RouterLink>
          <RouterLink
            to="/search"
            @click="showMobileMenu = false"
            class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            active-class="bg-primary-50 border-primary-500 text-primary-700"
          >
            Find a Dentist
          </RouterLink>
          <template v-if="!authStore.isAuthenticated">
            <div class="pt-4 pb-3 border-t border-gray-200">
              <div class="mt-3 space-y-1">
                <RouterLink
                  to="/login"
                  @click="showMobileMenu = false"
                  class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign in
                </RouterLink>
                <RouterLink
                  to="/register"
                  @click="showMobileMenu = false"
                  class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign up
                </RouterLink>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="pt-4 pb-3 border-t border-gray-200">
              <div class="flex items-center px-4">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-primary-600 font-medium">{{ authStore.user?.name?.charAt(0) || 'U' }}</span>
                  </div>
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-gray-800">{{ authStore.user?.name || 'User' }}</div>
                  <div class="text-sm font-medium text-gray-500">{{ authStore.user?.email || '' }}</div>
                </div>
              </div>
              <div class="mt-3 space-y-1">
                <RouterLink
                  to="/dashboard"
                  @click="showMobileMenu = false"
                  class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  My Appointments
                </RouterLink>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <h3 class="text-2xl font-bold text-primary-600">TimeSlot</h3>
            <p class="text-gray-500 text-base">
              Book your dental appointments easily and quickly. Find the best dentists in your area.
            </p>
          </div>
          <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">About</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">Blog</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">Careers</a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">Help Center</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">Contact Us</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Dentists</h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">List Your Practice</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">For Teams</a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">Privacy</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-primary-600">Terms</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-200 pt-8">
          <p class="text-base text-gray-400 text-center">
            &copy; 2023 TimeSlot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- AI Chat Button -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
        @click="toggleChat"
        class="bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
        :class="{ 'rotate-45': showChat }"
        aria-label="AI Assistant"
      >
        <svg
          v-if="!showChat"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- AI Chat Panel -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showChat"
        class="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col z-50 border border-gray-200"
      >
        <div class="bg-primary-600 px-4 py-3 flex items-center justify-between">
          <h3 class="text-white font-medium">AI Dental Assistant</h3>
          <button
            @click="toggleChat"
            class="text-white hover:text-gray-200 focus:outline-none"
          >
            <span class="sr-only">Close chat</span>
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div class="space-y-4">
            <div class="flex justify-start">
              <div class="bg-white p-3 rounded-lg shadow max-w-xs">
                <p class="text-sm text-gray-800">
                  Hello! I'm your AI dental assistant. How can I help you today?
                </p>
              </div>
            </div>
            <!-- Chat messages will be added here -->
          </div>
        </div>
        <div class="border-t border-gray-200 p-3 bg-white">
          <div class="flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              class="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Send
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-2 text-center">
            Powered by AI - Your data is secure and private
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
