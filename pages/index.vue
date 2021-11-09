<template lang="pug">
  div.inner-page
    component( :is="componentName")
</template>

<script>

  export default {
    components: {
      Constructor3d: () => {
        if (process.browser) return import('@/components/constructor3d/Constructor3d')
      }
    },
    computed: {
      componentName() {
        if (process.browser) return 'Constructor3d'
        return ''
      }
    }
  }
</script>
