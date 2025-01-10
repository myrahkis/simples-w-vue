<script setup>
const { todos, checkTodo } = defineProps(['todos', 'checkTodo'])
</script>

<template>
  <ul class="list">
    <li v-for="todo in todos" :key="todo.id" class="row">
      <input type="checkbox" :checked="todo.done" @click="checkTodo(todo.id)" class="check" :id="todo.id" />
      <label class="todo-item" :for="todo.id">{{ todo.todo }}</label>
    </li>
  </ul>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-self: center;
  /* background-color: brown; */
  padding: 1rem 2rem;
}
.check {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.check + .todo-item {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.check + .todo-item::before {
  content: '';
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid white;
  border-radius: 50%;
  flex-shrink: 0;
  flex-grow: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  margin-right: 1.5rem;
}
.check:checked + .todo-item::before {
  border-color: white;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.ccheck:not(:disabled):active + .todo-item::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}

.row {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  font-size: 2.5rem;
  border-bottom: 2px solid #101248;
  transition: all 0.2s;

  &:hover {
    background-color: #0c0d30;
  }
}
.todo-item {
  width: 100%;
}
</style>
