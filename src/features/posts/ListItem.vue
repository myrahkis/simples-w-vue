<script setup>
const { post } = defineProps({ post: Object })
</script>

<template>
  <li :key="post.id" style="padding: 1rem" class="post">
    <h3 class="title">{{ post.title }}</h3>
    <p class="body">{{ post.body }}</p>
  </li>
</template>

<style scoped>
.post {
  margin: 1.5rem 1rem;
  font-size: 1.5rem;
  border: 1px solid var(--neon-green-color)
}
.title {
  border-bottom: 1px dashed var(--neon-green-color);
  font-size: 2rem;
}
.body {
  padding: 1rem;
}
</style>