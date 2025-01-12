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
  <form @submit.prevent="submitHandle" class="wrapper">
    <input type="text" v-model="todo" placeholder="Enter a todo" class="input" />
    <button type="submit" class="add-btn">Add</button>
    <button @click="onDelete" class="dlt-checked">Delete finished</button>
  </form>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
}

.add-btn {
  background-image: linear-gradient(
    to right bottom,
    var(--neon-pink-color),
    var(--neon-green-color)
  );
}
.dlt-checked {
  position: relative;
  background-color: transparent;
  padding: 0;

  &:hover::after {
    transform: scaleX(1);
  }
}
.dlt-checked::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--danger-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: all 0.3s ease;
}
</style>
