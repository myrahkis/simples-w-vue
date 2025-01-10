<script setup>
import { ref } from 'vue'

const { onAdd, onDelete } = defineProps({
  onAdd: Function,
  onDelete: Function,
})
const todo = ref('')

function submitHandle() {
  if (!todo.value) return

  const newTodo = {
    id: Date.now(),
    todo: todo.value,
    done: false,
  }

  onAdd(newTodo)

  todo.value = ''
}
</script>

<template>
  <form @submit.prevent="submitHandle">
    <input type="text" v-model="todo" placeholder="Enter a todo" />
    <button type="submit">Add</button>
    <button @click="onDelete">Delete finished</button>
  </form>
</template>
