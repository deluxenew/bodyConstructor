<template lang="pug">
	div.inner-page
		div.page
			div.title Кухни по индивидуальным размерам
			div.constructor
				div.column.preview
					canvas3d(
						v-bind="canvas3DBind"
						ref="canvas"
						@selectBox="selectBox"
						@selectTableTop="selectTableTop"
						@removeTableTops="removeAllTableTops"
						@setOrderList="setOrderList"
					)
				div.column.config
					select-case(
						ref="cases"
						v-model="selectedBoxName"
						:options="bodyOptions"
						:selectedBox="selectedBox"
						:selectedTableTop="selectedTableTop"
						:selectedBoxType="selectedBoxType"
						:isOnlyAngularBoxes="isOnlyAngularBoxes"
						@selectItem="selectCaseConfig"
						@remove="removeCase"
						@selectType="setControlsVerticalPosition"
						@discardSelectBox="discardSelectBox"
					)
					select-facade(
						ref="facades"
						v-model="facadeConfig"
						:caseModelCode="caseModelCode"
						:selectedBox="selectedBox"
						:selectedTableTop="selectedTableTop"
						:options="facadeOptions"
						@selectColor="selectFacadeColor"
					)
					select-table-top(
						v-model="tableTopConfig"
						:isExistBox="isExistBox"
						:options="tableTopOptions"
						:textures="tableTopTextures"
						:selectedBox="selectedBox"
						:selectedTableTop="selectedTableTop"
						@remove="removeAllTableTops"
						@selectColor="selectTableTopConfig"
					)
					ui-button(
						style="width: 100%; margin-top: 24px"
						text="Рассчитать стоимость"
						@click="sendCalculate"
					)

			calculate-order(
				:orderList="orderList"
			)
</template>

<script>
import Canvas3d from "./Canvas3d"
import Module from "./module"
import SelectCase from "./SelectCase.vue"
import SelectFacade from "./SelectFacade.vue"
import SelectTableTop from "./SelectTableTop.vue"
import CalculateOrder from "./CalculateOrder"
import HF from "./HelperFunctions"
import { UiButton } from "@aksonorg/design"

const { getImage } = HF

export default {
	name: "ViewModule3D",
	components: {
		Canvas3d,
		CalculateOrder,
		Module,
		SelectCase,
		SelectFacade,
		UiButton,
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

			tableTopConfig: null,
			selectedTableTop: null,
			orderList: null
		}
	},
	watch: {
		selectedBox(v) {
			if (!v) this.facadeConfig = null
		},
		async isOnlyAngularBoxes(v) {
			if (v) {
				await this.$nextTick()
				this.selectNextBox()
			}
		},
		controlsVerticalPosition(v) {
			// if (v === "floor" && this.isAngularBottomBox ) {
			// 	this.selectedBoxName = "f-800-820-3b"
			// 	this.caseModelCode = "f-800-820-3b"
			// }
			// if ((v === "wall" && this.isAngularTopBox) || this.isFirstPenalBox) {
			// 	this.selectedBoxName = "w-800"
			// 	this.caseModelCode = "w-800"
			// }
		},
		isAngularBottomBox(v) {
			if (v) {
				this.selectNextBox()
			}
		},
		isAngularTopBox(v) {
			if (v) {
				this.selectNextBox()
			}
		},
	},
	computed: {
		isExistBox() {
			return this.orderList && !!this.orderList.cases
		},
		canvas3DBind() {
			return {
				controlsVerticalPosition: this.controlsVerticalPosition,
				caseModelCode: this.caseModelCode,
				tableTopConfig: this.tableTopConfig,
				facadeConfig: this.facadeConfig
			}
		},
		isAngularBottomBox() {
			const cases = this.orderList && this.orderList.cases
			const angularExist = cases && cases.find((el) => {
				const field = el.find(({ id }) => id === "code")
				if (field) return field.value === "f-800a"
			})
			return cases && !!angularExist
		},
		isAngularTopBox() {
			const cases = this.orderList && this.orderList.cases
			const angularExist = cases && cases.find((el) => {
				const field = el.find(({ id }) => id === "code")
				if (field) return field.value === "w-800a"
			})
			return cases && !!angularExist
		},
		isOnlyAngularBoxes() {
			const cases = this.orderList && this.orderList.cases
			const onlyAngularList = cases && cases.filter((el) => {
				const field = el.find(({ id }) => id === "code")
				if (field) return field.value.indexOf("a") > -1
			})
			return cases && onlyAngularList && cases.length === onlyAngularList.length && !this.selectedBox
		},
		isFirstPenalBox() {
			const cases = this.orderList && this.orderList.cases
			const bottomBoxes = cases && cases.filter((el) => {
				const field = el.find(({ id }) => id === "code")
				if (field) return field.value.indexOf("f-") > -1
			})
			return bottomBoxes && bottomBoxes[0] && bottomBoxes[0].find(({ id }) => id === "code").value === "f-600-2140"
		},
		bodyOptions() {
			return this.config && this.config.body.options || null
		},
		tableTopOptions() {
			return this.config && this.config.tabletop.options || null
		},
		facadeOptions() {
			return this.config && this.config.body.options || null
		},
		tableTopTextures() {
			return this.config && this.config.tabletop.imgLayers[0].images || null
		},
		facadeTextures() {
			return this.config && this.config.body.imgLayers[1].images || null
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
		sendCalculate() {

		},
		selectNextBox() {
			if (this.controlsVerticalPosition === "floor") {
				if (this.caseModelCode !== "f-800a") return
				this.selectedBoxName = "f-800-820-3b"
				this.caseModelCode = "f-800-820-3b"
			} else {
				if (this.caseModelCode !== "w-800a") return
				this.selectedBoxName = "w-800"
				this.caseModelCode = "w-800"
			}
		},
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
			this.selectedBox = v
			if (v) {
				this.selectedBoxType = v.userData.pos
				this.caseModelCode = v.userData.code
				this.selectedBoxName = v.name
				this.facadeConfig = v.userData.facadeConfig
			}
		},
		selectFacadeColor(v) {
			this.facadeConfig = v

			const { materialCode, facadeVariant, colorCode } = v
			const firstFacadeEl1 = facadeVariant && facadeVariant.split("##")[0]
			const firstFacadeEl1Q = firstFacadeEl1 && firstFacadeEl1[firstFacadeEl1.length -1]
			const firstFacadeEl2 = facadeVariant && facadeVariant.split("##")[1]
			const firstFacadeEl2Q = firstFacadeEl2 && firstFacadeEl2[firstFacadeEl2.length -1]
			const firstFacadeEl3 = facadeVariant && facadeVariant.split("##")[2]
			const firstFacadeEl3Q = firstFacadeEl3 && firstFacadeEl3[firstFacadeEl3.length -1]

			const facadeCode = firstFacadeEl1 ? firstFacadeEl1.slice(0, -1) + "1" : facadeVariant
			const colorUrls = []
			const facadeLayerCode = `${materialCode}::${colorCode}::${facadeCode}`

			const findTexture = this.facadeTextures && this.facadeTextures
				.find(({ code }) => code === facadeLayerCode)

			if (findTexture) {
				for (let i=0; i < firstFacadeEl1Q; i++) colorUrls.push(`https://cdn.akson.ru/webp${findTexture.path}0.png`)
			}

			if (firstFacadeEl2) {
				const facadeLayerCode2 = `${materialCode}::${colorCode}::${firstFacadeEl2.replace("_2", "_1")}`
				const findTexture2 = this.facadeTextures && this.facadeTextures
					.find(({ code }) => code === facadeLayerCode2)
				if (findTexture2) {
					for (let i=0; i < firstFacadeEl2Q; i++) colorUrls.push(`https://cdn.akson.ru/webp${findTexture2.path}0.png`)
				}
			}

			if (firstFacadeEl3) {
				const facadeLayerCode3 = `${materialCode}::${colorCode}::${firstFacadeEl3}`
				const findTexture3 = this.facadeTextures && this.facadeTextures
					.find(({ code }) => code === facadeLayerCode3)
				if (findTexture3) {
					for (let i=0; i < firstFacadeEl3Q; i++) colorUrls.push(`https://cdn.akson.ru/webp${findTexture3.path}0.png`)
				}
			}

			this.facadeConfig["colorUrls"] = colorUrls
			if (findTexture && findTexture.pathMap) {
				const textureFacadeMap = `https://cdn.akson.ru/webp${findTexture.pathMap}0.png`
				if (textureFacadeMap) this.facadeConfig["textureMap"] = textureFacadeMap
			}
		},
		selectTableTop(v) {
			this.selectedTableTop = v
		},
		async selectTableTopConfig(item) {
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
			this.$refs.cases.opened = false
			this.$refs.facades.opened = false
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
@import "@aksonorg/design/lib/index.css";

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
