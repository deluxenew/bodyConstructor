import {BoxGeometry, Group, Mesh, MeshLambertMaterial, MeshMatcapMaterial} from "three";

export const boxWrapper = (width, height, depth) => {
  const boxGroup = new Group();
  const boxGeometry = new BoxGeometry(width, height, depth);
  // const material = new MeshLambertMaterial({
  //   color: 0xff00ff, transparent: true, opacity: 0.1
  // });
  const material = new MeshMatcapMaterial({
    color: 0xff00ff, transparent: true, opacity: 0.1
  });
  let boxMesh = new Mesh(boxGeometry, material);

  boxGroup.add(boxMesh)
  boxGroup.userData['type'] = 'box'
  boxGroup.userData['width'] = width
  boxGroup.userData['height'] = height
  boxGroup.userData['depth'] = depth
  material.dispose()
  return boxGroup
}
