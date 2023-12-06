import {ReactNode} from "react";
import {AnimationObjectGroup, Object3D, Event} from "three";

export interface ContextType {
    animationObjectGroup: AnimationObjectGroup | Object3D<Event> | null
}

export interface ContextProviderProps {
    children: ReactNode
}