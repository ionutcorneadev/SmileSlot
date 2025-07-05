<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Find a Dentist</h1>
    
    <!-- Search Filters -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="col-span-1 md:col-span-2">
          <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input 
            type="text" 
            id="location" 
            v-model="location"
            placeholder="City or postcode"
            class="input"
          >
        </div>
        <div>
          <label for="specialty" class="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
          <select id="specialty" v-model="specialty" class="input">
            <option value="">All Specialties</option>
            <option value="general">General Dentistry</option>
            <option value="orthodontics">Orthodontics</option>
            <option value="surgery">Oral Surgery</option>
            <option value="cosmetic">Cosmetic Dentistry</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="search" class="btn w-full">
            Search
          </button>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <div v-else-if="results.length > 0" class="space-y-6">
      <div v-for="clinic in results" :key="clinic.id" class="card">
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900">{{ clinic.name }}</h3>
              <p class="text-gray-600 mt-1">{{ clinic.address }}</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="tag in clinic.tags" :key="tag" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="mt-4 md:mt-0 md:ml-4">
              <router-link 
                :to="`/clinic/${clinic.id}`" 
                class="btn"
              >
                View Clinic
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">No clinics found. Try adjusting your search filters.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const location = ref('')
const specialty = ref('')
const loading = ref(false)
const results = ref([])

// Mock data - in a real app, this would come from an API
const mockClinics = [
  {
    id: 1,
    name: 'Smile Dental Clinic',
    address: '123 Dental Street, City Center',
    rating: 4.8,
    reviewCount: 124,
    tags: ['General Dentistry', 'Teeth Whitening', 'Emergency'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    name: 'Bright Smile Orthodontics',
    address: '456 Smile Avenue, Downtown',
    rating: 4.9,
    reviewCount: 89,
    tags: ['Orthodontics', 'Invisalign', 'Braces'],
    image: 'https://images.unsplash.com/photo-1629909615181-d018492faa63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    name: 'City Dental Care',
    address: '789 Health Road, Business District',
    rating: 4.6,
    reviewCount: 204,
    tags: ['Cosmetic Dentistry', 'Dental Implants', 'Teeth Cleaning'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
]

const search = () => {
  loading.value = true
  
  // Simulate API call
  setTimeout(() => {
    results.value = mockClinics
    loading.value = false
  }, 800)
}

// Initial search
search()
</script>
