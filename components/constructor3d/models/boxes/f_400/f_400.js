import { bottomBox } from "../bottomBox"
import {BoxGeometry, Mesh, Group, QuaternionKeyframeTrack, Quaternion, Vector3, AnimationClip, AnimationMixer, AnimationClipCreator} from "three";

import Materials from "../../Materials";
const { defaultMaterial } = Materials

const width = 4
const height = 8.2
const depth = 4.8

const sideDepth = .16;
const legsHeight = 1;
const sideTop = 0.8;
const sideY = (height - legsHeight) / 2 - sideDepth

const scale = 1

export const f_400 = () => {
  const wrap = bottomBox(width, height, depth)
  const boxGroup = wrap.boxGroup
  const caseGroup = wrap.caseGroup
  boxGroup.add(caseGroup)

  const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth);
  const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth);
  const sideTopGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, sideTop);
  const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth);

  const sideRight = new Mesh(sideGeometry, defaultMaterial());
  const sideLeft = new Mesh(sideGeometry, defaultMaterial());
  const sideBack = new Mesh(sideBackGeometry, defaultMaterial());
  const sideTopFront = new Mesh(sideTopGeometry, defaultMaterial());
  const sideTopBack = new Mesh(sideTopGeometry, defaultMaterial());
  const shelf = new Mesh(shelfGeometry, defaultMaterial())

  caseGroup.add(sideRight)
  caseGroup.add(sideLeft)
  caseGroup.add(sideBack)
  caseGroup.add(sideTopFront)
  caseGroup.add(sideTopBack)
  caseGroup.add(shelf)

  sideRight.position.set(width / 2 - sideDepth /2, sideY, 0)
  sideLeft.position.set(-width / 2 + sideDepth /2, sideY, 0)
  sideBack.position.set(0, sideY, - depth / 2 + sideDepth)
  sideTopFront.position.set(0, height - legsHeight - sideDepth * 2, depth / 2 - sideTop / 2)
  sideTopBack.position.set(0, height - legsHeight - sideDepth * 2, -depth / 2 + sideTop / 2)
  shelf.position.set(0, sideY, 0)

  const facadeGroup = new Group()
  facadeGroup.position.set(-width / 2 - sideDepth /2, sideY, depth / 2)
  const facadeGeometry = new BoxGeometry(width - sideDepth /4, height - legsHeight, sideDepth )
  const facade = new Mesh(facadeGeometry, defaultMaterial());
  facade.position.x = (width / 2 + sideDepth / 8)
  facadeGroup.name = 'facade'
  facadeGroup.add(facade)
  caseGroup.add(facadeGroup)

  // const xAxis = new Vector3( 1, 0, 0 );
  //
  // const qInitial = new Quaternion().setFromAxisAngle( xAxis, 0 );
  // const qFinal = new Quaternion().setFromAxisAngle( xAxis, Math.PI );
  // const quaternionKF = new QuaternionKeyframeTrack( '.quaternion', [ 0, 1, 2 ], [ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );
  //
  // const clip = new AnimationClip( 'Action', 3, [  quaternionKF] );
  // let mixer = new AnimationMixer( facadeGroup );
  //
  // const clipAction = mixer.clipAction( clip );
  // clipAction.play();

  // facadeGroup.animations.push(clipAction)

  // const mixer = new AnimationMixer(facade );
  // let animation = AnimationClipCreator.CreateRotationAnimation(100, "y");
  // mixer.clipAction(animation ).play();

  boxGroup.name = 'f_400'
  boxGroup.code = 'f-400'
  boxGroup.userData['facadeVariants'] = ['f_400_1']
  boxGroup.userData['configType'] = 'boxFloor'
  boxGroup.userData['openedDoors'] = false

  boxGroup.scale.set( scale, scale, scale )
  return boxGroup
}
