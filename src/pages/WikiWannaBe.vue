<script setup>
import ResultsList from '@/features/wiki/ResultsList.vue'
import SearchInput from '@/features/wiki/SearchInput.vue'
import { getParsedPage, getSearchResults } from '@/services/wikiApi'
import LoaderSpinner from '@/ui/LoaderSpinner.vue'
import { ref } from 'vue'

const searchQuery = ref('')
const searchResult = ref([])
const isLoading = ref(false)
const error = ref(null)

const selectedPage = ref('')

async function submitHandle() {
  if (searchQuery.value === '') return

  try {
    isLoading.value = true

    searchResult.value = await getSearchResults(searchQuery.value)

    error.value = ''
  } catch (err) {
    error.value = err.message
    console.log(err.message)
  } finally {
    isLoading.value = false
  }
}

async function appendPage(title) {
  try {
    isLoading.value = true

    selectedPage.value = await getParsedPage(title)

    const container = document.getElementById('page-content')

    if (container) container.innerHTML = selectedPage.value

    error.value = ''
  } catch (err) {
    error.value = err.message
    console.error(err.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <div class="wiki-grid">
    <header class="header header--green">
      <h1 class="heading">The Simplest Wiki</h1>
      <SearchInput v-model:searchQuery.trim="searchQuery" :onSubmit="submitHandle" />
    </header>
    <aside v-if="searchResult.length > 0" class="results-list">
      <ResultsList :searchResult="searchResult" :onResultClick="appendPage" />
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

.error {
  padding: 2rem;
  font-size: 2.5rem;
  color: var(--neon-pink-color);
  text-align: center;
}
</style>
