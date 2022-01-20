import {
	Mesh,
	Shape,
	DoubleSide,
	Group,
	Math,
	TextureLoader,
	MeshLambertMaterial,
	ExtrudeBufferGeometry,
	MeshStandardMaterial,
	BoxGeometry,
} from "three"

const facadeTextureLoader = new TextureLoader()

const add = require("../img/add.png")

const boxControl = (name, pos) => {
	console.log("boxControl")
	function createButton() {
		const f_rect = function roundedRect(ctx, x, y, width, height, radius) {
			ctx.moveTo(x, y + radius)
			ctx.lineTo(x, y + height - radius)
			ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
			ctx.lineTo(x + width - radius, y + height)
			ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
			ctx.lineTo(x + width, y + radius)
			ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
			ctx.lineTo(x + radius, y)
			ctx.quadraticCurveTo(x, y, x, y + radius)
		}

		const roundedRectShape = new Shape()
		f_rect(roundedRectShape, -15, -15, 30, 30, 10)

		const material = new MeshLambertMaterial({ color: 0xffffff, side: DoubleSide })

		const extrudeSettings = {
			depth: 1, bevelEnabled: false, bevelSegments: 0, steps: 5, bevelSize: 2, bevelThickness: 2,
		}
		const geometry = new ExtrudeBufferGeometry(roundedRectShape, extrudeSettings)

		const s = 0.1
		const mesh = new Mesh(geometry, material)

		mesh.scale.set(s, s, s)

		const button = new Group()
		button.add(mesh)
		return button
	}

	const geometry = new BoxGeometry(2, 2, 0.01)
	const material = new MeshStandardMaterial({
		color: 0xcccccc,
		transparent: true,
		map: facadeTextureLoader.load(add),
	})

	const addSvg = new Mesh(geometry, material)
	addSvg.position.set(0, 0, 0.1)

	const addBtn = createButton()
	addBtn.add(addSvg)

	addBtn.position.set(0, 0, 0)
	addBtn.name = "control"

	const buttonsGroup = new Group()
	buttonsGroup.add(addBtn)
	buttonsGroup.name = name
	buttonsGroup.userData.type = "control"
	buttonsGroup.userData.pos = pos

	buttonsGroup.scale.set(1, 1, 1)
	buttonsGroup.visible = false

	geometry.dispose()
	material.dispose()
	return buttonsGroup
}

const bottomLeft = boxControl("addBottomLeftButton", "floor")
bottomLeft.userData.actionName = "addBottomLeftToScene"
bottomLeft.userData.watcher = "widthLeftBottom"
bottomLeft.userData.position = "bottomLeft"
bottomLeft.userData.side = "left"
bottomLeft.position.set(-4, 5, 1)
bottomLeft.userData.getCoords = function(x, y, z, value) {
	return [-4 - value, y, z]
}

const bottomRight = boxControl("addBottomRightButton", "floor")
bottomRight.rotation.y = Math.degToRad(-90)
bottomRight.userData.actionName = "addBottomRightToScene"
bottomRight.userData.watcher = "widthRightBottom"
bottomRight.userData.position = "bottomRight"
bottomRight.userData.side = "right"
bottomRight.position.set(-1, 5, 4)
bottomRight.userData.getCoords = function(x, y, z, value) {
	return [x, y, 4 + value]
}

const topLeft = boxControl("addTopLeftButton", "wall")
topLeft.userData.actionName = "addTopLeftToScene"
topLeft.userData.watcher = "widthLeftTop"
topLeft.userData.position = "topLeft"
topLeft.userData.side = "left"
topLeft.position.set(-4, 18, 1)
topLeft.userData.getCoords = function(x, y, z, value) {
	return [-4 - value, y, z]
}

const topRight = boxControl("addTopRightButton", "wall")
topRight.rotation.y = Math.degToRad(-90)
topRight.userData.actionName = "addTopRightToScene"
topRight.userData.watcher = "widthRightTop"
topRight.userData.position = "topRight"
topRight.userData.side = "right"
topRight.position.set(-1, 18, 4)
topRight.userData.getCoords = function(x, y, z, value) {
	return [x, y, 4 + value]
}

const controlBoxes = [bottomLeft, bottomRight, topLeft, topRight]

export default {
	controlBoxes,
}
