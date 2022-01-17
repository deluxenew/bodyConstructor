import { Group } from "three"
import { constants } from "./constants"
const { sideDepth } = constants

import { edgesHelper } from "../EdgesHelper"


export const boxWrapper = (width, height, depth, isTop) => {
	const boxGroup = new Group()
	const {	boxHelper, line } = edgesHelper(width, height, depth, isTop)

	boxGroup.add(boxHelper)
	boxGroup.add(line)

	boxGroup.position.set(-width / 2, height / 2, 0)

	boxGroup.name = "boxGroup"
	boxGroup.userData.width = width
	boxGroup.userData.height = height
	boxGroup.userData.depth = depth

	boxGroup.userData.size = `${ Math.round(width * 100) }*${ Math.round(height * 100) }*${Math.round(sideDepth * 100)}`
	boxGroup.userData.color = "Белый"
	boxGroup.userData.materialType = "ЛДСП"

	return boxGroup
}
