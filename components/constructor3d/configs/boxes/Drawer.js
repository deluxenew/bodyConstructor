import {
	BoxGeometry, Group, MeshStandardMaterial, VectorKeyframeTrack,
} from "three"
import { constants } from "./constants"
import { mesh } from "./CustomMesh"

export const Drawer = (bodyWidth, boxHeight, bodyDepth, drawerHeight, posY) => {
	const { sideDepth } = constants
	const material = new MeshStandardMaterial({ color: 0xffffff })
	const { drawerSideGap } = constants
	const { drawerSideDepth } = constants

	const drawerWidth = bodyWidth - sideDepth * 2 - drawerSideGap * 2 // ширина выдвижного ящика
	const drawerDepth = bodyDepth - sideDepth // глубина выдвижного ящика

	const drawerBottomGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, sideDepth, drawerDepth - drawerSideDepth)
	const drawerSideGeometry = new BoxGeometry(drawerSideDepth, drawerHeight, drawerDepth)
	const drawerSideBackGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, drawerHeight, drawerSideDepth)
	const drawerSideFrontGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, drawerHeight+0.3, drawerSideDepth)

	const drawerBottom = mesh(drawerBottomGeometry, material)
	const drawerSideR = mesh(drawerSideGeometry, material)
	const drawerSideL = mesh(drawerSideGeometry, material)
	const drawerSideBack = mesh(drawerSideBackGeometry, material)
	const drawerSideFront = mesh(drawerSideFrontGeometry, material)

	drawerBottom.position.z = drawerSideDepth / 2
	drawerSideR.position.x = -(drawerWidth / 2 - drawerSideDepth / 2)
	drawerSideR.position.y = drawerHeight / 2 - sideDepth / 2
	drawerSideL.position.x = drawerWidth / 2 - drawerSideDepth / 2
	drawerSideL.position.y = drawerHeight / 2 - sideDepth / 2
	drawerSideBack.position.y = drawerHeight / 2 - sideDepth / 2
	drawerSideBack.position.z = -(drawerDepth / 2 - drawerSideDepth / 2)
	drawerSideFront.position.y = drawerHeight / 2 - sideDepth / 2
	drawerSideFront.position.z = (drawerDepth / 2 - drawerSideDepth / 2)

	const drawer0 = new Group()
	drawer0.name = "drawer"

	drawer0.add(drawerBottom)
	drawer0.add(drawerSideR)
	drawer0.add(drawerSideL)
	drawer0.add(drawerSideBack)
	drawer0.add(drawerSideFront)

	drawer0.position.z = sideDepth / 2
	drawer0.userData.posY = posY
	return drawer0
}
