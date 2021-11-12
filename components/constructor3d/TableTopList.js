import {BoxGeometry, Mesh, MeshStandardMaterial, Group} from "three";

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


  const tableTopGroup = new Group()
  tableTopGroup.add(tableTop)
  tableTopGroup.userData.width = width
  tableTopGroup.userData.height = height
  tableTopGroup.userData.depth = depth
  tableTopGroup.userData.maxWidth = getMaxWidth(type)

  // tableTopGroup.position.set(-depth / 2, paddingBottom + height / 2, width / 2 )

  material.dispose()
  tableTopBox.dispose()

  return tableTopGroup
}

export default {
  getTableTop,
}

