import { Group, Quaternion, QuaternionKeyframeTrack, Vector3, VectorKeyframeTrack } from "three"
import { constants } from "./constants"
import { handle } from "./Handle"

const depth = constants.bottomDepth
const legsHeight = constants.legsHeight

const getQuaternion = (angular) => {
	const xAxis = new Vector3(0, -1, 0)
	const qInitial = new Quaternion().setFromAxisAngle(xAxis, 0)
	const qFinal = new Quaternion().setFromAxisAngle(xAxis, angular)

	const quaternionOpen = new QuaternionKeyframeTrack(".quaternion", [0, 1], [qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w])
	const quaternionClose = new QuaternionKeyframeTrack(".quaternion", [0, 1], [qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w])

	return { quaternionOpen, quaternionClose }
}

const getQuaternionTop = (angular) => {
	const xAxis = new Vector3(-1, 0, 0)
	const qInitial = new Quaternion().setFromAxisAngle(xAxis, 0)
	const qFinal = new Quaternion().setFromAxisAngle(xAxis, angular)

	const quaternionOpen = new QuaternionKeyframeTrack(".quaternion", [0, 1], [qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w])
	const quaternionClose = new QuaternionKeyframeTrack(".quaternion", [0, 1], [qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w])

	return { quaternionOpen, quaternionClose }
}

const getUserData = (width, height, positionX, quaternionOpen, quaternionClose, positionY ) => {
	const facadeGroup = new Group()
	facadeGroup.name = "facadeElement"
	facadeGroup.userData.quaternionOpen = quaternionOpen
	facadeGroup.userData.quaternionClose = quaternionClose
	facadeGroup.userData.facadeWidth = width
	facadeGroup.userData.facadeHeight = height
	facadeGroup.userData.positionX = positionX
	if (positionY) facadeGroup.userData.positionY = positionY
	return facadeGroup
}

export const getFacadeLeft = ({ width, height, positionX }) => {
	const { quaternionOpen, quaternionClose } = getQuaternion(Math.PI / 2)
	const facadeGroup = getUserData( width, height, positionX, quaternionOpen, quaternionClose )

	facadeGroup.userData.facadeOpenDirection = "left"
	const hndl = handle()
	//facadeGroup.add(hndl)
	hndl.position.y = height/2 - constants.handleGap
	hndl.position.x = width/2

	return facadeGroup
}

export const getFacadeRight = ({ width, height, positionX }) => {
	const { quaternionOpen, quaternionClose } = getQuaternion(-Math.PI / 2)
	const facadeGroup = getUserData( width, height, positionX, quaternionOpen, quaternionClose )

	facadeGroup.userData.facadeOpenDirection = "right"
	const hndl = handle()
	facadeGroup.add(hndl)
	hndl.position.y = height/2 - constants.handleGap
	hndl.position.x = -width/2

	return facadeGroup
}

export const getFacadeFront = ({ width, height, positionX, positionY }) => {
	const posY = positionY ? positionY : legsHeight /2
	const positionOpen = new VectorKeyframeTrack( ".position", [0, 1], [0, posY, depth /2, 0, posY, depth /2 + 4] )
	const positionClose = new VectorKeyframeTrack( ".position", [0, 1], [0, posY, depth /2 + 4, 0, posY, depth /2] )
	const facadeGroup = getUserData( width, height, positionX, positionOpen, positionClose )
	facadeGroup.userData.facadeOpenDirection = "front"

	return facadeGroup
}

export const getFacadeTop = ({ width, height, positionX, positionY }) => {
	const { quaternionOpen, quaternionClose } = getQuaternionTop(Math.PI / 2)
	const facadeGroup = getUserData( width, height, positionX, quaternionOpen, quaternionClose, positionY )

	facadeGroup.userData.facadeOpenDirection = "top"
	
	return facadeGroup
}
