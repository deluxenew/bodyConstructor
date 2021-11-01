<template lang="pug">
  div.select-elements
    div.select-elements__title Выберите шкаф
    div.select-elements__list
      div.select-elements__item(
        v-for="item in elementVariants"
        :class="{active: item.name === model.name}"
        @click="currentItem = item"
      ) {{item ? item.name : ''}}
</template>

<script>
export default {
  name: "SelectElements",
  props: {
    elementVariants: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentItem: null,
    }
  },
  watch:{
    currentItem(v) {
      this.$emit('input', v)
    }
  },
  computed: {
    model: {
      get() {
        return this.currentItem || this.elementVariants[0]
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  mounted() {
    this.$emit('input', this.elementVariants[0])
  }
}
</script>

<style lang="scss" scoped>
  .select-elements {

    &__title {
      font-size: 18px;
      font-weight: bold;
    }

    &__list {
      padding-top: 24px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    &__item + &__item {
      margin-left: 8px;
    }

    &__item {
      border: 1px solid rgba(#000000, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 150px;
      cursor: pointer;
      transition: .3s ease-in-out;


      &.active {
        background-color: #ccc;
      }
    }
  }
</style>
