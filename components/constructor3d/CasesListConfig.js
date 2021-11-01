import {BoxGeometry, CylinderGeometry, Math, Mesh, MeshStandardMaterial, Object3D, TextureLoader} from "three";

const legsHeight = 1;
const gapFacade = 0.1;
const sideDepth = .3;
const sideTop = 1.4;
const legsRad = 0.3;

const facadeTextureLoader = new TextureLoader();
const facadeMaterial = new MeshStandardMaterial({
  color: 0xffffff,
  map: facadeTextureLoader.load('https://api1.akson.ru:8443/aws/p/18133313/d2987a01-c3d2-444f-962b-d04b7845216c/600.png'),
});

const material = new MeshStandardMaterial({color: 0xffffff,});
material.roughness = 0.3;
material.metalness = 0.05;

const  legFrontMargin = 0.6;
const legMaterial = new MeshStandardMaterial({color: 0xffffff,});

legMaterial.roughness = 0.1;
legMaterial.metalness = 0.5;

let facadeMaterials = [
  facadeMaterial,
  facadeMaterial,
  facadeMaterial,
  facadeMaterial,
  facadeMaterial,
  material,
];

const boxStandardFloor = () => {
  let bodyWidth = 10;
  let bodyHeight = 10;
  let bodyDepth = 6;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
  let gFacade = new BoxGeometry(boxWidth / 2 - gapFacade / 2, boxHeight, sideDepth);
  let gLegFront = new BoxGeometry(boxWidth, legsHeight, sideDepth);
  let gLegs = new CylinderGeometry(
    legsRad, legsRad, legsHeight, 16);

  let sideLeft = new Mesh(gSideLR, material);
  let sideRight = new Mesh(gSideLR, material);
  let sideBack = new Mesh(gSideBack, material);
  let sideBottom = new Mesh(gSideBottom, material);
  let sideShelf = new Mesh(gSideBottom, material);
  let sideTopFront = new Mesh(gSideTop, material);
  let sideTopBack = new Mesh(gSideTop, material);
  let facedeLeft = new Mesh(gFacade, facadeMaterials);
  let facedeRight = new Mesh(gFacade, facadeMaterials);
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);

  let objFacedeLeft = new Object3D();
  objFacedeLeft.add(facedeLeft);
  facedeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacedeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacedeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacedeLeft.name = 'leftDoor'

  let objFacedeRight = new Object3D();
  objFacedeRight.add(facedeRight);
  facedeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacedeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacedeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacedeRight.name = 'rightDoor'

  let group = new Mesh();
  let bodyCase = new Mesh();

  sideLeft.rotation.y = Math.degToRad(-90);
  sideLeft.position.x = -(boxWidth / 2 - sideDepth / 2);
  sideRight.rotation.y = Math.degToRad(90);
  sideRight.position.x = (boxWidth / 2 - sideDepth / 2);
  sideBack.position.z = -(boxDepth / 2 - sideDepth / 2);
  sideBottom.rotation.x = Math.degToRad(-90);
  sideShelf.rotation.x = Math.degToRad(-90);
  sideBottom.position.y = -(boxHeight / 2 - sideDepth / 2);
  sideTopFront.rotation.x = Math.degToRad(-90);
  sideTopFront.position.y = (boxHeight / 2 - sideDepth / 2);
  sideTopFront.position.z = (boxDepth / 2 - sideTop / 2);
  sideTopBack.rotation.x = Math.degToRad(-90);
  sideTopBack.position.y = (boxHeight / 2 - sideDepth / 2);
  sideTopBack.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth);

  group.add(sideLeft);
  group.add(sideRight);
  group.add(sideBack);
  group.add(sideBottom);
  group.add(sideShelf);
  group.add(sideTopFront)
  group.add(sideTopBack)
  group.add(objFacedeLeft)
  group.add(objFacedeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.name = "body"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;

  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
  bodyCase.position.set(0,0,0);

  return bodyCase
}

const boxAngularFloor = () => {
  let bodyWidth = 15;
  let bodyHeight = 10;
  let bodyDepth = 6;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
  let gFacade = new BoxGeometry(boxWidth / 2 - gapFacade / 2, boxHeight, sideDepth);
  let gLegFront = new BoxGeometry(boxWidth, legsHeight, sideDepth);
  let gLegs = new CylinderGeometry(
    legsRad, legsRad, legsHeight, 16);

  let sideLeft = new Mesh(gSideLR, material);
  let sideRight = new Mesh(gSideLR, material);
  let sideBack = new Mesh(gSideBack, material);
  let sideBottom = new Mesh(gSideBottom, material);
  let sideShelf = new Mesh(gSideBottom, material);
  let sideTopFront = new Mesh(gSideTop, material);
  let sideTopBack = new Mesh(gSideTop, material);
  let facedeLeft = new Mesh(gFacade, facadeMaterials);
  let facedeRight = new Mesh(gFacade, facadeMaterials);
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);

  let objFacedeLeft = new Object3D();
  objFacedeLeft.add(facedeLeft);
  facedeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacedeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacedeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacedeLeft.name = 'leftDoor'

  let objFacedeRight = new Object3D();
  objFacedeRight.add(facedeRight);
  facedeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacedeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacedeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacedeRight.name = 'rightDoor'

  let group = new Mesh();
  let bodyCase = new Mesh();

  sideLeft.rotation.y = Math.degToRad(-90);
  sideLeft.position.x = -(boxWidth / 2 - sideDepth / 2);
  sideRight.rotation.y = Math.degToRad(90);
  sideRight.position.x = (boxWidth / 2 - sideDepth / 2);
  sideBack.position.z = -(boxDepth / 2 - sideDepth / 2);
  sideBottom.rotation.x = Math.degToRad(-90);
  sideShelf.rotation.x = Math.degToRad(-90);
  sideBottom.position.y = -(boxHeight / 2 - sideDepth / 2);
  sideTopFront.rotation.x = Math.degToRad(-90);
  sideTopFront.position.y = (boxHeight / 2 - sideDepth / 2);
  sideTopFront.position.z = (boxDepth / 2 - sideTop / 2);
  sideTopBack.rotation.x = Math.degToRad(-90);
  sideTopBack.position.y = (boxHeight / 2 - sideDepth / 2);
  sideTopBack.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth);

  group.add(sideLeft);
  group.add(sideRight);
  group.add(sideBack);
  group.add(sideBottom);
  group.add(sideShelf);
  group.add(sideTopFront)
  group.add(sideTopBack)
  group.add(objFacedeLeft)
  group.add(objFacedeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.name = "angularBody"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;

  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
  bodyCase.position.set(0,0,0);

  return bodyCase
}


export default {
  boxStandardFloor: boxStandardFloor(),
  boxAngularFloor: boxAngularFloor()
}
