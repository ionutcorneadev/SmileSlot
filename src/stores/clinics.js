import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useClinicsStore = defineStore('clinics', () => {
  const clinics = ref([
    {
      id: '1',
      name: 'Bright Smile Dental',
      address: '123 Main St, Bucharest',
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      services: ['General Dentistry', 'Cosmetic', 'Orthodontics', 'Pediatric'],
      workingHours: {
        monday: '9:00 AM - 7:00 PM',
        tuesday: '9:00 AM - 7:00 PM',
        wednesday: '9:00 AM - 7:00 PM',
        thursday: '9:00 AM - 7:00 PM',
        friday: '9:00 AM - 5:00 PM',
        saturday: '9:00 AM - 2:00 PM',
        sunday: 'Closed'
      },
      about: 'Bright Smile Dental has been serving the community for over 15 years with top-notch dental care. Our team of experienced dentists is dedicated to providing the best possible care in a comfortable and relaxing environment.'
    },
    // Add more clinics as needed
  ])

  const getClinicById = (id) => {
    return clinics.value.find(clinic => clinic.id === id)
  }

  const searchClinics = (query, location) => {
    let results = [...clinics.value]
    
    if (query) {
      const searchTerm = query.toLowerCase()
      results = results.filter(clinic => 
        clinic.name.toLowerCase().includes(searchTerm) ||
        clinic.services.some(service => service.toLowerCase().includes(searchTerm))
      )
    }
    
    if (location) {
      const locationTerm = location.toLowerCase()
      results = results.filter(clinic => 
        clinic.address.toLowerCase().includes(locationTerm)
      )
    }
    
    return results
  }

  const getAvailableSlots = (clinicId, date) => {
    // In a real app, this would fetch from an API
    // For demo, we'll generate some sample slots
    const slots = []
    const startHour = 9
    const endHour = 17
    const interval = 30 // minutes
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push({
          time,
          available: Math.random() > 0.3 // 70% chance of being available
        })
      }
    }
    
    return slots
  }

  return {
    clinics,
    getClinicById,
    searchClinics,
    getAvailableSlots
  }
})
