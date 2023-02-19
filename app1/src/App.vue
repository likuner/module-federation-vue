<template>
    <h1 :class="[styles.h1]">from app1: {{msg}}</h1>
</template>

<script>
import styles from './App.module.less'

export default {
  name: 'APP',
  data() {
    return {
      styles,
      msg: this.$globalProperty
    }
  },
  setup() {},
  created() {
    consola.info('created:', this.$globalProperty)
  },
  mounted() {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
    consola.info('mounted: --primary-color', primaryColor)
  }
}
</script>
