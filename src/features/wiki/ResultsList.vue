<script setup>
const { searchResult, onResultClick } = defineProps({
  searchResult: Array,
  onResultClick: Function,
})
</script>

<template>
  <div class="container">
    <h3 class="heading" v-if="searchResult.length !== 0">Best matches:</h3>
    <ul class="list">
      <li
        v-for="result in searchResult"
        :key="result.pageid"
        class="result-item"
        @click="onResultClick(result.title)"
      >
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  position: sticky;
  top: 13rem;
  left: 0.5rem;
  height: 100vh;
}
.heading {
  font-size: 3.1rem;
}
.list {
  overflow-y: auto;
  max-height: 100vh;
  list-style: none;
  margin-top: 2rem;

  scrollbar-width: thin;
  scrollbar-color: var(--neon-green-color) transparent;
  scroll-behavior: smooth;
}
.result-item {
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1rem;
  font-size: 2.1rem;
  transition: all 0.3s;

  &:not(:last-child) {
    border-bottom: 1px dotted var(--neon-green-color);
  }

  &:hover {
    background-color: var(--neon-green-color);
    color: var(--dark-bg-color);
  }

  &:focus {
    background-color: var(--neon-green-color);
    color: var(--dark-bg-color);
  }
}
</style>
