<script setup>
import { computed } from 'vue'

const { todos } = defineProps(['todos'])

const finished = computed(() => todos.filter((todo) => todo.done).length)
const listLength = computed(() => todos.length)
const percentage = computed(() => Math.floor((finished.value / listLength.value) * 100))
</script>

<template>
  <div class="wrapper">
    <p v-if="finished === 0">Start completing your todos to see progress.</p>
    <p v-else-if="finished === listLength">You've completed it all!</p>
    <p v-else>You've completed {{ finished }} out of {{ listLength }}. That's {{ percentage }}%!</p>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem;
  font-size: 2rem;
  background-color: #e52fe4;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  color: white;
}
</style>