<script setup>
import ResultsList from '@/features/wiki/ResultsList.vue'
import SearchInput from '@/features/wiki/SearchInput.vue'
import { ref } from 'vue'

const searchQuery = ref('')
const searchResult = ref([])
const isLoading = ref(false)
const error = ref(null)

const selectedPage = ref('')

const url = 'https://en.wikipedia.org/w/api.php?format=json&origin=*'
const searchParams = '&list=search&prop=info&inprop=url&action=query&srlimit=80&srsearch='
const pageParams = '&action=parse&page='

async function fetchSearchQuery(query) {
  try {
    isLoading.value = true

    const res = await fetch(`${url}${searchParams}${query}`)

    if (!res.ok) throw new Error("Couldn't fetch search data.")

    const data = await res.json()

    if (data.query.search.length === 0) throw new Error(`${query} couldn't be found.`)

    searchResult.value = data.query.search
    error.value = ''
  } catch (err) {
    console.error(err.message)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

async function fetchPage(title) {
  try {
    isLoading.value = true

    const res = await fetch(`${url}${pageParams}${title}`)

    if (!res.ok) throw new Error("Couldn't get page code.")

    const data = await res.json()

    if (!data.parse) throw new Error(`Page '${title}' couldn't be found.`)

    // console.log(data.parse)
    selectedPage.value = data.parse.text['*']

    const container = document.getElementById('page-content')

    if (container) container.innerHTML = selectedPage.value

    error.value = ''
  } catch (err) {
    console.error(err.message)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

function submitHandle() {
  if (searchQuery.value === '') return

  fetchSearchQuery(searchQuery.value)
}
</script>

<template>
  <div v-if="isLoading" class="loader-wrapper">
    <span class="loader"></span>
  </div>
  <div class="wiki-grid">
    <header class="header header--green">
      <h1 class="heading">The Simplest Wiki</h1>
      <SearchInput v-model:searchQuery="searchQuery" :onSubmit="submitHandle" />
    </header>
    <aside v-if="searchResult.length > 0" class="results-list">
      <ResultsList :searchResult="searchResult" :onResultClick="fetchPage" />
    </aside>
    <main v-show="selectedPage !== ''">
      <div id="page-content" class="wiki-page"></div>
    </main>
  </div>
  <h1 v-if="error" class="error">Error: {{ error }}</h1>
</template>

<style scoped>
.wiki-grid {
  position: relative;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: 1fr auto;
  justify-self: center;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  grid-column: 1 / -1;
  box-shadow: 0 0.5rem 2rem var(--dark-bg-color);

  .heading {
    text-align: center;
    padding-bottom: 1.2rem;
    font-size: 3.5rem;
  }
}

.results-list {
  grid-row: 2 / -1;
  display: flex;
  flex-direction: column;
  /* max-width: 100%; */
  padding: 2rem;
}

.wiki-page {
  gap: 2rem;
  margin-top: 1.5rem;
  padding: 2rem;
  font-size: 1.5rem;
  border: 1px solid var(--neon-green-color);
}

.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.297);
  backdrop-filter: blur(2px);
}
.loader {
  position: absolute;
  width: 5rem;
  height: 5rem;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1.3rem solid var(--neon-green-color);
  border-left-color: var(--neon-pink-color);
  animation: loader 3s infinite;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.error {
  padding: 2rem;
  font-size: 2.5rem;
  color: var(--neon-pink-color);
  text-align: center;
}
</style>
