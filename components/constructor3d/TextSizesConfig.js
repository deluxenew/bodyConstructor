import {Mesh, Group, MeshStandardMaterial} from "three";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
const helvetiker = 'font/font.typeface.json'

const getText = ({text}) => {

  const group = new Group()
  var loader = new FontLoader();

  loader.load(helvetiker, function ( font ) {

    var textGeo = new TextGeometry( text, {

      font: font,

      size: 5,
      height: 6,
      curveSegments: 12,

      bevelThickness: 2,
      bevelSize: 0.5,
      bevelEnabled: false

    } );
    textGeo.computeBoundingBox();
    const meshMaterial = new MeshStandardMaterial({
      color: 0xeeffff
    })

    const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

    var mesh = new Mesh( textGeo, meshMaterial );
    mesh.position.set(0, 0, 0)
    mesh.position.x = centerOffset;
    mesh.rotation.y = -1.1
    mesh.rotation.x = 0;
    group.add(mesh);
  } );


  return group
}

export default {
  getText
}
