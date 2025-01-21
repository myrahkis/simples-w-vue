import { getPosts } from '@/services/postsApi'
import { ref } from 'vue'

function usePosts() {
  const posts = ref([])
  const page = ref(1)
  const isLoading = ref(false)
  const error = ref('')

  async function fetchPosts() {
    isLoading.value = true

    try {
      const newPosts = await getPosts(page)

      posts.value = [...posts.value, ...newPosts]

      error.value = ''
    } catch (err) {
      error.value = err.messageS
    } finally {
      isLoading.value = false
    }

    page.value += 1
  }

  return { posts, page, isLoading, error, fetchPosts }
}

export default usePosts
