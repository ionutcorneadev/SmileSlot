<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">Welcome back, {{ user?.name || 'User' }}!</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Upcoming Appointments -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-primary-500 rounded-md p-3">
              <CalendarIcon class="h-6 w-6 text-white" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Upcoming Appointments</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ upcomingAppointments.length }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-4 sm:px-6">
          <div class="text-sm">
            <a href="#" class="font-medium text-primary-600 hover:text-primary-500">View all</a>
          </div>
        </div>
      </div>

      <!-- Past Appointments -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <CheckCircleIcon class="h-6 w-6 text-white" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Past Appointments</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ pastAppointments.length }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-4 sm:px-6">
          <div class="text-sm">
            <a href="#" class="font-medium text-primary-600 hover:text-primary-500">View all</a>
          </div>
        </div>
      </div>

      <!-- Favorite Clinics -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <StarIcon class="h-6 w-6 text-white" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Favorite Clinics</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ favoriteClinics.length }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-4 sm:px-6">
          <div class="text-sm">
            <a href="#" class="font-medium text-primary-600 hover:text-primary-500">View all</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Appointments List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Upcoming Appointments</h3>
      </div>
      <div class="bg-white overflow-hidden">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="appointment in upcomingAppointments" :key="appointment.id">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-primary-600 truncate">
                  {{ appointment.clinicName }}
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ appointment.status }}
                  </p>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                    <ClockIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    {{ appointment.date }} at {{ appointment.time }}
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <UserIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    Dr. {{ appointment.doctorName }}
                  </p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <CurrencyDollarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  ${{ appointment.price }}
                </div>
              </div>
              <div class="mt-2 flex justify-end space-x-2">
                <button type="button" class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Reschedule
                </button>
                <button type="button" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Cancel
                </button>
              </div>
            </div>
          </li>
          <li v-if="upcomingAppointments.length === 0">
            <div class="px-4 py-4 sm:px-6 text-center text-gray-500">
              No upcoming appointments. <RouterLink to="/search" class="text-primary-600 hover:text-primary-500">Book an appointment</RouterLink>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div class="bg-white overflow-hidden">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="activity in recentActivities" :key="activity.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <component :is="activity.icon" class="h-5 w-5 text-gray-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">
                  {{ activity.title }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ activity.description }}
                </p>
              </div>
              <div class="ml-auto">
                <p class="text-sm text-gray-500">
                  {{ activity.time }}
                </p>
              </div>
            </div>
          </li>
          <li v-if="recentActivities.length === 0" class="px-4 py-4 sm:px-6 text-center text-gray-500">
            No recent activity
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { RouterLink } from 'vue-router'
import { 
  CalendarIcon, 
  CheckCircleIcon, 
  StarIcon,
  ClockIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClockIcon as ClockOutlineIcon,
  CheckCircleIcon as CheckCircleOutlineIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

// Types
type Appointment = {
  id: number
  clinicName: string
  doctorName: string
  date: string
  time: string
  status: string
  price: string
}

type Activity = {
  id: number
  title: string
  description: string
  time: string
  icon: any // This would ideally be a specific icon component type
}

const authStore = useAuthStore()
const user = computed(() => authStore.user)

// Mock data - replace with actual API calls
const upcomingAppointments = ref<Appointment[]>([
  {
    id: 1,
    clinicName: 'Bright Smile Dental',
    doctorName: 'Sarah Johnson',
    date: 'June 25, 2023',
    time: '10:00 AM',
    status: 'Confirmed',
    price: '120'
  },
  {
    id: 2,
    clinicName: 'Tooth Fairy Dental',
    doctorName: 'Michael Chen',
    date: 'July 2, 2023',
    time: '2:30 PM',
    status: 'Pending',
    price: '150'
  }
])

const pastAppointments = ref<Appointment[]>([
  {
    id: 3,
    clinicName: 'Gentle Dental Care',
    doctorName: 'Emily Rodriguez',
    date: 'May 15, 2023',
    time: '11:00 AM',
    status: 'Completed',
    price: '95'
  }
])

const favoriteClinics = ref([
  { id: 1, name: 'Bright Smile Dental' },
  { id: 2, name: 'Tooth Fairy Dental' },
  { id: 3, name: 'Gentle Dental Care' }
])

const recentActivities = computed(() => [
  {
    id: 1,
    title: 'Appointment Booked',
    description: 'Your appointment with Dr. Michael Chen is scheduled for July 2, 2023 at 2:30 PM',
    time: '2 hours ago',
    icon: CalendarIcon
  },
  {
    id: 2,
    title: 'Appointment Confirmed',
    description: 'Your appointment with Dr. Sarah Johnson has been confirmed',
    time: '1 day ago',
    icon: CheckCircleOutlineIcon
  },
  {
    id: 3,
    title: 'Appointment Reminder',
    description: 'Your appointment with Dr. Emily Rodriguez is in 1 hour',
    time: '1 week ago',
    icon: ClockOutlineIcon
  },
  {
    id: 4,
    title: 'Payment Received',
    description: 'Payment of $95.00 for your recent visit has been processed',
    time: '2 weeks ago',
    icon: CurrencyDollarIcon
  }
])

// Check if user is authenticated
onMounted(() => {
  if (!user.value) {
    // Redirect to login if not authenticated
    // This will be handled by the router navigation guard
  }
})
</script>
