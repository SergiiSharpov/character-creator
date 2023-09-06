import {useGLTF} from "@react-three/drei";
import {useEffect, useMemo, useState} from "react";
import {AnimationClip} from "three";

type HookReturnType = [AnimationClip, ()  => void]

export const useAnimations = (): HookReturnType => {
    const [animationIndex, setAnimationIndex] = useState(0);

    const idle = useGLTF('/animations/idle.glb');
    const walk = useGLTF('/animations/walk.glb');
    const charge = useGLTF('/animations/charge.glb');
    const dance = useGLTF('/animations/dance.glb');
    const pointing = useGLTF('/animations/pointing.glb');
    const surprised = useGLTF('/animations/surprised.glb');

    const animations = useMemo(() => {
        const idleAnimation = idle.animations[0];
        const walkAnimation = walk.animations[0];
        const chargeAnimation = charge.animations[0];
        const danceAnimation = dance.animations[0];
        const pointingAnimation = pointing.animations[0];
        const surprisedAnimation = surprised.animations[0];

        return [
            walkAnimation,
            idleAnimation,
            chargeAnimation,
             danceAnimation,
            pointingAnimation,
            surprisedAnimation,
        ]
    }, [idle, walk, charge, dance, pointing, surprised])

    const animation = animations[animationIndex]

    const generateRandomAnimationIndex = () => {
        let randomIndex = Math.floor(Math.random() * animations.length)
        while(randomIndex === animationIndex) {
            randomIndex = Math.floor(Math.random() * animations.length)
        }
        return randomIndex
    }

    const handleAnimationRandomChange = () => {
        setAnimationIndex(generateRandomAnimationIndex())
    }

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null

        if(animationIndex && animation) {
            const animationDuration = animation.duration * 1000

            timeoutId = setTimeout(() => {
                setAnimationIndex(0)
            }, animationDuration)
        }

        return () => clearTimeout(timeoutId as NodeJS.Timeout)

    }, [animationIndex])

    return [animation, handleAnimationRandomChange]
}