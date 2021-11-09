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
        )
          img.select-elements__img(:src="item.userData.img")
          | {{item ? item.userData.form : ''}}
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
      type: String,
      default: ''
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
       this.$emit('selectItem', v)
    },
    value(v) {
      const item = this.elementVariants.find((el) => el.name === v)
      if (item) this.currentItem = item
    }
  },
  computed: {
    selectedCase() {
      return this.value
    },
    model: {
      get() {
        return this.currentItem || this.elementVariants[0]
      },
      set(v) {
         this.$emit('selectItem', v)
      }
    }
  },
  methods: {
    toggleOpen() {
      this.opened = !this.opened
    },
    removeItem () {
      if (this.value) this.$emit('remove')
    },
  },
  mounted() {
     this.$emit('selectItem', this.elementVariants[0])
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
      transition: .3s ease-in-out;

      &.disabled {
        opacity: .5;
      }

      &:hover:not(&.disabled) {
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
      text-align: center;
      flex-direction: column;
      width: 150px;
      height: 150px;
      cursor: pointer;
      transition: .3s ease-in-out;
      user-select: none;


      &.active {
        background-color: #ccc;
      }
    }
    &__img {
      width: 100px;
      padding-bottom: 20px;
    }
  }
</style>
