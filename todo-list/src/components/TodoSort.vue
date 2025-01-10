<script setup>
const { onClear } = defineProps({
  order: String,
  onClear: Function,
})
</script>

<template>
  <div class="wrapper">
    <p>Sort by:</p>
    <form @submit.prevent>
      <select name="sort" @input="$emit('update:order', $event.target.value)" class="sort-select">
        <option value="input">Input order</option>
        <option value="completion">Completion</option>
        <option value="alph">First letter (A-Z)</option>
        <option value="rev-alph">First letter reversed (Z-A)</option>
      </select>
    </form>
    <button @click="onClear" class="clear-btn">Clear list</button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  font-size: 2rem;
}
.sort-select {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 2rem;
  font-size: 1.5rem;
}
.clear-btn {
  background-color: transparent;
  border: 3px solid transparent;
  color: var(--text-color);
  transition: all 0.2s;

  &:hover {
    border: 3px solid var(--danger-color);
  }
}
</style>
