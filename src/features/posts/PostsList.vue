<script setup>
import ListItem from './ListItem.vue';

const { posts, searchQuery } = defineProps({
  posts: Array,
  searchQuery: String,
})
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="list">
    <ListItem v-for="post in posts" :post="post" :searchQuery="searchQuery" :key="post.title" />
  </TransitionGroup>
</template>

<style scoped>
.list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1.5rem;
  padding: 2rem 4rem;
  list-style: none;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
