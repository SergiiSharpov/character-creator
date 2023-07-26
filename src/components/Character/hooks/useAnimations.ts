import {useFBX} from "@react-three/drei";
import {useMemo, useState} from "react";
import {AnimationClip} from "three";
import {AnimationTypeEnum} from "../types";

type HookReturnType = [AnimationClip, (type: AnimationTypeEnum) => () => void]

export const useAnimations = (): HookReturnType => {
    const [animationType, setAnimationType] = useState<AnimationTypeEnum>(AnimationTypeEnum.Walk);

    const idleAnimation = useFBX('/animations/idle.fbx');
    const walkAnimation = useFBX('/animations/walk.fbx');

    const animations = useMemo(() => {
        const idle = idleAnimation.animations[0];
        const walk = walkAnimation.animations[0];

        return {
            [AnimationTypeEnum.Idle]: idle,
            [AnimationTypeEnum.Walk]: walk,
        }
    }, [idleAnimation, walkAnimation])

    const animation = animations[animationType]

    const handleAnimationChange = (type: AnimationTypeEnum) => () => {
        setAnimationType(type)
    }

    return [animation, handleAnimationChange]
}