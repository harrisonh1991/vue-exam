<template>
  <div class="form-group">
    <div class="form-item">
      <input
        type="text"
        :value="model"
        @change="handleChange"
        :placeholder="disabled ? '' : placeholder"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['change'])
defineProps({
  placeholder: {
    type: String,
    default: '請輸入你的答案',
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
  model.value = event.target.value
  emit('change', event.target.value)
}
</script>

<style lang="scss">
@use './form.scss';
</style>
