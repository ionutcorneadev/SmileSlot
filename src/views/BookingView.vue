<template>
    <div>
        <h1>Booking View</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const clinic = ref(null)
const service = ref(null)
const date = ref(null)
const time = ref(null)

// Load clinic data
onMounted(() => {
    // Simulate API call
    setTimeout(() => {
        const clinicId = parseInt(route.query.clinic)
        const foundClinic = mockClinics.find(c => c.id === clinicId)
        if (foundClinic) {
            clinic.value = foundClinic
            if (foundClinic.services && foundClinic.services.length > 0) {
                service.value = foundClinic.services[0]
            }
        } else {
            // Redirect to 404 or search page if clinic not found
            router.push('/search')
        }
    }, 500)
})

// Watch for date changes to load available times
watch(date, (newDate) => {
    if (newDate) {
        // Simulate loading available times
        setTimeout(() => {
            availableTimes.value = [
                '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'
            ]
        }, 300)
    } else {
        availableTimes.value = []
        time.value = ''
    }
})
</script>

<style scoped>
/* Add your styles here */
</style>