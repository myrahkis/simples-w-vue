<script setup>
const { onAdd, onErase, onClear, onEquals } = defineProps({
  onAdd: Function,
  onErase: Function,
  onClear: Function,
  onEquals: Function,
})
</script>

<template>
  <button class="cell" @click="onErase">&lArr;</button>
  <button class="cell" @click="onClear">C</button>
  <button @click="onAdd('%')" class="cell mod">MOD</button>
  <button @click="onAdd('/')" class="cell">/</button>
  <button @click="onAdd('7')" class="cell">7</button>
  <button @click="onAdd('8')" class="cell">8</button>
  <button @click="onAdd('9')" class="cell">9</button>
  <button @click="onAdd('*')" class="cell">*</button>
  <button @click="onAdd('4')" class="cell">4</button>
  <button @click="onAdd('5')" class="cell">5</button>
  <button @click="onAdd('6')" class="cell">6</button>
  <button @click="onAdd('-')" class="cell">-</button>
  <button @click="onAdd('1')" class="cell">1</button>
  <button @click="onAdd('2')" class="cell">2</button>
  <button @click="onAdd('3')" class="cell">3</button>
  <button @click="onAdd('+')" class="cell">+</button>
  <button @click="onAdd('0')" class="cell zero">0</button>
  <button @click="onAdd('.')" class="cell">.</button>
  <button class="cell equals" @click="onEquals">=</button>
</template>

<style scoped>
.cell {
  border-radius: 0;
  background-color: transparent;
  border: 1px solid var(--neon-green-color);
  transition: all 0.2s;

  &:last-child {
    outline: 2px solid var(--dark-bg-color);
    outline-offset: -3px;
  }

  &:hover {
    transform: translateY(-3px);
    background-color: var(--neon-green-color);
    color: var(--dark-bg-color);
  }
  &:active {
    transform: translateY(0);
  }
}
.zero {
  grid-column: 1 / 3;
}
.equals {
  background-color: var(--neon-green-color);
  color: var(--dark-bg-color);
}
</style>
