import { Group, Quaternion, QuaternionKeyframeTrack, Vector3 } from "three"

const getQuaternion = (angular) => {
	const xAxis = new Vector3(0, -1, 0)
	const qInitial = new Quaternion().setFromAxisAngle(xAxis, 0)
	const qFinal = new Quaternion().setFromAxisAngle(xAxis, angular)

	const quaternionOpen = new QuaternionKeyframeTrack(".quaternion", [0, 1], [qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w])
	const quaternionClose = new QuaternionKeyframeTrack(".quaternion", [0, 1], [qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w])

	return { quaternionOpen, quaternionClose }
}

const getUserData = (width, height, positionX, quaternionOpen, quaternionClose ) => {
	const facadeGroup = new Group()
	facadeGroup.name = "facadeElement"
	facadeGroup.userData.quaternionOpen = quaternionOpen
	facadeGroup.userData.quaternionClose = quaternionClose
	facadeGroup.userData.facadeWidth = width
	facadeGroup.userData.facadeHeight = height
	facadeGroup.userData.positionX = positionX
	return facadeGroup
}

export const getFacadeLeft = ({ width, height, positionX }) => {
	const { quaternionOpen, quaternionClose } = getQuaternion(Math.PI / 2)
	const facadeGroup = getUserData( width, height, positionX, quaternionOpen, quaternionClose )

	facadeGroup.userData.facadeOpenDirection = "left"

	return facadeGroup
}

export const getFacadeRight = ({ width, height, positionX }) => {
	const { quaternionOpen, quaternionClose } = getQuaternion(-Math.PI / 2)
	const facadeGroup = getUserData( width, height, positionX, quaternionOpen, quaternionClose )

	facadeGroup.userData.facadeOpenDirection = "right"

	return facadeGroup
}

export const getFacadeFront = ({ width, height, positionX }) => {
	return "123"
}
