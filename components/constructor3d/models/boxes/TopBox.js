import {constants}  from "./constants";
import { boxWrapper } from "./BoxWrapper"
import {BoxGeometry, CylinderGeometry, Group, Mesh} from "three";

export const topBox = (width, height, depth) => {
  const caseGroup = new Group()
  const boxGroup = boxWrapper(width, height, depth)
  boxGroup.userData['pos'] = 'top'
  boxGroup.position.y = constants().topBound - height + constants().sideDepth
  return {
    boxGroup,
    caseGroup
  }
}
