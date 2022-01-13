<template lang="pug">
	div.tt-resizer
		div.tt-resizer__ruler
			resizer(
				v-model="width"
				:min="currentTableTop.userData.minWidth"
				:max="10000"
				:null-start="false"
				:only-ruler="false"
				:spinner-step="1"
			)
		div.tt-resizer__controls
			div.tt-resizer__spinner
				ui-input-spinner(
					v-model="width"
					size="small"
					:max="currentTableTop.userData.width"
					:min="currentTableTop.userData.minWidth"
					unit="мм"
				)
			div.tt-resizer__buttons
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
import { UiInputSpinner, UiButton } from "@aksonorg/design"
import Resizer from "./Resizer";
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
		}
	},
	data() {
		return {
			width: 0
		}
	},
	computed: {
		widthModel: {
			get() {

			},
			set(v) {
				console.log(v)
			}
		}
	},
	methods: {
		cancelResize() {
			this.$emit('cancelResize')
		},
		applyResize() {
			this.$emit('replaceTableTop', )
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