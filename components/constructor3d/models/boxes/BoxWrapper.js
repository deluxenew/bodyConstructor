import {BoxGeometry, Group, Mesh, MeshLambertMaterial, MeshMatcapMaterial, EdgesHelper} from "three";

import {constants}  from "./constants";

export const boxWrapper = (width, height, depth, isTop) => {
  const boxGroup = new Group();
  const boxGeometry = new BoxGeometry(width, height, depth);
  // const material = new MeshLambertMaterial({
  //   color: 0xff00ff, transparent: true, opacity: 0.1
  // });

  const material = new MeshMatcapMaterial({
    color: 0x0099DC, transparent: true, opacity: 0.15
  });
  let boxMesh = new Mesh(boxGeometry, material);
  boxMesh.name = 'transparent'
  boxMesh.visible = false
  boxMesh.position.set(0,isTop ? height / 2 : 0,0)
  boxGroup.add(boxMesh)

  const helper = new EdgesHelper( boxMesh, 0x0099DC );
  helper.material.linewidth = 1; // optional
  helper.name = 'edges'
  helper.visible = false
  helper.scale.set(1.01,1,1.1)
  helper.position.set(0,isTop ? height / 2 - constants.sideDepth : 0,0)
  boxGroup.add(helper)


  boxGroup.userData['width'] = width
  boxGroup.userData['height'] = height
  boxGroup.userData['depth'] = depth
  boxGroup.position.set(-width / 2 , height / 2, 0)
  material.dispose()
  boxGroup.name = 'boxGroup'
  return boxGroup
}
