import {BoxGeometry, Group, Mesh} from "three";
import Materials from "../Materials";
import {constants} from "./constants";

const { defaultMaterial } = Materials

const sideDepth = constants().sideDepth;
const legsHeight = constants().legsHeight;
const sideTop = constants().sideTop;

const height = constants().bottomHeight
const depth = constants().bottomDepth

export const bottomBeams = (width) => {

  const sideTopGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, sideTop);
  const sideTopFront = new Mesh(sideTopGeometry, defaultMaterial());
  const sideTopBack = new Mesh(sideTopGeometry, defaultMaterial());

  sideTopFront.position.set(0, height - legsHeight - sideDepth*1.5, depth / 2 - sideTop / 2)
  sideTopBack.position.set(0, height - legsHeight - sideDepth *1.5, -depth / 2 + sideTop / 2)

  const boxGroup = new Group();

  boxGroup.add(sideTopFront)
  boxGroup.add(sideTopBack)

  return boxGroup
}

