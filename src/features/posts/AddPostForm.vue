<script setup>
import BgBlurModal from '@/ui/BgBlurModal.vue'
import { addPost } from '@/services/postsApi'
import { ref } from 'vue'

const { showModal, addNewPost } = defineProps({
  showModal: Boolean,
  addNewPost: Function,
})

const postTitle = ref('')
const postBody = ref('')
const error = ref('')

function submitHandle() {
  if (!postTitle.value || !postBody.value) return

  const newPost = {
    title: postTitle.value,
    body: postBody.value,
    userId: Date.now(),
  }

  try {
    addPost(newPost) // не добавляет на сервер, а имитирует
    addNewPost(newPost)

    error.value = ''
  } catch (err) {
    error.value = err.message
  }

  postTitle.value = ''
  postBody.value = ''
}
</script>

<template>
  <BgBlurModal :showModal="showModal">
    <form method="POST" @submit.prevent="submitHandle" class="form" @click.stop>
      <button @click="$emit('closeModal', false)" class="close-btn">&#10006;</button>
      <div class="colunm">
        <label for="title" class="label">Post title</label>
        <input class="input" id="title" type="text" v-model="postTitle" placeholder="title" />
      </div>
      <div class="colunm">
        <label for="body" class="label">Post body</label>
        <input class="input" id="body" type="text" v-model="postBody" placeholder="body" />
      </div>
      <button type="submit" class="add-post">Add post</button>
    </form>
  </BgBlurModal>
</template>

<style scoped>
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--neon-pink-color);
  width: fit-content;
  padding: 3rem;
  border-radius: 2rem;
}

.colunm {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 0.5rem;
}

.label {
  color: var(--dark-bg-color);
  font-size: 2.3rem;
  font-weight: 700;
}

.input {
  outline-offset: 0;
  transition: all 0.1s;

  &:focus {
    outline-color: var(--dark-bg-color);
  }
}

.add-post {
  background-color: var(--dark-bg-color);
  transition: all 0.2s;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
  color: var(--danger-color);
  align-self: flex-end;
  padding: 0.8rem 1rem;
  font-size: 2rem;
  line-height: 2rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--danger-color);
    color: var(--text-color);
  }
}
</style>
