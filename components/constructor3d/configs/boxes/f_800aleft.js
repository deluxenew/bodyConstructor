import { BoxGeometry, Group, Math } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { mesh } from "./CustomMesh"
import { getFacadeRight } from "./FacadeAnimation"

import Materials from "../Materials"

const { defaultMaterial } = Materials

const width = 8

const height = constants.bottomHeight
const depth = constants.bottomDepth

const { sideDepth } = constants
const { legsHeight } = constants

const sideY = (height - legsHeight) / 2 - sideDepth

const variants = ["397_716_0_solid_1##147_716_0_solid_1##40_716_0_solid_1"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeRight({
		width: 3.97,
		height: 7.16,
		positionX: -2,
		direction: "right"
	})

	facadeLeft.position.set(0, legsHeight / 2, depth /2)

	const facade1 = new Group()
	facade1.userData.facadeWidth = 1.47
	facade1.userData.facadeHeight = 7.16
	facade1.userData.positionX = 0.74
	facade1.position.set(0, legsHeight / 2, depth /2)

	const facade2 = new Group()
	facade2.userData.facadeWidth = .4
	facade2.userData.facadeHeight = 7.16
	facade2.userData.positionX = 0.74
	facade2.rotation.y = Math.degToRad(-90)
	facade2.position.set(0.6, legsHeight / 2, depth /2 - 0.3)

	facadeGroup.add(facadeLeft)
	facadeGroup.add(facade1)
	facadeGroup.add(facade2)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

export const f_800aleft = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"397_716_0_solid_1##147_716_0_solid_1##40_716_0_solid_1": facadeVariant1(),
		}
		facadeGroup = facades[facadeName]

		facadeGroup.name = "facade"

		if (onlyFacade) return facadeGroup
	}

	const beams = bottomBeams(width)
	const wrap = bottomBox(width, height, depth)
	const { boxGroup } = wrap
	const { caseGroup } = wrap
	boxGroup.add(caseGroup)

	const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth)
	const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth)
	const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth)

	const angBottomGeometry = new BoxGeometry(sideDepth, legsHeight, 1.5)
	const angBottom = mesh(angBottomGeometry, defaultMaterial())
	angBottom.position.x = -((depth - width/2 - constants.legFrontMargin) - 1.4 - sideDepth)
	angBottom.position.z = depth/2
	angBottom.position.y = -constants.legsHeight/2 - sideDepth - sideDepth/2

	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const sideBack = mesh(sideBackGeometry, defaultMaterial())

	const shelf = mesh(shelfGeometry, defaultMaterial())

	caseGroup.add(angBottom)
	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(beams)
	caseGroup.add(shelf)

	if (facadeName) boxGroup.add(facadeGroup)

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)
	shelf.position.set(0, sideY, 0)

	boxGroup.name = "f_800a"
	boxGroup.userData.code = "f-800a"
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "angularBox"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.productType = "Напольный угловой"
	boxGroup.userData.facade = false

	return boxGroup
}
