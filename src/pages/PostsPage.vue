<script setup>
import axios from 'axios'
import { ref } from 'vue'

const posts = ref([])
const isLoading = ref(false)
const postsPerPage = 10

const url = 'https://jsonplaceholder.typicode.com/posts?_limit='

async function getPosts() {
  try {
    isLoading.value = true
    const data = await axios.get(`${url}${postsPerPage}`)

    if (data.request.status !== 200) throw new Error('AAAAAAAAA!')

    posts.value = data.data

    console.log(posts.value)
  } catch (err) {
    console.error(err.message)
  } finally {
    isLoading.value = false
  }
}

getPosts()
</script>

<template>
  <h1>Posts</h1>
  <button @click="s">Load more</button>
  <ul>
    <li v-for="post in posts" :key="post.id" style="padding: 1rem">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </li>
  </ul>
</template>

<style scoped></style>
