import { boxWrapper } from "./BoxWrapper"
import {BoxGeometry, CylinderGeometry, Group, Mesh} from "three";
import Materials from "../Materials";

const { defaultMaterial, legMaterial } = Materials

const sideDepth = .16;

const legsHeight = 1;
const legsRad = 0.3;
const legFrontMargin = 0.38;

export const bottomBox = (width, height, depth) => {
  const boxGroup = boxWrapper(width, height, depth)

  const gSideBottom = new BoxGeometry(width - sideDepth * 2, sideDepth, depth);
  const sideBottom = new Mesh(gSideBottom, defaultMaterial())
  sideBottom.position.y = -height / 2 + legsHeight

  const gLegFront = new BoxGeometry(width, legsHeight, sideDepth)
  const legFront = new Mesh(gLegFront, defaultMaterial());
  legFront.position.set( 0, legsHeight / 2 - height / 2, depth /2 - legFrontMargin - sideDepth)

  const gLegs = new CylinderGeometry(
    legsRad, legsRad, legsHeight, 16);

  const legLeft = new Mesh(gLegs, legMaterial());
  const legRight = new Mesh(gLegs, legMaterial());
  legLeft.position.y = -height / 2 + legsHeight / 2;
  legLeft.position.z = -depth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -width / 2 + legsRad + legFrontMargin;
  legRight.position.y = -height / 2 + legsHeight / 2;
  legRight.position.z = -depth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = width / 2 - legsRad - legFrontMargin;

  boxGroup.add(sideBottom)
  boxGroup.add(legFront)
  boxGroup.add(legLeft)
  boxGroup.add(legRight)

  const caseGroup = new Group()
  caseGroup.position.y = -height / 2 + legsHeight + sideDepth
  boxGroup.position.set(-width / 2 , height / 2, depth / 2)
  caseGroup.name = 'caseGroup'
  boxGroup.userData['pos'] = 'floor'

  return {
    boxGroup,
    caseGroup
  }
}

