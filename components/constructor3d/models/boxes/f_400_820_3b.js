import {constants}  from "./constants";
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { Drawer } from "./Drawer"
import {BoxGeometry, Mesh, Group, QuaternionKeyframeTrack, Quaternion, Vector3, AnimationClip, AnimationMixer, AnimationClipCreator} from "three";

import Materials from "../Materials";
const { defaultMaterial } = Materials

const width = 4 

const height = constants.bottomHeight
const depth = constants.bottomDepth

const sideDepth = constants.sideDepth;
const legsHeight = constants.legsHeight;
const scale = constants.scale

const sideY = (height - legsHeight) / 2 - sideDepth

const drawer_0_Height = 2.38
const drawer_1_2_Height = 0.87

export const f_400_820_3b = () => {
  const beams = bottomBeams(width)
  const wrap = bottomBox(width, height, depth)
  const boxGroup = wrap.boxGroup
  const caseGroup = wrap.caseGroup
  boxGroup.add(caseGroup)

  const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth);
  const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth);

  const sideRight = new Mesh(sideGeometry, defaultMaterial());
  const sideLeft = new Mesh(sideGeometry, defaultMaterial());
  const sideBack = new Mesh(sideBackGeometry, defaultMaterial());

  const drawer_0 = Drawer(width, height, depth, drawer_0_Height)
  drawer_0.position.y = constants.drawerBottomGap
  caseGroup.add(drawer_0)

  const drawer_1 = Drawer(width, height, depth, drawer_1_2_Height)
  drawer_1.position.y = height - legsHeight - sideDepth - constants.drawerTopGap - drawer_1_2_Height * 2 - constants.drawerBetweenGap
  caseGroup.add(drawer_1)

  const drawer_2 = Drawer(width, height, depth, drawer_1_2_Height)
  drawer_2.position.y = height - legsHeight - sideDepth - constants.drawerTopGap - drawer_1_2_Height
  caseGroup.add(drawer_2)

  caseGroup.add(sideRight)
  caseGroup.add(sideLeft)
  caseGroup.add(sideBack)
  caseGroup.add(beams)

  sideRight.position.set(width / 2 - sideDepth /2, sideY, 0)
  sideLeft.position.set(-width / 2 + sideDepth /2, sideY, 0)
  sideBack.position.set(0, sideY, - depth / 2 + sideDepth)

  boxGroup.name = 'f_400_820_3b'
  boxGroup.userData['code'] = 'f-400-820-3b'
  //boxGroup.userData['facadeVariants'] = ['397_716_0_solid_2']
  boxGroup.userData['configType'] = 'boxFloor'
  boxGroup.userData['openedDoors'] = false

  boxGroup.scale.set( scale, scale, scale )
  return boxGroup
}

