<template>
  <div class="form-group">
    <div class="form-item" v-for="option in options" :key="option.value">
      <input
        type="checkbox"
        :value="option.value"
        :checked="model?.includes(option.value)"
        @change="handleChange($event, option.value)"
        :disabled="disabled"
      />
      <label class="form-label">{{ option.label }}</label>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
const emit = defineEmits(['change'])
const model = defineModel()

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
  disabled: {
    type: Boolean,
    default: false,
  },
})

onMounted(() => {
  if (!Array.isArray(model.value)) model.value = []
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
