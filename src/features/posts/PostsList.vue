<script setup>
import ListItem from './ListItem.vue';

const { posts } = defineProps({ posts: Array })
</script>

<template>
  <ul>
    <ListItem v-for="post in posts" :post :key="post.title" />
  </ul>
</template>
