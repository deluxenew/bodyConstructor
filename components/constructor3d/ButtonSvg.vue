<template lang="pug">
	button.button-svg(
		:class="classes"
		@click="$emit('click')"
	)
		| {{text}}
		slot.button-svg__svg
</template>

<script>
export default {
	name: "ButtonSvg",
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		appearance: {
			type: String,
			default: "primary"
		},
		text: {
			type: String,
			default: ""
		},
		customClass: {
			type: String,
			default: ""
		}
	},
	computed: {
		classes() {
			return {
				"disabled": this.disabled,
				"text": this.text,
				[this.appearance]: this.appearance,
				[this.customClass]: this.customClass
			}
		}
	},
}
</script>

<style lang="scss">
.button-svg {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4px;
	width: 40px;
	height: 40px;
	border-radius: 4px;
	cursor: pointer;
	transition: .2s ease-in-out;
	border: none;
	outline: none;

	svg path {
		transition: .2s ease-in-out;
	}

	&.text {
		width: auto;
		padding: 4px 16px;
		font-size: 14px;
	}

	&:disabled {
		opacity: 0;
	}

	&.primary {
		background: #0099dc;
		color: #ffffff;

		&:hover:not(:disabled) {
			background-color: #007ab0;
		}
	}

	&.secondary {
		background-color: #ffffff;
		color: #5C6270;

		&:hover:not(:disabled) {
			color: #ffffff;
			background-color: #e3e5e8;
		}
	}



}
</style>