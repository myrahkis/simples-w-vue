<script setup>
const { options } = defineProps({ options: Array })
</script>

<template>
  <p>Sort by:</p>
  <form @submit.prevent>
    <select name="sort" @change="$emit('update:order', $event.target.value)" class="sort-select">
      <option v-for="{ value, name } in options" :value="value" :key="value">{{ name }}</option>
    </select>
  </form>
</template>

<style scoped>
.sort-select {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 2rem;
  font-size: 1.5rem;
}
</style>
