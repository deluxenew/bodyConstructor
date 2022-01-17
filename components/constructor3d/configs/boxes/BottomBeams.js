import { BoxGeometry, Group } from "three"
import Materials from "../Materials"
import { constants } from "./constants"
import { mesh } from "./CustomMesh"

const { defaultMaterial } = Materials

const { sideDepth } = constants
const { legsHeight } = constants
const { sideTop } = constants

const height = constants.bottomHeight
const depth = constants.bottomDepth

export const bottomBeams = (width) => {
	const sideTopGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, sideTop)
	const sideTopFront = mesh(sideTopGeometry, defaultMaterial())
	const sideTopBack = mesh(sideTopGeometry, defaultMaterial())

	sideTopGeometry.dispose()

	sideTopFront.position.set(0, height - legsHeight - sideDepth * 1.5, depth / 2 - sideTop / 2)
	sideTopBack.position.set(0, height - legsHeight - sideDepth * 1.5, -depth / 2 + sideTop / 2)

	const boxGroup = new Group()

	boxGroup.add(sideTopFront)
	boxGroup.add(sideTopBack)

	return boxGroup
}
