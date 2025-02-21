<template>
  <nav class="nav">
    <div class="nav-info flex align-center space-between">
      <div>
        <h1 v-if="examData">{{ examData.title }}</h1>
        <span v-if="leftTime" class="nav-info-time" v-html="leftTime"></span>
      </div>
      <a class="nav-option pointer" @click.prevent="handleClickList">
        <font-awesome-icon icon="fa-solid fa-list" />
      </a>
    </div>
    <div
      v-if="info && info.state === EXAM_STATE.IN_PROGRESS"
      class="nav-progress"
      :class="{
        isStart: info.state === EXAM_STATE.NOT_STARTED,
        isProgress: info.state === EXAM_STATE.IN_PROGRESS,
      }"
    >
      <div class="nav-progress-percent" :style="stylePercent"></div>
    </div>
    <Popup v-model="isPopupActive" @close="handlePopupClose">
      <template #title>
        <h2>答題列表</h2>
      </template>
      <template #content>
        <div class="nav-table" v-if="answerValidList">
          <div class="flex space-between wrap">
            <div class="nav-item nav-item-1">題目</div>
            <div class="nav-item nav-item-2">已答題</div>
            <template v-for="(l, li) in answerValidList" :key="l.id">
              <a
                class="nav-item nav-item-1 link"
                @click="handleJumpToAnswer(l.index)"
                :title="`轉跳到第${li + 1}題`"
              >
                {{ li + 1 }}. {{ l.title }}
              </a>
              <div class="nav-item nav-item-2" :class="{ error: !l.isValid }">
                {{ l.isValid ? '是' : '否' }}
              </div>
            </template>
          </div>
        </div>
        <div class="tigs nav-tigs">*點擊題目時會自動轉跳</div>
      </template>
    </Popup>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EXAM_STATE } from '@/utils/states'
import { useStore } from 'vuex'
import { formatDateString } from '@/utils/util'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faList } from '@fortawesome/free-solid-svg-icons'
import Popup from '@/components/popup/popup.vue'
library.add(faList)

defineOptions({
  name: 'layout-header',
})

const store = useStore()
const isPopupActive = ref(false)

// 從 store 獲取數據
const sysTime = computed(() => store.getters['common/sysTime'])
const examData = computed(() => store.getters['exam/examData'])
const info = computed(() => store.getters['exam/info'])
const answerValidList = computed(() => store.getters['exam/answerValidList'])

// 計算剩餘時間
const leftTime = computed(() => {
  if (info.value.state === 2) return '已完結'
  else if (info.value.state === 1)
    return `結束時間 : ${formatDateString(examData.value.timeEnd, 'yyyy-MM-dd hh:mm:ss')}<br/>剩餘時間 : ${dateUnitToString(info.value.timeUnitEnd)}`
  else if (info.value.state === 0)
    return `開始時間 : ${formatDateString(examData.value.timeStart, 'yyyy-MM-dd hh:mm:ss')}<br/>${dateUnitToString(info.value.timeUnitStart)}`
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
    return (Math.max(top / bottom) * 100, 1).toFixed(2)
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

const handleClickList = () => {
  isPopupActive.value = !isPopupActive.value
}

const handlePopupClose = () => {
  isPopupActive.value = false
}

const handleJumpToAnswer = (index) => {
  store.dispatch('exam/setQuestionIndex', index)
  handlePopupClose()
}
</script>

<style lang="scss">
@use './header.scss';
</style>
