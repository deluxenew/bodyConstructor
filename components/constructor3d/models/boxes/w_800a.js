import {constants}  from "./constants";
import { topBox } from "./TopBox"
import {
  BoxGeometry,
  Mesh,
  Group,
  BufferGeometry,
  Math,
  BufferAttribute,
  QuaternionKeyframeTrack,
  Quaternion,
  Vector3,
  AnimationClip,
  AnimationMixer,
  AnimationClipCreator,
  default as THREE
} from "three";

import  Materials from "../Materials";
const { defaultMaterial } =  Materials

const width = constants.topDepth*2

const height = constants.topHeight

const sideDepth = constants.sideDepth;
const scale = constants.scale

const sideY = (height) / 2 - sideDepth

export const w_800a = () => {

  const wrap = topBox(width, height, width)
  const boxGroup = wrap.boxGroup
  const caseGroup = wrap.caseGroup
  boxGroup.add(caseGroup)

  let bodyWidth = width;
  let bodyHeight = height;
  let bodyDepth = bodyWidth;

  let bD = constants.topDepth;
  let sP = 0; //катет дальнего угла
  let bP = bD - sideDepth; //глубина навесных шкафов
  let bW = bodyWidth/2 - sideDepth

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(bD, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);

  // create a simple square shape. We duplicate the top left and bottom right
  // vertices because each vertex needs to appear once per triangle.

  const vertices = [

    // front1
    { pos: [     -bW, sideDepth,      bW], norm: [ 0,  0,  1], uv: [0, 0], }, //E
    { pos: [     -bW,         0,      bW], norm: [ 0,  0,  1], uv: [0, 0], }, //E1
    { pos: [-bW + bP, sideDepth,      bW], norm: [ 0,  0,  1], uv: [0, 0], }, //D

    { pos: [-bW + bP, sideDepth,      bW], norm: [ 0,  0,  1], uv: [0, 0], }, //D
    { pos: [     -bW,         0,      bW], norm: [ 0,  0,  1], uv: [0, 0], }, //E1
    { pos: [-bW + bP,         0,      bW], norm: [ 0,  0,  1], uv: [0, 0], }, //D1


    // front
    { pos: [-bW + bP, sideDepth,      bW], norm: [ 1,  0,  1], uv: [0, 0], }, //D
    { pos: [-bW + bP,         0,      bW], norm: [ 1,  0,  1], uv: [0, 0], }, //D1
    { pos: [      bW, sideDepth,-bW + bP], norm: [ 1,  0,  1], uv: [0, 0], }, //C

    { pos: [      bW, sideDepth,-bW + bP], norm: [ 1,  0,  1], uv: [0, 0], }, //C
    { pos: [-bW + bP,         0,      bW], norm: [ 1,  0,  1], uv: [0, 0], }, //D1
    { pos: [      bW,         0,-bW + bP], norm: [ 1,  0,  1], uv: [0, 0], }, //C1


    // front2
    { pos: [      bW, sideDepth,-bW + bP], norm: [ 1,  0,  0], uv: [0, 0], }, //C
    { pos: [      bW,         0,-bW + bP], norm: [ 1,  0,  0], uv: [0, 0], }, //C1
    { pos: [      bW, sideDepth,     -bW], norm: [ 1,  0,  0], uv: [0, 0], }, //B

    { pos: [      bW, sideDepth,     -bW], norm: [ 1,  0,  0], uv: [0, 0], }, //B
    { pos: [      bW,         0,-bW + bP], norm: [ 1,  0,  0], uv: [0, 0], }, //C1
    { pos: [      bW,         0,     -bW], norm: [ 1,  0,  0], uv: [0, 0], }, //B1


    //back1
    { pos: [      bW, sideDepth,     -bW], norm: [ 0,  0, -1], uv: [0, 0], }, //B
    { pos: [      bW,         0,     -bW], norm: [ 0,  0, -1], uv: [0, 0], }, //B1
    { pos: [-bW + sP, sideDepth,     -bW], norm: [ 0,  0, -1], uv: [0, 0], }, //A

    { pos: [-bW + sP, sideDepth,     -bW], norm: [ 0,  0, -1], uv: [0, 0], }, //A
    { pos: [      bW,         0,     -bW], norm: [ 0,  0, -1], uv: [0, 0], }, //B1
    { pos: [-bW + sP,         0,     -bW], norm: [ 0,  0, -1], uv: [0, 0], }, //A1


    //back
    { pos: [-bW + sP, sideDepth,     -bW], norm: [-1,  0, -1], uv: [0, 0], }, //A
    { pos: [-bW + sP,         0,     -bW], norm: [-1,  0, -1], uv: [0, 0], }, //A1
    { pos: [     -bW, sideDepth,-bW + sP], norm: [-1,  0, -1], uv: [0, 0], }, //F

    { pos: [-bW + sP,         0,     -bW], norm: [-1,  0, -1], uv: [0, 0], }, //A1
    { pos: [     -bW,         0,-bW + sP], norm: [-1,  0, -1], uv: [0, 0], }, //F1
    { pos: [     -bW, sideDepth,-bW + sP], norm: [-1,  0, -1], uv: [0, 0], }, //F


    //back2
    { pos: [     -bW, sideDepth,-bW + sP], norm: [-1,  0,  0], uv: [0, 0], }, //F
    { pos: [     -bW,         0,-bW + sP], norm: [-1,  0,  0], uv: [0, 0], }, //F1
    { pos: [     -bW, sideDepth,      bW], norm: [-1,  0,  0], uv: [0, 0], }, //E

    { pos: [     -bW, sideDepth,      bW], norm: [-1,  0,  0], uv: [0, 0], }, //E
    { pos: [     -bW,         0,-bW + sP], norm: [-1,  0,  0], uv: [0, 0], }, //F1
    { pos: [     -bW,         0,      bW], norm: [-1,  0,  0], uv: [0, 0], }, //E1


    // top
    { pos: [      bW, sideDepth,     -bW], norm: [ 0,  1,  0], uv: [0, 0], }, //B
    { pos: [-bW + sP, sideDepth,     -bW], norm: [ 0,  1,  0], uv: [0, 0], }, //A
    { pos: [      bW, sideDepth,-bW + bP], norm: [ 0,  1,  0], uv: [0, 0], }, //C

    { pos: [      bW, sideDepth,-bW + bP], norm: [ 0,  1,  0], uv: [0, 0], }, //C
    { pos: [-bW + sP, sideDepth,     -bW], norm: [ 0,  1,  0], uv: [0, 0], }, //A
    { pos: [     -bW, sideDepth,-bW + sP], norm: [ 0,  1,  0], uv: [0, 0], }, //F

    { pos: [-bW + bP, sideDepth,      bW], norm: [ 0,  1,  0], uv: [0, 0], }, //D
    { pos: [      bW, sideDepth,-bW + bP], norm: [ 0,  1,  0], uv: [0, 0], }, //C
    { pos: [     -bW, sideDepth,-bW + sP], norm: [ 0,  1,  0], uv: [0, 0], }, //F

    { pos: [     -bW, sideDepth,      bW], norm: [ 0,  1,  0], uv: [0, 0], }, //E
    { pos: [-bW + bP, sideDepth,      bW], norm: [ 0,  1,  0], uv: [0, 0], }, //D
    { pos: [     -bW, sideDepth,-bW + sP], norm: [ 0,  1,  0], uv: [0, 0], }, //F

    // bottom
    { pos: [-bW + sP,         0,     -bW], norm: [ 0, -1,  0], uv: [0, 0], }, //A1
    { pos: [      bW,         0,     -bW], norm: [ 0, -1,  0], uv: [0, 0], }, //B1
    { pos: [      bW,         0,-bW + bP], norm: [ 0, -1,  0], uv: [0, 0], }, //C1

    { pos: [-bW + sP,         0,     -bW], norm: [ 0, -1,  0], uv: [0, 0], }, //A1
    { pos: [      bW,         0,-bW + bP], norm: [ 0, -1,  0], uv: [0, 0], }, //C1
    { pos: [     -bW,         0,-bW + sP], norm: [ 0, -1,  0], uv: [0, 0], }, //F1

    { pos: [     -bW,         0,-bW + sP], norm: [ 0, -1,  0], uv: [0, 0], }, //F1
    { pos: [      bW,         0,-bW + bP], norm: [ 0, -1,  0], uv: [0, 0], }, //C1
    { pos: [-bW + bP,         0,      bW], norm: [ 0, -1,  0], uv: [0, 0], }, //D1

    { pos: [     -bW,         0,      bW], norm: [ 0, -1,  0], uv: [0, 0], }, //E1
    { pos: [     -bW,         0,-bW + sP], norm: [ 0, -1,  0], uv: [0, 0], }, //F1
    { pos: [-bW + bP,         0,      bW], norm: [ 0, -1,  0], uv: [0, 0], }, //D1
  ];

  const positions = [];
  const normals = [];
  const uvs = [];
  for (const vertex of vertices) {
    positions.push(...vertex.pos);
    normals.push(...vertex.norm);
    uvs.push(...vertex.uv);
  }

  const geometry = new BufferGeometry();
  const positionNumComponents = 3;
  const normalNumComponents = 3;
  const uvNumComponents = 2;
  geometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(positions), positionNumComponents));
  geometry.setAttribute(
      'normal',
      new BufferAttribute(new Float32Array(normals), normalNumComponents));
  geometry.setAttribute(
      'uv',
      new BufferAttribute(new Float32Array(uvs), uvNumComponents));

  let sideV = new Mesh(geometry, defaultMaterial());

  let sideLeft = new Mesh(gSideLR, defaultMaterial());
  let sideRight = new Mesh(gSideLR, defaultMaterial());
  let sideBackR = new Mesh(gSideBack, defaultMaterial());
  let sideBackL = new Mesh(gSideBack, defaultMaterial());
  let sideBottom = new Mesh(geometry, defaultMaterial());
  let sideBTop = new Mesh(geometry, defaultMaterial());
  //let sideShelf = new Mesh(gSideBottom, defaultMaterial());
  let facadeLeft = new Group()
  //let facadeRight = new Group();

  let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'

  /*let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox'
  facadeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'*/

  let group = new Mesh();

  sideV.position.y = 0;
  //sideV.position.x = sideDepth / 2;
  //sideV.position.z = sideDepth / 2;
  //sideV.rotation.y = Math.degToRad(90);
  group.add(sideV);

  //sideLeft.rotation.y = Math.degToRad(-90);
  sideLeft.position.z = (boxDepth/2 - sideDepth / 2);
  sideLeft.position.x = -(boxDepth/4 /*- sideDepth / 2*/);
  sideRight.rotation.y = Math.degToRad(90);
  sideRight.position.x = (boxWidth / 2 - sideDepth / 2);
  sideRight.position.z = -(boxDepth/4 /*- sideDepth / 2*/);
  sideBackR.position.z = -(boxDepth / 2 - sideDepth / 2);
  sideBackL.position.x = -(boxWidth / 2 - sideDepth / 2);
  sideBackL.rotation.y = Math.degToRad(90);
  //sideBottom.rotation.x = Math.degToRad(-90);
  //sideShelf.rotation.x = Math.degToRad(-90);
  sideBottom.position.y = -(boxHeight / 2 );
 // sideBTop.rotation.x = Math.degToRad(-90);
  sideBTop.position.y = (boxHeight / 2 - sideDepth);
  //sideBTop.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth);

  group.add(sideLeft);
  group.add(sideRight);
  group.add(sideBackR);
  group.add(sideBackL);
  group.add(sideBottom);
  //group.add(sideShelf);
  group.add(sideBTop)
  group.add(objFacadeLeft)
  //group.add(objFacadeRight)
  group.name = "group"

  boxGroup.add(group);

  group.position.y = boxHeight/2 - sideDepth;

  /*boxGroup.userData.width = bodyWidth
  boxGroup.userData.depth = bodyDepth
  boxGroup.userData.height = bodyHeight*/

  boxGroup.name = 'w_800a'
  boxGroup.userData['code'] = 'w-800a'
  boxGroup.userData['configType'] = 'angularBox'
  //boxGroup.userData['facadeVariants'] = ['397_716_0_solid_1']
  boxGroup.userData['configType'] = 'boxWall'
  boxGroup.userData['openedDoors'] = false

  boxGroup.scale.set( scale, scale, scale )

  // boxGroup.position.set(0,0,0);

  defaultMaterial().dispose()
  gSideLR.dispose()
  gSideBack.dispose()
  gSideBottom.dispose()
  boxGroup.rotation.y = Math.degToRad(-90);
  //gSideTop.dispose()
  return boxGroup

}

