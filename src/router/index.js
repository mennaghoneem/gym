import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ExercisesView from '../views/ExercisesView.vue'
import ExercisesHomeView from '../views/ExercisesHomeView.vue'
import Plans from '../views/Plans.vue'
import DietPlans from '../views/DietPlans.vue' 
import About from '../components/About.vue'
import Contact from '../components/contact.vue'
import Trainers from '../components/Trainers.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: ExercisesView
  },
  {
    path: '/exercises-main',
    name: 'ExercisesHome',
    component: ExercisesHomeView
  },
  {
    path: '/plans',
    name: 'plans',
    component: Plans
  },
  {
    path: '/diet-plans',
    name: 'dietplans',
    component: DietPlans
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/trainers',
    name: 'trainers',
    component: Trainers
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router