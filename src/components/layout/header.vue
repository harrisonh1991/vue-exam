<template>
  <nav class="nav">
    <div class="nav-info flex align-center space-between">
      <div>
        <h1>{{ examData.title }}</h1>
        <span v-if="leftTime" class="nav-info-time" v-html="leftTime"></span>
      </div>
    </div>
    <div
      v-if="info.state === 1"
      class="nav-progress"
      :class="{ isStart: info.state === 0, isProgress: info.state === 1 }"
    >
      <div class="nav-progress-percent" :style="stylePercent"></div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { formatDateString } from '@/utils/util'

defineOptions({
  name: 'layout-header',
})

const store = useStore()

// 從 store 獲取數據
const sysTime = computed(() => store.getters['common/sysTime'])
const examData = computed(() => store.getters['exam/examData'])
const info = computed(() => store.getters['exam/info'])

// 計算剩餘時間
const leftTime = computed(() => {
  if (info.value.state === 2) return 'Ended'
  else if (info.value.state === 1)
    return `End Time : ${formatDateString(examData.value.timeEnd, 'yyyy-MM-dd hh:mm:ss')}<br/>Time Left : ${dateUnitToString(info.value.timeUnitEnd)}`
  else if (info.value.state === 0)
    return `Start Time : ${formatDateString(examData.value.timeStart, 'yyyy-MM-dd hh:mm:ss')}<br/>${dateUnitToString(info.value.timeUnitStart)}`
  return null
})

// 計算進度百分比
const distancePercent = computed(() => {
  if (info.value.state === 1) {
    const dateStart = new Date(examData.value.timeStart).getTime()
    const dateEnd = new Date(examData.value.timeEnd).getTime()
    const dateNow = new Date(sysTime.value).getTime()
    const top = dateEnd - dateNow
    const bottom = dateEnd - dateStart
    return ((top / bottom) * 100).toFixed(2)
  }
  return 100
})

// 根據百分比計算顏色
const colorByPercent = computed(() => {
  const percent = (100 - distancePercent.value || 0) / 100
  return `rgb(${getColorRangeByPercent(91, 255, percent)}, 
             ${getColorRangeByPercent(255, 0, percent)}, 
             ${getColorRangeByPercent(174, 0, percent)})`
})

// 計算樣式
const stylePercent = computed(() => {
  return {
    background: `linear-gradient(to right, 
      white ${100 - distancePercent.value}%, 
      ${colorByPercent.value} ${100 - distancePercent.value}%, 
      ${100 - distancePercent.value}%, 
      ${colorByPercent.value} ${distancePercent.value}%)`,
  }
})

// 工具函數
const dateUnitToString = (unit) => {
  if (!unit) return null
  return `${unit.day}d ${unit.hour}h ${unit.minute}m ${unit.second}s`
}

const getColorRangeByPercent = (start, end, percent) => {
  const diff = start - end
  return start - diff * percent
}
</script>

<style lang="scss">
@use './header.scss';
</style>
