import {
  Mesh,
  Shape,
  DoubleSide,
  Group,
  Math,
  TextureLoader,
  MeshLambertMaterial,
  ExtrudeBufferGeometry,
  MeshStandardMaterial,
  BoxGeometry
} from 'three'
const facadeTextureLoader = new TextureLoader();

const add = require('../img/add.png')

const boxControl = (name, pos) => {
  function createButton() {
    let f_rect = function roundedRect( ctx, x, y, width, height, radius ) {
      ctx.moveTo( x, y + radius );
      ctx.lineTo( x, y + height - radius );
      ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
      ctx.lineTo( x + width - radius, y + height );
      ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
      ctx.lineTo( x + width, y + radius );
      ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
      ctx.lineTo( x + radius, y );
      ctx.quadraticCurveTo( x, y, x, y + radius );
    }

    let roundedRectShape = new Shape();
    f_rect( roundedRectShape, -15, -15, 30, 30, 10 );

    let material = new MeshLambertMaterial( { color: 0xffffff, side: DoubleSide } );
    let extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 0, steps: 5, bevelSize: 2, bevelThickness: 2 };
    let geometry = new ExtrudeBufferGeometry( roundedRectShape, extrudeSettings );

    let s = 0.1;
    let mesh = new Mesh( geometry, material );

    mesh.scale.set( s, s, s );

    let button = new Group();
    button.add(mesh)
    return button
  }

  const geometry =  new BoxGeometry(2, 2, 0.01)
  const material = new MeshStandardMaterial({
    color: 0xffffff,
    map: facadeTextureLoader.load(add),
  });

  const addSvg = new Mesh( geometry, material )
  addSvg.position.set(0,0,0.1)

  let addBtn = createButton()
  addBtn.add(addSvg)

  addBtn.position.set(0, 0, 0);
  addBtn.name = 'control';

  let buttonsGroup = new Group();
  buttonsGroup.add(addBtn)
  buttonsGroup.name = name
  buttonsGroup.userData['type'] = 'control'
  buttonsGroup.userData['pos'] = pos

  buttonsGroup.scale.set( 1, 1, 1 )
  buttonsGroup.visible = false

  material.dispose()
  return buttonsGroup
}

const bottomLeft = boxControl('addBottomLeftButton', 'bottom')
bottomLeft.userData.actionName = 'addBottomLeftToScene'
bottomLeft.userData.watcher = 'widthLeftBottom'
bottomLeft.position.set(-6, 5, 1)
bottomLeft.userData.getCoords = function (x, y, z, value) {
  return [-6 - value, y, z ]
}


const bottomRight = boxControl('addBottomRightButton', 'bottom')
bottomRight.rotation.y = Math.degToRad(-90);
bottomRight.userData.actionName = 'addBottomRightToScene'
bottomRight.userData.watcher = 'widthRightBottom'
bottomRight.position.set(-1, 5, 6)
bottomRight.userData.getCoords = function (x, y, z, value) {
  return [x, y, 6 + value]
}

const topLeft = boxControl('addTopLeftButton', 'top')
topLeft.userData.actionName = 'addTopLeftToScene'
topLeft.userData.watcher = 'widthLeftTop'
topLeft.position.set(-6, 20, 1)
topLeft.userData.getCoords = function (x, y, z, value) {
  return [-6 - value, y, z ]
}


const topRight = boxControl('addTopRightButton', 'top')
topRight.rotation.y = Math.degToRad(-90);
topRight.userData.actionName = 'addTopRightToScene'
topRight.userData.watcher = 'widthRightTop'
topRight.position.set(-1, 20, 6)
topRight.userData.getCoords = function (x, y, z, value) {
  return [x, y, 6 + value]
}

const controlBoxes = [bottomLeft, bottomRight, topLeft, topRight]

export default {
  controlBoxes
}
