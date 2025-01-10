<script setup>
import { computed, ref } from 'vue'

const todos = ref([])
const todo = ref(null)
const order = ref('input')

const finished = computed(() => todos.value.filter((todo) => todo.done).length)
const listLength = computed(() => todos.value.length)
const percentage = computed(() => Math.floor((finished.value / listLength.value) * 100))

function addNewTodo() {
  if (!todo.value) return

  const newTodo = {
    todo: todo.value,
    done: false,
  }

  todos.value.push(newTodo)
  todo.value = null
}

function checkTodo(index) {
  todos.value = todos.value.map((todo, id) => (id === index ? { ...todo, done: !todo.done } : todo))
}

function deleteChecked() {
  todos.value = todos.value.filter((todo) => !todo.done)
}

function clearList() {
  todos.value = []
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
    <h1>HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII!!</h1>
    <input type="text" v-model="todo" @keyup.enter="addNewTodo" placeholder="Enter a todo" />
    <button @click="addNewTodo">Add</button>
    <ul v-for="(todo, index) in sortedTodos" :key="index">
      <li class="row">
        <input type="checkbox" :checked="todo.done" @click="checkTodo(index)" />
        <p>{{ todo.todo }}</p>
      </li>
    </ul>
    <button @click="deleteChecked">Delete finished</button>
    <button @click="clearList">Clear list</button>
  </main>
  <div v-if="listLength > 0">
    <p v-if="finished === 0">Start completing your todos to see progress.</p>
    <p v-else-if="finished === listLength">You've completed it all!</p>
    <p v-else>You've completed {{ finished }} out of {{ listLength }}. That's {{ percentage }}%!</p>
  </div>
  <div>
    <hr />
    <p>Sort by:</p>
    <select name="sort" v-model="order">
      <option value="input">Input order</option>
      <option value="completion">Completion</option>
      <option value="alph">First letter (A-Z)</option>
      <option value="rev-alph">First letter reversed (Z-A)</option>
    </select>
  </div>
</template>

<style scoped>
.row {
  display: flex;
}
</style>
