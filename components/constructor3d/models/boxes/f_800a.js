import {constants}  from "./constants";
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import {BoxGeometry} from "three";
import { mesh } from "./CustomMesh"

import Materials from "../Materials";
const { defaultMaterial } = Materials

const width = 8

const height = constants.bottomHeight
const depth = constants.bottomDepth

const sideDepth = constants.sideDepth;
const legsHeight = constants.legsHeight;
const scale = constants.scale

const sideY = (height - legsHeight) / 2 - sideDepth

export const f_800a = () => {
  const beams = bottomBeams(width)
  const wrap = bottomBox(width, height, depth)
  const boxGroup = wrap.boxGroup
  const caseGroup = wrap.caseGroup
  boxGroup.add(caseGroup)

  const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth);
  const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth);
  const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth);

  const sideRight = mesh(sideGeometry, defaultMaterial());
  const sideLeft = mesh(sideGeometry, defaultMaterial());
  const sideBack = mesh(sideBackGeometry, defaultMaterial());

  const shelf = mesh(shelfGeometry, defaultMaterial())

  caseGroup.add(sideRight)
  caseGroup.add(sideLeft)
  caseGroup.add(sideBack)
  caseGroup.add(beams)
  caseGroup.add(shelf)

  sideRight.position.set(width / 2 - sideDepth /2, sideY, 0)
  sideLeft.position.set(-width / 2 + sideDepth /2, sideY, 0)
  sideBack.position.set(0, sideY, - depth / 2 + sideDepth)
  shelf.position.set(0, sideY, 0)

  boxGroup.name = 'f_800a'
  boxGroup.userData['code'] = 'f-800a'
  //boxGroup.userData['facadeVariants'] = ['397_716_0_solid_2']
  boxGroup.userData['configType'] = 'angularBox'
  boxGroup.userData['openedDoors'] = false
  // boxGroup.userData['depth'] = depth + 0.6

  boxGroup.scale.set( scale, scale, scale )
  return boxGroup
}

