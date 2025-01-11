<script setup>
import { ref } from 'vue'
import TodoListPage from './pages/TodoListPage.vue'

const page = ref('todo-list')
</script>

<template>
  <nav>
    <a @click="() => (page = 'todo-list')">Todo list</a>
    <a @click="() => (page = 'calculator')">Calculator</a>
  </nav>
  <TodoListPage v-if="page === 'todo-list'" />
  <h1 v-if="page === 'calculator'">CALCULATOR</h1>
</template>

<style scoped></style>
