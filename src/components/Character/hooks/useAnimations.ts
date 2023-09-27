import {useAnimations as useDreiAnimations, useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useEffect, useMemo, useState} from "react";
import {AnimationMixer} from "three";
import {useAppContextSelector} from "../../../providers/ContextProvider";

export const useAnimations = () => {
    const [animationIndex, setAnimationIndex] = useState(0);

    const idle = useGLTF('/animations/idle.glb');
    const walk = useGLTF('/animations/walk.glb');
    const charge = useGLTF('/animations/charge.glb');
    const dance = useGLTF('/animations/dance.glb');
    const pointing = useGLTF('/animations/pointing.glb');
    const surprised = useGLTF('/animations/surprised.glb');

    const animationObjectGroup = useAppContextSelector('animationObjectGroup')

    const [mixer] = useState(() => new AnimationMixer(animationObjectGroup))

    console.log({idle})

    const animationData = useDreiAnimations(
        [idle.animations[0],
            walk.animations[0],
            charge.animations[0],
            dance.animations[0],
            pointing.animations[0],
            surprised.animations[0]
        ])

    console.log({animationData})

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
        while (randomIndex === animationIndex) {
            randomIndex = Math.floor(Math.random() * animations.length)
        }
        return randomIndex
    }

    const handleAnimationChange = () => {
        setAnimationIndex(generateRandomAnimationIndex())
    }

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null

        if (animationIndex && animation) {
            const animationDuration = animation.duration * 1000

            timeoutId = setTimeout(() => {
                setAnimationIndex(0)
            }, animationDuration)
        }

        return () => clearTimeout(timeoutId as NodeJS.Timeout)

    }, [animationIndex])

    useEffect(() => {
        if (!animation) return
        const action = mixer.clipAction(animation);
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animation])

    useFrame((state, delta) => {
        mixer && mixer.update(delta);
    })

    return {handleAnimationChange}
}