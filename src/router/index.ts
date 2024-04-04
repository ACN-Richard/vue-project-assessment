import { createRouter, createWebHistory } from 'vue-router'
import Countries from '../views/Countries.vue'
import Crud from '../components/Crud.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'countries',
      component: Countries
    },
    {
      path: '/crud',
      name: 'crud',
      component: Crud
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ]
})

export default router
