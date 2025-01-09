<script setup>
import { computed, ref } from 'vue'

const todos = ref([])
const todo = ref(null)

const finished = computed(() => todos.value.filter((todo) => todo.done).length);
const listLength = computed(() => todos.value.length);

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
</script>

<template>
  <main>
    <h1>HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII!!</h1>
    <input type="text" v-model="todo" @keyup.enter="addNewTodo" placeholder="Enter a todo" />
    <button @click="addNewTodo">Add</button>
    <ul v-for="(todo, index) in todos" :key="index">
      <li class="row">
        <input type="checkbox" :checked="todo.done" @click="checkTodo(index)" />
        <p>{{ todo.todo }}</p>
      </li>
    </ul>
    <button @click="deleteChecked">Delete finished</button>
    <button @click="clearList">Clear list</button>
  </main>
  <div v-if="listLength > 0">
    <p>You completed {{ finished }} out of {{ listLength }}</p>
  </div>
</template>

<style scoped>
.row {
  display: flex;
}
</style>
