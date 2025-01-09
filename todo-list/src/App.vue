<script setup>
import { ref } from 'vue'

const todos = ref([])
const newTodo = ref('')

function handleSubmit() {
  addNewTodo()
}

function addNewTodo() {
  if (!newTodo.value) return

  todos.value.push(newTodo.value)
  newTodo.value = ''
}

function deleteTodo(index) {
  todos.value = todos.value.filter((_, id) => id !== index)
}
</script>

<template>
  <main>
    <h1>HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII!!</h1>
    <input type="text" v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Enter a todo" />
    <button @click="addNewTodo">Add</button>
    <ul v-for="(todo, index) in todos" :key="index">
      <li>
        <input type="checkbox" />
        <p>{{ todo }}</p>
        <button @click="deleteTodo(index)">Del</button>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
