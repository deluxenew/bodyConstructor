import {
	BoxGeometry, Mesh, Group, Math,
} from "three"
import Materials from "./Materials"
import { GetArrows } from "./Arrows"
import { GetTextMesh } from "./Text"

const { textureMaterial } = Materials

import { edgesHelper } from "./EdgesHelper"

const depth = 6

export const getTableTop = ({ width, height, type, url, maxWidth, minWidth }, needDepthSize, isLeft) => {
	const tableTopBox = new BoxGeometry(width, height, depth)
	const tableTop = new Mesh(tableTopBox, textureMaterial(url))
	const tableTopGroup = new Group()
	tableTop.castShadow = true
	tableTop.receiveShadow = true
	tableTop.name = "tableTop"

	const arrows = GetArrows(width)
	arrows.rotateZ(Math.degToRad(-180))
	arrows.position.y = height + .8
	arrows.position.x = -0.01
	arrows.position.z = -2.99
	tableTopGroup.add(arrows)

	const sizeText = GetTextMesh(`${(width * 100).toFixed(0)}`)
	sizeText.position.y = height + .8
	sizeText.position.x = -0.01
	sizeText.position.z = -2.99
	tableTopGroup.add(sizeText)

	const depthArrows = GetArrows(depth)
	depthArrows.rotateZ(Math.degToRad(-180))
	depthArrows.rotateY(Math.degToRad(90))
	depthArrows.position.y = height + .8
	depthArrows.position.x = isLeft ? width / 2 - 0.01 : -width / 2 + 0.01
	depthArrows.position.z = 0.01

	const depthSizeText = GetTextMesh(`${(depth * 100).toFixed(0)}`)
	depthSizeText.rotateY(Math.degToRad(isLeft? -90 : 90))
	depthSizeText.position.y = height + .8
	depthSizeText.position.x = isLeft ? width / 2 - 0.01 : -width / 2 + 0.01
	depthSizeText.position.z = 0.01

	if (needDepthSize) {
		tableTopGroup.add(depthArrows)
		tableTopGroup.add(depthSizeText)
	}

	const {	boxHelper, line } = edgesHelper(width, height, depth, false)


	tableTopGroup.add(boxHelper)
	tableTopGroup.add(line)
	tableTopGroup.add(tableTop)

	tableTopGroup.name = "tableTop"
	tableTopGroup.userData.type = "tableTop"
	tableTopGroup.userData.width = width
	tableTopGroup.userData.height = height
	tableTopGroup.userData.depth = depth
	tableTopGroup.userData.material = type
	tableTopGroup.userData.maxWidth = maxWidth
	tableTopGroup.userData.minWidth = minWidth

	tableTopBox.dispose()

	return tableTopGroup
}

export default {
	getTableTop,
}
