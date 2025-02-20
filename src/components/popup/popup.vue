<template>
  <div class="popup 123abc" v-if="model">
    <div class="popup-inner">
      <div class="popup-header flex justify-between">
        <h2 class="popup-title">
          <slot name="title"></slot>
        </h2>
        <a class="popup-close" @click="handleClose">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </a>
      </div>
      <div class="popup-content">
        <slot name="content"></slot>
      </div>
      <div class="popup-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faXmark)

defineOptions({
  name: 'component-popup',
})

const emit = defineEmits(['close'])

const model = defineModel({
  type: Boolean,
  default: false,
})

const handleClose = () => {
  model.value = false
  emit('close')
}
</script>
<style lang="scss">
@use './popup.scss';
</style>
