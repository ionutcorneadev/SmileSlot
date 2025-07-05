<template>
  <div v-if="clinic" class="container mx-auto px-4 py-8">
    <!-- Clinic Header -->
    <div class="bg-white rounded-lg shadow overflow-hidden mb-8">
      <div class="relative h-64 bg-gray-200">
        <img 
          :src="clinic.image" 
          :alt="clinic.name"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <h1 class="text-3xl font-bold text-white">{{ clinic.name }}</h1>
            <div class="flex items-center mt-2">
              <div class="flex items-center">
                <span class="text-yellow-400 text-xl">★</span>
                <span class="text-white ml-1">{{ clinic.rating }}</span>
                <span class="text-white/70 ml-2">({{ clinic.reviewCount }} reviews)</span>
              </div>
              <span class="mx-2 text-white/50">•</span>
              <div class="text-white/90">
                {{ clinic.address }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-6">
        <div class="flex flex-col md:flex-row justify-between gap-8">
          <!-- Clinic Info -->
          <div class="flex-1">
            <h2 class="text-xl font-semibold mb-4">About {{ clinic.name }}</h2>
            <p class="text-gray-700 mb-6">
              {{ clinic.description || 'A professional dental clinic providing comprehensive dental care services with a team of experienced dentists and modern equipment.' }}
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 class="font-medium text-gray-900 mb-3">Services</h3>
                <ul class="space-y-2">
                  <li v-for="service in clinic.services" :key="service" class="flex items-center">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ service }}
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-medium text-gray-900 mb-3">Opening Hours</h3>
                <ul class="space-y-2">
                  <li v-for="(hours, day) in clinic.hours" :key="day" class="flex justify-between">
                    <span class="text-gray-600">{{ day }}:</span>
                    <span class="font-medium">{{ hours }}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div v-if="clinic.team && clinic.team.length > 0">
              <h3 class="font-medium text-gray-900 mb-4">Our Dentists</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="dentist in clinic.team" :key="dentist.name" class="text-center">
                  <div class="h-20 w-20 mx-auto rounded-full bg-gray-200 mb-2 overflow-hidden">
                    <img :src="dentist.image" :alt="dentist.name" class="h-full w-full object-cover">
                  </div>
                  <div class="font-medium">{{ dentist.name }}</div>
                  <div class="text-sm text-gray-600">{{ dentist.specialty }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Booking Card -->
          <div class="md:w-80 flex-shrink-0">
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-6">
              <h3 class="text-lg font-medium mb-4">Book an Appointment</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
                  <select v-model="selectedService" class="input">
                    <option v-for="service in clinic.services" :key="service" :value="service">
                      {{ service }}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                  <input 
                    type="date" 
                    v-model="selectedDate" 
                    :min="new Date().toISOString().split('T')[0]"
                    class="input"
                  >
                </div>
                
                <div v-if="availableTimes.length > 0">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Available Times</label>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      v-for="time in availableTimes" 
                      :key="time"
                      @click="selectedTime = time"
                      class="py-2 px-3 text-sm rounded-md border"
                      :class="{
                        'border-primary-500 bg-primary-50 text-primary-700': selectedTime === time,
                        'border-gray-200 hover:border-primary-300': selectedTime !== time
                      }"
                    >
                      {{ time }}
                    </button>
                  </div>
                </div>
                
                <button 
                  @click="bookAppointment"
                  :disabled="!selectedService || !selectedDate || !selectedTime"
                  class="btn w-full mt-4"
                  :class="{'opacity-50 cursor-not-allowed': !selectedService || !selectedDate || !selectedTime}"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Reviews Section -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-xl font-semibold mb-6">Patient Reviews</h2>
      
      <div v-if="reviews.length > 0" class="space-y-6">
        <div v-for="review in reviews" :key="review.id" class="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
          <div class="flex items-center mb-2">
            <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
              {{ review.author.charAt(0) }}
            </div>
            <div class="ml-3">
              <div class="font-medium">{{ review.author }}</div>
              <div class="flex items-center">
                <div class="flex">
                  <span v-for="i in 5" :key="i" class="text-yellow-400">
                    {{ i <= review.rating ? '★' : '☆' }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 ml-2">{{ formatDate(review.date) }}</span>
              </div>
            </div>
          </div>
          <p class="text-gray-700">{{ review.comment }}</p>
        </div>
      </div>
      
      <div v-else class="text-center py-8 text-gray-500">
        No reviews yet. Be the first to leave a review!
      </div>
    </div>
  </div>
  
  <div v-else class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const clinic = ref(null)
const selectedService = ref('')
const selectedDate = ref('')
const selectedTime = ref('')
const availableTimes = ref([])

// Mock data - in a real app, this would come from an API
const mockClinics = [
  {
    id: 1,
    name: 'Smile Dental Clinic',
    address: '123 Dental Street, City Center',
    rating: 4.8,
    reviewCount: 124,
    tags: ['General Dentistry', 'Teeth Whitening', 'Emergency'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Our state-of-the-art dental clinic provides comprehensive dental care for the whole family. We use the latest technology and techniques to ensure the best possible care for our patients.',
    services: ['General Checkup', 'Teeth Cleaning', 'Dental Fillings', 'Teeth Whitening', 'Emergency Care'],
    hours: {
      'Monday': '9:00 AM - 6:00 PM',
      'Tuesday': '9:00 AM - 6:00 PM',
      'Wednesday': '9:00 AM - 6:00 PM',
      'Thursday': '9:00 AM - 7:00 PM',
      'Friday': '9:00 AM - 5:00 PM',
      'Saturday': '9:00 AM - 2:00 PM',
      'Sunday': 'Closed'
    },
    team: [
      {
        name: 'Dr. Sarah Johnson',
        specialty: 'General Dentist',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        name: 'Dr. Michael Chen',
        specialty: 'Orthodontist',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        name: 'Dr. Emily Wilson',
        specialty: 'Pediatric Dentist',
        image: 'https://randomuser.me/api/portraits/women/63.jpg'
      }
    ]
  },
  {
    id: 2,
    name: 'Bright Smile Orthodontics',
    address: '456 Smile Avenue, Downtown',
    rating: 4.9,
    reviewCount: 89,
    tags: ['Orthodontics', 'Invisalign', 'Braces'],
    image: 'https://images.unsplash.com/photo-1629909615181-d018492faa63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    services: ['Invisalign', 'Braces', 'Retainers', 'Orthodontic Consultation'],
    hours: {
      'Monday': '8:00 AM - 5:00 PM',
      'Tuesday': '8:00 AM - 5:00 PM',
      'Wednesday': '8:00 AM - 5:00 PM',
      'Thursday': '8:00 AM - 7:00 PM',
      'Friday': '8:00 AM - 4:00 PM',
      'Saturday': 'Closed',
      'Sunday': 'Closed'
    }
  },
  {
    id: 3,
    name: 'City Dental Care',
    address: '789 Health Road, Business District',
    rating: 4.6,
    reviewCount: 204,
    tags: ['Cosmetic Dentistry', 'Dental Implants', 'Teeth Cleaning'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    services: ['Teeth Whitening', 'Veneers', 'Dental Implants', 'Cosmetic Bonding'],
    hours: {
      'Monday': '8:30 AM - 5:30 PM',
      'Tuesday': '8:30 AM - 5:30 PM',
      'Wednesday': '8:30 AM - 5:30 PM',
      'Thursday': '8:30 AM - 7:00 PM',
      'Friday': '8:30 AM - 4:30 PM',
      'Saturday': '9:00 AM - 2:00 PM',
      'Sunday': 'Closed'
    }
  }
]

// Mock reviews
const reviews = ref([
  {
    id: 1,
    author: 'John Doe',
    rating: 5,
    date: '2023-05-15',
    comment: 'Excellent service! The staff was very friendly and professional. Dr. Johnson explained everything clearly and made me feel comfortable throughout the procedure.'
  },
  {
    id: 2,
    author: 'Jane Smith',
    rating: 4,
    date: '2023-04-28',
    comment: 'Great experience overall. The clinic is clean and modern. The only reason Im not giving 5 stars is because I had to wait about 15 minutes past my appointment time.'
  }
])

// Load clinic data
onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    const clinicId = parseInt(route.params.id)
    const foundClinic = mockClinics.find(c => c.id === clinicId)
    if (foundClinic) {
      clinic.value = foundClinic
      if (foundClinic.services && foundClinic.services.length > 0) {
        selectedService.value = foundClinic.services[0]
      }
    } else {
      // Redirect to 404 or search page if clinic not found
      router.push('/search')
    }
  }, 500)
})

// Watch for date changes to load available times
watch(selectedDate, (newDate) => {
  if (newDate) {
    // Simulate loading available times
    setTimeout(() => {
      availableTimes.value = [
        '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'
      ]
    }, 300)
  } else {
    availableTimes.value = []
    selectedTime.value = ''
  }
})

const bookAppointment = () => {
  if (!selectedService.value || !selectedDate.value || !selectedTime.value) return
  
  // In a real app, this would make an API call to book the appointment
  router.push({
    path: '/book/confirm',
    query: {
      clinic: clinic.value.id,
      service: selectedService.value,
      date: selectedDate.value,
      time: selectedTime.value
    }
  })
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>
