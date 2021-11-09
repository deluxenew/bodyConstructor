<template lang="pug">
  div.select-elements
    div.select-elements__header
      div.select-elements__title {{title}}
        img.select-elements__chevron(
          :src="require('./img/chevron.svg')"
          :class="{reverse: !opened}"
          @click="toggleOpen"
        )
      div.select-elements__remove(
        :class="{disabled: !selectedCase}"
        @click="removeItem"
      )
        span Убрать
        img(:src="require('./img/close.svg')")
    transition-expand
      div.select-elements__list(v-show="opened")
        div.select-elements__item(
          v-for="item in elementVariants"
          :class="{active: item.name === model.name}"
          @click="currentItem = item"
        ) {{item ? item.name : ''}}
</template>

<script>
import TransitionExpand from './TransitionExpand.vue'
export default {
  name: "SelectElements",
  components: {TransitionExpand},
  props: {
    title: {
      type: String,
      default: ''
    },
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
      opened: true
    }
  },
  watch:{
    currentItem(v) {
      this.$emit('input', v)
    }
  },
  computed: {
    selectedCase() {
      return this.value?.selectedCase
    },
    model: {
      get() {
        return this.currentItem || this.elementVariants[0]
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    toggleOpen() {
      this.opened = !this.opened
    },
    removeItem () {
      if (this.value?.selectedCase) this.$emit('remove')
    },
  },
  mounted() {
    this.$emit('input', this.elementVariants[0])
  }
}
</script>

<style lang="scss" scoped>
  .select-elements+ .select-elements {
    padding-top: 24px;
  }

  .select-elements {
    width: 100%;

    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;
    }

    &__chevron {
      transition: .2s ease-in-out;
      cursor: pointer;

      &.reverse {
        transform: rotate(180deg);
      }
    }

    &__remove {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &__list {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
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
