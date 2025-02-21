<template>
  <main class="main" v-if="examData">
    <template v-if="currentQuestion">
      <div class="flex justify-between">
        <h2 class="main-title">{{ questionIndex + 1 }}. {{ currentQuestion.title }}</h2>
        <div v-if="currentQuestion" class="main-score">({{ currentQuestion.score }}分)</div>
      </div>
    </template>
    <template v-else>
      <p class="main-title main-end center">全卷完</p>
    </template>
    <div class="main-content">
      <template v-if="currentQuestion">
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
      </template>
    </div>
    <div class="main-footer flex justify-between align-center">
      <button class="btn main-btn" @click="handleClick(0)" :disabled="!hasPrevious">上一頁</button>
      <span v-if="currentQuestion">{{ questionIndex + 1 }}/{{ examData.questions.length }}題</span>
      <button class="btn main-btn" @click="handleClick(1)">
        {{ hasNext ? '下一頁' : '交卷' }}
      </button>
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
    if (hasNext.value) {
      store.dispatch('exam/nextQuestion')
    } else {
      store.dispatch('exam/submitExam')
    }
  } else {
    store.dispatch('exam/previousQuestion')
  }
  answer.value = examAnswer.value
}

// 回答後回答資料
const handleAnswer = (value) => {
  store.dispatch('exam/answerQuestion', value)
}

watch(currentQuestion, () => {
  answer.value = examAnswer.value
})
</script>

<style lang="scss">
@use './main.scss';
</style>
