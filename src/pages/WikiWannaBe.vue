<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getParsedPage, getSearchResults } from '@/services/wikiApi'
import ResultsList from '@/features/wiki/ResultsList.vue'
import SearchInput from '@/features/wiki/SearchInput.vue'
import LoaderSpinner from '@/ui/LoaderSpinner.vue'

const searchQuery = ref('')
const searchResult = ref([])
const isLoading = ref(false)
const error = ref(null)
const isInputFocused = ref(false)

const selectedPage = ref('')

function handleFocus() {
  isInputFocused.value = true
}
// function handleBlur() {
//   isInputFocused.value = false
// }

function handleBlur(event) {
  if (!event.target.closest('.header') && !event.target.closest('.results-list')) {
    isInputFocused.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleBlur)
})
onUnmounted(() => {
  document.removeEventListener('click', handleBlur)
})

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

    isInputFocused.value = false

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
      <SearchInput
        v-model:searchQuery.trim="searchQuery"
        @focus="handleFocus"
        :onSubmit="submitHandle"
      />
    </header>
    <aside v-if="isInputFocused && searchResult.length > 0" class="results-list">
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
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 0.5rem 2rem var(--dark-bg-color);

  .heading {
    text-align: center;
    padding-bottom: 1.2rem;
    /* font-size: 3.5rem; */

    @media screen and (max-width: 562px) {
      /* font-size: 2.8rem; */
    }
  }

  @media screen and (max-width: 680px) {
    grid-row: 1 / 2;
  }
}

.wiki-page {
  gap: 2rem;
  margin: 3rem;
  padding: 2rem;
  font-size: 1.5rem;
  border: 1px solid var(--neon-green-color);
  border-radius: 2rem;

  @media screen and (max-width: 562px) {
    padding: 1rem;
    margin: 0;
    margin-top: 1.5rem;
  }
}

.error {
  padding: 2rem;
  font-size: 2.5rem;
  color: var(--neon-pink-color);
  text-align: center;
}
</style>
