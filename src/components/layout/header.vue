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

<script>
import { formatDateString } from '@/utils/util'
import { mapGetters } from 'vuex'
export default {
  name: 'layout-header',
  computed: {
    ...mapGetters('common', ['sysTime']),
    ...mapGetters('exam', ['examData', 'info']),
    leftTime() {
      if (this.info.state === 2) return `Ended`
      else if (this.info.state === 1)
        return `End Time : ${formatDateString(this.examData.timeEnd, 'yyyy-MM-dd hh:mm:ss')}<br/>Time Left : ${this.dateUnitToString(this.info.timeUnitEnd)}`
      else if (this.info.state === 0)
        return `Start Time : ${formatDateString(this.examData.timeStart, 'yyyy-MM-dd hh:mm:ss')}<br/>${this.dateUnitToString(this.info.timeUnitStart)}`
      return null
    },
    distancePercent() {
      if (this.info.state === 1) {
        const dateStart = new Date(this.examData.timeStart).getTime()
        const dateEnd = new Date(this.examData.timeEnd).getTime()
        const dateNow = new Date(this.sysTime).getTime()
        const top = dateEnd - dateNow
        const bottom = dateEnd - dateStart
        return ((top / bottom) * 100).toFixed(2)
      }
      return 100
    },
    colorByPercent() {
      const percent = (100 - this.distancePercent || 0) / 100
      // 紅色 rgb(255,0,0) 到 綠色 rgb(0,255,0)
      return `rgb(${this.getColorRangeByPercent(91, 255, percent)}, ${this.getColorRangeByPercent(255, 0, percent)}, ${this.getColorRangeByPercent(174, 0, percent)})`
    },
    stylePercent() {
      return {
        background: `linear-gradient(to right, white ${100 - this.distancePercent}%, ${this.colorByPercent} ${100 - this.distancePercent}%, ${100 - this.distancePercent}%, ${this.colorByPercent} ${this.distancePercent}%)`,
      }
    },
  },
  methods: {
    dateUnitToString(unit) {
      if (!unit) return null
      return `${unit.day}d ${unit.hour}h ${unit.minute}m ${unit.second}s`
    },
    getColorRangeByPercent(start, end, percent) {
      const diff = start - end
      return start - diff * percent
    },
    /*
      91,255,174
      255, 91, 91
      Red:
      91 - ((91 - 255) * 0.2) = 91 - 147.6 = 103.4
      91 - ((91 - 255) * 0.8) = 91 - 147.6 = 238.4
      Green:
      255 - ((255 - 91) * 0.2) = 255 - 164 = 91
      255 - ((255 - 91) * 0.8) = 255 - 164 = 238.4
      Blue:
      174 - ((174 - 91) * 0.2) = 174 - 16.2 = 157.8
      174 - ((174 - 91) * 0.8) = 174 - 16.2 = 157.8
    */
  },
}
</script>

<style lang="scss">
@use './header.scss';
</style>
