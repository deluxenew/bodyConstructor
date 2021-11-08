import {
  ShapeGeometry,
  Math, Mesh, MeshBasicMaterial, Shape, DoubleSide, Group, MeshLambertMaterial, ExtrudeBufferGeometry} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

const add = require('./img/add.svg')

function loadSVG( url ) {
  let svg = new Group();
  const loader = new SVGLoader();

  loader.load( url, function ( data ) {
    const paths = data.paths;
    for ( let i = 0; i < paths.length; i ++ ) {
      const path = paths[ i ];
      const material = new MeshBasicMaterial( {
        color: path.color,
        side: DoubleSide,
      } );

      const shapes = SVGLoader.createShapes( path );
      for ( let j = 0; j < shapes.length; j ++ ) {
        const shape = shapes[ j ];
        const geometry = new ShapeGeometry( shape );
        const mesh = new Mesh( geometry, material );
        mesh.scale.multiplyScalar( 0.1 );
        svg.add( mesh );
      }
    }
  });
  return svg
}

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

  let addSvg = loadSVG(add)
  addSvg.rotation.z = Math.degToRad(180)
  addSvg.position.set(1.2,1.2,0.5)

  let addBtn = createButton()
  addBtn.add(addSvg)

  addBtn.position.set(0, 0, 0);
  addBtn.name = 'add';

  let buttonsGroup = new Mesh();
  buttonsGroup.add(addBtn)
  buttonsGroup.name='control'

  buttonsGroup.scale.set( 1, 1, 1 )
  return buttonsGroup
}

export default {
  boxControl: boxControl()
}
