<script setup>
const { todos, checkTodo } = defineProps(['todos', 'checkTodo'])
</script>

<template>
  <ul v-for="todo in todos" :key="todo.id">
    <li class="row">
      <input type="checkbox" :checked="todo.done" @click="checkTodo(todo.id)" />
      <p>{{ todo.todo }}</p>
    </li>
  </ul>
</template>

<style scoped>
.row {
  display: flex;
}
</style>
