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
    <div class="heading">
      <h3 class="title" v-html="highlightSearch(post.title)"></h3>
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
