import { BoxGeometry, Mesh } from "three"
import { constants } from "./constants"
import { mesh } from "./CustomMesh"
import { topBox } from "./TopBox"

import Materials from "../Materials"

const { defaultMaterial } = Materials

const width = 8

const height = constants.topHeight
const depth = constants.topDepth

const { sideDepth } = constants
const { scale } = constants

const sideY = (height) / 2 - sideDepth

export const w_800 = () => {
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

	sideTop.position.y = height - sideDepth * 1.5
	sideBottom.position.y = 0 - sideDepth / 2

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)

	shelf.position.set(0, sideY, 0)

	/*
  const facadeGroup = new Group()
  facadeGroup.position.set(-width / 2 - sideDepth /2, sideY, depth / 2)
  const facadeGeometry = new BoxGeometry(width - sideDepth /4, height - legsHeight, sideDepth )
  const facade = mesh(facadeGeometry, defaultMaterial());
  facade.position.x = (width / 2 + sideDepth / 8)
  facadeGroup.name = 'facade'
  facadeGroup.code = '397_716_0_solid_1'
  facadeGroup.visible = true
  facadeGroup.add(facade)
  caseGroup.add(facadeGroup)
*/
	boxGroup.name = "w_800"
	boxGroup.userData.code = "w-800"
	// boxGroup.userData['facadeVariants'] = ['397_716_0_solid_1']
	boxGroup.userData.configType = "boxWall"
	boxGroup.userData.openedDoors = false

	// boxGroup.scale.set( scale, scale, scale )
	return boxGroup
}
