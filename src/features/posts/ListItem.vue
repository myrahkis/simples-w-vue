<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const { post } = defineProps({ post: Object })

const store = useStore()
const searchQuery = computed(() => store.state.posts.searchQuery)

const highlightSearch = (text) => {
  if (!store.state.posts.searchQuery) return text

  // Создаем регулярное выражение для поиска
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}
</script>

<template>
  <li :key="post.id" class="post">
    <div class="heading">
      <h3 class="title" v-html="highlightSearch(`${post.id}. ${post.title}`)"></h3>
      <button class="open-btn" @click="$router.push(`/posts/${post.id}`)">Open</button>
    </div>
    <p class="body">{{ post.body }}</p>
  </li>
</template>

<style scoped>
.post {
  margin: 1.5rem 1rem;
  font-size: 1.5rem;
  border: 1px solid var(--neon-green-color);
  padding: 1rem 1.5rem;
  background-color: var(--dark-bg-color);
  box-shadow: 0 0.5rem 1.5rem black;
  border-radius: 2rem;

  @media screen and (max-width: 767px) {
    padding: 2rem 2.5rem;
  }
  @media screen and (max-width: 562px) {
    font-size: 1.3rem;
  }
}
.heading {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed var(--neon-green-color);
  padding-bottom: 1rem;
}
.title {
  font-size: 2rem;
  width: 70%;

  @media screen and (max-width: 562px) {
    font-size: 1.8rem;
  }
}
.body {
  padding-top: 1rem;
}
.open-btn {
  border: 2px solid transparent;
  padding: 0.5rem 1rem;
  height: fit-content;
  background-color: var(--neon-green-color);
  color: white;
  transition: all 0.3s;

  &:hover {
    background-color: transparent;
    color: var(--text-color);
    border: 2px solid var(--neon-green-color);
  }
}
</style>
