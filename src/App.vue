<template>
  <div>
    {{title}}
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'

export default {
  setup () {
    const state = reactive({
      title: 'Hello, SFC!',
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>