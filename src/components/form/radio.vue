<template>
  <div class="form-group">
    <div class="form-item" v-for="option in options" :key="option.value">
      <input
        type="radio"
        :value="option.value"
        :checked="model === option.value"
        @change="handleChange(option.value)"
        :disabled="disabled"
      />
      <label class="form-label">{{ option.label }}</label>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['change'])

defineOptions({
  name: 'form-radio',
})

const model = defineModel()

defineProps({
  options: {
    type: Array,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const handleChange = (value) => {
  model.value = value
  emit('change', value)
}
</script>

<style lang="scss">
@use './form.scss';
</style>
