<script setup>
const { searchQuery } = defineProps({ searchQuery: String })
</script>

<template>
  <input
    class="input u-mr-sm"
    type="text"
    placeholder="Search by title"
    @input="$emit('update:searchQuery', $event.target.value)"
  />
</template>

<style>
.u-mr-sm {
  margin-right: 0.5rem;
}
</style>
