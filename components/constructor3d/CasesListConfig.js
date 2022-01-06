import {BoxGeometry, BufferGeometry, BufferAttribute, Group, CylinderGeometry, Math, Mesh, MeshStandardMaterial , Object3D} from "three";

const legsHeight = 1;
const sideDepth = .3;
const sideTop = 1.4;
const legsRad = 0.3;
const legFrontMargin = 0.6;

const material = new MeshStandardMaterial({color: 0xffffff});

const legMaterial = new MeshStandardMaterial({color: 0xffffff});
legMaterial.roughness = 0.1;
legMaterial.metalness = 0.5;

const boxAngularTop = () => {
  let bodyWidth = 4.2*2;
  let bodyHeight = 8;
  let bodyDepth = bodyWidth;

  let bD = 4.2;
  let sP = 1; //катет дальнего угла
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

  let sideV = new Mesh(geometry, material);

  let sideLeft = new Mesh(gSideLR, material);
  let sideRight = new Mesh(gSideLR, material);
  let sideBackR = new Mesh(gSideBack, material);
  let sideBackL = new Mesh(gSideBack, material);
  let sideBottom = new Mesh(geometry, material);
  let sideBTop = new Mesh(geometry, material);
  //let sideShelf = new Mesh(gSideBottom, material);
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
  let bodyCase = new Mesh();

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

  bodyCase.add(group);
  bodyCase.name = "boxAngularTop"

  group.position.y = boxHeight / 4;

  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight

  bodyCase.userData.form = 'Навесной угловой 600 * 700'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'top'
  bodyCase.userData.variants = [
    /*{
      id: 'boxAngularTop_1'
    }*/]
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

  material.dispose()
  legMaterial.dispose()
  gSideLR.dispose()
  gSideBack.dispose()
  gSideBottom.dispose()
  //gSideTop.dispose()

  return bodyCase
}

const top_400_800 = () => {
  let bodyWidth = 6.4;
  let bodyHeight = 8;
  let bodyDepth = 4.2;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);

  let sideLeft = new Mesh(gSideLR, material);
  let sideRight = new Mesh(gSideLR, material);
  let sideBack = new Mesh(gSideBack, material);
  let sideBottom = new Mesh(gSideBottom, material);
  let sideBTop = new Mesh(gSideBottom, material);
  let sideShelf = new Mesh(gSideBottom, material);
  let facadeLeft = new Group()
  let facadeRight = new Group();

  let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox'
  facadeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'

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
  sideBTop.rotation.x = Math.degToRad(-90);
  sideBTop.position.y = (boxHeight / 2 - sideDepth / 2);
  //sideBTop.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth);

  group.add(sideLeft);
  group.add(sideRight);
  group.add(sideBack);
  group.add(sideBottom);
  group.add(sideShelf);
  group.add(sideBTop)
  group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.name = "top_400_800"

  group.position.y = boxHeight / 4;

  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight

  bodyCase.userData.form = 'Навесной 400 * 800'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'top'
  bodyCase.userData.variants = [
    {
      id: 'top_400_800_1'
    }]
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

  material.dispose()
  legMaterial.dispose()
  gSideLR.dispose()
  gSideBack.dispose()
  gSideBottom.dispose()
  //gSideTop.dispose()

  return bodyCase
}

const top_400_800_1 = () => {
  let bodyWidth = 6.4;
  let bodyHeight = 8;
  let bodyDepth = 4.2;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);

  let sideLeft = new Mesh(gSideLR, material);
  let sideRight = new Mesh(gSideLR, material);
  let sideBack = new Mesh(gSideBack, material);
  let sideBottom = new Mesh(gSideBottom, material);
  let sideBTop = new Mesh(gSideBottom, material);
  let sideShelf = new Mesh(gSideBottom, material);
  let facadeLeft = new Group()

  let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'

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
  sideBTop.rotation.x = Math.degToRad(-90);
  sideBTop.position.y = (boxHeight / 2 - sideDepth / 2);
  //sideBTop.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth);

  group.add(sideLeft);
  group.add(sideRight);
  group.add(sideBack);
  group.add(sideBottom);
  group.add(sideShelf);
  group.add(objFacadeLeft)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.name = "top_400_800_1"

  group.position.y = legsHeight;

  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight

  bodyCase.userData.doorWidth = bodyWidth - sideDepth / 2
  bodyCase.userData.doorHeight = boxHeight

  bodyCase.userData.form = 'Один фасад'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'top'
  bodyCase.userData.parent = {
    id: 'top_400_800'
  }

  bodyCase.userData.variants = []
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

  material.dispose()
  legMaterial.dispose()
  gSideLR.dispose()
  gSideBack.dispose()
  gSideBottom.dispose()
  //  gSideTop.dispose()

  return bodyCase
}


const bottom_400_800 = () => {
  let bodyWidth = 6.4;
  let bodyHeight = 10;
  let bodyDepth = 6;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
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
  let facadeLeft = new Group()
  let facadeRight = new Group();
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);


  let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox'
  facadeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'
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
  //group.add(sideShelf);
  group.add(sideTopFront)
  group.add(sideTopBack)
  group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "bottom_400_800"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  /**/
  const drawerSideGap = 0.15;  //боковой отступ выдвижного ящика
  const drawerBottomGap = 0.12;  //нижний отступ выдвижного ящика
  const drawerSideDepth = 0.02; // толщина стенки выдвижного ящика

  let drawerWidth = bodyWidth - sideDepth*2 - drawerSideGap*2; //ширина выдвижного ящика
  let drawerHeight = 2.2; //высота выдвижного ящика
  let drawerDepth = bodyDepth - sideDepth; //глубина выдвижного ящика

  let drawerBottomGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, sideDepth, drawerDepth - drawerSideDepth);
  let drawerSideGeometry = new BoxGeometry(drawerSideDepth, drawerHeight, drawerDepth);
  let drawerSideBackGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, drawerHeight, drawerSideDepth);

  let drawerBottom = new Mesh(drawerBottomGeometry, material);
  let drawerSideR = new Mesh(drawerSideGeometry, material);
  let drawerSideL = new Mesh(drawerSideGeometry, material);
  let drawerSideBack = new Mesh(drawerSideBackGeometry, material);

  drawerBottom.position.z = drawerSideDepth/2;
  drawerSideR.position.x = - (drawerWidth/2 - drawerSideDepth / 2);
  drawerSideR.position.y = drawerHeight/2 - sideDepth/2;
  drawerSideL.position.x = drawerWidth/2 - drawerSideDepth / 2;
  drawerSideL.position.y = drawerHeight/2 - sideDepth/2;
  drawerSideBack.position.y = drawerHeight/2 - sideDepth/2;
  drawerSideBack.position.z = - (drawerDepth/2 - drawerSideDepth / 2);

  let drawer_0 = new Group();
  drawer_0.name = 'drawer';

  drawer_0.add(drawerBottom);
  drawer_0.add(drawerSideR);
  drawer_0.add(drawerSideL);
  drawer_0.add(drawerSideBack);

  drawer_0.position.z = sideDepth/2;
  //drawer_0.position.z += 4;
  drawer_0.position.y = - (boxHeight/2 - sideDepth/2 - sideDepth - drawerBottomGap);



  group.add(drawer_0);

  /**/


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight

  bodyCase.userData.form = '400 * 800'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'bottom'
  bodyCase.userData.variants = [
    {
    id: 'bottom_400_800_1'
  }]
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

   material.dispose()
   legMaterial.dispose()
    gSideLR.dispose()
    gSideBack.dispose()
   gSideBottom.dispose()
  gSideTop.dispose()
  gLegFront.dispose()
    gLegs.dispose()


  return bodyCase
}

const bottom_400_800_1 = () => {
  let bodyWidth = 6.4;
  let bodyHeight = 10;
  let bodyDepth = 6;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
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
  //let facadeLeft = new Group()
  let facadeRight = new Group();
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);

  /*let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox1'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 3;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'*/

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox2'
  facadeRight.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'
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
  //group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "bottom_400_800_1"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
  bodyCase.userData.doorWidth = boxWidth - sideDepth / 2
   bodyCase.userData.doorHeight = boxHeight

  bodyCase.userData.type = 'Напольный'
  bodyCase.userData.form = 'Один фасад'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'bottom'
   bodyCase.userData.parent = {
     id: 'bottom_400_800'
   }
  bodyCase.userData.variants = []
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);
   material.dispose()
   legMaterial.dispose()
   gSideLR.dispose()
   gSideBack.dispose()
   gSideBottom.dispose()
   gSideTop.dispose()
   gLegFront.dispose()
   gLegs.dispose()

  return bodyCase
}

const bottom_600_800 = () => {
  let bodyWidth = 8;
  let bodyHeight = 10;
  let bodyDepth = 6;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
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
  let facadeLeft = new Group()
  let facadeRight = new Group();
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);

  let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox'
  facadeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'
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
  group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "bottom_600_800"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight

  bodyCase.userData.form = '600 * 800'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'bottom'
  bodyCase.userData.variants = [
    {
    id: 'bottom_600_800_1'
  },
    {
      id: 'bottom_600_800_2',

    }]
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

   material.dispose()
   legMaterial.dispose()
    gSideLR.dispose()
    gSideBack.dispose()
   gSideBottom.dispose()
  gSideTop.dispose()
  gLegFront.dispose()
    gLegs.dispose()


  return bodyCase
}

const bottom_600_800_1 = () => {
  let bodyWidth = 8;
  let bodyHeight = 10;
  let bodyDepth = 6;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
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
  //let facadeLeft = new Group()
  let facadeRight = new Group();
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);

  /*let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox1'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 3;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'*/

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox2'
  facadeRight.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'
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
  //group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "bottom_600_800_1"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
  bodyCase.userData.doorWidth = boxWidth - sideDepth / 2
   bodyCase.userData.doorHeight = boxHeight

  bodyCase.userData.type = 'Напольный'
  bodyCase.userData.form = 'Один фасад'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'bottom'
   bodyCase.userData.parent = {
     id: 'bottom_600_800'
   }
  bodyCase.userData.variants = []
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);
   material.dispose()
   legMaterial.dispose()
   gSideLR.dispose()
   gSideBack.dispose()
   gSideBottom.dispose()
   gSideTop.dispose()
   gLegFront.dispose()
   gLegs.dispose()

  return bodyCase
}

const bottom_600_800_2 = () => {
  let bodyWidth = 8;
  let bodyHeight = 10;
  let bodyDepth = 6;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
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
  let facadeLeft = new Group()
  let facadeRight = new Group();
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);

  let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox'
  facadeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'

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
  group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "bottom_600_800_2"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
   bodyCase.userData.doorWidth = boxWidth / 2 - sideDepth / 2
   bodyCase.userData.doorHeight = boxHeight

  bodyCase.userData.type = 'Напольный'
  bodyCase.userData.form = 'Два фасада'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'bottom'
  bodyCase.userData.parent = {
    id: 'bottom_600_800'
  }
  bodyCase.userData.variants = []
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

   material.dispose()
   legMaterial.dispose()
   gSideLR.dispose()
   gSideBack.dispose()
   gSideBottom.dispose()
   gSideTop.dispose()
   gLegFront.dispose()
   gLegs.dispose()
  return bodyCase
}

const bottom_1000_800 = () => {
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
  let facadeLeft = new Group()
  let facadeRight = new Group();
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);

  let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox'
  facadeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'
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
  group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "bottom_1000_800"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight

  bodyCase.userData.form = '1000 * 800'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'bottom'
  bodyCase.userData.variants = [
    {
    id: 'bottom_1000_800_1'
  },
    {
      id: 'bottom_1000_800_2',

    }]
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

   material.dispose()
   legMaterial.dispose()
    gSideLR.dispose()
    gSideBack.dispose()
   gSideBottom.dispose()
  gSideTop.dispose()
  gLegFront.dispose()
    gLegs.dispose()


  return bodyCase
}

const bottom_1000_800_1 = () => {
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
  //let facadeLeft = new Group()
  let facadeRight = new Group();
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);


  /*let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox1'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 3;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'*/

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox2'
  facadeRight.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'
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
  //group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "bottom_1000_800_1"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
  bodyCase.userData.doorWidth = boxWidth - sideDepth / 2
   bodyCase.userData.doorHeight = boxHeight

  bodyCase.userData.type = 'Напольный'
  bodyCase.userData.form = 'Один фасад'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'bottom'
   bodyCase.userData.parent = {
     id: 'bottom_1000_800'
   }
  bodyCase.userData.variants = []
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);
   material.dispose()
   legMaterial.dispose()
   gSideLR.dispose()
   gSideBack.dispose()
   gSideBottom.dispose()
   gSideTop.dispose()
   gLegFront.dispose()
   gLegs.dispose()

  return bodyCase
}

const bottom_1000_800_2 = () => {
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
  let facadeLeft = new Group()
  let facadeRight = new Group();
  let legFront = new Mesh(gLegFront, material);
  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);

  let objFacadeLeft = new Group();
  objFacadeLeft.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth / 4 - sideDepth / 2;
  objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
  objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeft.name = 'leftDoor'

  let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox'
  facadeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor'

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
  group.add(objFacadeLeft)
  group.add(objFacadeRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "bottom_1000_800_2"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
   bodyCase.userData.doorWidth = boxWidth / 2 - sideDepth / 2
   bodyCase.userData.doorHeight = boxHeight

  bodyCase.userData.type = 'Напольный'
  bodyCase.userData.form = 'Два фасада'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500

  bodyCase.userData.type = 'bottom'
  bodyCase.userData.parent = {
    id: 'bottom_1000_800'
  }
  bodyCase.userData.variants = []
  bodyCase.userData.availableColors = ['dub_votan', 'yasen_ankor_sseryi', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

   material.dispose()
   legMaterial.dispose()
   gSideLR.dispose()
   gSideBack.dispose()
   gSideBottom.dispose()
   gSideTop.dispose()
   gLegFront.dispose()
   gLegs.dispose()
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
  let facadeLeft = new Group()
  let legFront = new Mesh(gLegFront, material);
  let legFrontMini = new Mesh(gLegFrontMini, material);

  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);

  let objFacadeLeftRight = new Object3D();
  objFacadeLeftRight.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth - facadeWidth - sideDepth ;
  objFacadeLeftRight.position.x = boxWidth / 2 - facadeWidth - sideDepth;
  objFacadeLeftRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeftRight.name = 'leftDoor'

  let group = new Mesh();
  let bodyCase = new Object3D();

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
  group.add(objFacadeLeftRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legFrontMini)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "boxAngularFloor"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legFrontMini.position.y = -bodyHeight / 2 + legsHeight;
  legFrontMini.position.z = bodyDepth / 2 - sideDepth;
  legFrontMini.position.x = boxWidth / 2 - facadeWidth - 0.65 - legFrontMargin;

  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
  bodyCase.userData.padding = 3.5

  bodyCase.userData.form = 'Нижний угловой шкаф'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 2100
  bodyCase.userData.img = '/img/cases/angular.png'

  bodyCase.userData.type = 'bottom'
  bodyCase.userData.variants = [{
    id: 'boxAngularFloor_1',
  }]
  bodyCase.userData.availableColors = ['dub_votan', 'listvennica', 'orex_mramornyi']

  // bodyCase.position.set(0,0,0);

  return bodyCase
}

const boxAngularFloor_1 = () => {
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
  let facadeLeft = new Group()
  let legFront = new Mesh(gLegFront, material);
  let legFrontMini = new Mesh(gLegFrontMini, material);

  let legLeft = new Mesh(gLegs, legMaterial);
  let legRight = new Mesh(gLegs, legMaterial);

  let objFacadeLeftRight = new Object3D();
  objFacadeLeftRight.add(facadeLeft);
  facadeLeft.name = 'doorBox'
  facadeLeft.position.x = boxWidth - facadeWidth - sideDepth ;
  objFacadeLeftRight.position.x = boxWidth / 2 - facadeWidth - sideDepth;
  objFacadeLeftRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeLeftRight.name = 'leftDoor'

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
  group.add(objFacadeLeftRight)
  group.name = "group"

  bodyCase.add(group);
  bodyCase.add(legFront)
  bodyCase.add(legFrontMini)
  bodyCase.add(legLeft)
  bodyCase.add(legRight)
  bodyCase.name = "boxAngularFloor_1"

  group.position.y = legsHeight;
  legFront.position.y = -bodyHeight / 2 + legsHeight;
  legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
  legFrontMini.position.y = -bodyHeight / 2 + legsHeight;
  legFrontMini.position.z = bodyDepth / 2 - sideDepth;
  legFrontMini.position.x = boxWidth / 2 - facadeWidth - 0.65 - legFrontMargin;

  legLeft.position.y = -bodyHeight / 2 + legsHeight;
  legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
  legRight.position.y = -bodyHeight / 2 + legsHeight;
  legRight.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
  legRight.position.x = bodyWidth / 2 - legsRad - legFrontMargin;


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight
  bodyCase.userData.padding = 3.5
  bodyCase.userData.doorWidth = facadeWidth - sideDepth / 2
  bodyCase.userData.doorHeight = boxHeight

  bodyCase.userData.form = 'Один фасад'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 2100

  bodyCase.userData.type = 'bottom'
   bodyCase.userData.parent = {
     id: 'boxAngularFloor'
   }
  bodyCase.userData.variants = []
  bodyCase.userData.availableColors = ['dub_votan', 'listvennica', 'orex_mramornyi']

  bodyCase.position.set(0,0,0);

  return bodyCase
}



const cases = [
  {
    type: 'bottom',
    typeName: 'Напольный',
    typeDescription: '',
    additional: null,
    variants: null,
    items: [ bottom_1000_800(), boxAngularFloor(),bottom_600_800(),bottom_400_800()]
  },
  {
    type: 'top',
    typeName: 'Навесной',
    typeDescription: '',
    additional: null,
    variants: null,
    items: [top_400_800(), boxAngularTop()]
  }
]

export default {
  cases,

  top_400_800: top_400_800(),
  top_400_800_1: top_400_800_1(),
  boxAngularTop: boxAngularTop(),

  bottom_400_800: bottom_400_800(),
  bottom_400_800_1: bottom_400_800_1(),
  bottom_600_800: bottom_600_800(),
  bottom_600_800_1: bottom_600_800_1(),
  bottom_600_800_2: bottom_600_800_2(),
  //boxAngularTop_1: boxAngularTop_1(),
  bottom_1000_800:  bottom_1000_800(),
  bottom_1000_800_1: bottom_1000_800_1(),
  bottom_1000_800_2: bottom_1000_800_2(),
  boxAngularFloor: boxAngularFloor(),
  boxAngularFloor_1: boxAngularFloor_1()
  // bottom_1000_800: bottom_1000_800(),
  // boxAngularFloor: boxAngularFloor(),
}
