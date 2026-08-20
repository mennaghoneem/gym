import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import ExercisesView from '../view/ExercisesView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: ExercisesView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router