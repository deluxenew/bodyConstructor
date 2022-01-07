import {ShapeGeometry, MeshBasicMaterial, DoubleSide, Group, Mesh, Line, LineBasicMaterial, BufferGeometry, Vector3, Math} from 'three';

import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';

export const GetTextMesh = (text, width) => {
  const textObj = new Group()
  const loader = new FontLoader();

  loader.load('./helvetiker_regular.typeface.json', function (font) {
    const color = 0x000000;

    const matLite = new MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
      side: DoubleSide
    });

    const shapes = font.generateShapes(text, 0.5);
    const geometry = new ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);

    const textMesh = new Mesh(geometry, matLite);
    textMesh.position.y = 0.3
    textObj.add(textMesh);
    matLite.dispose()
    geometry.dispose()
  });

  const pointsLeft = []
  const pointsRight = []
  const pointsMiddle = []

  pointsLeft.push(new Vector3(-width / 2, 1, 0))
  pointsLeft.push(new Vector3(-width / 2, 0, 0))
  pointsRight.push(new Vector3(width / 2, 1, 0))
  pointsRight.push(new Vector3(width / 2, 0, 0))
  pointsMiddle.push(new Vector3(-width / 2, 0.1, 0))
  pointsMiddle.push(new Vector3(width / 2, 0.1, 0))
  const geometryLeft = new BufferGeometry().setFromPoints( pointsLeft )
  const geometryRight = new BufferGeometry().setFromPoints( pointsRight )
  const geometryMiddle = new BufferGeometry().setFromPoints( pointsMiddle )
  let lineLeft = new Line(geometryLeft, new LineBasicMaterial({ color: 0x000000 }))
  let lineRight = new Line(geometryRight, new LineBasicMaterial({ color: 0x000000 }))
  let lineMiddle = new Line(geometryMiddle, new LineBasicMaterial({ color: 0x000000 }))

  textObj.add(lineLeft)
  textObj.add(lineRight)
  textObj.add(lineMiddle)

  const pointsTriangle = []
  pointsTriangle.push(new Vector3(-width / 2, 0.1, 0))
  pointsTriangle.push(new Vector3(-width / 2 + 0.5, 0.2, 0))
  pointsTriangle.push(new Vector3(-width / 2 + 0.5, 0, 0))
  const triangleGeometry = new BufferGeometry().setFromPoints( pointsTriangle )
  const triangleMaterial = new MeshBasicMaterial({
    color: 0x000000,
    side: DoubleSide
  });
  const triangleMesh = new Mesh(triangleGeometry, triangleMaterial);

  const triangleMeshRight = triangleMesh.clone()
  triangleMeshRight.rotateY(Math.degToRad(-180))

  textObj.add(triangleMesh)
  textObj.add(triangleMeshRight)

  return textObj
}

