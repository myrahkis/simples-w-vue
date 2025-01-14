<script setup>
const { post } = defineProps({ post: Object })
</script>

<template>
  <li :key="post.id" style="padding: 1rem">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </li>
</template>
