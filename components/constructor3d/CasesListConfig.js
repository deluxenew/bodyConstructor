import {BoxGeometry, CylinderGeometry,
  ShapeGeometry,
  Math, Mesh, MeshBasicMaterial, MeshStandardMaterial, Color , Object3D, TextureLoader, Shape, DoubleSide, Group, MeshLambertMaterial, ExtrudeBufferGeometry} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

const legsHeight = 1;
const gapFacade = 0.1;
const sideDepth = .3;
const sideTop = 1.4;
const legsRad = 0.3;
const legFrontMargin = 0.6;

const facadeTextureLoader = new TextureLoader();

const facadeMaterial = new MeshStandardMaterial({
  color: 0xffffff,
  map: facadeTextureLoader.load(require('./img/wood-600.png')),
});

const material = new MeshStandardMaterial({color: 0xffffff,});
material.roughness = 0.3;
material.metalness = 0.05;

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
//  const arrow = require('./img/arrow.svg')
// const guiData = {
//   currentURL: arrow,
//   drawFillShapes: true,
//   drawStrokes: true,
//   fillShapesWireframe: true,
//   strokesWireframe: true
// };

let group = new Mesh();
//
// function loadSVG( url ) {
//
//   const loader = new SVGLoader();
//
//   loader.load( url, function ( data ) {
//
//     const paths = data.paths;
//     const gr = new Group();
//
//     gr.scale.multiplyScalar( 10 );
//     gr.position.x = -5;
//     gr.position.y = 5;
//     // gr.scale.y *= 0;
//
//     for ( let i = 0; i < paths.length; i ++ ) {
//       const path = paths[ i ];
//       const fillColor = path.userData.style.fill;
//
//       if ( guiData.drawFillShapes && fillColor !== undefined && fillColor !== 'none' ) {
//         const material = new MeshBasicMaterial( {
//           color: new Color().setStyle( fillColor ),
//           opacity: 1,
//           // transparent: path.userData.style.fillOpacity < 1,
//           side: DoubleSide,
//           depthWrite: false,
//           wireframe: guiData.fillShapesWireframe
//         } );
//
//         const shapes = SVGLoader.createShapes( path );
//
//         for ( let j = 0; j < shapes.length; j ++ ) {
//           const shape = shapes[ j ];
//           const geometry = new ShapeGeometry( shape );
//           const mesh = new Mesh( geometry, material );
//
//           gr.add( mesh );
//         }
//       }
//     }
//     group.add(gr)
//   });
// }


const boxControl = () => {
  function createButton() {
    let f_rect = function roundedRect( ctx, x, y, width, height, radius ) {
      ctx.moveTo( x, y + radius );
      ctx.lineTo( x, y + height - radius );
      ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
      ctx.lineTo( x + width - radius, y + height );
      ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
      ctx.lineTo( x + width, y + radius );
      ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
      ctx.lineTo( x + radius, y );
      ctx.quadraticCurveTo( x, y, x, y + radius );
    }

    let roundedRectShape = new Shape();
    f_rect( roundedRectShape, -15, -15, 30, 30, 10 );

    let material = new MeshLambertMaterial( { color: 0xffffff, side: DoubleSide } );
    let extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 1, bevelSize: 5, bevelThickness: 5 };
    let geometry = new ExtrudeBufferGeometry( roundedRectShape, extrudeSettings );

    let s = 0.1;
    let mesh = new Mesh( geometry, material );

    mesh.scale.set( s, s, s );

    return mesh
  }

  // loadSVG(guiData.currentURL)

  let moveLeftBtn = createButton(),
      moveRightBtn = createButton(),
      openDoorBtn = createButton(),
      removeBtn = createButton()

  moveLeftBtn.position.set(0, 0, 0);
  moveRightBtn.position.set(6, 0, 0);
  openDoorBtn.position.set(0, 5, 0);
  removeBtn.position.set(6, 5, 0);

  group.add(moveLeftBtn)
  group.add(moveRightBtn)
  group.add(openDoorBtn)
  group.add(removeBtn)

  group.name='control'

  return group
}

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
  boxAngularFloor: boxAngularFloor(),
  boxControl: boxControl()
}
