<template>
  <div class="form-group">
    <div class="form-item">
      <input
        type="text"
        :value="model"
        @change="handleChange"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['change'])
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Please enter your answer',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineOptions({
  name: 'form-input',
})

const model = defineModel()

const handleChange = (event) => {
  console.log('input change', event.target.value)
  model.value = event.target.value
  emit('change', event.target.value)
}
</script>

<style lang="scss">
@use './form.scss';
</style>
