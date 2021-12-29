import {Mesh} from "three";

export const mesh = (geometry, material) => {

  let mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh
}
