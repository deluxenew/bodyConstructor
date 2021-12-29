import {constants}  from "./constants";
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { mesh } from "./CustomMesh"
import {BoxGeometry, Mesh} from "three";

import Materials from "../Materials";
const { defaultMaterial } = Materials

const width = 4

const height = constants.bottomHeight
const depth = constants.bottomDepth

const sideDepth = constants.sideDepth;
const legsHeight = constants.legsHeight;
const scale = constants.scale

const sideY = (height - legsHeight) / 2 - sideDepth

export const f_400 = () => {
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
  const shelf = mesh(shelfGeometry, defaultMaterial());



  caseGroup.add(sideRight)
  caseGroup.add(sideLeft)
  caseGroup.add(sideBack)
  caseGroup.add(beams)
  caseGroup.add(shelf)

  sideRight.position.set(width / 2 - sideDepth /2, sideY, 0)
  sideLeft.position.set(-width / 2 + sideDepth /2, sideY, 0)
  sideBack.position.set(0, sideY, - depth / 2 + sideDepth)

  shelf.position.set(0, sideY, 0)

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
  boxGroup.name = 'f_400'
  boxGroup.userData['code'] = 'f-400'
  //boxGroup.userData['facadeVariants'] = ['397_716_0_solid_1']
  boxGroup.userData['configType'] = 'boxFloor'
  boxGroup.userData['openedDoors'] = false

  boxGroup.scale.set( scale, scale, scale )
  return boxGroup
}

