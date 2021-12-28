<template lang="pug">
  div.select-elements
    div.select-elements__header
      div.select-elements__title Столешница
        img.select-elements__chevron(
          :src="require('./img/chevron.svg')"
          :class="{reverse: !opened}"
          @click="toggleOpen"
        )
      div.select-elements__remove(
        v-if="value"
        :class="{disabled: !selectedCase}"
        @click="removeItem"
      )
        span Убрать
        img(:src="require('./img/close.svg')")
      div.select-elements__remove(
        v-else
        @click="addTableTop"
      )
        span Добавить
        img(:src="require('./img/add.svg')")
    transition-expand
      div.select-elements__group(v-show="opened")
        div.select-elements__tabs
          div.select-elements__tabs-item(
            v-for="item in elementVariants"
            :class="{active: item.type === currentTypeModel.type}"
            @click="selectCurrentType(item)"
          )
            div.tab__title {{item.typeName}}
        div.select-elements__tabs.pt-16(v-if="currentTypeModel && currentTypeModel.items")
          div.select-elements__tabs-item(
            v-for="variant in currentTypeModel.items"
            :class="{active: variant === currentVariantModel}"
            @click="selectCurrentVariant(variant)"
          )
            div.tab__title {{variant}}
        div.select-elements__list(v-if="currentTypeModel && currentTypeModel.variants && currentTypeModel.variants.length")
          div.select-elements__item(
            v-for="color in currentTypeModel.variants"
            :class="{active: currentItemModel && color.name === currentItemModel.name}"
            @click="selectCurrentColor(color)"
          )
            img.select-elements__img(v-if="color" :src="color.url")
            | {{color && color.name ? color.name : ''}}
</template>

<script>
import UiInputCheckbox from './UiInputCheckbox.vue'
import TransitionExpand from './TransitionExpand.vue'

export default {
  name: "SelectTabletop",
  components: {TransitionExpand, UiInputCheckbox},
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
      default: () => null
    }
  },
  data() {
    return {
      currentType: null,
      currentVariant: null,
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
        if (!v) return
        if (!!v.type) {
          const typeObj = this.elementVariants.find(({type}) => v.type === type)
          this.currentTypeModel = typeObj || null
        }
        if (!!v.variant) {
          const variantObj = this.currentTypeModel?.items.find((el) => v.variant === el)
          this.currentVariantModel = variantObj || null
        }
        if (!!v.colorId) {
          const colorObj = this.currentVariantModel?.variants.find(({ id }) => v.colorId === id)
          this.currentItemModel = colorObj || null
        }
      }
    }
  },
  computed: {
    selectedCase() {
      return this.value?.name
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
    // значение второй вкладки
    currentVariantModel: {
      get() {
        return this.currentVariant || (this.currentTypeModel && this.currentTypeModel?.items[0]) || null
      },
      set(v) {
        this.currentVariant = v
      }
    },
    // выбранный вариант конфига
    currentItemModel: {
      get() {
        return this.currentItem || this.currentTypeModel?.variants[0] || null
      },
      set(v) {
        this.currentItem = v
      }
    },
    valueModel: {
      get() {
        return this.value || null
      },
      set(v) {
        this.$emit('input', v)
      }
    },
  },
  methods: {
    addTableTop() {
      this.$emit('addTableTop', {
        url: require('./img/tableTop/ldsp/dark_venge.png'),
        height: '',
        type: ''
      })
    },
    toggleOpen() {
      this.opened = !this.opened
    },
    removeItem() {
      this.currentItem = null
    },
    selectCurrentType(item) {
      this.currentTypeModel = item
      this.selectCurrentVariant(this.currentTypeModel.items[0], true)
    },
    selectCurrentVariant(variant, newColor) {
      this.currentVariantModel = variant
      if (!newColor) this.selectCurrentColor(this.currentItem)
      else this.selectCurrentColor(this.currentTypeModel.variants[0])

    },
    selectCurrentColor(color) {
      this.currentItem = color
      const item = {
        ...color,
        type: this.currentTypeModel?.type,
        typeName: this.currentTypeModel?.typeName,
        variant: this.currentVariantModel,
        maxWidth: this.currentTypeModel?.maxWidth
      }
      this.$emit('selectColor', item)
    },
  },
  mounted() {
    // this.selectCurrentColor(this.currentTypeModel.variants[0])
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

  &__item + &__item {
    margin-left: 8px;
  }

  &__item {
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
  }
  &__img {
    width: 100px;
    padding-bottom: 20px;
  }
}
</style>
