<template>
  <main v-if="curruentExamData" class="main">
    <div>
      <h2>{{ curruentExamData.title }}</h2>
      <div v-for="option in curruentExamData.options" :key="option.id">
        <input type="radio" :id="option.id" :value="option.label" />
        <label :for="option.id">{{ option.label }}</label>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'component-examination',
  computed: {
    ...mapGetters('exam', ['examData']),
    curruentExamData() {
      return this.examData?.questions ? this.examData?.questions[this.currentIndex] : null
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
