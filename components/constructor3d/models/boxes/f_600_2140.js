import {constants}  from "./constants";
import { bottomBox } from "./BottomBox"
import {BoxGeometry, Mesh, Group, QuaternionKeyframeTrack, Quaternion, Vector3, AnimationClip, AnimationMixer, AnimationClipCreator} from "three";

import Materials from "../Materials";
const { defaultMaterial } = Materials

const width = 6

const height = constants().topBound
const depth = constants().bottomDepth

const sideDepth = constants().sideDepth;
const legsHeight = constants().legsHeight;
const scale = constants().scale

const sideY = (height - legsHeight) / 2 - sideDepth
const shelfGap = (height) / 6 - sideDepth * 1.5

export const f_600_2140 = () => {
  const wrap = bottomBox(width, height, depth)
  const boxGroup = wrap.boxGroup
  const caseGroup = wrap.caseGroup
  boxGroup.add(caseGroup)

  const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth);
  const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth);
  const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth);

  const sideRight = new Mesh(sideGeometry, defaultMaterial());
  const sideLeft = new Mesh(sideGeometry, defaultMaterial());
  const sideBack = new Mesh(sideBackGeometry, defaultMaterial());

  const sideTop = new Mesh(shelfGeometry, defaultMaterial())

  const shelf_0 = new Mesh(shelfGeometry, defaultMaterial())
  const shelf_1 = new Mesh(shelfGeometry, defaultMaterial())
  const shelf_2 = new Mesh(shelfGeometry, defaultMaterial())
  const shelf_3 = new Mesh(shelfGeometry, defaultMaterial())
  const shelf_4 = new Mesh(shelfGeometry, defaultMaterial())

  caseGroup.add(sideRight)
  caseGroup.add(sideLeft)
  caseGroup.add(sideBack)
  caseGroup.add(shelf_0)
  caseGroup.add(shelf_1)
  caseGroup.add(shelf_2)
  caseGroup.add(shelf_3)
  caseGroup.add(shelf_4)
  caseGroup.add(sideTop)

  sideRight.position.set(width / 2 - sideDepth /2, sideY, 0)
  sideLeft.position.set(-width / 2 + sideDepth /2, sideY, 0)
  sideBack.position.set(0, sideY, - depth / 2 + sideDepth)

  shelf_0.position.set(0, shelfGap * 1, 0)
  shelf_1.position.set(0, shelfGap * 2, 0)
  shelf_2.position.set(0, shelfGap * 3, 0)
  shelf_3.position.set(0, shelfGap * 4, 0)
  shelf_4.position.set(0, shelfGap * 5, 0)

  sideTop.position.y = height - legsHeight - sideDepth * 1.5

  boxGroup.name = 'f_600_2140'
  boxGroup.userData['code'] = 'f-600-2140'
  //boxGroup.userData['facadeVariants'] = ['597_716_0_solid_1']
  boxGroup.userData['configType'] = 'boxFloor'
  boxGroup.userData['openedDoors'] = false

  boxGroup.scale.set( scale, scale, scale )
  return boxGroup
}

