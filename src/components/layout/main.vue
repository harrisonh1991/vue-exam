<template>
  <main v-if="currentQuestion" class="main">
    <div class="main-content">
      <h2 class="main-title">{{ currentQuestion.title }}</h2>
      <div class="main-content">
        <FormRadio
          v-if="currentQuestion.type === 'radio'"
          :options="currentQuestion.options"
          @change="handleChange"
        />
        <FormCheckbox
          v-else-if="currentQuestion.type === 'checkbox'"
          @change="handleChange"
          :options="currentQuestion.options"
        />
        <div v-else v-html="JSON.stringify(currentQuestion)"></div>
      </div>
      <div class="main-footer flex justify-between">
        <button class="btn main-btn" @click="handleClick(0)">Previous</button>
        <button class="btn main-btn" @click="handleClick(1)">Next</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import FormRadio from '@/components/form/radio.vue'
import FormCheckbox from '@/components/form/checkbox.vue'

defineOptions({
  name: 'component-examination',
})
const store = useStore()

// State
const answer = ref(null)

// Store Getters
const examData = computed(() => store.getters['exam/examData'])
const questionIndex = computed(() => store.getters['exam/questionIndex'])
// Computed
const currentQuestion = computed(() => {
  return examData.value?.questions ? examData.value.questions[questionIndex.value] : null
})
// Methods
const handleClick = (i) => {
  if (i) {
    store.dispatch('exam/nextQuestion')
  } else {
    store.dispatch('exam/previousQuestion')
  }
}

const handleChange = (value) => {
  console.log('updateAnswer', value)
  store.dispatch('exam/answerQuestion', answer)
  answer.value = value
}

watch(answer, (newVal) => {
  console.log('answer', newVal)
})
</script>

<style lang="scss">
@use './main.scss';
</style>
