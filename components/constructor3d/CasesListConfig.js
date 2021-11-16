import {BoxGeometry, Group, CylinderGeometry, Math, Mesh, MeshStandardMaterial , Object3D} from "three";

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
  let bodyWidth = 6.4;
  let bodyHeight = 8;
  let bodyDepth = 6;

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800.png')

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

const top_400_800 = () => {
  let bodyWidth = 6.4;
  let bodyHeight = 8;
  let bodyDepth = 6;

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800.png')

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
  let bodyHeight = 10;
  let bodyDepth = 6;

  let boxWidth = bodyWidth;
  let boxHeight = bodyHeight - legsHeight;
  let boxDepth = bodyDepth;

  let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
  let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
  let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
  let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);

  let sideLeft = new Mesh(gSideLR, material);
  let sideRight = new Mesh(gSideLR, material);
  let sideBack = new Mesh(gSideBack, material);
  let sideBottom = new Mesh(gSideBottom, material);
  let sideShelf = new Mesh(gSideBottom, material);
  let sideTopFront = new Mesh(gSideTop, material);
  let sideTopBack = new Mesh(gSideTop, material);
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
  group.name = "group"

  bodyCase.add(group);
  bodyCase.name = "top_400_800_1"

  group.position.y = legsHeight;

  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight

  bodyCase.userData.doorWidth = bodyWidth - sideDepth / 2
  bodyCase.userData.doorHeight = boxHeight

  bodyCase.userData.form = 'Навесной 400 * 800'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800.png')

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
  gSideTop.dispose()

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


  bodyCase.userData.width = bodyWidth
  bodyCase.userData.depth = bodyDepth
  bodyCase.userData.height = bodyHeight

  bodyCase.userData.form = '400 * 800'
  bodyCase.userData.material = 'ЛДСП'
  bodyCase.userData.size = `${bodyWidth*100}*${bodyDepth*100}*${bodyHeight*100}`
  bodyCase.userData.color = 'Белый'
  bodyCase.userData.value = 1
  bodyCase.userData.price = 1500
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800.png')

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800_1.png')

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800.png')

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800_1.png')

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800_2.png')

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800.png')

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800_1.png')

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
  bodyCase.userData.img = require('./img/cases/bottom/bottom_1000_800_2.png')

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
  bodyCase.userData.img = require('./img/cases/bottom/boxAngularFloor_1.png')

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
    items: [top_400_800()]
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
