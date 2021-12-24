import {constants} from "./constants";
import {BoxGeometry, Group, Mesh, MeshStandardMaterial} from "three";

export const Drawer = (bodyWidth, boxHeight, bodyDepth, drawerHeight) => {
  const sideDepth = constants().sideDepth;
  const material = new MeshStandardMaterial({color: 0xffffff});
  const drawerSideGap =  constants().drawerSideGap;
  const drawerSideDepth = constants().drawerSideDepth;

  let drawerWidth = bodyWidth - sideDepth*2 - drawerSideGap*2; //ширина выдвижного ящика
  let drawerDepth = bodyDepth - sideDepth; //глубина выдвижного ящика

  let drawerBottomGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, sideDepth, drawerDepth - drawerSideDepth);
  let drawerSideGeometry = new BoxGeometry(drawerSideDepth, drawerHeight, drawerDepth);
  let drawerSideBackGeometry = new BoxGeometry(drawerWidth - drawerSideDepth * 2, drawerHeight, drawerSideDepth);

  let drawerBottom = new Mesh(drawerBottomGeometry, material);
  let drawerSideR = new Mesh(drawerSideGeometry, material);
  let drawerSideL = new Mesh(drawerSideGeometry, material);
  let drawerSideBack = new Mesh(drawerSideBackGeometry, material);

  drawerBottom.position.z = drawerSideDepth/2;
  drawerSideR.position.x = - (drawerWidth/2 - drawerSideDepth / 2);
  drawerSideR.position.y = drawerHeight/2 - sideDepth/2;
  drawerSideL.position.x = drawerWidth/2 - drawerSideDepth / 2;
  drawerSideL.position.y = drawerHeight/2 - sideDepth/2;
  drawerSideBack.position.y = drawerHeight/2 - sideDepth/2;
  drawerSideBack.position.z = - (drawerDepth/2 - drawerSideDepth / 2);

  let drawer_0 = new Group();
  drawer_0.name = 'drawer';

  drawer_0.add(drawerBottom);
  drawer_0.add(drawerSideR);
  drawer_0.add(drawerSideL);
  drawer_0.add(drawerSideBack);

  drawer_0.position.z = sideDepth/2;
  return drawer_0
}
