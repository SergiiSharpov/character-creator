import {ReactNode} from "react";
import {AnimationObjectGroup} from "three";

export interface ContextType {
    animationObjectGroup: AnimationObjectGroup
}

export interface ContextProviderProps {
    children: ReactNode
}