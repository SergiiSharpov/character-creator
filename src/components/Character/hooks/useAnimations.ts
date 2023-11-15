import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useEffect, useState} from "react";
import {AnimationMixer} from "three";
import {useAppContext} from "../../../providers/ContextProvider";

export const useAnimations = () => {
    const [animationIndex, setAnimationIndex] = useState(0);

    const {animationObjectGroup} = useAppContext()

    const idle = useGLTF('/animations/idle.glb');
    const walk = useGLTF('/animations/walk.glb');
    const charge = useGLTF('/animations/__charge.glb');
    const dance = useGLTF('/animations/__dancing.glb');
    const pointing = useGLTF('/animations/__pointingGesture.glb');
    const surprised = useGLTF('/animations/__surptised.glb');

    const [mixer] = useState(() => new AnimationMixer(animationObjectGroup!))

    idle.animations[0].name = 'idle'
    walk.animations[0].name = 'walk'
    charge.animations[0].name = 'charge'
    dance.animations[0].name = 'dance'
    pointing.animations[0].name = 'pointing'
    surprised.animations[0].name = 'surprised'

    const animations = [
        idle.animations[0],
        walk.animations[0],
        charge.animations[0],
        dance.animations[0],
        pointing.animations[0],
        // surprised.animations[0]
    ]

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
        if (!mixer || !animation) return

        const action = mixer.clipAction(animation)
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [mixer, animation]);
    useFrame((state, delta) => {
        mixer && mixer.update(delta);
    })

    return {handleAnimationRandomChange, handleSetAnimation}
}