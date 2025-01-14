<script setup>
import ListItem from './ListItem.vue'

const { posts } = defineProps({ posts: Array })
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <ListItem v-for="post in posts" :post :key="post.title" />
  </TransitionGroup>
</template>

<style scoped>
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
