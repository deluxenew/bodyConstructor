import {BoxGeometry, CylinderGeometry,
  ShapeGeometry,
  Math, Mesh, MeshBasicMaterial, MeshStandardMaterial, Color , Object3D, TextureLoader, Shape, DoubleSide, Group, MeshLambertMaterial, ExtrudeBufferGeometry} from "three";

const height26 = 0.26;
const height38 = 0.38;
const maxWidth = 30;
const depth = 7
const paddingBottom = 10
const material = new MeshStandardMaterial({color: 0x000000,});

const getMaxWidth = (type) => {
  switch (type) {
    case 'post': return 30
    case 'ldsp': return 27
  }
}

const getTableTop = ({width, height, type, color}) => {

  let tableTopBox = new BoxGeometry(width, height, depth);
  let tableTop = new Mesh(tableTopBox, material);

  tableTop.name = 'tableTop'

  tableTop.userData.width = width
  tableTop.userData.height = height
  tableTop.userData.depth = depth
  tableTop.userData.maxWidth = getMaxWidth(type)
  const tableTopGroup = new Group()
  tableTopGroup.add(tableTop)

  // tableTopGroup.position.set(-depth / 2, paddingBottom + height / 2, width / 2 )
  return tableTopGroup
}

export default {
  getTableTop: getTableTop,
}

