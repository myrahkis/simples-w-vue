<script setup>
import { ref } from 'vue'
import TodoListPage from './pages/TodoListPage.vue'
import CalculatorPage from './pages/CalculatorPage.vue'
import WikiWannaBe from './pages/WikiWannaBe.vue'
import PostsPage from './pages/PostsPage.vue';

const page = ref('posts')
</script>

<template>
  <nav>
    <a @click="() => (page = 'todo-list')">Todo list</a>
    <a @click="() => (page = 'calculator')">Calculator</a>
    <a @click="() => (page = 'wiki')">Wiki</a>
    <a @click="() => (page = 'posts')">Posts</a>
  </nav>
  <TodoListPage v-if="page === 'todo-list'" />
  <CalculatorPage v-if="page === 'calculator'" />
  <WikiWannaBe v-if="page === 'wiki'" />
  <PostsPage v-if="page === 'posts'" />
</template>

<style scoped></style>
