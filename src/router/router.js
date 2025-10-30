import PostPage from '@/features/posts/PostPage.vue'
import CalculatorPage from '@/pages/CalculatorPage.vue'
import PostsPage from '@/pages/PostsPage.vue'
import TodoListPage from '@/pages/TodoListPage.vue'
import WikiWannaBe from '@/pages/WikiWannaBe.vue'
import { createRouter, createWebHistory } from 'vue-router'
import WeatherPage from '@/pages/WeatherPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/todos',
  },
  {
    path: '/todos',
    component: TodoListPage,
  },
  {
    path: '/wiki',
    component: () => WikiWannaBe,
  },
  {
    path: '/calculator',
    component: () => CalculatorPage,
  },
  {
    path: '/posts',
    component: () => PostsPage,
  },
  {
    path: '/posts/:id',
    component: () => PostPage,
  },
  {
    path: '/weather',
    component: () => WeatherPage,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory('/simples-w-vue'),
})

export default router
