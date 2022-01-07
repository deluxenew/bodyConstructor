import { Group } from "three"
import { constants } from "./constants"
import { boxWrapper } from "./BoxWrapper"
import { GetTextMesh } from "../Text"

export const topBox = (width, height, depth) => {
	const caseGroup = new Group()
	const boxGroup = boxWrapper(width, height, depth, true)

	const sizeMesh = GetTextMesh(`${width * 100}`, width)
	sizeMesh.position.y = constants.topBound /2 - 1.5 * height - 1
	sizeMesh.position.z = - depth / 2 + 0.01

	boxGroup.add(sizeMesh)
	boxGroup.userData.pos = "wall"

	boxGroup.position.set(-width / 2, height / 2, depth / 2)
	boxGroup.position.y = constants.topBound - height + constants.sideDepth

	return {
		boxGroup,
		caseGroup,
	}
}