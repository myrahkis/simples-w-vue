<script setup>
import { useStore } from 'vuex'

const store = useStore()
const setShowModal = (value) => store.commit('posts/setShowModal', value)
</script>

<template>
  <div class="modal-bg" v-if="$store.state.posts.showModal" @click.stop="setShowModal(false)">
    <slot></slot>
  </div>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.297);
  backdrop-filter: blur(2px);
}
</style>
