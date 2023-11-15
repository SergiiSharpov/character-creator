import {ReactNode} from "react";
import {AnimationObjectGroup, Object3D, Event} from "three";

export interface ContextType {
    animationObjectGroup: AnimationObjectGroup | Object3D<Event> | null
    setAnimationObjectGroup: (animationObjectGroup: AnimationObjectGroup | Object3D<Event>) => void
}

export interface ContextProviderProps {
    children: ReactNode
}