<script setup>
import LoaderSpinner from '@/ui/LoaderSpinner.vue'
import { getPosts } from '@/services/postsApi'
import { ref, watchEffect } from 'vue'
import AddPostForm from '@/features/posts/AddPostForm.vue'

const posts = ref([])
const page = ref(1)
const isLoading = ref(false)
const error = ref('')
const showModal = ref(false)

watchEffect(async () => {
  isLoading.value = true

  try {
    posts.value = await getPosts(page)

    error.value = ''
  } catch (err) {
    error.value = err.messageS
  } finally {
    isLoading.value = false
  }
})

function addNewPost(newPost) {
  posts.value.push(newPost)
  showModal.value = false
}
</script>

<template>
  <h1>Posts</h1>
  <button @click="page += 1">Load more</button>
  <AddPostForm :addNewPost="addNewPost" :showModal="showModal" @closeModal="showModal = false" />
  <button @click="showModal = true">Add new post</button>
  <LoaderSpinner v-if="isLoading" />
  <ul>
    <li v-for="post in posts" :key="post.id" style="padding: 1rem">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </li>
  </ul>
</template>

<style scoped></style>
