<script setup>
const { order, options } = defineProps({ order: String, options: Array })
</script>

<template>
  <label class="sort-label">Sort by:</label>
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

  @media screen and (max-width: 451px) {
    font-size: 1.3rem;
  }
}
.sort-label {
  @media screen and (max-width: 451px) {
   font-size: 1.5rem;
  }
}
</style>
