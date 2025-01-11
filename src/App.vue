<script setup>
import { ref } from 'vue'
import TodoListPage from './pages/TodoListPage.vue'
import CalculatorPage from './pages/CalculatorPage.vue';

const page = ref('calculator')
</script>

<template>
  <nav>
    <a @click="() => (page = 'todo-list')">Todo list</a>
    <a @click="() => (page = 'calculator')">Calculator</a>
  </nav>
  <TodoListPage v-if="page === 'todo-list'" />
  <CalculatorPage v-if="page === 'calculator'" />
</template>

<style scoped></style>
