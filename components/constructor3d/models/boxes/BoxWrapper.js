import {BoxGeometry, Group, Mesh, MeshLambertMaterial, MeshMatcapMaterial, EdgesHelper} from "three";

const betweenPadding = 0.03

export const boxWrapper = (width, height, depth) => {
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
  boxGroup.add(boxMesh)

  const helper = new EdgesHelper( boxMesh, 0x0099DC );
  helper.material.linewidth = 1; // optional
  helper.name = 'edges'
  helper.visible = false
  helper.scale.set(1.01,1,1.1)
  boxGroup.add(helper)

  boxGroup.userData['width'] = width
  boxGroup.userData['height'] = height
  boxGroup.userData['depth'] = depth
  boxGroup.position.set(-width / 2 , height / 2, depth / 2)
  material.dispose()
  boxGroup.name = 'boxGroup'
  return boxGroup
}
