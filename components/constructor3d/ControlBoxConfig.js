import {
  Mesh,
  Shape,
  DoubleSide,
  Group,
  TextureLoader,
  MeshLambertMaterial,
  ExtrudeBufferGeometry,
  MeshStandardMaterial, BoxGeometry
} from 'three'
const facadeTextureLoader = new TextureLoader();

const add = require('./img/add.png')

const boxControl = () => {
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
  buttonsGroup.name='control'

  buttonsGroup.scale.set( 1, 1, 1 )
  return buttonsGroup
}

export default {
  boxControl: boxControl()
}
