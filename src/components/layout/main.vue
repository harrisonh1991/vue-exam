<template>
  <main v-if="curruentQuestion" class="main">
    <div class="main-content">
      <h2 class="main-title">{{ curruentQuestion.title }}</h2>
      <div class="main-content">
        <FormRadio
          v-if="curruentQuestion.type === 'select'"
          v-model="answer"
          :options="curruentQuestion.options"
        />
      </div>
      <div class="main-footer flex justify-between">
        <button class="btn main-btn" @click="handleClick(0)">Previous</button>
        <button class="btn main-btn" @click="handleClick(1)">Next</button>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormRadio from '@/components/form/radio.vue'
export default {
  name: 'component-examination',
  components: { FormRadio },
  computed: {
    ...mapGetters('exam', ['examData', 'questionIndex']),
    curruentQuestion() {
      return this.examData?.questions ? this.examData?.questions[this.questionIndex] : null
    },
  },
  data() {
    return {
      currentIndex: 0,
      answer: null,
    }
  },
  methods: {
    ...mapActions('exam', ['previousQuestion', 'nextQuestion', 'answerQuestion']),
  },
  handleClick(i) {
    i ? this.nextQuestion() : this.previousQuestion()
  },
}
</script>

<style lang="scss">
@use './main.scss';
</style>
