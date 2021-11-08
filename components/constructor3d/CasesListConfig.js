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

const add = require('./img/add.svg')

function loadSVG( url ) {
  let svg = new Group();
  const loader = new SVGLoader();

  loader.load( url, function ( data ) {
    const paths = data.paths;
    for ( let i = 0; i < paths.length; i ++ ) {
      const path = paths[ i ];
      const material = new MeshBasicMaterial( {
        color: path.color,
        side: DoubleSide,
      } );

      const shapes = SVGLoader.createShapes( path );
      for ( let j = 0; j < shapes.length; j ++ ) {
        const shape = shapes[ j ];
        const geometry = new ShapeGeometry( shape );
        const mesh = new Mesh( geometry, material );
        mesh.scale.multiplyScalar( 0.1 );
        svg.add( mesh );
      }
    }
  });
  return svg
}



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
    let extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 0, steps: 5, bevelSize: 2, bevelThickness: 2 };
    let geometry = new ExtrudeBufferGeometry( roundedRectShape, extrudeSettings );

    let s = 0.1;
    let mesh = new Mesh( geometry, material );

    mesh.scale.set( s, s, s );

    let button = new Group();
    button.add(mesh)
    return button
  }

  let addSvg = loadSVG(add)
  addSvg.rotation.z = Math.degToRad(180)
  addSvg.position.set(1.2,1.2,0.5)

  let addBtn = createButton()
  addBtn.add(addSvg)

  addBtn.position.set(0, 0, 0);
  addBtn.name = 'add';

  let buttonsGroup = new Mesh();
  buttonsGroup.add(addBtn)
  buttonsGroup.name='control'

  buttonsGroup.scale.set( 1, 1, 1 )
  return buttonsGroup
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

  bodyCase.userData.form = 'Нижний шкаф'
  bodyCase.userData.material = 'деревянный'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.position.set(0,0,0);

  return bodyCase
}

const boxAngularFloor = () => {
  let bodyWidth = 8;
  let bodyHeight = 10;
  let bodyDepth = 6;
  let facadeWidth = 5;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
  let gFacade = new BoxGeometry(facadeWidth - gapFacade / 2, boxHeight, sideDepth);
  let gLegFront = new BoxGeometry(boxWidth, legsHeight, sideDepth);
  let gLegFrontMini = new BoxGeometry(legFrontMargin + sideDepth, legsHeight, sideDepth);

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
  let legFront = new Mesh(gLegFront, material);
  let legFrontMini = new Mesh(gLegFrontMini, material);

  let legLeft = new Mesh(gLegs, legMaterial);

  let objFacedeLeft = new Object3D();
  objFacedeLeft.add(facedeLeft);
  facedeLeft.position.x = boxWidth - facadeWidth - sideDepth ;
  objFacedeLeft.position.x = boxWidth / 2 - facadeWidth - sideDepth;
  objFacedeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacedeLeft.name = 'leftDoor'

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
  sideTopBack.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth)
  legFrontMini.rotation.y = Math.degToRad(-90);

  group.add(sideLeft);
  group.add(sideRight);
  group.add(sideBack);
  group.add(sideBottom);
  group.add(sideShelf);
  group.add(sideTopFront)
  group.add(sideTopBack)
  group.add(objFacedeLeft)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legFrontMini)
  bodyCase.add(legLeft)
  bodyCase.name = "bottomAngularBody"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legFrontMini.position.y = -bodyHeight / 2 + legsHeight;
  legFrontMini.position.z = bodyDepth / 2 - sideDepth;
  legFrontMini.position.x = boxWidth / 2 - facadeWidth - 0.65 - legFrontMargin;

  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;

  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
  bodyCase.userData.padding = 3.5

  bodyCase.userData.form = 'Нижний угловой шкаф'
  bodyCase.userData.material = 'деревянный'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 2100


  bodyCase.position.set(0,0,0);

  return bodyCase
}


export default {
  boxStandardFloor: boxStandardFloor(),
  boxAngularFloor: boxAngularFloor(),
  boxControl: boxControl()
}
