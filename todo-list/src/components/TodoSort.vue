<script setup>
const { onClear } = defineProps(['order', 'onClear'])
</script>

<template>
  <p>Sort by:</p>
  <select name="sort" @input="$emit('update:order', $event.target.value)">
    <option value="input">Input order</option>
    <option value="completion">Completion</option>
    <option value="alph">First letter (A-Z)</option>
    <option value="rev-alph">First letter reversed (Z-A)</option>
  </select>
  <button @click="onClear">Clear list</button>
</template>
