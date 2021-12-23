import { bottomBox } from "./bottomBox"
import {BoxGeometry, Mesh, Group } from "three";
import { Drawer } from "./Drawer"
import Materials from "../Materials";
const { defaultMaterial } = Materials

const width = 4
const height = 8.2
const depth = 4.8

const sideDepth = .16;
const legsHeight = 1;
const sideTop = 0.8;
const sideY = (height - legsHeight) / 2 - sideDepth

const drawerHeight = 2.2

const scale = 1

export const f_400_820_1b = () => {
  const wrap = bottomBox(width, height, depth)
  const boxGroup = wrap.boxGroup
  const caseGroup = wrap.caseGroup
  boxGroup.add(caseGroup)

  const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth);
  const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth);
  const sideTopGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, sideTop);
  const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth);

  const sideRight = new Mesh(sideGeometry, defaultMaterial());
  const sideLeft = new Mesh(sideGeometry, defaultMaterial());
  const sideBack = new Mesh(sideBackGeometry, defaultMaterial());
  const sideTopFront = new Mesh(sideTopGeometry, defaultMaterial());
  const sideTopBack = new Mesh(sideTopGeometry, defaultMaterial());
  const shelf = new Mesh(shelfGeometry, defaultMaterial())

  const drawer = Drawer(width, height, depth, drawerHeight)
  drawer.position.y = 5

  caseGroup.add(sideRight)
  caseGroup.add(sideLeft)
  caseGroup.add(sideBack)
  caseGroup.add(sideTopFront)
  caseGroup.add(sideTopBack)
  caseGroup.add(shelf)
  caseGroup.add(drawer)

  sideRight.position.set(width / 2 - sideDepth /2, sideY, 0)
  sideLeft.position.set(-width / 2 + sideDepth /2, sideY, 0)
  sideBack.position.set(0, sideY, - depth / 2 + sideDepth)
  sideTopFront.position.set(0, height - legsHeight - sideDepth * 2, depth / 2 - sideTop / 2)
  sideTopBack.position.set(0, height - legsHeight - sideDepth * 2, -depth / 2 + sideTop / 2)
  shelf.position.set(0, sideY, 0)

  const facadeGroup = new Mesh()
  facadeGroup.position.set(-width / 2 - sideDepth /2, sideY, depth / 2)
  const facadeGeometry = new BoxGeometry(width - sideDepth /4, height - legsHeight, sideDepth )
  const facade = new Mesh(facadeGeometry, defaultMaterial());
  facade.position.x = (width / 2 + sideDepth / 8)
  facadeGroup.name = 'facade'
  facadeGroup.code = '397_716_0_solid_1'
  facadeGroup.visible = false
  facadeGroup.add(facade)
  caseGroup.add(facadeGroup)

  boxGroup.name = 'f_400_820_1b'
  boxGroup.code = 'f-400-820-1b'
  boxGroup.userData['facadeVariants'] = ['397_716_1_solid_1']
  boxGroup.userData['configType'] = 'boxFloor'
  boxGroup.userData['openedDoors'] = false

  boxGroup.scale.set( scale, scale, scale )
  return boxGroup
}

