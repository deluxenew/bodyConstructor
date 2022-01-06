import * as THREE from 'three';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import url from "./font/helvetiker_regular.typeface.json";

export const  GetText = (text) => {
  const textObj = new THREE.Group()
  const loader = new FontLoader();
  const message = text;

  const url = require('./font/helvetiker_regular.typeface.json')
  console.log(url)
   loader.load( url,  function ( font ) {
     console.log(font, 'font')
    const color = 0x006699;

    const matDark = new THREE.LineBasicMaterial( {
      color: color,
      side: THREE.DoubleSide
    } );

    const matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    } );

    const shapes = font.generateShapes( message, 100 );
    const geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )

    const text = new THREE.Mesh( geometry, matLite );
    text.position.z = - 150;
    textObj.add( text );

    // make line shape ( N.B. edge view remains visible )

    const holeShapes = [];

    for ( let i = 0; i < shapes.length; i ++ ) {

      const shape = shapes[ i ];

      if ( shape.holes && shape.holes.length > 0 ) {

        for ( let j = 0; j < shape.holes.length; j ++ ) {

          const hole = shape.holes[ j ];
          holeShapes.push( hole );

        }

      }

    }

    shapes.push.apply( shapes, holeShapes );

    const lineText = new THREE.Object3D();

    for ( let i = 0; i < shapes.length; i ++ ) {

      const shape = shapes[ i ];

      const points = shape.getPoints();
      const geometry = new THREE.BufferGeometry().setFromPoints( points );

      geometry.translate( xMid, 0, 0 );

      const lineMesh = new THREE.Line( geometry, matDark );
      lineText.add( lineMesh );

    }
    textObj.add( lineText );

  } );
  console.log(textObj, 'textObj')
  return textObj
}

