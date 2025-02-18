<template>
  <div class="radio">
    <div class="radio-group" v-for="(i, ii) in options" :key="ii">
      <input
        class="radio-input"
        type="radio"
        :name="`r${uid}`"
        :value="i.value"
        @change="handleChange(i.value)"
      />
      <label class="radio-label" :for="`r${uid}`">{{ i.label }}</label>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'form-radio',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uid: null,
    }
  },
  mounted() {
    this.uid = getCurrentInstance().uid
  },
  methods: {
    handleChange(value) {
      console.log('fffff', value)
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss">
.radio {
  &-group {
    &:not(:first-child) {
      margin-top: 5px;
    }
  }
  &-input,
  &-label {
    vertical-align: middle;
  }
  &-label {
    margin-left: 5px;
  }
}
</style>
