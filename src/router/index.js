import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ExercisesView from '../views/ExercisesView.vue'
import ExercisesHomeView from '../views/ExercisesHomeView.vue'
import Plans from '../views/Plans.vue'
import DietPlans from '../views/DietPlans.vue' 
import About from '../components/About.vue'
import Contact from '../components/contact.vue'
import Trainers from '../components/Trainers.vue'
import Schedule from '../components/schedule.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/exercises', name: 'Exercises', component: ExercisesView },
  { path: '/exercises-main', name: 'ExercisesHome', component: ExercisesHomeView },
  { path: '/plans', name: 'plans', component: Plans },
  { path: '/diet-plans', name: 'dietplans', component: DietPlans },
  { path: '/about', name: 'about', component: About },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/trainers', name: 'trainers', component: Trainers },
  { path: '/schedule', name: 'schedule', component: Schedule },
  { path: '/register', name: 'register', component: RegisterView },
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const registeredUser = localStorage.getItem('gym_registered_user')
  const activeSession = localStorage.getItem('gym_active_session') === 'true'

  // 1. لو يحاول يدخل صفحة الداشبورد وهو مش فاتح سيشن نشط
  if (to.meta.requiresAuth && (!registeredUser || !activeSession)) {
    next({ name: 'register' })
  } 
  // 2. لو هو بالفعل مسجل ومسجل دخول (Active) ورايح لصفحة Register/Login
  else if (to.name === 'register' && activeSession) {
    next({ name: 'dashboard' })
  } 
  else {
    next()
  }
})

export default router