import {constants}  from "./constants";
import { bottomBox } from "./BottomBox"
import { Drawer } from "./Drawer"
import {BoxGeometry, Mesh, Group, QuaternionKeyframeTrack, Quaternion, Vector3, AnimationClip, AnimationMixer, AnimationClipCreator} from "three";

import Materials from "../Materials";
const { defaultMaterial } = Materials

const width = 6

const height = constants().bottomHeight
const depth = constants().bottomDepth

const sideDepth = constants().sideDepth;
const legsHeight = constants().legsHeight;
const scale = constants().scale

const sideY = (height - legsHeight) / 2 - sideDepth

const drawerHeight = 0.48

export const f_600_820_oven = () => {
  const wrap = bottomBox(width, height, depth)
  const boxGroup = wrap.boxGroup
  const caseGroup = wrap.caseGroup
  boxGroup.add(caseGroup)

  const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth);
  const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth);
  const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth);

  const sideRight = new Mesh(sideGeometry, defaultMaterial());
  const sideLeft = new Mesh(sideGeometry, defaultMaterial());
  const shelf = new Mesh(shelfGeometry, defaultMaterial())
  

  const drawer = Drawer(width, height, depth, drawerHeight)
  drawer.position.y = constants().drawerBottomGap
  caseGroup.add(drawer)

  caseGroup.add(sideRight)
  caseGroup.add(sideLeft)
  caseGroup.add(shelf)

  shelf.position.set(0, 0.94, 0)

  sideRight.position.set(width / 2 - sideDepth /2, sideY, 0)
  sideLeft.position.set(-width / 2 + sideDepth /2, sideY, 0)

  boxGroup.name = 'f_600_820_oven'
  boxGroup.userData['code'] = 'f_600_820_oven'
  //boxGroup.userData['facadeVariants'] = ['397_716_0_solid_2']
  boxGroup.userData['configType'] = 'boxFloor'
  boxGroup.userData['openedDoors'] = false

  boxGroup.scale.set( scale, scale, scale )
  return boxGroup
}

