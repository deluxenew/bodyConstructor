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
			button-svg(
				:disabled="false"
				appearance="secondary"
				@click="$emit('removeTableTop')"
			)
				svg(width='24', height='24', viewbox='0 0 24 24', fill='none', xmlns='http://www.w3.org/2000/svg')
					path(fill-rule='evenodd', clip-rule='evenodd', d='M6.77111 4.00501C6.28525 4.00501 5.86174 4.3181 5.7439 4.76437L5.41499 6.01003H18.5851L18.2562 4.76437C18.1384 4.3181 17.7149 4.00501 17.229 4.00501H6.77111ZM3.68948 4.27809L3.03796 6.74554C3.01322 6.83055 3 6.92008 3 7.01253C3 7.5662 3.47405 8.01504 4.05882 8.01504H4.65578L5.36769 19.1904C5.47777 20.7711 6.86408 22 8.53727 22H15.4628C17.136 22 18.5223 20.7711 18.6324 19.1904L19.3443 8.01504H19.9412C20.5259 8.01504 21 7.5662 21 7.01253C21 6.9216 20.9872 6.8335 20.9633 6.74976L20.3106 4.27809C19.9571 2.93924 18.6866 2 17.229 2H6.77111C5.31353 2 4.04299 2.93924 3.68948 4.27809ZM17.222 8.01504H6.77803L7.48075 19.0584C7.51744 19.5854 7.97954 19.995 8.53727 19.995H15.4628C16.0205 19.995 16.4826 19.5854 16.5193 19.0584L17.222 8.01504ZM9.88235 9.97243C10.4671 9.97243 10.9412 10.4213 10.9412 10.9749V16.9875C10.9412 17.5412 10.4671 17.99 9.88235 17.99C9.29758 17.99 8.82353 17.5412 8.82353 16.9875V10.9749C8.82353 10.4213 9.29758 9.97243 9.88235 9.97243ZM15.1765 10.9749C15.1765 10.4213 14.7024 9.97243 14.1176 9.97243C13.5329 9.97243 13.0588 10.4213 13.0588 10.9749V16.9875C13.0588 17.5412 13.5329 17.99 14.1176 17.99C14.7024 17.99 15.1765 17.5412 15.1765 16.9875V10.9749Z', fill='#121316')
			div.tt-resizer__spinner
				ui-input-spinner(
					v-model="widthModel"
					size="small"
					:max="maxWidth"
					:min="currentTableTop.userData.minWidth"
					:step="1"
					unit="мм"
					:useDefer="true"
				)
				button-svg(
					:disabled="false"
					@click="applyResize"
				)
					svg(width='16', height='12', viewbox='0 0 16 12', fill='none', xmlns='http://www.w3.org/2000/svg')
						path(fill-rule='evenodd', clip-rule='evenodd', d='M5.86332 12C5.58732 12 5.32332 11.886 5.13432 11.685L0.271321 6.50599C-0.107679 6.10399 -0.086679 5.47099 0.315321 5.09299C0.718321 4.71499 1.35132 4.73499 1.72832 5.13699L5.85332 9.52799L14.2613 0.325991C14.6353 -0.0830093 15.2673 -0.110009 15.6753 0.261991C16.0823 0.633991 16.1103 1.26699 15.7383 1.67399L6.60132 11.674C6.41432 11.88 6.14832 11.998 5.87032 12H5.86332Z', fill='white')
			button-svg(
				:disabled="false"
				appearance="secondary"
				@click="cancelResize"
			)
				svg(width='24', height='24', viewbox='0 0 24 24', fill='none', xmlns='http://www.w3.org/2000/svg')
					path(d='M18 6L6 18', stroke='#5C6270', stroke-width='2', stroke-linecap='round', stroke-linejoin='round')
					path(d='M6 6L18 18', stroke='#5C6270', stroke-width='2', stroke-linecap='round', stroke-linejoin='round')


</template>

<script>
import "@aksonorg/design/lib/index.css"
import HF from "./HelperFunctions"
import { UiInputSpinner, UiButton } from "@aksonorg/design"
import Resizer from "./Resizer"
import { getTableTop } from "./configs/TableTop"
import ButtonSvg from "@/components/constructor3d/ButtonSvg"

export default {
	name: "TableTopResizer",
	components: {
		ButtonSvg,
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
		}
	},
	watch: {
		currentTableTop: {
			immediate: true,
			handler() {
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
			this.$emit("cancelResize")
		},
		applyResize() {
			const isLeft = this.currentTableTop.userData.pos === "left"
			const existDepthSize = this.currentTableTop.userData.existDepthSize
			const { url, height, type, maxWidth, minWidth } = this.tableTopConfig

			const {
				position: { x, y, z },
				userData: {
					width,
					difference: currentDifference,
					leftDifference: currentLeftDifference,
					pos,
					commonIndex,
					index,
					locked,
					size,
					product,
					materialType,
					color
				}
			} = this.currentTableTop

			let newTableTop = getTableTop({
				width: this.widthModel / 100, url, height, type, maxWidth, minWidth
			}, existDepthSize, isLeft)

			const defaultWidth = width * 100
			let difference = currentDifference || (defaultWidth - this.widthModel) / 100
			let leftDifference = currentLeftDifference || 0
			const diff = (defaultWidth - this.widthModel) / 100

			if (currentLeftDifference > 0) {
				const diffPosition = diff / 2 + currentLeftDifference
				if (!isLeft) newTableTop.position.set(x, y, z - diffPosition)
				else newTableTop.position.set(x + diffPosition, y, z)
				difference += leftDifference + diff
				leftDifference = 0
			} else {
				if (!isLeft) newTableTop.position.set(x, y, z - diff / 2)
				else newTableTop.position.set(x + diff / 2, y, z)
				if (currentDifference) difference += diff
			}

			if (!isLeft) newTableTop = HF.rotationY(newTableTop)

			newTableTop.userData.pos = pos
			newTableTop.userData.difference = difference
			newTableTop.userData.leftDifference = leftDifference
			newTableTop.userData.existDepthSize = existDepthSize
			newTableTop.userData.commonIndex = commonIndex
			newTableTop.userData.index = index
			newTableTop.userData.locked = locked

			newTableTop.userData.size = size
			newTableTop.userData.product = product
			newTableTop.userData.materialType = materialType
			newTableTop.userData.color = color


			this.$emit("replaceTableTop", newTableTop)
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
		justify-content: space-between;
	}

	&__spinner {
		display: flex;
		justify-content: center;
		gap: 8px;
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