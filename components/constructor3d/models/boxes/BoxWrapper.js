import { BoxGeometry, Mesh } from "three";

const boxWrapper = ({ width, height, depth }) => {
  const boxGroup = new Mesh();
  const boxGeometry = new BoxGeometry(width, height, depth);
  boxGroup.add(boxGeometry)
  boxGroup.userData['type'] = 'box'
  return boxGeometry
}

export default {
  boxWrapper
}
