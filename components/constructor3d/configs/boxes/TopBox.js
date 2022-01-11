import { Group } from "three"
import { constants } from "./constants"
import { boxWrapper } from "./BoxWrapper"
import { GetTextMesh } from "../Text"
import { GetArrows } from "../Arrows"

export const topBox = (width, height, depth) => {
	const caseGroup = new Group()
	const boxGroup = boxWrapper(width, height, depth, true)

	const sizeMesh = GetTextMesh(`${width * 100}`, width)
	sizeMesh.position.y = - 1.1
	sizeMesh.position.z = - depth / 2 + 0.01

	const arrows = GetArrows(width)
	arrows.position.y = - 1.1
	arrows.position.z = - depth / 2 + 0.01
	boxGroup.add(arrows)

	boxGroup.add(sizeMesh)
	boxGroup.userData.pos = "wall"

	boxGroup.position.set(-width / 2, height / 2, depth / 2)
	boxGroup.position.y = constants.topBound - height + constants.sideDepth

	return {
		boxGroup,
		caseGroup,
	}
}
