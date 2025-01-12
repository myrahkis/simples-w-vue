<script setup>
import { ref } from 'vue'
import TodoListPage from './pages/TodoListPage.vue'
import CalculatorPage from './pages/CalculatorPage.vue'
import WikiWannaBe from './pages/WikiWannaBe.vue'

const page = ref('wiki')
</script>

<template>
  <nav>
    <a @click="() => (page = 'todo-list')">Todo list</a>
    <a @click="() => (page = 'calculator')">Calculator</a>
    <a @click="() => (page = 'wiki')">Wiki</a>
  </nav>
  <TodoListPage v-if="page === 'todo-list'" />
  <CalculatorPage v-if="page === 'calculator'" />
  <WikiWannaBe v-if="page === 'wiki'" />
</template>

<style scoped></style>
