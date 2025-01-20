const postsModule = {
  state: {
    showModal: false,
    searchQuery: '',
  },
  mutations: {
    setShowModal(state, bool) {
      state.showModal = bool
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
  },
  namespaced: true,
}

export default postsModule
