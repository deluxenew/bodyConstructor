import {constants}  from "./constants";

import { topBox } from "./TopBox"
import {BoxGeometry, Mesh, Group, QuaternionKeyframeTrack, Quaternion, Vector3, AnimationClip, AnimationMixer, AnimationClipCreator} from "three";

import Materials from "../Materials";
const { defaultMaterial } = Materials

const width = 6

const height = 3.6
const depth = constants.topDepth

const sideDepth = constants.sideDepth;
const scale = constants.scale

const sideY = (height) / 2 - sideDepth

export const w_600_360 = () => {

  const wrap = topBox(width, height, depth)
  const boxGroup = wrap.boxGroup
  const caseGroup = wrap.caseGroup
  boxGroup.add(caseGroup)

  const sideGeometry = new BoxGeometry(sideDepth, height, depth);
  const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height, sideDepth);
  const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth);

  const sideRight = new Mesh(sideGeometry, defaultMaterial());
  const sideLeft = new Mesh(sideGeometry, defaultMaterial());
  const sideBack = new Mesh(sideBackGeometry, defaultMaterial());
  //const shelf = new Mesh(shelfGeometry, defaultMaterial())
  const sideTop = new Mesh(shelfGeometry, defaultMaterial())
  const sideBottom = new Mesh(shelfGeometry, defaultMaterial())

  caseGroup.add(sideRight)
  caseGroup.add(sideLeft)
  caseGroup.add(sideBack)
  //caseGroup.add(shelf)
  caseGroup.add(sideTop)
  caseGroup.add(sideBottom)

  sideTop.position.y = height - sideDepth*1.5
  sideBottom.position.y = 0 - sideDepth/2

  sideRight.position.set(width / 2 - sideDepth /2, sideY, 0)
  sideLeft.position.set(-width / 2 + sideDepth /2, sideY, 0)
  sideBack.position.set(0, sideY, - depth / 2 + sideDepth)

  //shelf.position.set(0, sideY, 0)

  /*
  const facadeGroup = new Group()
  facadeGroup.position.set(-width / 2 - sideDepth /2, sideY, depth / 2)
  const facadeGeometry = new BoxGeometry(width - sideDepth /4, height - legsHeight, sideDepth )
  const facade = new Mesh(facadeGeometry, defaultMaterial());
  facade.position.x = (width / 2 + sideDepth / 8)
  facadeGroup.name = 'facade'
  facadeGroup.code = '397_716_0_solid_1'
  facadeGroup.visible = true
  facadeGroup.add(facade)
  caseGroup.add(facadeGroup)
*/
  boxGroup.name = 'w_600_360'
  boxGroup.userData['code'] = 'w-600-360'
  //boxGroup.userData['facadeVariants'] = ['397_716_0_solid_1']
  boxGroup.userData['configType'] = 'boxWall'
  boxGroup.userData['openedDoors'] = false

  boxGroup.scale.set( scale, scale, scale )
  return boxGroup
}

