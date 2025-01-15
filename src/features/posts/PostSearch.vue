<script setup>
const { searchQuery } = defineProps({ searchQuery: String })
</script>

<template>
  <input
    class="input"
    type="text"
    placeholder="Search by title"
    @input="$emit('update:searchQuery', $event.target.value)"
  />
</template>

<style>
.input {
  margin-right: 0.5rem;
}
</style>
