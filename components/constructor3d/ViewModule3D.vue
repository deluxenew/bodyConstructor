<template lang="pug">
	div.inner-page
		div.page
			div.title Кухни по индивидуальным размерам
			div.constructor
				div.column.preview
					canvas3d(
						v-bind="canvas3DBind"
						ref="canvas"
						@getBoxName="selectedBoxName = $event"
						@selectBox="selectBox"
						@selectTableTop="selectTableTop"
						@removeTableTops="removeAllTableTops"
						@setOrderList="setOrderList"
					)
				div.column.config
					select-case(
						v-model="selectedBoxName"
						:options="bodyOptions"
						:selectedBox="selectedBox"
						:selectedTableTop="selectedTableTop"
						:selectedBoxType="selectedBoxType"
						@selectItem="selectCaseConfig"
						@remove="removeCase"
						@selectType="setControlsVerticalPosition"
						@discardSelectBox="discardSelectBox"
					)
					select-facade(
						v-model="facadeConfig"
						:caseModelCode="caseModelCode"
						:selectedFacadeVariant="selectedFacadeVariant"
						:selectedFacadeColor="selectedFacadeColor"
						:selectedFacadeMaterial="selectedFacadeMaterial"
						:options="facadeOptions"
						@selectColor="selectFacadeColor"
					)
					select-table-top(
						v-model="tableTopConfig"
						:options="tableTopOptions"
						:textures="tableTopTextures"
						:elementVariants="tableTops"
						:selectedBox="selectedBox"
						:selectedTableTop="selectedTableTop"
						@remove="removeAllTableTops"
						@selectColor="selectTableTopConfig"
					)

			calculate-order(
				:orderList="orderList"
			)
</template>

<script>
import Canvas3d from "./Canvas3d"
import boxes from "./configs/boxes/BoxesList"
// import facades from "./FacadesListConfig"
import tableTops from "./configs/TableTop"

import Module from "./module"
import SelectCase from "./SelectCase.vue"
import SelectFacade from "./SelectFacade.vue"
import SelectTableTop from "./SelectTableTop.vue"
import CalculateOrder from "./CalculateOrder"

export default {
	name: "ViewModule3D",
	components: {
		Canvas3d,
		CalculateOrder,
		Module,
		SelectCase,
		SelectFacade,
		SelectTableTop,
	},
	data() {
		return {
			// common
			config: null,
			controlsVerticalPosition: "bottom",
			caseModelCode: null,

			// from scene
			selectedBox: null,
			selectedBoxName: null,
			selectedBoxType: null,

			facadeConfig: null,
			selectedFacadeVariant: null,
			selectedFacadeColor: null,
			selectedFacadeMaterial: null,

			tableTopConfig: null,
			selectedTableTop: null,
			orderList: null
		}
	},
	computed: {
		canvas3DBind() {
			return {
				controlsVerticalPosition: this.controlsVerticalPosition,
				caseModelCode: this.caseModelCode,
				tableTopConfig: this.tableTopConfig,
				facadeConfig: this.facadeConfig
			}
		},
		bodyOptions() {
			return this.config && this.config.body.options || null
		},
		tableTopOptions() {
			return this.config && this.config.tabletop.options || null
		},
		facadeOptions() {
			return this.config && this.config.body.options|| null
		},
		tableTopTextures() {
			return this.config && this.config.tabletop.imgLayers[0].images || null
		},
		boxes() {
			const { cases } = boxes
			return cases
		},
		tableTops() {
			const { colors } = tableTops
			return colors
		},
	},
	async mounted() {
		const response = await fetch("/kitchen.json")

		if (response.ok) {
			this.config = await response.json()
		} else {
			alert(`Ошибка HTTP: ${response.status}`)
		}
	},
	methods: {
		discardSelectBox() {
			this.$refs.canvas.clearSelect()
		},
		setControlsVerticalPosition(v) {
			this.controlsVerticalPosition = v
		},
		setOrderList(list) {
			this.orderList = list
		},

		selectCaseConfig(v) {
			this.caseModelCode = v
		},
		selectBox(v) {
			if (v) this.selectedBoxType = v.userData.pos
			if (v) this.caseModelCode = v.userData.code
			this.selectedBox = v
		},
		selectFacadeColor(v) {
		  this.facadeConfig = v
		},
		selectTableTop(v) {
			this.selectedTableTop = v
		},
		async selectTableTopConfig(item) {
			function getImage(url) {
				return new Promise((resolve, reject) => {
					const img = new Image()
					img.onload = function() {
						resolve(url)
					}
					img.onerror = function() {
						reject(url)
					}
					img.src = url
				})
			}

			const {
				color, type, maxWidth, minWidth, url, height,
				materialType, colorTitle
			} = item

			const loadedUrl = await getImage(url)

			this.tableTopConfig = {}
			this.tableTopConfig.type = type
			this.tableTopConfig.height = height
			this.tableTopConfig.color = color
			this.tableTopConfig.url = loadedUrl
			this.tableTopConfig.maxWidth = maxWidth
			this.tableTopConfig.minWidth = minWidth
			this.tableTopConfig.materialType = materialType
			this.tableTopConfig.colorTitle = colorTitle
		},
		removeCase() {
			this.$refs.canvas.removeCase(false)
		},
		removeAllTableTops() {
			this.$refs.canvas.removeAllTableTops()
			this.tableTopConfig = null
		}
	},
}
</script>

<style lang="scss">

.column {
	display: flex;
	flex-direction: column;

}

.constructor {
	padding-top: 24px;
	padding-bottom: 24px;
}

.preview {
	width: 800px;
}

.config {
	width: 368px;
	margin-left: 32px;
}

.page {
	width: 1200px;
	margin: 0 auto;

	.title {
		font-weight: bold;
		font-size: 32px;
		line-height: 48px;
		letter-spacing: 0.4px;
		color: #23252A;
	}

	.constructor {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
	}
}
</style>
