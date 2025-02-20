<template>
  <main v-if="currentQuestion" class="main">
    <h2 class="main-title">{{ currentQuestion.title }}</h2>
    <div class="main-content">
      answer:{{ answer }}
      <FormRadio
        v-if="currentQuestion.type === 'radio'"
        v-model="answer"
        :options="currentQuestion.options"
        :disabled="examInfo.state !== 1"
        @change="handleAnswer"
      />
      <FormCheckbox
        v-else-if="currentQuestion.type === 'checkbox'"
        v-model="answer"
        :options="currentQuestion.options"
        :disabled="examInfo.state !== 1"
        @change="handleAnswer"
      />
      <FormInput
        v-else-if="currentQuestion.type === 'input'"
        v-model="answer"
        :disabled="examInfo.state !== 1"
        @change="handleAnswer"
      />
      <div v-else v-html="JSON.stringify(currentQuestion)"></div>
    </div>
    <div class="main-footer flex justify-between">
      <button class="btn main-btn" @click="handleClick(0)" :disabled="!hasPrevious">
        Previous
      </button>
      <button class="btn main-btn" @click="handleClick(1)" :disabled="!hasNext">Next</button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import FormRadio from '@/components/form/radio.vue'
import FormCheckbox from '@/components/form/checkbox.vue'
import FormInput from '@/components/form/input.vue'

defineOptions({
  name: 'component-examination',
})

const store = useStore()
const answer = ref(null)
const examData = computed(() => store.getters['exam/examData'])
const examInfo = computed(() => store.getters['exam/info'])
const questionIndex = computed(() => store.getters['exam/questionIndex'])
const examAnswer = computed(() => store.getters['exam/answer'])
const hasNext = computed(() => store.getters['exam/hasNext'])
const hasPrevious = computed(() => store.getters['exam/hasPrevious'])
const currentQuestion = computed(() => {
  return examData.value?.questions ? examData.value.questions[questionIndex.value] : null
})

// 點擊後跳前一題或下一題並更新回答資料
// 0為上一題，1為下一題
const handleClick = (i) => {
  if (i) {
    store.dispatch('exam/nextQuestion')
  } else {
    store.dispatch('exam/previousQuestion')
  }
  answer.value = examAnswer.value
}

// 回答後回答資料
const handleAnswer = (value) => {
  store.dispatch('exam/answerQuestion', value)
}

watch(examData, () => {
  console.log('examAnswer', examAnswer.value)
  answer.value = examAnswer.value
})
</script>

<style lang="scss">
@use './main.scss';
</style>
