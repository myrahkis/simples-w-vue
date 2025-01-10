<script setup>
const { todo, onAdd, onDelete } = defineProps(['todo', 'onAdd', 'onDelete'])
</script>

<template>
  <input type="text" @input="$emit('update:todo', $event.target.value)" :value="todo" @keyup.enter="onAdd" placeholder="Enter a todo" />
  <button @click="onAdd">Add</button>
  <button @click="onDelete">Delete finished</button>
</template>
