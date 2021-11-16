import {Mesh, Group, Math, MeshStandardMaterial, PlaneGeometry, BoxGeometry} from "three";

const selectBox = ({width, height, depth, x,y,z, rotate, pos}) => {
  const meshMaterial = new MeshStandardMaterial({
    color: 0xff0000
  })
  const material = new MeshStandardMaterial({
    opacity: 0,
    transparent: true
  })

  const box = new BoxGeometry(width , height , 5);
  let sideLeft = new Mesh(box, material);

  const line = new PlaneGeometry(1, .2)
  const group = new Group()
  group.add(sideLeft);

  let mesh1 = new Mesh( line, meshMaterial );
  let mesh2 = new Mesh( line, meshMaterial );
  let mesh3 = new Mesh( line, meshMaterial );

  const leftTop = new Group()
  mesh1.position.x = .5
  mesh2.rotateY(Math.degToRad(-90))
  mesh2.position.z = -.5
  mesh3.rotateZ(Math.degToRad(-90))
  mesh3.position.y = -.5

  leftTop.add(mesh1)
  leftTop.add(mesh2)
  leftTop.add(mesh3)

  const rightTop = new Group()
  let mesh4 = new Mesh( line, meshMaterial );
  let mesh5 = new Mesh( line, meshMaterial );
  let mesh6 = new Mesh( line, meshMaterial );

  mesh4.position.x = -.5
  mesh5.rotateY(Math.degToRad(-90))
  mesh5.position.z = -.5
  mesh6.rotateZ(Math.degToRad(-90))
  mesh6.position.y = -.5

  rightTop.add(mesh4)
  rightTop.add(mesh5)
  rightTop.add(mesh6)

  const leftBottom = new Group()
  let mesh7 = new Mesh( line, meshMaterial );
  let mesh8 = new Mesh( line, meshMaterial );
  let mesh9 = new Mesh( line, meshMaterial );

  mesh7.position.x = .5
  mesh8.rotateY(Math.degToRad(-90))
  mesh8.position.z = -.5
  mesh9.rotateZ(Math.degToRad(-90))
  mesh9.position.y = .5

  leftBottom.add(mesh7)
  leftBottom.add(mesh8)
  leftBottom.add(mesh9)

  const rightBottom = new Group()
  let mesh10 = new Mesh( line, meshMaterial );
  let mesh11 = new Mesh( line, meshMaterial );
  let mesh12 = new Mesh( line, meshMaterial );

  mesh10.position.x = -.5
  mesh11.rotateY(Math.degToRad(-90))
  mesh11.position.z = -.5
  mesh12.rotateZ(Math.degToRad(-90))
  mesh12.position.y = .5

  rightBottom.add(mesh10)
  rightBottom.add(mesh11)
  rightBottom.add(mesh12)

  group.add(leftTop);
  group.add(rightTop);
  group.add(leftBottom);
  group.add(rightBottom);


  leftTop.translateX(-width/2)
  leftTop.translateY(height/2 + 1)
  leftTop.translateZ(depth/2 + 1.5)

  rightTop.translateX(width/2)
  rightTop.translateY(height/2 + 1)
  rightTop.translateZ(depth/2 +1.5)

  leftBottom.translateX(-width/2)
  leftBottom.translateY(-height/2 + 1)
  leftBottom.translateZ(depth/2 + 1.5)

  rightBottom.translateX(width/2)
  rightBottom.translateY(-height/2 + 1)
  rightBottom.translateZ(depth/2 +1.5)


  group.name = 'selectBox'

  return group
}

export default {
  selectBox
}
