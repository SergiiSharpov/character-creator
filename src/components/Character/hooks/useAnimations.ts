import {useGLTF, useAnimations as useDreiAnimations, useSurfaceSampler} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import {AnimationMixer, Group} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {useAppContext, useAppContextSelector} from "../../../providers/ContextProvider";

export const useAnimations = (group: any) => {
    const [animationIndex, setAnimationIndex] = useState(0);
    const scene = useThree((state) => state.scene)

    const {setAnimationObjectGroup, animationObjectGroup} = useAppContext()

    const idle = useGLTF('/animations/idle.glb');
    const walk = useGLTF('/animations/walk.glb');
    const charge = useGLTF('/animations/__charge.glb');
    const dance = useGLTF('/animations/__dancing.glb');
    const pointing = useGLTF('/animations/__pointingGesture.glb');
    const surprised = useGLTF('/animations/__surptised.glb');

    const [animationName, setAnimationName] = useState('idle')
    const [mixer] = useState(() => new AnimationMixer(animationObjectGroup!))

    idle.animations[0].name = 'idle'
    walk.animations[0].name = 'walk'
    charge.animations[0].name = 'charge'
    dance.animations[0].name = 'dance'
    pointing.animations[0].name = 'pointing'
    surprised.animations[0].name = 'surprised'

    // const {actions, names, ref, mixer, clips} = useDreiAnimations([
    //     idle.animations[0],
    //     walk.animations[0],
    //     charge.animations[0],
    //     dance.animations[0],
    //     pointing.animations[0],
    //     surprised.animations[0],
    // ], scene)

    // console.log({group}, 'useAnimations')

    // useEffect(() => {
    //     setAnimationObjectGroup(mixer.getRoot())
    // }, [mixer]);

    // useEffect(() => {
    //     if (!mixer || !animationObjectGroup || !idle) return
    //
    //     const action = mixer.clipAction(walk?.animations?.[0])
    //     action.reset().fadeIn(0.5).play()
    //
    //     // return () => {
    //     //     action.fadeOut(0.5)
    //     // }
    // }, [mixer, animationObjectGroup, actions]);

    // const animations = useMemo(() => {
    //     const idleAnimation = idle.animations[0];
    //     const walkAnimation = walk.animations[0];
    //     const chargeAnimation = charge.animations[0];
    //     const danceAnimation = dance.animations[0];
    //     const pointingAnimation = pointing.animations[0];
    //     const surprisedAnimation = surprised.animations[0];
    //
    //     return [
    //         walkAnimation,
    //         idleAnimation,
    //         chargeAnimation,
    //         danceAnimation,
    //         pointingAnimation,
    //         surprisedAnimation,
    //     ]
    // }, [idle, walk, charge, dance, pointing, surprised])

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

        // if (mixer && animations[animationIndex]) {
        //     console.log('here')
        //     const currentAction = mixer.existingAction(animations[animationIndex]);
        //     console.log(animations[animationIndex], '***')
        //     console.log({currentAction})
        //     // currentAction?.fadeOut(0.5).stop();
        //     console.log({currentAction})
        //
        //     mixer.uncacheAction(animations[animationIndex]);
        // }

        setAnimationIndex(generateRandomAnimationIndex())
    }

    const prevAnimationIndex = useRef(0);


    const handleSetAnimation = <T>(key: T) => {

        // mixer.stopAllAction()
        // if (mixer && animations[animationIndex]) {
        //     console.log('here')
        //     const currentAction = mixer.existingAction(animations[animationIndex]);
        //     console.log({currentAction})
        //     currentAction?.fadeOut(0.5).stop();
        //
        //     mixer.uncacheAction(animations[animationIndex]);
        // }

        setAnimationIndex(key as number)
    }

    useEffect(() => {
        if (!mixer || !animation) return

        // mixer.stopAllAction()
        const action = mixer.clipAction(animation)
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
            // mixer.uncacheAction(animation)
        }
    }, [mixer, animation]);

    // useEffect(() => {
    //     if(!animation) return
    //
    //     const action = mixer.clipAction(animation)
    //
    //     action.reset().fadeIn(0.5).play()
    //
    //     return () => {
    //         // action.fadeOut(0.5)
    //         action.stop()
    //         // mixer.uncacheClip(animation)
    //         // mixer.uncacheRoot(scene)
    //     }
    // }, [animation]);

    // useFrame((state, delta) => {
    //     mixer && mixer.update(delta)
    // })

    // useEffect(() => {
    //     let timeoutId: NodeJS.Timeout | null = null
    //
    //     if (animationIndex && animation) {
    //         const animationDuration = animation.duration * 1000
    //
    //         timeoutId = setTimeout(() => {
    //             setAnimationIndex(0)
    //         }, animationDuration)
    //     }
    //
    //     return () => clearTimeout(timeoutId as NodeJS.Timeout)
    //
    // }, [animationIndex, animation])

    // useEffect(() => {
    //     if (!animation) return
    //     const action = mixer.clipAction(animation);
    //     action.reset().fadeIn(0.5).play()
    //
    //     return () => {
    //         action.fadeOut(0.5)
    //     }
    // }, [animation])

    // useEffect(() => {
    //     if (!model) return
    //     animationObjectGroup.add(model.scene);
    //
    //     return () => {
    //         animationObjectGroup.remove(model.scene);
    //     }
    // }, [model])
    //
    useFrame((state, delta) => {
        mixer && mixer.update(delta);
    })

    return {handleAnimationRandomChange, handleSetAnimation}
}