<template v-if="isDesktop">
  <layoutHeader />
  <layoutMain />
</template>
<script>
import { useStore, mapGetters } from 'vuex'
import layoutHeader from '@/components/layout/header.vue'
import layoutMain from '@/components/layout/main.vue'
export default {
  components: {
    layoutHeader,
    layoutMain,
  },
  computed: {
    ...mapGetters('common', ['isDesktop']),
  },
  async created() {
    const store = useStore()
    store.dispatch('common/updateDeviceType')
    store.dispatch('common/updateSystemTime')
    store.dispatch('exam/initExamData', 'exam_001')
  },
}
</script>
<style lang="scss">
@use './styles/app.scss';
</style>
