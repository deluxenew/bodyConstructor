import { BoxGeometry, Group } from "three"
import { constants } from "./constants"
import { mesh } from "./CustomMesh"
import { topBox } from "./TopBox"

import Materials from "../Materials"
import { getFacadeLeft, getFacadeRight } from "@/components/constructor3d/configs/boxes/FacadeAnimation"

const { defaultMaterial } = Materials

const width = 8

const height = constants.topHeight
const depth = constants.topDepth

const { sideDepth } = constants

const sideY = (height) / 2 - sideDepth

const variants = ["397_716_0_solid_2"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeLeft({
		width: 3.97,
		height: 7.16,
		positionX: 1.97,
		direction: "left"
	})

	facadeLeft.position.set(-3.97, sideY, depth /2)

	const facadeRight = getFacadeRight({
		width: 3.97,
		height: 7.16,
		positionX: -1.97,
		direction: "right"
	})

	facadeRight.position.set(3.97, sideY, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.add(facadeRight)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 2
	return facadeGroup
}

export const w_800 = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"397_716_0_solid_2": facadeVariant1(),
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
	const shelf = mesh(shelfGeometry, defaultMaterial())
	const sideTop = mesh(shelfGeometry, defaultMaterial())
	const sideBottom = mesh(shelfGeometry, defaultMaterial())

	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(shelf)
	caseGroup.add(sideTop)
	caseGroup.add(sideBottom)

	if (facadeName) boxGroup.add(facadeGroup)

	sideTop.position.y = height - sideDepth * 1.5
	sideBottom.position.y = 0 - sideDepth / 2

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)

	shelf.position.set(0, sideY, 0)

	boxGroup.name = "w_800"
	boxGroup.userData.code = "w-800"
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "boxWall"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facade = false

	return boxGroup
}
