<template lang="pug">
  div(ref="canvas")
</template>

<script>
import * as THREE from 'three';

let camera, scene, renderer;
let plane;
let pointer, raycaster, isShiftDown = false;

let rollOverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;

export default {
  name: "module",
  data() {
    return {
      objects: [],
      scene: null
    }
  },
  computed: {
    body() {
      let floorMaterial = new THREE.MeshStandardMaterial({
        color: 0xaf9182,
        specular: 0x9999ff,
      });
      floorMaterial.roughness = 0.3;
      floorMaterial.metalness = 0.05;
      const floorTextureLoader = new THREE.TextureLoader();
      const wallTextureLoader = new THREE.TextureLoader();
      const facadeTextureLoader = new THREE.TextureLoader();

      const wallNormalTexture = wallTextureLoader.load('https://api1.akson.ru:8443/aws/p/31131414141/3ff01239-654f-48b9-b396-aad17cc5052b/0.jpg');
      const floorNormalTexture = floorTextureLoader.load('https://api1.akson.ru:8443/aws/p/658666886/25b47846-0cd6-4388-a456-16a75ea1c8d4/0.jpg');

      let wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xc8b7ae,
        specular: 0xffffff,
      });
      wallMaterial.roughness = 1;
      wallMaterial.metalness = 0;
      wallMaterial.normalMap = wallNormalTexture;

      floorMaterial.normalMap = floorNormalTexture;

      let facadeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        map: facadeTextureLoader.load('https://api1.akson.ru:8443/aws/p/18133313/d2987a01-c3d2-444f-962b-d04b7845216c/600.png'),
      });

      let material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        specular: 0xbcffbc,
      });
      material.roughness = 0.3;
      material.metalness = 0.05;

      let legMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        specular: 0xbcffbc,
      });
      legMaterial.roughness = 0.1;
      legMaterial.metalness = 0.5;

      let facadeMaterials = [
        facadeMaterial,
        facadeMaterial,
        facadeMaterial,
        facadeMaterial,
        facadeMaterial,
        material,
      ];

      let bodyWidth = 100;
      let bodyHeight = 100;
      let bodyDepth = 60;
      let legsHeight = 10;
      let legFrontMargin = 0.6;
      let boxWidth = bodyWidth;
      let boxHeight = bodyHeight - legsHeight;
      let boxDepth = bodyDepth;
      let sideDepth = 30;
      let sideTop = 1.4;
      let gapFacade = 0.1;
      let legsRad = 0.3;


      let gSideLR = new THREE.BoxGeometry(boxDepth, boxHeight, sideDepth);
      let gSideBack = new THREE.BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
      let gSideBottom = new THREE.BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
      let gSideTop = new THREE.BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
      let gFacade = new THREE.BoxGeometry(boxWidth / 2 - gapFacade / 2, boxHeight, sideDepth);
      let gLegFront = new THREE.BoxGeometry(boxWidth, legsHeight, sideDepth);
      let gLegs = new THREE.CylinderGeometry(
          legsRad, legsRad, legsHeight, 16);


      let sideLeft = new THREE.Mesh(gSideLR, material);
      let sideRight = new THREE.Mesh(gSideLR, material);
      let sideBack = new THREE.Mesh(gSideBack, material);
      let sideBottom = new THREE.Mesh(gSideBottom, material);
      let sideShelf = new THREE.Mesh(gSideBottom, material);
      let sideTopFront = new THREE.Mesh(gSideTop, material);
      let sideTopBack = new THREE.Mesh(gSideTop, material);
      let facedeLeft = new THREE.Mesh(gFacade, facadeMaterials);
      let facedeRight = new THREE.Mesh(gFacade, facadeMaterials);
      let legFront = new THREE.Mesh(gLegFront, material);
      let legLeft = new THREE.Mesh(gLegs, legMaterial);

      let objFacedeLeft = new THREE.Object3D();
      objFacedeLeft.add(facedeLeft);
      facedeLeft.position.x = boxWidth / 4 - sideDepth / 2;
      objFacedeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
      objFacedeLeft.position.z = boxDepth / 2 + sideDepth / 2;
      objFacedeLeft.name = 'leftDoor'

      let objFacedeRight = new THREE.Object3D();
      objFacedeRight.add(facedeRight);
      facedeRight.position.x = -boxWidth / 4 + sideDepth / 2;
      objFacedeRight.position.x = boxWidth / 2 - sideDepth / 2;
      objFacedeRight.position.z = boxDepth / 2 + sideDepth / 2;
      objFacedeRight.name = 'rightDoor'

      let group = new THREE.Mesh();
      let body = new THREE.Mesh();


      sideLeft.rotation.y = THREE.Math.degToRad(-90);
      sideLeft.position.x = -(boxWidth / 2 - sideDepth / 2);
      sideRight.rotation.y = THREE.Math.degToRad(90);
      sideRight.position.x = (boxWidth / 2 - sideDepth / 2);
      sideBack.position.z = -(boxDepth / 2 - sideDepth / 2);
      sideBottom.rotation.x = THREE.Math.degToRad(-90);
      sideShelf.rotation.x = THREE.Math.degToRad(-90);
      sideBottom.position.y = -(boxHeight / 2 - sideDepth / 2);
      sideTopFront.rotation.x = THREE.Math.degToRad(-90);
      sideTopFront.position.y = (boxHeight / 2 - sideDepth / 2);
      sideTopFront.position.z = (boxDepth / 2 - sideTop / 2);
      sideTopBack.rotation.x = THREE.Math.degToRad(-90);
      sideTopBack.position.y = (boxHeight / 2 - sideDepth / 2);
      sideTopBack.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth);

      group.add(sideLeft);
      group.add(sideRight);
      group.add(sideBack);
      group.add(sideBottom);
      group.add(sideShelf);
      group.add(sideTopFront)
      group.add(sideTopBack)
      group.add(objFacedeLeft)
      group.add(objFacedeRight)


      body.add(group);

      body.add(legFront)
      body.add(legLeft)

      group.position.y = legsHeight;
      legFront.position.y = -bodyHeight / 2 + legsHeight;
      legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
      legLeft.position.y = -bodyHeight / 2 + legsHeight;
      legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
      legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
      gSideBottom.name="132123"
      return gSideBottom
    }
  },
  methods: {
    init() {
      camera = new THREE.PerspectiveCamera( 45, 800 / 600, 1, 10000 );
      camera.position.set( 500, 800, 1300 );
      camera.lookAt( 0, 0, 0 );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xf0f0f0 );

      // roll-over helpers
      const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
      rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
      rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
      scene.add( rollOverMesh );

      // cubes
      cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
      cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( 'https://api1.akson.ru:8443/aws/p/18133313/d2987a01-c3d2-444f-962b-d04b7845216c/600.png' ) } );

      // grid
      const gridHelper = new THREE.GridHelper( 1000, 20 );
      scene.add( gridHelper );
      //
      raycaster = new THREE.Raycaster();
      pointer = new THREE.Vector2();

      const geometry = new THREE.PlaneGeometry( 1000, 1000 );
      geometry.rotateX( - Math.PI / 2 );

      plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
      console.log(geometry, "geometry")
      // plane = this.body
      scene.add( plane );

      this.objects.push( plane );

      // lights
      const ambientLight = new THREE.AmbientLight( 0x606060 );
      scene.add( ambientLight );

      const directionalLight = new THREE.DirectionalLight( 0xffffff );
      directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
      scene.add( directionalLight );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( 800, 600 );
      this.$refs.canvas.appendChild( renderer.domElement );

      document.addEventListener( 'pointermove', this.onPointerMove );
      document.addEventListener( 'pointerdown', this.onPointerDown );
      document.addEventListener( 'keydown', this.onDocumentKeyDown );
      document.addEventListener( 'keyup', this.onDocumentKeyUp );
      //
      window.addEventListener( 'resize', this.onWindowResize );

      this.scene = scene
    },
    onWindowResize() {
      camera.aspect = 800 / 600;
      camera.updateProjectionMatrix();
      renderer.setSize( 800, 600 );
      this.render();
    },
    onPointerMove( event ) {
      const canvasPos = this.$refs.canvas.getBoundingClientRect()
      pointer.set( ( (event.clientX - canvasPos.x) / 800 ) * 2 - 1, - ( (event.clientY - canvasPos.y) / 600 ) * 2 + 1 );
      raycaster.setFromCamera( pointer, camera );
      const intersects = raycaster.intersectObjects( this.objects, false );
      if ( intersects.length > 0 ) {
        const intersect = intersects[ 0 ];
        rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
        rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
      }
      this.render();
    },
    onPointerDown( event ) {
      const canvasPos = this.$refs.canvas.getBoundingClientRect()
      pointer.set( ( (event.clientX - canvasPos.x) / 800 ) * 2 - 1, - ( (event.clientY - canvasPos.y) / 600 ) * 2 + 1 );

      raycaster.setFromCamera( pointer, camera );

      const intersects = raycaster.intersectObjects( this.objects, false );
      // console.log(intersects)
      if ( intersects.length > 0 ) {
        const intersect = intersects[ 0 ];
        // delete cube
        if ( isShiftDown ) {


            console.log(intersect.object)
            // scene.remove( intersect.object );

            // this.objects.splice( this.objects.indexOf( intersect.object ), 1 );

          // create cube
        } else {

          const voxel = new THREE.Mesh( this.body, cubeMaterial );
          voxel.position.copy( intersect.point ).add( intersect.face.normal );
          voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 )
          voxel.name = this.body.name
          scene.add( voxel );

          this.objects.push( voxel );

        }
        this.render();
      }

    },
    onDocumentKeyDown( event ) {
      switch ( event.keyCode ) {
        case 16: isShiftDown = true; break;
      }
    },
    onDocumentKeyUp( event ) {
      switch ( event.keyCode ) {
        case 16: isShiftDown = false; break;
      }
    },
    render() {
      renderer.render( scene, camera );
    }
  },
  mounted() {
    this.init();
    this.render();
  }
}
</script>

<style scoped>

</style>
