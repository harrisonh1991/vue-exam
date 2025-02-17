<template>
  <nav class="header flex align-center space-between">
    <h1>{{ examData.title }}</h1>
    <span v-if="leftTime">{{ leftTime }}</span>
  </nav>
  <div
    v-if="info.state !== 2"
    class="bar"
    :class="{ isStart: info.state === 0, isProgress: info.state === 1 }"
  >
    <div class="progress" :style="{ width: `${distance}%` }"></div>
    {{ distance }}
  </div>
</template>

<script>
import { calculateTimeDifference } from '@/utils/util'
import { mapGetters } from 'vuex'
export default {
  name: 'layout-header',
  computed: {
    ...mapGetters('common', ['sysTime']),
    ...mapGetters('exam', ['examData', 'info']),
    leftTime() {
      if (this.info.state === 2) return `Ended`
      else if (this.info.state === 1) return `${this.dateUnitToString(this.info.timeEnd)} Left`
      else if (this.info.state === 0)
        return `After  ${this.dateUnitToString(this.info.timeStart)} to Start`
      return null
    },
    distance() {
      const rootNum = calculateTimeDifference(this.info.timeStart, this.info.timeEnd)?.distance || 1
      const endNum = calculateTimeDifference(this.sysTime, this.info.timeEnd)?.distance || 1
      return endNum / rootNum
    },
  },
  methods: {
    dateUnitToString(unit) {
      if (!unit) return null
      return `${unit.day}d ${unit.hour}h ${unit.minute}m ${unit.second}s`
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 10px 20px;
}

.bar {
  .progress {
    margin-left: auto;
    background-color: lightblue;
    height: 10px;
  }
}
</style>
