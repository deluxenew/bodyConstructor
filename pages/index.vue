<template lang="pug">
  div.inner-page
    div.page
      div.title Кухонные шкафы по индивидуальным размерам
      div.constructor
        div.column.preview(ref="canvas")

        button(@click="openCheck = !openCheck") open
        div.column.config
          | 123123

</template>

<script>
  import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PlaneGeometry,
    MeshStandardMaterial,
    TextureLoader,
    Mesh,
    RepeatWrapping,
    Math,
    BoxGeometry,
    CylinderGeometry,
    Object3D,
    SpotLight,
    DirectionalLightHelper,
    Vector2,
    Raycaster
  } from 'three';
  import {GUI} from 'three/examples/jsm/libs/dat.gui.module'

  const windows = { innerHeight: 600, innerWidth: 800 }

  export default {
    data() {
      const defaultTableTop = {

      }
      const defaultCase = {
        id: 0,
        angular: false,
        translatable: false,
        posY: 0,
        posX: 0,
        posZ: 0,
        width: 40,
        height: 60,
        deep: 50,
        elements: [{
          name: 'leftWall',
          posY: 0,
          posX: 0,
          posZ: 0,
          width: 30,
          height: 20,
          deep: 1,
          rotation: {
            posY: 0,
            posX: 0,
            posZ: 0,
          }
        }],
        doors: [
          {
            name: 'leftDoor',
            opened: false,
            posY: 0,
            posX: 0,
            posZ: 0,
            width: 30,
            height: 20,
            deep: 1,
            rotation: {
              posY: 0,
              posX: 0,
              posZ: 0,
            }
          },
          {
            name: 'rightDoor',
            opened: false,
            posY: 0,
            posX: 0,
            posZ: 0,
            width: 30,
            height: 20,
            deep: 1,
            rotation: {
              posY: 0,
              posX: 0,
              posZ: 0,
            }
          }
        ]
      }
      return {
        camPosition: 1,
        openCheck: false,
        tableTops: [],
        topCases: [],
        bottomCases: [],
        selectedCase: null,
        showSizes: false,
        scene: new Scene(),
        camera: new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200)
      }
    },
    computed: {
      tableTopsCount() {
        return 0
      },
      casesCount() {
        return 0
      },
      scenePosition() {
        const posX = 0
        const posY = 0
        const posZ = 0
        return {
          posX, posY, posZ
        }
      },
      cameraPosition() {
        const posX = 0
        const posY = 0
        const posZ = 0
        return {
          posX, posY, posZ
        }
      }
    },
    methods: {
      initWalls() {
        let wallWidth = 40;
        let wallHeight = 20;
        let wallGeometry = new PlaneGeometry(wallWidth, wallHeight);
        let floorGeometry = new PlaneGeometry(wallWidth, wallWidth);
        let floorMaterial = new MeshStandardMaterial({
          color: 0xaf9182,
        });
        floorMaterial.roughness = 0.3;
        floorMaterial.metalness = 0.05;
        const floorTextureLoader = new TextureLoader();
        const wallTextureLoader = new TextureLoader();


        const wallNormalTexture = wallTextureLoader.load('https://api1.akson.ru:8443/aws/p/31131414141/3ff01239-654f-48b9-b396-aad17cc5052b/0.jpg');
        const floorNormalTexture = floorTextureLoader.load('https://api1.akson.ru:8443/aws/p/658666886/25b47846-0cd6-4388-a456-16a75ea1c8d4/0.jpg');

        let wallMaterial = new MeshStandardMaterial({
          color: 0xc8b7ae,
        });
        wallMaterial.roughness = 1;
        wallMaterial.metalness = 0;
        wallMaterial.normalMap = wallNormalTexture;

        floorMaterial.normalMap = floorNormalTexture;
        //facadeMaterial.normalMap = facadeNormalTexture;

        const wall = new Mesh(wallGeometry, wallMaterial);
        const wallR = new Mesh(wallGeometry, wallMaterial);
        const floor = new Mesh(floorGeometry, floorMaterial);

        wall.material.normalMap.repeat.set(8, 4);
        wall.material.needsUpdate = true;
        wall.material.normalMap.wrapS = wall.material.normalMap.wrapT = RepeatWrapping;
        wall.name = "wall"

        wallR.name = "wallR"

        floor.material.normalMap.repeat.set(3, 3);
        floor.material.needsUpdate = true;
        floor.material.normalMap.wrapS = floor.material.normalMap.wrapT = RepeatWrapping;

        wall.position.set(-wallWidth / 2, wallHeight / 2, 0);
        wallR.position.set(0, wallHeight / 2, wallWidth / 2);
        floor.position.set(-wallWidth / 2, 0, wallWidth / 2);
        wallR.rotation.y = Math.degToRad(-90);
        floor.rotation.x = Math.degToRad(-90);
        this.scene.add(floor);
        this.scene.add(wallR);
        this.scene.add(wall);
      },
      selectCase() {
        const vm = this
        const mouse = new Vector2();
        const raycaster = new Raycaster();

        this.$refs.canvas.addEventListener( 'pointerdown', onPointerDown );

        // vm.$refs.canvas.addEventListener( 'mousemove', onMouseMove, false );
        //
        // function onMouseMove( event ) {
        //
        //   // calculate mouse position in normalized device coordinates
        //   // (-1 to +1) for both components
        //   const canvasPos = vm.$refs.canvas.getBoundingClientRect()
        //   mouse.x = ( (event.clientX - canvasPos.x) / 800 ) * 2 - 1;
        //   mouse.y = - ( (event.clientY - canvasPos.y) / 600 ) * 2 + 1;
        //
        //   raycaster.setFromCamera( mouse, camera );
        //
        //   // calculate objects intersecting the picking ray
        //   const intersects = raycaster.intersectObjects( scene.children );
        //
        //   for ( let i = 0; i < intersects.length; i ++ ) {
        //
        //     intersects[ i ].object.material.color.set( 0xff0000 );
        //
        //   }
        //
        //   renderer.render( scene, camera );
        //
        //
        // }

        function onPointerDown( event ) {
          const canvasPos = vm.$refs.canvas.getBoundingClientRect()
          mouse.x = ( (event.clientX - canvasPos.x) / 800 ) * 2 - 1;
          mouse.y = - ( (event.clientY - canvasPos.y) / 600 ) * 2 + 1;

          raycaster.setFromCamera( mouse, vm.camera );
          const intersects = raycaster.intersectObjects( vm.scene.children, true );
          if ( intersects.length > 0 ) {

            const object = intersects[0].object;
            // object.layers.toggle(1);

            console.log(object.parent.parent)
          }
        }
      }
    },
    mounted() {
      const vm = this
      const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.shadowMap.enabled = true;
      renderer.setSize(windows.innerWidth, windows.innerHeight);
      this.$refs.canvas.appendChild(renderer.domElement);

      this.initWalls()

      const facadeTextureLoader = new TextureLoader();
      let facadeMaterial = new MeshStandardMaterial({
        color: 0xffffff,
        map: facadeTextureLoader.load('https://api1.akson.ru:8443/aws/p/18133313/d2987a01-c3d2-444f-962b-d04b7845216c/600.png'),
      });

      let material = new MeshStandardMaterial({
        color: 0xffffff,
      });
      material.roughness = 0.3;
      material.metalness = 0.05;

      let legMaterial = new MeshStandardMaterial({
        color: 0xffffff,
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

      let geometry = new BoxGeometry(10, 10, 10);

      let bodyWidth = 10;
      let bodyHeight = 10;
      let bodyDepth = 6;
      let legsHeight = 1;
      let legFrontMargin = 0.6;
      let boxWidth = bodyWidth;
      let boxHeight = bodyHeight - legsHeight;
      let boxDepth = bodyDepth;
      let sideDepth = .3;
      let sideTop = 1.4;
      let gapFacade = 0.1;
      let gapFromWall = sideDepth;
      let legsRad = 0.3;

      let gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
      let gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
      let gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
      let gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
      let gFacade = new BoxGeometry(boxWidth / 2 - gapFacade / 2, boxHeight, sideDepth);
      let gLegFront = new BoxGeometry(boxWidth, legsHeight, sideDepth);
      let gLegs = new CylinderGeometry(
          legsRad, legsRad, legsHeight, 16);

      let sideLeft = new Mesh(gSideLR, material);
      let sideRight = new Mesh(gSideLR, material);
      let sideBack = new Mesh(gSideBack, material);
      let sideBottom = new Mesh(gSideBottom, material);
      let sideShelf = new Mesh(gSideBottom, material);
      let sideTopFront = new Mesh(gSideTop, material);
      let sideTopBack = new Mesh(gSideTop, material);
      let facedeLeft = new Mesh(gFacade, facadeMaterials);
      let facedeRight = new Mesh(gFacade, facadeMaterials);
      let legFront = new Mesh(gLegFront, material);
      let legLeft = new Mesh(gLegs, legMaterial);

      let objFacedeLeft = new Object3D();
      objFacedeLeft.add(facedeLeft);
      facedeLeft.position.x = boxWidth / 4 - sideDepth / 2;
      objFacedeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
      objFacedeLeft.position.z = boxDepth / 2 + sideDepth / 2;
      objFacedeLeft.name = 'leftDoor'

      let objFacedeRight = new Object3D();
      objFacedeRight.add(facedeRight);
      facedeRight.position.x = -boxWidth / 4 + sideDepth / 2;
      objFacedeRight.position.x = boxWidth / 2 - sideDepth / 2;
      objFacedeRight.position.z = boxDepth / 2 + sideDepth / 2;
      objFacedeRight.name = 'rightDoor'

      let group = new Mesh();
      let body = new Mesh();

      sideLeft.rotation.y = Math.degToRad(-90);
      sideLeft.position.x = -(boxWidth / 2 - sideDepth / 2);
      sideRight.rotation.y = Math.degToRad(90);
      sideRight.position.x = (boxWidth / 2 - sideDepth / 2);
      sideBack.position.z = -(boxDepth / 2 - sideDepth / 2);
      sideBottom.rotation.x = Math.degToRad(-90);
      sideShelf.rotation.x = Math.degToRad(-90);
      sideBottom.position.y = -(boxHeight / 2 - sideDepth / 2);
      sideTopFront.rotation.x = Math.degToRad(-90);
      sideTopFront.position.y = (boxHeight / 2 - sideDepth / 2);
      sideTopFront.position.z = (boxDepth / 2 - sideTop / 2);
      sideTopBack.rotation.x = Math.degToRad(-90);
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
      group.name = "group"

      body.add(group);
      body.add(legFront)
      body.add(legLeft)
      body.name = "body1"

      let spotLight = new SpotLight(0xffffff);

      group.position.y = legsHeight;
      legFront.position.y = -bodyHeight / 2 + legsHeight;
      legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
      legLeft.position.y = -bodyHeight / 2 + legsHeight;
      legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
      legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;

      vm.scene.add(body);
      let body2 = body.clone();
      body2.add(legFront)
      body2.position.set(-bodyWidth * 2, 6, 5);
      body2.name = 'body2'
      vm.scene.add(body2);

      body.position.set(-(bodyWidth / 2 + gapFromWall), bodyHeight / 2 - legsHeight / 2, bodyDepth / 2 + gapFromWall);

      let figure = new Mesh(geometry, material);
      figure.position.x = 0;
      figure.position.x = 0;

      vm.camera.position.z = 80;

      spotLight.position.set(-38, 40, 42);
      vm.scene.add(spotLight);
      vm.scene.add(spotLight.target);
      spotLight.target.position.set(-10, 10, 10);

      let spotLight2 = new SpotLight(0xffffff);
      spotLight2.position.set(-20, 40, 40);

      vm.$refs.canvas.addEventListener('mousemove', onDocumentMouseMove);
      vm.selectCase()

      let startMouseX = 0;
      let startMouseY = 0;
      let mouseX = 0;
      let mouseY = 0;

      let targetX = 0;
      let targetY = 0;

      const windowX = windows.innerWidth / 2;
      const windowY = windows.innerHeight / 2;

      let mouseDown = false;
      document.body.onmousedown = function (event) {
        mouseDown = true;
        startMouseX = event.clientX - windowX;
        startMouseY = event.clientY - windowY;
      }
      document.body.onmouseup = function () {
        mouseDown = false;
      }

      function onDocumentMouseMove(event) {
        if (mouseDown) {
          mouseX = (event.clientX - windowX) - startMouseX;
          mouseY = (event.clientY - windowY) - startMouseY;
          // console.log(mouseX);
        }
      }

      vm.scene.rotation.y = Math.degToRad(26);

      vm.camera.position.set(-4, 16, 50);
      vm.camera.rotation.x = Math.degToRad(-20);

      const helper = new DirectionalLightHelper(spotLight);

      function updateLight() {
        spotLight.target.updateMatrixWorld();
        helper.update();
      }

      updateLight();
      const gui = new GUI();

      spotLight.intensity = 1.5
      gui.add(spotLight, 'intensity', 0, 2, 0.01);
      makeXYZGUI(gui, spotLight.position, 'spotLight', updateLight);
      makeXYZGUI(gui, body.position, 'body', updateLight);
      makeXYZGUIR(gui, body.rotation, 'body.rotation', /*updateLight*/);
      makeXYZGUIR(gui, objFacedeLeft.rotation, 'facedeLeft', /*updateLight*/);
      makeXYZGUI(gui, vm.scene.position, 'scene.position', /*updateLight*/);
      makeXYZGUI(gui, vm.camera.position, 'camera.position', /*updateLight*/);
      makeXYZGUIR(gui, vm.camera.rotation, 'camera.rotation', /*updateLight*/);
      makeXYZGUIR(gui, vm.scene.rotation, 'scene.rotation', /*updateLight*/);

      function makeXYZGUI(gui, vector3, name, onChangeFn) {
        const folder = gui.addFolder(name);
        folder.add(vector3, 'x', -100, 100).onChange(onChangeFn);
        folder.add(vector3, 'y', 0, 100).onChange(onChangeFn);
        folder.add(vector3, 'z', -100, 100).onChange(onChangeFn);
        folder.open();
      }

      function makeXYZGUIR(gui, vector3, name, onChangeFn) {
        const folder = gui.addFolder(name);
        folder.add(vector3, 'x', Math.degToRad(-90), Math.degToRad(90)).onChange(onChangeFn);
        folder.add(vector3, 'y', Math.degToRad(-90), Math.degToRad(90)).onChange(onChangeFn);
        folder.add(vector3, 'z', Math.degToRad(-90), Math.degToRad(90)).onChange(onChangeFn);
        folder.open();
      }

      let camCheck = false;
      // $('#camera1').click(function() {
      //   if (camCheck){
      //     camCheck = false;
      //   }else{camCheck = true;}
      // });
      //
      // $('#facadeOpen').click(function() {
      //   if (openCheck){
      //     openCheck = false;
      //   }else{openCheck = true;}
      // });

      function fromTo(value, from, to, step) {
        if (value == to) return value;
        if (from < to) {
          if (value < to) {
            if (value + step < to) {
              return value + step;
              //console.log(value);
            } else {
              return to;
            }
          }
        } else if (from > to) {
          if (value > to) {
            if (value - step > to) {
              // console.log('value: ' + value);
              return value - step;

            } else {
              return to;
            }
          }
        }
      }

      const openDoor = (parentName, isOpened) => {

      }

      const getObjByName = (name) => {
          return {}
      }

      function render() {
        requestAnimationFrame(render);

        if (camCheck) {
          // scene.rotation.y = fromTo(scene.rotation.y, Math.degToRad(26), Math.degToRad(10), 0.01)
          /*if (scene.rotation.y > Math.degToRad(10))
            scene.rotation.y -= 0.01;*/
        } else {
          // scene.rotation.y = fromTo(scene.rotation.y, Math.degToRad(10), Math.degToRad(26), 0.01)
          /*if (scene.rotation.y < Math.degToRad(26))
            scene.rotation.y += 0.01;  */
        }

        if (vm.openCheck) {
          objFacedeLeft.rotation.y = fromTo(objFacedeLeft.rotation.y, 0, Math.degToRad(-90), Math.degToRad(2.5));
          objFacedeRight.rotation.y = fromTo(objFacedeRight.rotation.y, 0, Math.degToRad(90), Math.degToRad(2.5));
        } else {
          objFacedeLeft.rotation.y = fromTo(objFacedeLeft.rotation.y, Math.degToRad(-90), 0, Math.degToRad(2.5));
          objFacedeRight.rotation.y = fromTo(objFacedeRight.rotation.y, Math.degToRad(90), 0, Math.degToRad(2.5));
        }

        targetX += mouseX * .0001;
        targetY += mouseY * .0001;

        renderer.render(vm.scene, vm.camera);
      }

      render();
    }
  }
</script>

<style lang="scss">

  .column {
    display: flex;
    flex-direction: column;

  }

  .constructor {
    padding-top: 24px;
  }

  .preview {
    width: 70%;
  }

  .config {
    width: 30%;
  }

  .page {
    width: 1200px;
    margin: 0 auto;

    .title {
      font-weight: bold;
      font-size: 32px;
      line-height: 48px;
      letter-spacing: 0.4px;
      color: #23252A;
    }

    .constructor {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
</style>
