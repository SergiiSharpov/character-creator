import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useEffect, useMemo, useState} from "react";
import {AnimationMixer} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {useAppContextSelector} from "../../../providers/ContextProvider";

export const useAnimations = (model: GLTF) => {
    const [animationIndex, setAnimationIndex] = useState(0);

    const idle = useGLTF('/animations/idle.glb');
    const walk = useGLTF('/animations/walk.glb');
    const charge = useGLTF('/animations/__charge.glb');
    const dance = useGLTF('/animations/__dancing.glb');
    const pointing = useGLTF('/animations/__pointingGesture.glb');
    const surprised = useGLTF('/animations/__surptised.glb');

    const animationObjectGroup = useAppContextSelector('animationObjectGroup')

    const [mixer] = useState(() => new AnimationMixer(animationObjectGroup))

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

    const handleAnimationRandomChange = () => {
        setAnimationIndex(generateRandomAnimationIndex())
    }

    const handleSetAnimation = <T>(key: T) => {
        setAnimationIndex(key as number)
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

    }, [animationIndex, animation])

    useEffect(() => {
        if (!animation) return
        const action = mixer.clipAction(animation);
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animation])

    useEffect(() => {
        if (!model) return
        animationObjectGroup.add(model.scene);

        return () => {
            animationObjectGroup.remove(model.scene);
        }
    }, [model])

    useFrame((state, delta) => {
        mixer && mixer.update(delta);
    })

    return {handleAnimationRandomChange, handleSetAnimation}
}