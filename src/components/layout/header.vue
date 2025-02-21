<template>
  <nav class="nav">
    <div class="nav-info flex align-center space-between">
      <div>
        <h1>{{ examData.title }}</h1>
        <div class="nav-time">
          <template v-if="info.state === EXAM_STATE.FINISHED"> 已完結 </template>
          <template v-else-if="info.state === EXAM_STATE.IN_PROGRESS">
            <div class="nav-time-item">
              <span>結束時間 :</span>
              <span>{{ formatDateString(examData.timeEnd, 'yyyy-MM-dd hh:mm:ss') }}</span>
            </div>
            <div class="nav-time-item" :class="{ error: isCloseThanTenMinutes }">
              <span>剩餘時間</span> : <span>{{ dateUnitToString(info.timeUnitEnd) }}</span>
            </div>
          </template>
          <template v-else>
            <span>開始時間 :</span>
            <span>{{ formatDateString(examData.timeStart, 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </div>
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
      <div class="nav-progress-percent margin-center" :style="stylePercent"></div>
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

const isCloseThanTenMinutes = computed(() => {
  if (info.value.state === 1) return info.value.timeUnitEnd.distance <= 600000
  return false
})

// 計算進度百分比
const distancePercent = computed(() => {
  if (info.value.state === 1) {
    const dateStart = new Date(examData.value.timeStart).getTime()
    const dateEnd = new Date(examData.value.timeEnd).getTime()
    const dateNow = new Date(sysTime.value).getTime()
    // 計算已經過的時間佔總時間的百分比
    const elapsed = dateNow - dateStart
    const total = dateEnd - dateStart
    const percent = (elapsed / total) * 100
    // 確保百分比在 1-100 之間
    return Math.min(Math.max(100 - percent, 1), 100).toFixed(2)
  }
  return 100
})

// 計算樣式
const stylePercent = computed(() => {
  return {
    width: `${distancePercent.value}%`,
    background: `${distancePercent.value > 60 ? 'green' : distancePercent.value > 30 ? 'orange' : 'red'}`,
  }
})

// 工具函數
const dateUnitToString = (unit) => {
  if (!unit) return null
  return `${unit.day}d ${unit.hour}h ${unit.minute}m ${unit.second}s`
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
