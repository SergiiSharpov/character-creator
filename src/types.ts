import {AnimationClip, Group} from "three";

export type AnimatedModelProps = {
    animation: AnimationClip
    model: Group
}

export enum AnimationTypeEnum {
    Idle = 'idle',
    Walk = 'walk',
}