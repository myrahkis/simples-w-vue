<script setup>
import { getPostById } from '@/services/postsApi'
import LoaderSpinner from '@/ui/LoaderSpinner.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const isLoading = ref(false)
const error = ref('')
const post = ref(null)

const route = useRoute()
const router = useRouter()

onMounted(() => {
  fetchPost()
})

async function fetchPost() {
  try {
    isLoading.value = true

    post.value = await getPostById(route.params.id)

    error.value = ''
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

function backHandle() {
  router.back()
}
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <header class="header">
    <h1 class="header--green">Post #{{ $route.params.id }}</h1>
  </header>
  <main class="container">
    <button class="back-btn" @click="backHandle">Go back</button>
    <div class="post-card">
      <h1 class="title">{{ post?.title }}</h1>
      <p class="body">{{ post?.body }}</p>
    </div>
  </main>
</template>

<style scoped>
.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 35%;

  @media screen and (max-width: 562px) {
    width: 85%;
  }
}
.post-card {
  border: 1px solid var(--neon-green-color);
  padding: 1.5rem 2rem;
  background-color: var(--dark-bg-color);
  box-shadow: 0 0.5rem 1.5rem black;
  border-radius: 2rem;
}
.title {
  font-size: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px dotted var(--neon-green-color);
}
.body {
  padding-top: 1.5rem;
  font-size: 1.7rem;
}
.back-btn {
  position: relative;
  align-self: flex-start;
  background-color: transparent;
  border-radius: 0;

  &:hover::after {
    transform: scaleX(1);
  }
}
.back-btn::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--neon-green-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: all 0.3s ease;
}
</style>
