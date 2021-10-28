<template lang="pug">
  div.inner-page
    div.page
      div.title Кухонные шкафы по индивидуальным размерам
      div.constructor
        div.column.preview(ref="canvas")

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
    DirectionalLightHelper
  } from 'three';
  import {GUI} from 'three/examples/jsm/libs/dat.gui.module'

  const windows = {innerHeight: 600, innerWidth: 800}

  export default {
    data() {
      return {}
    },
    computed: {},
    methods: {},
    mounted() {
      const scene = new Scene();
      const camera = new PerspectiveCamera(45, /*windows.innerWidth*/1000 / windows.innerHeight, 4, 100);
      const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.shadowMap.enabled = true;
      renderer.setSize(windows.innerWidth, windows.innerHeight);
      this.$refs.canvas.appendChild(renderer.domElement);

      //geometry = new SphereBufferGeometry(4, 64, 64);
      var wallWidth = 40;
      var wallHeight = 20;
      var wallGeometry = new PlaneGeometry(wallWidth, wallHeight);
      var floorGeometry = new PlaneGeometry(wallWidth, wallWidth);
      var floorMaterial = new MeshStandardMaterial({
        color: 0xaf9182,
        specular: 0x9999ff,
      });
      floorMaterial.roughness = 0.3;
      floorMaterial.metalness = 0.05;
      const floorTextureLoader = new TextureLoader();
      const wallTextureLoader = new TextureLoader();
      const facadeTextureLoader = new TextureLoader();

      var boxWidth = 40;
      var boxHeight = 20;

      const wallNormalTexture = /*wallTextureLoader.load('https://thumbs.dreamstime.com/b/%D1%82%D0%B5%D0%BA%D1%81%D1%82%D1%83%D1%80%D0%B0-%D1%82%D0%BA%D0%B0%D0%BD%D0%B8-%D0%B1%D0%B5%D0%B7%D1%88%D0%BE%D0%B2%D0%BD%D0%B0%D1%8F-%D0%BD%D0%BE%D1%80%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B0%D1%80%D1%82%D0%B0-%D0%B4%D0%BB%D1%8F-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D1%83%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-d-130539985.jpg');*/
          wallTextureLoader.load('https://api1.akson.ru:8443/aws/p/31131414141/3ff01239-654f-48b9-b396-aad17cc5052b/0.jpg');
      const floorNormalTexture = floorTextureLoader.load('https://api1.akson.ru:8443/aws/p/658666886/25b47846-0cd6-4388-a456-16a75ea1c8d4/0.jpg');
      const facadeNormalTexture = facadeTextureLoader.load('https://psv4.userapi.com/c534536/u51477333/docs/d14/90b0b9cfb0c9/NormalMap_3.png?extra=Q4CMPeXIQ_3NNFeoH32T7dtuIV_-b8AIFl_JvtcDU6uXX3GI-KMfIeXVVGUTUKReAm4aTC9jwtbqdSZicd3B9rbtaEOqfy0YtUdufy0dZvv_czabgIX8Ekl9zVIRI68Jx_K_gTC1sngEsUZdw0oOjYiZ');

      var wallMaterial = new MeshStandardMaterial({
        color: 0xc8b7ae,
        specular: 0xffffff,
      });
      wallMaterial.roughness = 1;
      wallMaterial.metalness = 0;
      wallMaterial.normalMap = wallNormalTexture;

      floorMaterial.normalMap = floorNormalTexture;

      var facadeMaterial = new MeshStandardMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        map: facadeTextureLoader.load('https://api1.akson.ru:8443/aws/p/18133313/d2987a01-c3d2-444f-962b-d04b7845216c/600.png'),
      });


      //facadeMaterial.normalMap = facadeNormalTexture;

      var wall = new Mesh(wallGeometry, wallMaterial);
      var wallR = new Mesh(wallGeometry, wallMaterial);
      var floor = new Mesh(floorGeometry, floorMaterial);

      wall.material.normalMap.repeat.set(8, 4);
      wall.material.needsUpdate = true;
      wall.material.normalMap.wrapS = wall.material.normalMap.wrapT = RepeatWrapping;

      floor.material.normalMap.repeat.set(3, 3);
      floor.material.needsUpdate = true;
      floor.material.normalMap.wrapS = floor.material.normalMap.wrapT = RepeatWrapping;

      wall.position.set(-wallWidth / 2, wallHeight / 2, 0);
      wallR.position.set(0, wallHeight / 2, wallWidth / 2);
      floor.position.set(-wallWidth / 2, 0, wallWidth / 2);
      wallR.rotation.y = Math.degToRad(-90);
      floor.rotation.x = Math.degToRad(-90);
      scene.add(floor);
      scene.add(wallR);
      scene.add(wall);

//camera.rotation.y = Math.degToRad( -22 );


      var material = new MeshStandardMaterial({
        color: 0xffffff,
        specular: 0xbcffbc,
      });
      material.roughness = 0.3;
      material.metalness = 0.05;

      var legMaterial = new MeshStandardMaterial({
        color: 0xffffff,
        specular: 0xbcffbc,
      });
      legMaterial.roughness = 0.1;
      legMaterial.metalness = 0.5;
      //material.normalMap = wallNormalTexture;

      var facadeMaterials = [
        facadeMaterial,
        facadeMaterial,
        facadeMaterial,
        facadeMaterial,
        facadeMaterial,
        material,
      ];

      var geometry = new BoxGeometry(10, 10, 10);

      var bodyWidth = 10;
      var bodyHeight = 10;
      var bodyDepth = 6;
      var legsHeight = 1;
      var legFrontMargin = 0.6;
      var legBackMargin = 0.2;
      var boxWidth = bodyWidth;
      var boxHeight = bodyHeight - legsHeight;
      var boxDepth = bodyDepth;
      var sideDepth = .3;
      var facadeDepth = sideDepth;
      var sideTop = 1.4;
      var gapFacade = 0.1;
      var gapFromWall = sideDepth;
      var legsRad = 0.3;


      var gSideLR = new BoxGeometry(boxDepth, boxHeight, sideDepth);
      var gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth);
      var gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth);
      var gSideTop = new BoxGeometry(boxWidth - sideDepth * 2, sideTop, sideDepth);
      var gFacade = new BoxGeometry(boxWidth / 2 - gapFacade / 2, boxHeight, sideDepth);
      var gLegFront = new BoxGeometry(boxWidth, legsHeight, sideDepth);
      var gLegs = new CylinderGeometry(
          legsRad, legsRad, legsHeight, 16);


      var sideLeft = new Mesh(gSideLR, material);
      var sideRight = new Mesh(gSideLR, material);
      var sideBack = new Mesh(gSideBack, material);
      var sideBottom = new Mesh(gSideBottom, material);
      var sideShelf = new Mesh(gSideBottom, material);
      var sideTopFront = new Mesh(gSideTop, material);
      var sideTopBack = new Mesh(gSideTop, material);
      var facedeLeft = new Mesh(gFacade, facadeMaterials);
      var facedeRight = new Mesh(gFacade, facadeMaterials);
      var legFront = new Mesh(gLegFront, material);
      var legLeft = new Mesh(gLegs, legMaterial);

      var objFacedeLeft = new Object3D();
      objFacedeLeft.add(facedeLeft);
      //facedeLeft.position.z = sideDepth/2;
      facedeLeft.position.x = boxWidth / 4 - sideDepth / 2;
      objFacedeLeft.position.x = -boxWidth / 2 + sideDepth / 2;
      objFacedeLeft.position.z = boxDepth / 2 + sideDepth / 2;

      var objFacedeRight = new Object3D();
      objFacedeRight.add(facedeRight);
      //facedeRight.position.z = sideDepth/2;
      facedeRight.position.x = -boxWidth / 4 + sideDepth / 2;
      objFacedeRight.position.x = boxWidth / 2 - sideDepth / 2;
      objFacedeRight.position.z = boxDepth / 2 + sideDepth / 2;


      var group = new Object3D();
      var body = new Object3D();


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

//facedeLeft.position.z = boxDepth/2 + sideDepth/2;
//facedeLeft.position.x = -(boxWidth/4 /*+ gap/2*/);
//facedeRight.position.z = boxDepth/2 + sideDepth/2;
//facedeRight.position.x = boxWidth/4 /*+ gap/2*/;
//sideBottom.position.y = 1;

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

      var spotLight = new SpotLight(0xffffff);
      /*sideTopBack.castShadow = true;
      sideTopBack.receiveShadow = true;
      sideBottom.castShadow = true;
      sideBottom.receiveShadow = true;
      floor.receiveShadow = true;
      spotLight.shadow.mapSize.width = 10000;
      spotLight.shadow.mapSize.height = 10000;
      spotLight.shadow.radius = 8;
      renderer.shadowMap.enabled = true;
      renderer.shadowMapSoft = true;
      renderer.shadowMapType = PCFSoftShadowMap;
      spotLight.castShadow = true;*/


//group.add(legFront)
      group.position.y = legsHeight;
      legFront.position.y = -bodyHeight / 2 + legsHeight;
      legFront.position.z = bodyDepth / 2 - sideDepth / 2 - legFrontMargin;
      legLeft.position.y = -bodyHeight / 2 + legsHeight;
      legLeft.position.z = -bodyDepth / 2 + legsRad / 2 + legFrontMargin;
      legLeft.position.x = -bodyWidth / 2 + legsRad + legFrontMargin;
//legFront.position.x = -1;
//facedeLeft.rotation.y = Math.degToRad( -90 );

      scene.add(body);
      var body2 = body.clone();
      body2.position.set(-bodyWidth * 2, 0, 0);

      scene.add(body2);

      body.position.set(-(bodyWidth / 2 + gapFromWall), bodyHeight / 2 - legsHeight / 2, bodyDepth / 2 + gapFromWall);
//group.scale.x = 2;

      var figure = new Mesh(geometry, material);
      figure.position.x = 0;
      figure.position.x = 0;

      camera.position.z = 80;


      spotLight.position.set(-38, 40, 42);
      scene.add(spotLight);
      scene.add(spotLight.target);
      spotLight.target.position.set(-10, 10, 10);

      var spotLight2 = new SpotLight(0xffffff);
      spotLight2.position.set(-20, 40, 40);
//scene.add(spotLight2);
//gui.add(spotLight2.position, 'y');

      document.addEventListener('mousemove', onDocumentMouseMove);

      let startMouseX = 0;
      let startMouseY = 0;
      let mouseX = 0;
      let mouseY = 0;

      let targetX = 0;
      let targetY = 0;

      const windowX = windows.innerWidth / 2;
      const windowY = windows.innerHeight / 2;

      var mouseDown = false;
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
          console.log(mouseX);
        }
      }

      scene.rotation.y = Math.degToRad(26);

      camera.position.set(-4, 16, 50);
      camera.rotation.x = Math.degToRad(-20);


      const helper = new DirectionalLightHelper(spotLight);

//scene.add(helper);

      function updateLight() {
        spotLight.target.updateMatrixWorld();
        helper.update();
      }

      updateLight();
      const gui = new GUI();

      class ColorGUIHelper {
        constructor(object, prop) {
          this.object = object;
          this.prop = prop;
        }

        get value() {
          return `#${this.object[this.prop].getHexString()}`;
        }

        set value(hexString) {
          this.object[this.prop].set(hexString);
        }
      }

      gui.addColor(new ColorGUIHelper(floorMaterial, 'color'), 'value').name('floor');
      gui.addColor(new ColorGUIHelper(wallMaterial, 'color'), 'value').name('wall');
      spotLight.intensity = 1.5
      gui.add(spotLight, 'intensity', 0, 2, 0.01);
      /*makeXYZGUI(gui, spotLight.target.position, 'target', updateLight);*/
      makeXYZGUI(gui, spotLight.position, 'spotLight', updateLight);
      makeXYZGUI(gui, body.position, 'body', updateLight);
      makeXYZGUIR(gui, body.rotation, 'body.rotation', /*updateLight*/);
      makeXYZGUIR(gui, objFacedeLeft.rotation, 'facedeLeft', /*updateLight*/);
      makeXYZGUI(gui, scene.position, 'scene.position', /*updateLight*/);
      makeXYZGUI(gui, camera.position, 'camera.position', /*updateLight*/);
      makeXYZGUIR(gui, camera.rotation, 'camera.rotation', /*updateLight*/);
      makeXYZGUIR(gui, scene.rotation, 'scene.rotation', /*updateLight*/);

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

      var camCheck = false;
      // $('#camera1').click(function() {
      //   if (camCheck){
      //     camCheck = false;
      //   }else{camCheck = true;}
      // });
      //
      var openCheck = false;
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
              console.log('value: ' + value);
              return value - step;

            } else {
              return to;
            }
          }
        }
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

        if (openCheck) {
          objFacedeLeft.rotation.y = fromTo(objFacedeLeft.rotation.y, 0, Math.degToRad(-90), Math.degToRad(2.5));
          objFacedeRight.rotation.y = fromTo(objFacedeRight.rotation.y, 0, Math.degToRad(90), Math.degToRad(2.5));
        } else {
          objFacedeLeft.rotation.y = fromTo(objFacedeLeft.rotation.y, Math.degToRad(-90), 0, Math.degToRad(2.5));
          objFacedeRight.rotation.y = fromTo(objFacedeRight.rotation.y, Math.degToRad(90), 0, Math.degToRad(2.5));
        }

        //camera.rotation.x += 0.005;
        //camera.rotation.y += 0.004;
        //figure.rotation.z += 0.005;
        //wall.rotation.y += 0.004;
        targetX += mouseX * .0001;
        targetY += mouseY * .0001;

        //scene.rotation.x = 0.5 * (targetY /*- figure.rotation.x*/);
        //scene.rotation.y = 0.5 * (targetX /*- figure.rotation.y*/);

        renderer.render(scene, camera);
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
