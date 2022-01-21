<template lang="pug">
	div.calc-form
		.calc-form__inner
			.calc-form__title Расчет стоимости заказа
			.calc-form__subtitle(v-if="cases.length") Шкафы
			.calc-form__table(v-if="cases.length")
				.calc-form__row.calc-form__row_header
					.calc-form__col.calc-form__col_number №
					.calc-form__col(
						v-for="field in cases[0]"
						:class="{'calc-form__col_name': field.id === 'size'}"
					) {{field.title}}
				.calc-form__row(v-for="(item, index) in cases" :key="item.uuid")
					.calc-form__col.calc-form__col_number {{index + 1}}
					.calc-form__col(
						v-for="field in item"
						:class="{'calc-form__col_name': field.id === 'size'}"
					) {{field.value}}

			.calc-form__subtitle(v-if="facades.length") Фасады
			.calc-form__table(v-if="facades.length")
				.calc-form__row.calc-form__row_header
					.calc-form__col.calc-form__col_number №
					.calc-form__col(
						v-for="field in facades[0]"
						:class="{'calc-form__col_name': field.id === 'size'}"
					) {{field.value ? field.title : ''}}
				.calc-form__row(v-for="(item, index) in facades" :key="item.uuid")
					.calc-form__col.calc-form__col_number {{index + 1}}
					.calc-form__col(
						v-for="field in item"
						:class="{'calc-form__col_name': field.id === 'size'}"
					) {{field.value}}

			.calc-form__subtitle(v-if="tableTops.length") Столешницы
			.calc-form__table(v-if="tableTops.length")
				.calc-form__row.calc-form__row_header
					.calc-form__col.calc-form__col_number №
					.calc-form__col(
						v-for="field in tableTops[0]"
						:class="{'calc-form__col_name': field.id === 'size'}"
					) {{field.value ? field.title : ''}}
				.calc-form__row(v-for="(item, index) in tableTops" :key="item.uuid")
					.calc-form__col.calc-form__col_number {{index + 1}}
					.calc-form__col(
						v-for="field in item"
						:class="{'calc-form__col_name': field.id === 'size'}"
					) {{field.value}}
</template>

<script>
export default {
	name: "CalculateOrder",
	props: {
		orderList: {
			type: Object,
			default: () => ({
				cases: [],
				tableTops: [],
				facades: []
			}),
		},
	},
	computed: {
		cases() {
			return this.orderList && this.orderList.cases && this.orderList.cases
				.reduce((acc, el) => {
					const existId = acc.findIndex((it) => it[0].value === el[0].value && it[3].value === el[3].value)
					if (existId > -1) {
						const quantityField = acc[existId].find(({ id }) => id === "quantity")
						if (quantityField) quantityField.value += 1
					} else acc.push(el.filter((it) => it.title))
					return acc
				}, []) || []
		},
		facades() {
			return this.orderList?.facades?.reduce((acc, el) => {
				const existId = acc.findIndex((it) => it[0].value === el[0].value && it[3].value === el[3].value)
				if (existId > -1) {
					const quantityField = acc[existId].find(({ id }) => id === "quantity")
					const elQuantityField = el.find(({ id }) => id === "quantity")
					if (quantityField) quantityField.value += elQuantityField.value
				} else acc.push(el.filter((it) => it.title))
				return acc
			}, []) || []
		},
		tableTops() {
			return this.orderList?.tableTops?.map((el) => el.filter((it) => it.title)) || []
		},

	},
	methods: {
		// removeItem(uuid) {
		// 	this.$emit("removeItem", uuid)
		// },
	},
}
</script>

<style lang="scss" scoped>
.calc-form {
	border: 1px solid #C7CAD1;
	border-radius: 4px;
	background: #FFFFFF;
	padding: 32px 42px;

	&__inner, &__table {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;
		width: 100%;
	}

	&__title {
		font-weight: normal;
		font-size: 24px;
		line-height: 32px;
		letter-spacing: 0.32px;
		color: #23252A;
	}

	&__subtitle {
		padding-top: 16px;
		font-weight: normal;
		font-size: 18px;
		line-height: 26px;
		letter-spacing: 0.32px;
		color: #23252A;
	}

	&__table {
		padding-top: 8px;
	}

	&__row {
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		padding: 8px 0;
		border-bottom: 1px dotted #e5e5e5;
		gap: 8px;

		&_header {
			.calc-form__col {
				color: #9DA2AE;
			}
		}

	}

	&__col {
		flex: 1 1 50%;
		display: flex;
		align-items: center;
		line-height: 20px;
		font-size: 14px;
		justify-content: flex-start;
		color: #23252A;

		&_number {
			flex: 0 0 64px;
			color: #9DA2AE;
		}

		&_name {
			flex: 1 1 50%;
		}

		&_button {
			flex: 0 0 24px;
			justify-content: center;

			.delete {
				cursor: pointer;
				border-radius: 50%;
				transition: .2s ease-in-out;

				&:hover {
					transform: scale(1.2)
				}
			}
		}
	}

}
</style>
