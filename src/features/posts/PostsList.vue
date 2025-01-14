<script setup>
import ListItem from './ListItem.vue'

const { posts } = defineProps({ posts: Array })
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="list">
    <ListItem v-for="post in posts" :post :key="post.title" />
  </TransitionGroup>
</template>

<style scoped>
.list {
  height: 65vh;
  overflow-y: auto;
  padding: 2rem 2.5rem;
  list-style: none;

  scrollbar-width: thin;
  scroll-behavior: smooth;
  scrollbar-color: var(--neon-green-color) transparent;
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
