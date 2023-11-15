import {AnimationClip, Group, Quaternion, Vector3} from "three";

export type AnimatedModelProps = {
    name?: string
    animation?: AnimationClip
    model: Group | null
    handleModelChange: (key: string) => void
    onClick?: (
        position: Vector3,
        rotation: Quaternion
    ) => void
    handleCameraMove: (position: Vector3, rotation: Quaternion) => void
    annotationPosition: Vector3
    annotationLabel: string
    cameraPosition: Vector3
    cameraRotation: Quaternion
    icon: string
    cameraToDefault: () => void
}