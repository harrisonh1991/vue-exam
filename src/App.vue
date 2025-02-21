<template>
  <div v-if="examData">
    <layoutHeader />
    <layoutMain />
  </div>
</template>
<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import layoutHeader from '@/components/layout/header.vue'
import layoutMain from '@/components/layout/main.vue'

// Store
const store = useStore()

// Computed
const examData = computed(() => store.getters['exam/examData'])

// Lifecycle
onMounted(async () => {
  // 初始化數據
  await Promise.all([
    store.dispatch('common/updateDeviceType'),
    store.dispatch('common/updateSystemTime'),
    store.dispatch('exam/initExamData', 'exam_001'),
  ])
})
</script>
<style lang="scss">
@use './styles/app.scss';
</style>
