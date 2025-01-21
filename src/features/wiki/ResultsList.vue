<script setup>
const { searchResult, onResultClick } = defineProps({
  searchResult: Array,
  onResultClick: Function,
})
</script>

<template>
  <div class="container">
    <!-- <h3 class="heading" v-if="searchResult.length !== 0">Best matches:</h3> -->
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
  position: fixed;
  top: 11rem;
  /* right: calc(41%); */
  left: 48%;
  transform: translate(-48%);
  width: 35rem;
  background: var(--dark-bg-color);
  border: 1px solid var(--neon-green-color);
  z-index: 1000;
  border-bottom-right-radius: 2rem;
  border-bottom-left-radius: 2rem;

  @media screen and (max-width: 562px) {
    width: 25rem;
  }
  @media screen and (max-width: 451px) {
    width: 22rem;
  }
}
.heading {
  font-size: 3.1rem;

  @media screen and (max-width: 680px) {
    font-size: 2.5rem;
  }
}
.list {
  overflow-y: auto;
  max-height: 75vh;
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

  @media screen and (max-width: 680px) {
    font-size: 1.8rem;
  }
}
</style>
