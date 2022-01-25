import { BoxGeometry, Group } from "three"
import { constants } from "./constants"
import { mesh } from "./CustomMesh"
import { topBox } from "./TopBox"

import Materials from "../Materials"
import { getFacadeTop } from "./FacadeAnimation"

const { defaultMaterial } = Materials

const width = 5

const height = 3.6
const depth = constants.topDepth

const { sideDepth } = constants

const sideY = (height) / 2 - sideDepth


const variants = ["496_357_0_solid_1"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeTop({
		width: 4.96,
		height: 3.57,
		positionX: 0,
		positionY: -sideY,
		direction: "top"
	})

	facadeLeft.position.set(0, sideY * 2, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 2
	return facadeGroup
}

export const w_500_360 = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"496_357_0_solid_1": facadeVariant1(),
		}
		facadeGroup = facades[facadeName]

		facadeGroup.name = "facade"

		if (onlyFacade) return facadeGroup
	}
	const wrap = topBox(width, height, depth)
	const { boxGroup } = wrap
	const { caseGroup } = wrap
	boxGroup.add(caseGroup)

	const sideGeometry = new BoxGeometry(sideDepth, height, depth)
	const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height, sideDepth)
	const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth)

	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const sideBack = mesh(sideBackGeometry, defaultMaterial())
	const sideTop = mesh(shelfGeometry, defaultMaterial())
	const sideBottom = mesh(shelfGeometry, defaultMaterial())

	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(sideTop)
	caseGroup.add(sideBottom)

	if (facadeName) boxGroup.add(facadeGroup)

	sideTop.position.y = height - sideDepth * 1.5
	sideBottom.position.y = 0 - sideDepth / 2

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)

	boxGroup.name = "w_500_360"
	boxGroup.userData.code = "w-500-360"
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "boxWall"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facade = false

	return boxGroup
}
