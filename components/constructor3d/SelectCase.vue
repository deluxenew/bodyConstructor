<template lang="pug">
  div.select-elements
    div.select-elements__header
      div.select-elements__title Шкаф
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
      div.select-elements__group(v-show="opened")
        div.select-elements__tabs
          div.select-elements__tabs-item(
            v-for="item in elementVariants"
            :class="{active: item.type === currentTypeModel.type}"
            @click="selectCurrentType(item)"
          )
            div.tab__title {{item.typeName}}

        div.select-elements__list(v-if="currentTypeModel && currentTypeModel.items")
          div.select-elements__item(
            v-for="item in currentTypeModel.items"
            :class="{active: item.name === currentItemModel.name, disabled: value.name}"
            @click="selectItem(item)"
          )
            img.select-elements__img(v-if="item.userData" :src="item.userData.img")
            | {{item && item.userData ? item.userData.form : ''}}

</template>

<script>
import TransitionExpand from './TransitionExpand.vue'
export default {
  name: "SelectCase",
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
      currentType: null,
      currentItem: null,
      opened: true
    }
  },
  watch:{
    currentItem(v) {

    },
    value: {
      deep: true,
      handler(v) {
        const item = this.currentTypeModel.items && this.currentTypeModel.items.find((el) => el.userData.variants.map(({id}) => id).includes(v.name) || el.name === v.name)
        if (item) {
          this.currentItemModel = item
          // this.$emit('sceneChange', item)
        }
        const parent = this.currentTypeModel.items.find(({name}) => v.name === name)
        // if (parent)  this.$emit('sceneChange', item)
      }
    }
  },
  computed: {
    selectedCase() {
      return this.value.name
    },
    // значение первой вкладки
    currentTypeModel: {
      get() {
        return this.currentType || this.elementVariants[0]
      },
      set(v) {
        this.currentType = v
      }
    },
    currentItemModel: {
      get() {
        return this.currentItem || this.currentTypeModel?.items[0] || null
      },
      set(v) {
        this.currentItem = v
      }
    }
  },
  methods: {
    toggleOpen() {
      this.opened = !this.opened
    },
    removeItem () {
      if (this.value.name) this.$emit('remove')
    },
    selectCurrentType(item) {
      this.currentTypeModel = item
      if (this.currentTypeModel.items) this.currentItem = this.currentTypeModel.items[0] || null
      this.$emit('selectType', item.type)
      this.$emit('selectItem', this.currentItemModel)
    },
    selectItem(item) {
      if (!this.value.name) {
        this.currentItemModel = item
        this.$emit('selectItem', this.currentItemModel)
      }
    }
  },
  mounted() {
     this.$emit('selectItem', this.currentItemModel)
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
    &__group {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
    }

    &__tabs {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      &-item {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 4px 8px;
        border-bottom: 2px solid #D5D7DC;
        transition: .3s ease-in-out;

        &.active {
          border-bottom: 2px solid #0099DC;
        }
      }

      &.pt-16 {
        padding-top: 16px;
      }
    }

    &__name {
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #454A54;
    }

    &__list {
      padding-top: 16px;
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    &__item + &__item +  &__item{
      margin-top: 8px;
    }

    &__item {
      margin-left: 8px;
      border: 1px solid #D5D7DC;
      border-radius: 4px;
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
        border: 2px solid #0099DC;
      }

      &.disabled:not(&.active) {
        opacity: 0.5;
      }
    }
    &__img {
      width: 100px;
      padding-bottom: 20px;
    }
  }
</style>
