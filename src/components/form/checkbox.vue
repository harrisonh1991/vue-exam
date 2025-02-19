<template>
  <div class="form-group">
    <div class="form-item" v-for="option in options" :key="option.value">
      <input
        type="checkbox"
        :id="`c-${uid}`"
        :value="option.value || option.label"
        :checked="model?.includes(option.value || option.label)"
        @change="handleChange($event, option.value || option.label)"
      />
      <label class="form-label">{{ option.label }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, defineEmits } from 'vue'
const uid = ref(getCurrentInstance().uid)
const emit = defineEmits(['change'])
const model = defineModel([])

defineOptions({
  name: 'form-checkbox',
})

defineProps({
  options: {
    type: Array,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const handleChange = (event, value) => {
  const isChecked = event.target.checked
  if (isChecked) {
    model.value.push(value)
  } else {
    model.value = model.value.filter((item) => item !== value)
  }
  emit('change', model.value)
}
</script>

<style lang="scss">
@use './form.scss';
</style>
