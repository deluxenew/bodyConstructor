import { Group } from "three"
import { constants } from "./constants"
import { boxWrapper } from "./BoxWrapper"

export const topBox = (width, height, depth) => {
	const caseGroup = new Group()
	const boxGroup = boxWrapper(width, height, depth, true)
	boxGroup.userData.pos = "wall"

	boxGroup.position.set(-width / 2, height / 2, depth / 2)
	boxGroup.position.y = constants.topBound - height + constants.sideDepth
	return {
		boxGroup,
		caseGroup,
	}
}
