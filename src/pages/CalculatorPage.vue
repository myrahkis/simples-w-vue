<script setup>
import { evaluate } from 'mathjs'
import { nextTick, ref, watch } from 'vue'

const expression = ref('0')
const result = ref('')

function isValidExpression(expr) {
  try {
    // если посчиталось с ошибкой (напр, выражение заканчивается оператором), то выражение не корректно
    evaluate(expr || '0')
    return true
  } catch {
    return false
  }
}

watch(
  expression,
  () => {
    if (isValidExpression(expression.value)) {
      result.value = evaluate(expression.value).toString()
    }
  },
  { immediate: true },
)

function addToDisplay(value) {
  if (expression.value === '0') {
    expression.value = value
  } else {
    expression.value += value
  }
}

function clearDisplay() {
  expression.value = '0'
  result.value = ''
}

function eraseChar() {
  expression.value = expression.value.slice(0, -1) || '0'
}

function doneCalculating() {
  if (result.value !== '') {
    expression.value = result.value

    // nextTick для очистки result после завершения обновлений
    // иначе watch перезаписывает значение
    nextTick(() => {
      result.value = ''
    })
  }
}
</script>

<template>
  <div class="container">
    <div class="calculator-grid">
      <input class="display" type="text" v-model="expression" disabled />
      <p class="result-cell">{{ result }}</p>
      <button class="cell" @click="eraseChar">&lArr;</button>
      <button class="cell" @click="clearDisplay">C</button>
      <button @click="addToDisplay('%')" class="cell mod">MOD</button>
      <button @click="addToDisplay('/')" class="cell">/</button>
      <button @click="addToDisplay('7')" class="cell">7</button>
      <button @click="addToDisplay('8')" class="cell">8</button>
      <button @click="addToDisplay('9')" class="cell">9</button>
      <button @click="addToDisplay('*')" class="cell">*</button>
      <button @click="addToDisplay('4')" class="cell">4</button>
      <button @click="addToDisplay('5')" class="cell">5</button>
      <button @click="addToDisplay('6')" class="cell">6</button>
      <button @click="addToDisplay('-')" class="cell">-</button>
      <button @click="addToDisplay('1')" class="cell">1</button>
      <button @click="addToDisplay('2')" class="cell">2</button>
      <button @click="addToDisplay('3')" class="cell">3</button>
      <button @click="addToDisplay('+')" class="cell">+</button>
      <button @click="addToDisplay('0')" class="cell zero">0</button>
      <button @click="addToDisplay('.')" class="cell">.</button>
      <button class="cell equals" @click="doneCalculating">=</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.calculator-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr auto repeat(5, 1fr);
  max-width: 45%;
  justify-content: center;
  border: 2px solid var(--neon-green-color);
}
.display {
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  margin: 1.5rem;
  padding: 1rem;
  font-size: 2.3rem;
}
.result-cell {
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  padding: 1.5rem;
  padding-top: 0;
  font-size: 3rem;
  text-align: right;
  height: 5rem;
}
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
