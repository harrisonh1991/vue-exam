<template v-if="isDesktop">
  <layoutHeader />
  <layoutAside />
  <layoutMain />
</template>
<script>
import { useStore, mapGetters } from 'vuex'
import layoutAside from '@/components/layout/aside.vue'
import layoutHeader from '@/components/layout/header.vue'
import layoutMain from '@/components/layout/main.vue'
export default {
  components: {
    layoutAside,
    layoutHeader,
    layoutMain,
  },
  computed: {
    ...mapGetters('common', ['isDesktop']),
  },
  created() {
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
