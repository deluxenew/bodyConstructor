<template lang="pug">
  .horizontal(ref="block")
    .horizontal__list(:style="listStyle" ref="list")
      .horizontal__line(v-for="line in lines")
        .item(
          ref="items"
          v-for="item in line"
          :class="{active: item.code === currentItemCode}"
          :key="item.code"
          @click="selectItem(item)"
        )
          img.item__img(v-if="item.image" :src="'https://cdn.akson.ru/webp/' + item.image + '0.png'")
          | {{item.name }}
    .horizontal__scroll(v-if="listWidth >= blockWidth")
      input(
        ref="scroll"
        v-model.number="scroll"
        :style="`--thumb-width: ${blockWidth / listWidth  * 100}%`"
        type="range"
        :min="0"
        :max="maxScroll"
        step="1"
      )
</template>

<script>
export default {
  name: "HorizontalListItems",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    currentItemCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      startScroll: 0,
      positionX: 0,
      scroll: 0,
      maxScroll: 0,
      listWidth: 0,
      blockWidth: 0,
      hold: false,
      itemsTranslate: []
    }
  },
  watch: {
    items: {
      deep: true,
      async handler(v) {
        await this.$nextTick()
        if (v) {
          this.getSizes()
        }
      }
    },
    async currentItemCode(v) {
      await this.$nextTick()
      const itemIndex = this.items.findIndex(({ code }) => code === v)
      const offset = this.itemsTranslate[itemIndex].offsetLeft - 98
      if (offset < this.maxScroll ) this.scroll = offset >= 0 ? offset : 0
      else this.scroll = this.maxScroll
      this.positionX = this.scroll
    }
  },
  computed: {
    lines() {
      const result = []
      const countItems = this.items && this.items.length || 0
      if (countItems > 2) {
        const half = Math.round(countItems / 2)
        result.push(this.items.slice(0, half))
        result.push(this.items.slice(half, countItems))
      } else result.push(this.items)
      return result
    },
    listStyle() {
      return {
        transform: `translateX(${-this.scroll + 'px'})`,
        transition: this.hold ? 'none' : '.2s ease'
      }
    }
  },
  methods: {
    getSizes() {
      this.scroll = 0
      this.positionX = 0
      this.startScroll = 0
      this.blockWidth = this.$refs.block.clientWidth
      this.listWidth = this.$refs.list.scrollWidth
      this.maxScroll = (this.listWidth - this.blockWidth)
      this.itemsTranslate = this.$refs.items.map((el) => {
        return {
          width: el.clientWidth,
          offsetLeft: el.offsetLeft
        }
      })
    },
    selectItem(item) {
      if (!this.hold) this.$emit('selectItem', item)
    },
    calcPositionMouse(event) {
      const scroll =  this.startScroll + this.positionX - event.clientX
      if (scroll >= 0 && scroll < this.maxScroll) this.scroll = scroll
      else if (scroll < 0) this.scroll = 0
      else this.scroll = this.maxScroll
      this.hold = true
    },
    onHold(event) {
      if (this.$refs.list.contains(event.target) || this.$refs.scroll.contains(event.target)) {
        this.startScroll = event.clientX
        window.addEventListener('mousemove', this.calcPositionMouse)
      }
    },
    offHold() {
      setTimeout(() => {
        this.hold = false
      },0)
      window.removeEventListener('mousemove', this.calcPositionMouse)
      this.positionX = this.scroll
    },
  },
  mounted() {
    this.getSizes()
    window.addEventListener('mousedown', this.onHold)
    window.addEventListener('mouseup', this.offHold)
  },
  beforeDestroy() {
    window.removeEventListener('mousedown', this.onHold)
    window.removeEventListener('mouseup', this.offHold)
  }
}
</script>

<style lang="scss" scoped>
$thumbWidth: var(--thumb-width);

.horizontal {
  width: 100%;
  overflow: hidden;
  padding-top: 16px;

  &__list {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__line + &__line {
    padding-top: 16px;
  }

  &__line {
    display: flex;
    flex-wrap: nowrap;
  }

  &__scroll {
    padding-top: 8px;
    width: 100%;
  }
}

.item + .item {
  margin-left: 16px;
}

.item {
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
  //transition: .3s ease-in-out;
  user-select: none;


  &.active {
    border: 2px solid #0099DC;
  }

  &.disabled:not(&.active) {
    opacity: 0.5;
  }

  &__img {
    width: 100px;
    padding-bottom: 20px;
    user-select: none;
    -webkit-user-drag: none;
  }
}

input[type=range] {
  height: 14px;
  -webkit-appearance: none;

  width: 100%;
  margin: 0;
}

input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  cursor: pointer;
  background: transparent;
}
input[type=range]::-webkit-slider-thumb {
  height: 4px;
  width: $thumbWidth;
  border-radius: 4px;
  background: #C7CAD1;
  cursor: pointer;
  -webkit-appearance: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: transparent;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  border-radius: 4px;
}
input[type=range]::-moz-range-thumb {
  height: 4px;
  width: $thumbWidth;
  border-radius: 4px;
  background: #C7CAD1;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-thumb {
  height: 4px;
  width: $thumbWidth;
  border-radius: 4px;
  background: #C7CAD1;
  cursor: pointer;
}

</style>
