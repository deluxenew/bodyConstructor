import { BoxGeometry, Group, Math } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { mesh } from "./CustomMesh"
import { Drawer } from "./Drawer"
import Materials from "../Materials"
import {getFacadeLeft } from "./FacadeAnimation"

const { defaultMaterial, metalMaterial,darkMaterial } = Materials

const width = 6

const height = 23.21
const depth = 4.17

const { sideDepth } = constants
const { legsHeight } = constants
const { scale } = constants

const sideY = (height) / 2 - sideDepth*2  - legsHeight

const variants = ["797_716_3_solid_1"]

const drawerHeight = 1.92

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeLeft({
		width: width,
		height: height - legsHeight,
		positionX: width/2,
		direction: "left",
		mirror: true
	})

	facadeLeft.position.set(-width/2, legsHeight / 2, depth /2 )

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

export const f_800_820_3b = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"797_716_3_solid_1": facadeVariant1(),
		}
		facadeGroup = facades[facadeName]

		facadeGroup.name = "facade"

		if (onlyFacade) return facadeGroup
	}

	const wrap = bottomBox(width, height, depth)
	const { boxGroup } = wrap
	const { caseGroup } = wrap
	boxGroup.add(caseGroup)

	const sideGeometry = new BoxGeometry(sideDepth, height /*- legsHeight*/, depth)
	const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height /*- legsHeight*/, sideDepth)

	const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth/*- sideDepth * 2*/)
	const shelfB = mesh(shelfGeometry, defaultMaterial())
	const shelfT = mesh(shelfGeometry, defaultMaterial())
	const shelfM = mesh(shelfGeometry, defaultMaterial())
	const shelfM0 = mesh(shelfGeometry, defaultMaterial())

	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const sideBack = mesh(sideBackGeometry, defaultMaterial())

	const bottomFrontGeometry = new BoxGeometry(width - sideDepth * 2, legsHeight, depth/*- sideDepth * 2*/)
	const bottomFront = mesh(bottomFrontGeometry, defaultMaterial())

	const geometryShtanga = new BoxGeometry(width-sideDepth*2, sideDepth*2, sideDepth)
	const shtanga = mesh( geometryShtanga, metalMaterial());
	shtanga.position.y = height/2
	shelfM.position.y = height- legsHeight- sideDepth*3 -3//-2- sideDepth
	shelfM0.position.y = constants.drawerBottomGap + 0.3 +drawerHeight

	const shtangaMWidth = 3.6
	const shtangaMHeight = sideDepth*6
	const shtangaM = new Group()
	const geometryMShtangaTB = new BoxGeometry(shtangaMWidth, sideDepth/2, sideDepth/2)
	const geometryMShtangaLR = new BoxGeometry(sideDepth/2, sideDepth*4, sideDepth/2)
	const geometryShtangaMM = new BoxGeometry(shtangaMWidth, sideDepth, sideDepth/4)
	const geometryShtangaBS = new BoxGeometry(sideDepth*2, sideDepth, sideDepth)
	const geometryShtangaBL = new BoxGeometry(sideDepth*3, sideDepth*2, sideDepth)
	const shtangaML = mesh( geometryMShtangaLR, metalMaterial());
	const shtangaMR = mesh( geometryMShtangaLR, metalMaterial());
	const shtangaMT = mesh( geometryMShtangaTB, metalMaterial());
	const shtangaMB = mesh( geometryMShtangaTB, metalMaterial());
	const shtangaMM = mesh( geometryShtangaMM, metalMaterial());
	const shtangaBS = mesh( geometryShtangaBS, darkMaterial());
	const shtangaBL = mesh( geometryShtangaBL, darkMaterial());
	
	shtangaMM.position.y = sideDepth*3 - sideDepth/2
	shtangaMT.position.y = sideDepth - sideDepth/4
	shtangaMB.position.y = -(sideDepth*3 - sideDepth/4)
	shtangaML.position.y = -sideDepth
	shtangaMR.position.y = -sideDepth
	shtangaBL.position.y = sideDepth*2
	shtangaBS.position.y = sideDepth/2 + sideDepth
	shtangaBL.position.x = -(shtangaMWidth)/2 + sideDepth*3/2
	shtangaBS.position.x = (shtangaMWidth)/2 - sideDepth
	shtangaML.position.x = -(shtangaMWidth)/2 + sideDepth/4
	shtangaMR.position.x = (shtangaMWidth)/2 - sideDepth/4
	shtangaM.add(shtangaMM)
	shtangaM.add(shtangaML)
	shtangaM.add(shtangaMR)
	shtangaM.add(shtangaMT)
	shtangaM.add(shtangaMB)
	shtangaM.add(shtangaBS)
	shtangaM.add(shtangaBL)
	shtangaM.position.y = height- shtangaMHeight/2- legsHeight- sideDepth*3 -3//    - 2
	shtangaM.rotation.y = Math.degToRad(-90)

	const drawer0 = Drawer(width, height, depth, drawerHeight, constants.drawerBottomGap)
	drawer0.position.y = constants.drawerBottomGap
	caseGroup.add(drawer0)

	bottomFront.position.z = -0.2
	bottomFront.position.y = -legsHeight-sideDepth
	caseGroup.add(shtangaM)
	caseGroup.add(shtanga)
	caseGroup.add(bottomFront)
	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(shelfB)
	caseGroup.add(shelfT)
	caseGroup.add(shelfM)
	caseGroup.add(shelfM0)
	shelfB.position.y = - sideDepth*2
	shelfT.position.y = height - legsHeight- sideDepth*2.5
	//caseGroup.add(beams)

	boxGroup.rotation.y += Math.degToRad(45)
	boxGroup.position.x += 3
	boxGroup.position.z += 3


	if (facadeName){
		boxGroup.add(facadeGroup)
	} 

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)

	boxGroup.name = "f_800_820_3b"
	boxGroup.userData.code = "f-800-820-3b"
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "boxFloor"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facade = false

	boxGroup.scale.set(scale, scale, scale)



	return boxGroup
}
