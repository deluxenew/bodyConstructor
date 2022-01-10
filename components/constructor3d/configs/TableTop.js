import {
	BoxGeometry, Mesh, Group, Math,
} from "three"
import Materials from "./Materials"
import { GetArrows } from "./Arrows"
import { GetTextMesh } from "./Text"

const { textureMaterial } = Materials

const depth = 6

export const getTableTop = ({ width, height, type, url, maxWidth }) => {
	const tableTopBox = new BoxGeometry(width, height, depth)
	const tableTop = new Mesh(tableTopBox, textureMaterial(url))
	const tableTopGroup = new Group()
	tableTop.castShadow = true
	tableTop.receiveShadow = true
	tableTop.name = "tableTop"

	const arrows = GetArrows(width)
	arrows.rotateZ(Math.degToRad(-180))
	arrows.position.y = height + 1
	arrows.position.x = -0.01
	arrows.position.z = -2.99

	const sizeText = GetTextMesh(`${(width * 100).toFixed(0)}`)
	sizeText.position.y = height + 1
	sizeText.position.x = -0.01
	sizeText.position.z = -2.99
	tableTopGroup.add(sizeText)

	tableTopGroup.add(arrows)
	tableTopGroup.add(tableTop)

	tableTopGroup.name = "tableTop"
	tableTopGroup.userData.type = "tableTop"
	tableTopGroup.userData.width = width
	tableTopGroup.userData.height = height
	tableTopGroup.userData.depth = depth
	tableTopGroup.userData.material = type
	tableTopGroup.userData.maxWidth = maxWidth

	tableTopBox.dispose()

	return tableTopGroup
}

export default {
	getTableTop,
}
