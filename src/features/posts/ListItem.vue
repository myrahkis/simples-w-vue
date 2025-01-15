<script setup>
const { post, searchQuery } = defineProps({ post: Object, searchQuery: String })

const highlightSearch = (text) => {
  if (!searchQuery) return text

  // Создаем регулярное выражение для поиска
  const regex = new RegExp(`(${searchQuery})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}
</script>

<template>
  <li :key="post.id" class="post">
    <h3 class="title" v-html="highlightSearch(post.title)"></h3>
    <p class="body">{{ post.body }}</p>
  </li>
</template>

<style scoped>
.post {
  margin: 1.5rem 1rem;
  font-size: 1.5rem;
  border: 1px solid var(--neon-green-color);
  padding: 1rem;
  background-color: var(--dark-bg-color);
  box-shadow: 0 0.5rem 1.5rem black;
  border-radius: 2rem;
  height: fit-content;
  /* background-color: #090b27; */
}
.title {
  border-bottom: 1px dashed var(--neon-green-color);
  font-size: 2rem;
}
.body {
  padding: 1rem;
}
</style>
