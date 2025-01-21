<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import LoaderSpinner from '@/ui/LoaderSpinner.vue'
import AddPostForm from '@/features/posts/AddPostForm.vue'
import PostsList from '@/features/posts/PostsList.vue'
import SortList from '@/ui/SortList.vue'
import PostSearch from '@/features/posts/PostSearch.vue'
import usePosts from '@/features/posts/usePosts'
import useIntersection from '@/features/posts/useIntersection'

const MAX_PAGES = Math.ceil(100 / 12)
const order = ref('default')
const options = [
  { value: 'defaul', name: 'Default order' },
  { value: 'title', name: 'Title' },
  { value: 'body', name: 'Body' },
]
const { posts, page, isLoading, error, fetchPosts } = usePosts()
const observerRef = useIntersection(fetchPosts, MAX_PAGES, page)

const store = useStore()
const setShowModal = (value) => store.commit('posts/setShowModal', value)

function addNewPost(newPost) {
  posts.value.push(newPost)
  setShowModal(false)
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

const filteredAndSortedList = computed(() => {
  return sortedList.value.filter((post) =>
    post.title.includes(store.state.posts.searchQuery.toLowerCase()),
  )
})
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <AddPostForm :addNewPost="addNewPost" />
  <header class="header">
    <h1 class="header--green">Posts page</h1>
    <div class="btns-wrapper">
      <PostSearch />
      <button @click="setShowModal(true)" class="header-btn">Add new post</button>
    </div>
  </header>
  <main class="main">
    <PostsList :posts="filteredAndSortedList" />
    <div ref="observerRef" class="obs"></div>
  </main>
  <footer class="footer">
    <SortList v-model:order="order" :options="options" />
  </footer>
</template>

<style scoped>
.header {
  font-size: 2rem;
}
.main {
  height: 65vh;
  overflow-y: auto;

  scrollbar-width: thin;
  scroll-behavior: smooth;
  scrollbar-color: var(--neon-green-color) transparent;
}
.obs {
  height: 5vh;
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
.obs {
  height: 0.5rem;
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
