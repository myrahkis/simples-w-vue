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
  <div class="wiki-grid">
    <header class="header header--green">
      <h1 class="heading">The Simplest Wiki</h1>
      <SearchInput v-model:searchQuery="searchQuery" :onSubmit="submitHandle" />
    </header>
    <aside class="results-list">
      <ResultsList :searchResult="searchResult" :onResultClick="fetchPage" />
    </aside>
    <h1 v-if="isLoading" class="loader">Loading...</h1>
    <h1 v-if="error" class="error">Error: {{ error }}</h1>
    <main v-show="selectedPage !== ''">
      <div id="page-content" class="wiki-page"></div>
    </main>
  </div>
</template>

<style scoped>
.wiki-grid {
  position: relative;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: 1fr auto;
  padding-bottom: 3rem;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.wiki-page {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  padding: 2rem;
  font-size: 1.5rem;
  border: 1px solid var(--neon-green-color);
}

.loader {
  padding: 2rem;
  font-size: 3rem;
  color: var(--neon-pink-color);
}

.error {
  padding: 2rem;
  font-size: 2.5rem;
  color: var(--neon-pink-color);
}
</style>
