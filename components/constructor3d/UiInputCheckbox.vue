<template lang="pug">
  div.checkbox
    label.checkbox__label(
      :class="labelClass"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    )
      div.checkbox__check(:class="iconClass")
        ui-icon-mark.checkbox__icon(v-if="model" color="#ffffff")
      input.checkbox__input(
        v-model="model"
        v-show="false"
        type="checkbox"
        :disabled="disabled"
      )
      span.checkbox__text(:class="textClass") {{ label }}
</template>

<script>
import UiIconMark from "./UiIconMark"

export default {
	name: "UiInputCheckbox",
	components: {
		UiIconMark,
	},
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: "",
		},
		spaceBetween: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			hovered: false,
		}
	},
	computed: {
		model: {
			get() {
				return this.value
			},
			set(v) {
				this.$emit("input", v)
			},
		},
		labelClass() {
			return {
				checkbox__label_disabled: this.disabled,
				checkbox__label_between: this.spaceBetween,
			}
		},
		textClass() {
			return {
				checkbox__text_disabled: this.disabled,
			}
		},
		iconClass() {
			return {
				checkbox__check_active: this.model,
				checkbox__check_hover: this.hovered,
				checkbox__check_disabled: this.disabled,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;

  &__label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    user-select: none;
    cursor: pointer;

    &_between {
      justify-content: space-between;
    }
    &_disabled {
      cursor: default;
    }
  }
  &__check {
    flex: 0 0 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $theme_primary;
    box-sizing: border-box;
    border-radius: 4px;
    transition: .2s ease-in-out;
    background-color: $background_color_primary;
    cursor: pointer;

    &_active {
      border-color: $theme_primary;
      background-color: $theme_primary;
    }

    &_hover:not(&_disabled) {
      border-color: $theme_primary;
    }

    &_hover:not(&_disabled).checkbox__check_active {
      border-color: $theme_accent_secondary;
      background-color: $theme_accent_secondary;
    }

    &_disabled {
      border-color: rgba($border_color_primary, .4);
      background-color: $background_color_primary;
      cursor: default;
    }

    &_disabled.checkbox__check_active {
      display: flex;
      background-color: rgba($theme_primary, .4);
      border-color: transparent;
    }
  }
  &__icon {
    width: 12px;
    height: 9px;
  }
  &__input {
    display: none;
  }

  &__text {
    margin-left: 12px;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: $text_color_primary;
    cursor: pointer;

    &_disabled {
      color: rgba($text_color_primary, .4);
      cursor: default;
    }
  }
}
</style>
