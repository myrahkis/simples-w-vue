<script setup>
import LoaderSpinner from '@/ui/LoaderSpinner.vue'
import { getPosts } from '@/services/postsApi'
import { computed, ref, watchEffect } from 'vue'
import AddPostForm from '@/features/posts/AddPostForm.vue'
import PostsList from '@/features/posts/PostsList.vue'
import SortList from '@/ui/SortList.vue'

const posts = ref([])
const page = ref(1)
const isLoading = ref(false)
const error = ref('')
const showModal = ref(false)
const order = ref('default')
const options = [
  { value: 'defaul', name: 'Default order' },
  { value: 'title', name: 'Title' },
  { value: 'body', name: 'Body' },
]

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

const sortingFunctions = {
  title: (a, b) => a.title.localeCompare(b.title),
  body: (a, b) => a.body.localeCompare(b.body),
}

const sortedList = computed(() => {
  const listCopy = [...posts.value]
  const sortFunc = sortingFunctions[order.value]
  return sortFunc ? listCopy.sort(sortFunc) : listCopy
})
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <AddPostForm :addNewPost="addNewPost" :showModal="showModal" @closeModal="showModal = false" />
  <header class="header">
    <h1 class="header--green">Posts page</h1>
    <div class="btns-wrapper">
      <button @click="page += 1" class="header-btn">Load more</button>
      <button @click="showModal = true" class="header-btn">Add new post</button>
    </div>
  </header>
  <main>
    <PostsList :posts="sortedList" />
  </main>
  <footer class="footer">
    <SortList v-model:order="order" :options="options" />
  </footer>
</template>

<style scoped>
.header {
  font-size: 2rem;
}
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  font-size: 2rem;
  padding: 2rem;
}
.btns-wrapper {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
}
.header-btn {
  border: 2px solid var(--neon-pink-color);
  background-color: transparent;
  transition: all 0.2s;

  &:hover {
    background-color: var(--neon-pink-color);
    color: var(--dark-bg-color);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
}
</style>
