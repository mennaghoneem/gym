<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme.js'

const router = useRouter()
const route = useRoute()
const { setTheme } = useTheme()

const isLoginMode = ref(false)
const errorMessage = ref('')

const formData = ref({
  fullName: '',
  email: '',
  password: '',
  age: '',
  gender: 'male',
  weight: '',
  height: '',
  goal: 'Build Muscle',
  exerciseCategory: 'cardio'
})

onMounted(() => {
  if (route.query.mode === 'login') {
    isLoginMode.value = true
  }
})

function switchMode(loginState) {
  isLoginMode.value = loginState
  errorMessage.value = ''
}

function handleSubmit() {
  errorMessage.value = ''

  if (isLoginMode.value) {
    const savedUserJSON = localStorage.getItem('gym_registered_user')
    
    if (!savedUserJSON) {
      errorMessage.value = 'No account found. Please sign up first!'
      return
    }

    const savedUser = JSON.parse(savedUserJSON)

    const inputEmail = formData.value.email.trim().toLowerCase()
    const savedEmail = savedUser.email ? savedUser.email.trim().toLowerCase() : ''

    if (inputEmail === savedEmail && formData.value.password === savedUser.password) {
      localStorage.setItem('gym_active_session', 'true')
      setTheme(savedUser.gender || 'male')
      router.push('/dashboard')
    } else {
      errorMessage.value = 'Invalid email or password!'
    }

  } else {
    if (!formData.value.fullName || !formData.value.email || !formData.value.password) {
      errorMessage.value = 'Please fill in all required fields (Name, Email, Password).'
      return
    }

    localStorage.setItem('gym_registered_user', JSON.stringify(formData.value))
    localStorage.setItem('gym_active_session', 'true')
    setTheme(formData.value.gender)
    
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="inner-page">
  <div class="auth-page py-5">
    <div class="container d-flex justify-content-center">
      <div class="auth-wrapper">
        
        <div class="auth-tabs d-flex mb-4">
          <button 
            type="button" 
            class="tab-btn flex-fill py-2" 
            :class="{ active: !isLoginMode }"
            @click="switchMode(false)"
          >
            Sign Up
          </button>
          <button 
            type="button" 
            class="tab-btn flex-fill py-2" 
            :class="{ active: isLoginMode }"
            @click="switchMode(true)"
          >
            Login
          </button>
        </div>

        <div class="auth-card p-4 p-md-5">

          <h2 class="text-center text-white mb-4">
            {{ isLoginMode ? 'Welcome Back' : 'Create Account' }}
          </h2>

          <div v-if="errorMessage" class="alert alert-danger py-2 text-center" role="alert">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleSubmit" class="d-flex flex-column gap-3">
            
            <template v-if="!isLoginMode">
              <div>
                <label class="form-label text-white-50">Full Name *</label>
                <input 
                  v-model="formData.fullName" 
                  type="text" 
                  class="form-control custom-input" 
                  placeholder="Enter your name"
                  required
                />
              </div>
            </template>

            <div>
              <label class="form-label text-white-50">Email Address *</label>
              <input 
                v-model="formData.email" 
                type="email" 
                class="form-control custom-input" 
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label class="form-label text-white-50">Password *</label>
              <input 
                v-model="formData.password" 
                type="password" 
                class="form-control custom-input" 
                placeholder="Enter your password"
                required
              />
            </div>

            <template v-if="!isLoginMode">
              <div class="row g-2">
                <div class="col-6">
                  <label class="form-label text-white-50">Age</label>
                  <input 
                    v-model="formData.age" 
                    type="number" 
                    class="form-control custom-input" 
                    placeholder="e.g. 22"
                  />
                </div>
                <div class="col-6">
                  <label class="form-label text-white-50">Gender</label>
                  <select v-model="formData.gender" class="form-select custom-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div class="row g-2">
                <div class="col-6">
                  <label class="form-label text-white-50">Weight (kg)</label>
                  <input 
                    v-model="formData.weight" 
                    type="number" 
                    class="form-control custom-input" 
                    placeholder="e.g. 70"
                  />
                </div>
                <div class="col-6">
                  <label class="form-label text-white-50">Height (cm)</label>
                  <input 
                    v-model="formData.height" 
                    type="number" 
                    class="form-control custom-input" 
                    placeholder="e.g. 175"
                  />
                </div>
              </div>

              <div class="row g-2">
                <div class="col-6">
                  <label class="form-label text-white-50">Fitness Goal</label>
                  <select v-model="formData.goal" class="form-select custom-input">
                    <option value="Build Muscle">Build Muscle</option>
                    <option value="Lose weight">Lose Weight</option>
                    <option value="Increase strength">Increase Strength</option>
                    <option value="Improve fitness">Improve Fitness</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label text-white-50">Exercise Category</label>
                  <select v-model="formData.exerciseCategory" class="form-select custom-input">
                    <option value="cardio">cardio</option>
                    <option value="olympic weightlifting">olympic weightlifting</option>
                    <option value="plyometrics">plyometrics</option>
                    <option value="powerlifting">powerlifting</option>
                    <option value="strength">strength</option>
                    <option value="stretching">stretching</option>
                    <option value="strongman">strongman</option>
                  </select>
                </div>
              </div>
            </template>

            <button type="submit" class="btn btn-primary submit-btn mt-3">
              {{ isLoginMode ? 'Login' : 'Sign Up' }}
            </button>

          </form>

        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: calc(100vh - 60px);
}

.auth-wrapper {
  width: 100%;
  max-width: 480px;
  
}

.auth-card {
  width: 100%;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.auth-tabs {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 4px;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: var(--color-primary-light, #0066ff);
  color: #ffffff;
}

.custom-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  color: var(--color-text, #ffffff);
  border-radius: 8px;
  padding: 10px 14px;
}

.custom-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-primary-light);
  color: #ffffff;
  box-shadow: none;
}

.custom-input option {
  background-color: #1a1a1a !important;
  color: #ffffff !important;
  padding: 10px;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.4) !important;
  opacity: 1;
}

.custom-input:-webkit-autofill,
.custom-input:-webkit-autofill:hover, 
.custom-input:-webkit-autofill:focus {
  -webkit-text-fill-color: #ffffff !important;
  -webkit-box-shadow: 0 0 0px 1000px #222222 inset !important;
  transition: background-color 5000s ease-in-out 0s;
}

.submit-btn {
  background: var(--color-primary-light, #0066ff);
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  opacity: 0.9;
}
</style>