import {Mesh, Group, MeshStandardMaterial, PlaneGeometry} from "three";

const selectBox = () => {
  const meshMaterial = new MeshStandardMaterial({
    color: 0xeeffff
  })

  const line = new PlaneGeometry(1, .1)
  const group = new Group()
  let mesh = new Mesh( line, meshMaterial );


    group.add(mesh);
    group.name = 'selectBox'
  group.position.set(-5, 11, 2)
  return group
}

export default {
  selectBox
}
