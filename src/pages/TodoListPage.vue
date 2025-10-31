<script setup>
import { computed, ref } from 'vue'
import useLocalStorage from '@/hooks/useLocalStorage'
import FormInput from '@/features/todo-list/FormInput.vue'
import TodoList from '@/features/todo-list/TodoList.vue'
import TodoStats from '@/features/todo-list/TodoStats.vue'
import SortList from '@/ui/SortList.vue'

const order = ref('input')
const { list: todos } = useLocalStorage('todos')
const options = [
  { value: 'input', name: 'Input order' },
  { value: 'completion', name: 'Completion' },
  { value: 'alph', name: 'First letter (A-Z)' },
  { value: 'rev-alph', name: 'First letter reversed (Z-A)' },
]

function addNewTodo(newTodo) {
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
  <div class="todo-grid">
    <header class="header">
      <h1 class="header--green">Organize, Focus, Conquer</h1>
      <FormInput :onAdd="addNewTodo" :onDelete="deleteChecked" />
    </header>
    <main class="list">
      <TodoList :todos="sortedTodos" :checkTodo="checkTodo" />
    </main>
    <footer class="footer">
      <div class="wrapper">
        <SortList v-model:order="order" :options="options" />
        <button @click="clearList" class="clear-btn">Clear list</button>
      </div>
      <TodoStats :todos="todos" />
    </footer>
  </div>
</template>

<style scoped>
.todo-grid {
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
  grid-column: 1 / -1;
  /* font-size: 2rem; */
  gap: 1.5rem;

  /* @media screen and (max-width: 680px) {
    font-size: 1.7rem;
  }
  @media screen and (max-width: 562px) {
    font-size: 1.2rem;
  } */
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

  @media screen and (max-width: 451px) {
    grid-column: 1 / -1;
  }
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  font-size: 2rem;

  @media screen and (max-width: 451px) {
    padding: 1.5rem;
  }
}
.clear-btn {
  background-color: transparent;
  border: 3px solid transparent;
  color: var(--text-color);
  transition: all 0.2s;

  &:hover {
    border: 3px solid var(--danger-color);
  }
}
.footer {
  grid-column: 1 / -1;
  grid-row: 3 / 3;
}
</style>
