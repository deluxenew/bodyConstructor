<template lang="pug">
	div.tt-resizer(:key="currentTableTop.uuid")
		div.tt-resizer__ruler
			resizer(
				v-model="widthModel"
				:min="currentTableTop.userData.minWidth"
				:max="maxWidth"
				:null-start="false"
				:only-ruler="false"
				:spinner-step="1"
			)
		div.tt-resizer__controls
			div.tt-resizer__spinner
				ui-input-spinner(
					v-model="widthModel"
					size="small"
					:max="maxWidth"
					:min="currentTableTop.userData.minWidth"
					:step="1"
					unit="мм"
				)
			div.tt-resizer__buttons
				ui-button.tt-resizer__button(
					appearance="secondary"
					iconPosition="left"
					size="small"
					@click="$emit('removeTableTop')"
				)
					img(:src="require('./img/trash.svg')")
				ui-button.tt-resizer__button(
					appearance="secondary"
					size="small"
					text="Отменить"
					@click="cancelResize"
				)
				ui-button.tt-resizer__button(
					size="small"
					text="Применить"
					@click="applyResize"
				)

</template>

<script>
import "@aksonorg/design/lib/index.css"
import HF from "./HelperFunctions"
import { UiInputSpinner, UiButton } from "@aksonorg/design"
import Resizer from "./Resizer";
import { getTableTop } from "./configs/TableTop";
export default {
	name: "TableTopResizer",
	components: {
		Resizer,
		UiInputSpinner,
		UiButton
	},
	props: {
		currentTableTop: {
			type: Object,
			default: () => null
		},
		tableTopConfig: {
			type: Object,
			default: () => null
		},
		maxWidth: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			width: this.currentTableTop.userData.width * 100,
			newTableTop: null
		}
	},
	watch: {
		currentTableTop: {
			immediate: true,
			// deep: true,
			handler() {
				// this.newTableTop = JSON.parse(JSON.stringify(this.currentTableTop))
				this.width = this.currentTableTop.userData.width * 100
			},
		},
	},
	computed: {
		widthModel: {
			get() {
				return Math.round(this.width)
			},
			set(v) {
				this.width = Math.round(v)
			}
		}
	},
	methods: {
		cancelResize() {
			this.$emit('cancelResize')
		},
		applyResize() {
			const isLeft = this.currentTableTop.userData.pos === 'left'
			const existDepthSize = this.currentTableTop.userData.existDepthSize
			const { url, height, type, maxWidth, minWidth } = this.tableTopConfig

			const { position: { x, y, z }, userData: {width, difference: currentDifference, pos, commonIndex, index, initWidth} } = this.currentTableTop

			let newTableTop = getTableTop({
				width: this.widthModel / 100, url, height, type, maxWidth, minWidth
			}, existDepthSize, false)

			const defaultWidth = width * 100
			const difference = (defaultWidth - this.widthModel ) / 100
			newTableTop.userData.initWidth = initWidth

			newTableTop.position.set(x, y, z - difference / 2 - (newTableTop.userData.initWidth < this.widthModel / 100 ? (this.widthModel / 100 - newTableTop.userData.initWidth)   : 0) )
			if (!isLeft) newTableTop = HF.rotationY(newTableTop)
			if (newTableTop.userData.initWidth < this.widthModel / 100 ) {
				newTableTop.userData.otherDiff = this.widthModel / 100 - newTableTop.userData.initWidth
				newTableTop.userData.initWidth = this.widthModel / 100

			}
			console.log(newTableTop.userData.initWidth , width, 'newTableTop.userData.initWidth , width')
			newTableTop.userData.pos = pos
			newTableTop.userData.difference = difference
			newTableTop.userData.existDepthSize = existDepthSize
			newTableTop.userData.commonIndex = commonIndex
			newTableTop.userData.index = index


			this.$emit('replaceTableTop', newTableTop)
		}
	}
}
</script>



<style lang="scss" scoped>
@import "@aksonorg/design/lib/index.css";
.tt-resizer {
	position: absolute;
	width: 526px;
	bottom: 10px;
	left: calc(50% - 263px);

	&__ruler {
		background: #FFFFFF;
		border-radius: 4px;
	}

	&__controls {
		padding-top: 8px;
		display: flex;
	}

	&__spinner {

	}

	&__buttons {
		display: flex;
		margin-left: auto;
	}

	&__button + &__button {
		margin-left: 8px;
	}
}
</style>