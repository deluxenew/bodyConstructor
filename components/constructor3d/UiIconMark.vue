<template lang="pug">
  svg(:width="width" :height="width * 3 / 4" viewbox='0 0 12 9' :fill='color')
    path(fill-rule='evenodd' clip-rule='evenodd' d='M9.0578 0.583526C9.58889 -0.0515979 10.6077 -0.189644 11.3333 0.275191C12.059 0.740026 12.2167 1.63172 11.6856 2.26684L6.41532 8.56956C5.98266 9.08698 5.20376 9.14662 4.69607 8.7012L0.475519 4.99834C-0.159574 4.44114 -0.158348 3.53883 0.478256 2.98296C1.11486 2.42709 2.14578 2.42816 2.78087 2.98536L5.24308 5.14556L9.0578 0.583526Z')
</template>

<script>
export default {
  name: 'UiIconMark',
  props: {
    color: {
      type: String,
      default: '#5C6270'
    },
    width: {
      type: Number,
      default: 12
    }
  }
}
</script>

<style lang="scss">
.icon {
  display: inline-flex;

  &__mark {
    width: 100%;
    height: 100%;
  }
}

</style>
