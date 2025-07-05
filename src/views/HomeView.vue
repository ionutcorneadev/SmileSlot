<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const location = ref('')
const searchQuery = ref('')

const handleSearch = () => {
  router.push({
    path: '/search',
    query: { 
      q: searchQuery.value,
      location: location.value 
    }
  })
}
</script>

<template>
  <div class="relative bg-white overflow-hidden">
    <!-- Hero section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Find the Best</span>
                <span class="block text-primary-600">Dental Care</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Book appointments with top-rated dentists in your area. Easy, fast, and convenient dental care at your fingertips.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <a href="#search" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
                    Find a Dentist
                  </a>
                </div>
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a href="#how-it-works" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                    How it works
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Smiling dentist with patient">
      </div>
    </div>

    <!-- Search section -->
    <div id="search" class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary-600 font-semibold tracking-wide uppercase">Find a Dentist</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Book an appointment today
          </p>
        </div>

        <div class="mt-10 max-w-2xl mx-auto">
          <div class="bg-white shadow-xl rounded-lg overflow-hidden">
            <div class="p-6">
              <form @submit.prevent="handleSearch" class="space-y-6">
                <div>
                  <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="location"
                      v-model="location"
                      placeholder="Enter city or zip code"
                      class="input"
                      required
                    >
                  </div>
                </div>
                <div>
                  <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="search"
                      v-model="searchQuery"
                      placeholder="Dentist name, specialty, or procedure"
                      class="input"
                    >
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Search Dentists
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- How it works section -->
    <div id="how-it-works" class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary-600 font-semibold tracking-wide uppercase">How it works</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Book your dental appointment in 3 easy steps
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                1
              </div>
              <div class="ml-16">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Find a dentist</h3>
                <p class="mt-2 text-base text-gray-500">Search for dentists in your area and compare their services, reviews, and availability.</p>
              </div>
            </div>

            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                2
              </div>
              <div class="ml-16">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Book an appointment</h3>
                <p class="mt-2 text-base text-gray-500">Choose a convenient time slot that works for you and book instantly online.</p>
              </div>
            </div>

            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                3
              </div>
              <div class="ml-16">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Get treated</h3>
                <p class="mt-2 text-base text-gray-500">Visit the clinic at your scheduled time and receive quality dental care.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular services section -->
    <div class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary-600 font-semibold tracking-wide uppercase">Services</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Popular Dental Services
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="service in [
              { name: 'Dental Checkup', description: 'Comprehensive oral examination and cleaning', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { name: 'Teeth Whitening', description: 'Professional teeth whitening treatment', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { name: 'Dental Implants', description: 'Permanent solution for missing teeth', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { name: 'Braces & Invisalign', description: 'Teeth straightening options', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
            ]" :key="service.name" class="pt-6">
              <div class="flow-root bg-white rounded-lg px-6 pb-8">
                <div class="-mt-6">
                  <div>
                    <span class="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon" />
                      </svg>
                    </span>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">{{ service.name }}</h3>
                  <p class="mt-5 text-base text-gray-500">
                    {{ service.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
