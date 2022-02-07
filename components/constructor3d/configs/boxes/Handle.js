import { Group, BoxGeometry, MeshStandardMaterial, Mesh} from "three"

export const handle = () => {
	const handle = new Group()
 
    const width = 0.11 * 10*1.5
    const depth = 0.03 * 10
    const height = 0.01 * 10

    const handleLegGeometry = new BoxGeometry(height, height, depth-height)
    const handleFrontGeometry = new BoxGeometry(width, height, height)
    const handleMaterial = new MeshStandardMaterial({
		color: 0xcccccc,
	})
    
    const handleLegLeft = new Mesh(handleLegGeometry, handleMaterial)
    const handleLegRight = new Mesh(handleLegGeometry, handleMaterial)
    const handleFront = new Mesh(handleFrontGeometry, handleMaterial)

    handleLegLeft.castShadow = true
    handleLegRight.castShadow = true
    handleFront.castShadow = true
    handleLegLeft.receiveShadow = true
    handleLegRight.receiveShadow = true
    handleFront.receiveShadow = true

    handle.add(handleLegLeft)
    handle.add(handleLegRight)
    handle.add(handleFront)

    handleLegLeft.position.x = -(width/2 - height/2)
    handleLegRight.position.x = width/2 - height/2
    handleLegLeft.position.z = depth/2
    handleLegRight.position.z = depth/2
    handleFront.position.z = depth-height + height/2 
    handle.name = 'handle'
	return handle
}