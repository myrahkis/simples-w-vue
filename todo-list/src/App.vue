<script setup>
import { computed, ref } from 'vue'
import TodoList from './components/TodoList.vue'
import FormInput from './components/FormInput.vue'
import TodoStats from './components/TodoStats.vue'
import TodoSort from './components/TodoSort.vue'

const todos = ref([])
const order = ref('input')

function addNewTodo(newTodo) {
  console.log(newTodo);
  todos.value.push(newTodo)
}

function checkTodo(id) {
  todos.value = todos.value.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
}

function deleteChecked() {
  todos.value = todos.value.filter((todo) => !todo.done)
}

function clearList() {
  if (todos.value.length === 0) return

  const confirm = window.confirm('This will delete every todo from the list! Proceed?')

  if (confirm) todos.value = []
}

const sortingFunctions = {
  completion: (a, b) => +a.done - +b.done,
  alph: (a, b) => a.todo.localeCompare(b.todo),
  'rev-alph': (a, b) => b.todo.localeCompare(a.todo),
}

const sortedTodos = computed(() => {
  const todosCopy = [...todos.value]
  const sortFunc = sortingFunctions[order.value]
  return sortFunc ? todosCopy.sort(sortFunc) : todosCopy
})
</script>

<template>
  <main>
    <h1>Organize, Focus, Conquer</h1>
    <FormInput :onAdd="addNewTodo" :onDelete="deleteChecked" />
    <TodoList :todos="sortedTodos" :checkTodo="checkTodo" />
    <TodoStats :todos="todos" />
    <TodoSort v-model:order="order" :onClear="clearList" />
  </main>
</template>

<style scoped></style>
