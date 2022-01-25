<template lang="pug">
	.horizontal(ref="block")
		.horizontal__list(:style="listStyle" ref="list" )
			.horizontal__line(v-for="(line, index) in lines" :key="JSON.stringify(line)")
				.item(
					ref="items"
					v-for="item in line"
					:class="{active: item.code === currentItemCode, disabled: isDisabled(item)}"
					:key="item.code + index"
					@click="selectItem(item)"
				)
					img.item__img(v-if="item.image" :src="'https://cdn.akson.ru/webp/' + item.image + '0.png'")
					| {{item.name }}
		.horizontal__scroll(v-if="listWidth > blockWidth" @mousedown="handleHold = true")
			div.horizontal__arrow(
				:class="{disabled: scroll === 0}"
				@click="scroll = 0"
			)
				svg(width='5', height='8', viewbox='0 0 5 8', fill='none', xmlns='http://www.w3.org/2000/svg')
					path(fill-rule='evenodd', clip-rule='evenodd', d='M0.666826 4C0.666826 3.82934 0.732159 3.65867 0.862159 3.52867L3.52883 0.862004C3.78949 0.601337 4.21083 0.601337 4.47149 0.862004C4.73216 1.12267 4.73216 1.544 4.47149 1.80467L2.26816 4.008L4.38816 6.20334C4.64349 6.46934 4.63616 6.89 4.37149 7.146C4.10683 7.402 3.68416 7.39467 3.42883 7.13L0.854159 4.46334C0.728826 4.33334 0.666826 4.16667 0.666826 4', fill='#E3E5E8')
			input(
					ref="scroll"
					v-model.number="scroll"
					:style="`--thumb-width: ${blockWidth / listWidth  * 100}%`"
					type="range"
					:min="0"
					:max="maxScroll"
					step="1"
				)
			div.horizontal__arrow.horizontal__arrow_reverse(
				:class="{disabled: scroll === maxScroll}"
				@click="scroll = maxScroll"
			)
				svg(width='5', height='8', viewbox='0 0 5 8', fill='none', xmlns='http://www.w3.org/2000/svg')
					path(fill-rule='evenodd', clip-rule='evenodd', d='M0.666826 4C0.666826 3.82934 0.732159 3.65867 0.862159 3.52867L3.52883 0.862004C3.78949 0.601337 4.21083 0.601337 4.47149 0.862004C4.73216 1.12267 4.73216 1.544 4.47149 1.80467L2.26816 4.008L4.38816 6.20334C4.64349 6.46934 4.63616 6.89 4.37149 7.146C4.10683 7.402 3.68416 7.39467 3.42883 7.13L0.854159 4.46334C0.728826 4.33334 0.666826 4.16667 0.666826 4', fill='#E3E5E8')
		color-choice(v-if="showMoreOptions" :openInfo="openInfo" :colorKey="Number(colorKey)" v-bind="optionsModalBinds" from="configurators" @save="optionSave")

</template>

<script>
import ColorChoice from "./ColorChoice/ColorChoice"
export default {
	name: "HorizontalListItems",
	components: {
		ColorChoice
	},
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		currentItemCode: {
			type: String,
			default: "",
		},
		selectedBox: {
			type: Object,
			default: null,
		},
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
			handleHold: false,
			itemsTranslate: [],
			cbDeferTs: null,
			posY: 0,
			openInfo: "showActive",
			colorKey: 1
		}
	},
	computed: {
		showMoreOptions() {
			return true
		},
		optionsModalBinds() {
			const items = this.items && this.items.map(({ code, image, active, name, color, imageDetail }, i) => {
				return {
					id: code,
					img: image,
					colorKey: i,
					active,
					name,
					color,
					imageDetail
				}
			}) || []
			return {
				title: "Все варианты",
				items,
				preview: false,
				modalName: "OtherOptions",
				// constructorCode: this.constructorCode,
			}
		},
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
				transform: `translateX(${`${-this.scroll}px`})`,
				transition: this.handleHold || this.hold ? "none" : ".2s ease",
			}
		},
	},
	watch: {
		items: {
			deep: true,
			immediate: true,
			async handler(v, old) {
				if (v && JSON.stringify(v) !== JSON.stringify(old)) {
					await this.getSizes()
				}
			},
		},
		currentItemCode(v) {
			if (!this.items) return
			const itemIndex = this.items.findIndex(({ code }) => code === v)
			if (itemIndex === -1) return
			const offset = this.itemsTranslate[itemIndex] - 98
			if (offset < this.maxScroll) this.scroll = offset >= 0 ? offset : 0
			else this.scroll = this.maxScroll
			this.positionX = this.scroll
		},
	},
	mounted() {
		window.addEventListener("mousedown", this.onHold)
		window.addEventListener("mouseup", this.offHold)
		this.$refs.list.addEventListener("wheel", this.onWheel, { passive: false, capture: true })
		window.addEventListener("mouseenter", this.onEnter)
		this.$emit("selectItem", this.currentItemCode)
	},
	beforeUnmount() {
		window.removeEventListener("mousedown", this.onHold)
		window.removeEventListener("mouseup", this.offHold)
		this.$refs.list.removeEventListener("wheel", this.onWheel)
	},
	methods: {
		openColorChoiceModal(codeClick, button) {
			// this.colorKey = this.items.findIndex(({ code }) => code === codeClick)
			// this.openInfo = button
			// this.$_sh_lockBody(true)
			this.$modal.show(this.optionsModalBinds.modalName)
		},
		optionSave({ id }) {
			this.setOption(id)
		},
		setOption(option) {
			console.log(option)
			// const { code } = this.property
			// this.$emit("set-option", { code, option })
		},
		isDisabled(item) {
			return item.disabled
		},

		async getSizes() {
			await this.$nextTick()
			this.scroll = 0
			this.positionX = 0
			this.startScroll = 0
			this.blockWidth = this.$refs.block.clientWidth
			this.listWidth = this.$refs.list.scrollWidth
			this.maxScroll = (this.listWidth - this.blockWidth)
			this.itemsTranslate = this.$refs.items && this.$refs.items.map((el) => el.offsetLeft)
		},
		selectItem(item) {
			if (!this.hold && !this.isDisabled(item)) this.$emit("selectItem", item)
		},
		calcPositionMouse(event) {
			const scroll = this.startScroll + this.positionX - event.clientX
			if (scroll >= 0 && scroll < this.maxScroll) this.scroll = scroll
			else if (scroll < 0) this.scroll = 0
			else this.scroll = this.maxScroll
			if (Math.abs(this.scroll - this.positionX) > 0) this.hold = true

			const cb = () => {
				this.hold = false
			}
			this.cfDefer(cb, 50)
		},
		cfDefer(callback, ms = 500) {
			const ts = Date.now()
			this.cbDeferTs = ts

			setTimeout(() => {
				if (ts === this.cbDeferTs) {
					callback()
				}
			}, ms)
		},
		onWheel(event) {
			if (this.$refs.list && this.$refs.list.contains(event.target) && this.items && this.items.length > 4) {
				event.preventDefault()
				const newPos = this.scroll + event.deltaY + event.deltaX
				if (newPos > this.maxScroll) this.scroll = this.maxScroll
				else if (newPos < 0) this.scroll = 0
				else this.scroll = newPos
			}
		},
		onEnter() {
			this.posY = document.documentElement.scrollTop
		},
		onHold(event) {
			if (this.$refs.list && this.$refs.list.contains(event.target) || (this.$refs.scroll && this.$refs.scroll.contains(event.target))) {
				this.startScroll = event.clientX
				window.addEventListener("mousemove", this.calcPositionMouse)
			}
		},
		offHold() {
			window.removeEventListener("mousemove", this.calcPositionMouse)
			this.handleHold = false
			this.positionX = this.scroll
		},
	},
}
</script>

<style lang="scss" scoped>
$thumbWidth: var(--thumb-width);

.horizontal {
	width: 100%;
	overflow: hidden;
	padding-top: 16px;
	user-select: none;

	&__list {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		user-select: none;
	}

	&__line + &__line {
		padding-top: 16px;
	}

	&__line {
		display: flex;
		flex-wrap: nowrap;
		user-select: none;
	}

	&__scroll {
		display: flex;
		align-items: center;
		margin-top: 8px;
		width: calc(100% );
		background: #F1F2F3;
		border-radius: 4px;
	}

	&__arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 16px;
		height: 16px;
		cursor: pointer;

		svg path {
			transition: .2s ease;
			fill: #C7CAD1;
		}

		&.disabled {
			svg path {
				fill: #E3E5E8
			}
		}

		&_reverse {
			transform: scale(-1);
		}
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
	font-size: 14px;
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
		padding-bottom: 8px;
		user-select: none;
		-webkit-user-drag: none;
	}
}

input[type=range] {
	height: 16px;
	-webkit-appearance: none;

	width: 100%;
	margin: 0;
	background: #F1F2F3;
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
	height: 10px;
	width: $thumbWidth;
	border-radius: 2px;
	background: #C7CAD1;
	cursor: pointer;
	-webkit-appearance: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
	background: transparent;
}

input[type=range]::-moz-range-track {
	width: 100%;
	height: 10px;
	cursor: pointer;
	border-radius: 2px;
}

input[type=range]::-moz-range-thumb {
	height: 10px;
	width: $thumbWidth;
	border-radius: 2px;
	background: #C7CAD1;
	cursor: pointer;
}

input[type=range]::-ms-track {
	width: 100%;
	height: 10px;
	cursor: pointer;
	background: transparent;
	border-color: transparent;
	color: transparent;
}

input[type=range]::-ms-thumb {
	height: 10px;
	width: $thumbWidth;
	border-radius: 2px;
	background: #C7CAD1;
	cursor: pointer;
}

</style>
