<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import TodoList from './components/TodoList.vue'
import FormInput from './components/FormInput.vue'
import TodoStats from './components/TodoStats.vue'
import TodoSort from './components/TodoSort.vue'

const todos = ref([])
const order = ref('input')

onMounted(() => {
  let stored = localStorage.getItem('todos')

  if (stored !== null) {
    todos.value = JSON.parse(stored)
  }
})

watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  },
  { deep: true },
)

function addNewTodo(newTodo) {
  console.log(newTodo)
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
  <div class="container">
    <header class="header">
      <h1 class="header-text">The best todo treaker</h1>
      <FormInput :onAdd="addNewTodo" :onDelete="deleteChecked" />
    </header>
    <main class="list">
      <TodoList :todos="sortedTodos" :checkTodo="checkTodo" />
    </main>
    <footer class="footer">
      <TodoSort v-model:order="order" :onClear="clearList" />
      <TodoStats :todos="todos" />
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 0.3fr 1fr 0.3fr;
  grid-template-columns: repeat(5, 1fr);
  height: 100vh;
  min-width: 100%;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: aquamarine; */
  grid-column: 1 / -1;
  font-size: 2rem;
  gap: 1.5rem;

  .header-text {
    background-color: #0cbe62;
    color: white;
    width: 100%;
    padding: 1rem;
    padding-bottom: 2rem;
    text-align: center;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
  }
}
.list {
  overflow-y: auto;
  justify-self: center;
  min-width: 100%;
  grid-column: 2 / 5;
  grid-row: 2 / 2;

  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-gutter: both-edges;
  scrollbar-color: #0c0d30 #07081d;
}
.footer {
  /* background-color: yellowgreen; */
  grid-column: 1 / -1;
  grid-row: 3 / 3;
}
</style>
