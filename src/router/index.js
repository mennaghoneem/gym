import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ExercisesView from '../views/ExercisesView.vue'
import ExercisesHomeView from '../views/ExercisesHomeView.vue'

// import Plans from '../views/Plans.vue' 
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
  }
//   {
//     path: '/plans',
//     name: 'plans',
//     component: Plans
//   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router