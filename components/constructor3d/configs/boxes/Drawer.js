import {
	BoxGeometry, Group, Mesh, MeshStandardMaterial,
} from "three"
import { constants } from "./constants"
import { mesh } from "./CustomMesh"

export const Drawer = (bodyWidth, boxHeight, bodyDepth, drawerHeight) => {
	const { sideDepth } = constants
	const material = new MeshStandardMaterial({ color: 0xffffff })
	const { drawerSideGap } = constants
	const { drawerSideDepth } = constants

	const drawerWidth = bodyWidth - sideDepth * 2 - drawerSideGap * 2 // ширина выдвижного ящика
	const drawerDepth = bodyDepth - sideDepth // глубина выдвижного ящика

	const drawerBottomGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, sideDepth, drawerDepth - drawerSideDepth)
	const drawerSideGeometry = new BoxGeometry(drawerSideDepth, drawerHeight, drawerDepth)
	const drawerSideBackGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, drawerHeight, drawerSideDepth)

	const drawerBottom = mesh(drawerBottomGeometry, material)
	const drawerSideR = mesh(drawerSideGeometry, material)
	const drawerSideL = mesh(drawerSideGeometry, material)
	const drawerSideBack = mesh(drawerSideBackGeometry, material)

	drawerBottom.position.z = drawerSideDepth / 2
	drawerSideR.position.x = -(drawerWidth / 2 - drawerSideDepth / 2)
	drawerSideR.position.y = drawerHeight / 2 - sideDepth / 2
	drawerSideL.position.x = drawerWidth / 2 - drawerSideDepth / 2
	drawerSideL.position.y = drawerHeight / 2 - sideDepth / 2
	drawerSideBack.position.y = drawerHeight / 2 - sideDepth / 2
	drawerSideBack.position.z = -(drawerDepth / 2 - drawerSideDepth / 2)

	const drawer_0 = new Group()
	drawer_0.name = "drawer"

	drawer_0.add(drawerBottom)
	drawer_0.add(drawerSideR)
	drawer_0.add(drawerSideL)
	drawer_0.add(drawerSideBack)

	drawer_0.position.z = sideDepth / 2
	return drawer_0
}
