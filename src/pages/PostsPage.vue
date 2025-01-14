<script setup>
import { getPosts } from '@/services/postsApi'
import { ref, watchEffect } from 'vue'

const posts = ref([])
const page = ref(1)
const isLoading = ref(false)
const error = ref('')

watchEffect(async () => {
  isLoading.value = true
  try {
    posts.value = await getPosts(page, isLoading)
  } catch (err) {
    error.value = err.messageS
    console.error(err.message)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <h1>Posts</h1>
  <button @click="page += 1">Load more</button>
  <ul>
    <li v-for="post in posts" :key="post.id" style="padding: 1rem">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </li>
  </ul>
</template>

<style scoped></style>
