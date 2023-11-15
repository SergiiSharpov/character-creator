import {AccumulativeShadows, Environment, Html, OrbitControls, RandomizedLight, useGLTF, useAnimations as useAnimationsDrei} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";

import gsap from 'gsap'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {AnimationMixer, Group, Quaternion, Vector3, Event} from "three";
import {useAsyncModel} from "../../hooks/useAsyncModel";
import {useAppContextSelector} from "../../providers/ContextProvider";
import {useLoaderStore} from "../../store";
import {
    accessoriesModelsPaths,
    bottomModelsPaths,
    hairstylesModelsPaths,
    shoesModelsPaths,
    topModelsPaths
} from "./constants";
import {useAnimations} from "./hooks";
import {useMaterials} from "./hooks/useMaterials";
import {ModelsPathsType} from "./types";

const hair = {
    "/models/hairstyles/1.glb": "Accessories_1.hw_1_2",
    "/models/hairstyles/2.glb": "Accessories_1.hw_1_3",
    "/models/hairstyles/3.glb": "Accessories_1.hw_1_4",
    "/models/hairstyles/4.glb": "Accessories_1.hw_1_5",
    "/models/hairstyles/5.glb": "Accessories_1.hw_1_6",
    "/models/hairstyles/6.glb": "Accessories_1.hw_1_7",
    "/models/hairstyles/7.glb": "Accessories_1.hw_1_8",
    "/models/hairstyles/8.glb": "Accessories_1.hw_1_9",
    "/models/hairstyles/9.glb": "Accessories_1.hw_1_10"
};

const Character = () => {
    // const thad = useGLTF('/models/thad.glb');
    // const thad = useGLTF('/models/thad.glb');
    const thad = useGLTF('/models/thad_.glb');

    console.log({thad})

    const loading = useLoaderStore(state => state.loading)

    const groupRefAnimation = useRef<Group | null>(null);

    const [thadAnimationName, setThadAnimationNamer] = useState('walk')

    const thadRef = useRef<Group | null>(null);

    const {actions, mixer, clips, names} = useAnimationsDrei(thad.animations, thadRef)

    console.log({actions, mixer, clips, names})

    useEffect(() => {
        if(!actions || !mixer || loading) return
        const action = actions['All Animations']

        if(!action) return

        action.reset().fadeIn(0.5).play()
        // action.time = 8.758
        mixer.update(8.758)

        const mixerEvent = (event:  Event) => {
            console.log('mixer event', {event})
        }

        mixer.addEventListener('loop', mixerEvent)

        return () => {
            action.fadeOut(0.5).stop()

            mixer.removeEventListener('loop', mixerEvent)
        }

    }, [actions, mixer, loading])

    useFrame(() => {
        if (!mixer || loading || !actions) return

        const action = actions['All Animations']

        if(!action) return

        const time = mixer.time
        console.log(time)
        if(thadAnimationName === 'walk' && time >= 10.11) {
            console.log('end of animation')
            // action.fadeOut(0.5)
            mixer.time = 8.758

            action.time = 8.758

            // mixer.update(8.758)
        }

    })

    const animationObjectGroup = useAppContextSelector('animationObjectGroup')

    const {handleAnimationRandomChange, handleSetAnimation} = useAnimations(groupRefAnimation)

    const camera = useThree(state => state.camera)

    const [modelsPaths, setModelsPaths] = useState<ModelsPathsType>({
        topModelPath: topModelsPaths[0],
        bottomModelPath: bottomModelsPaths[0],
        hairstyleModelPath: hairstylesModelsPaths[0],
        shoesModelPath: shoesModelsPaths[0],
        accessoriesModelPath: accessoriesModelsPaths[0]
    })

    const topModel = useAsyncModel(modelsPaths['topModelPath'])
    const bottomModel = useAsyncModel(modelsPaths['bottomModelPath']);
    const hairstylesModel = useAsyncModel(modelsPaths['hairstyleModelPath']);
    const shoesModel = useAsyncModel(modelsPaths['shoesModelPath']);
    const accessoriesModel = useAsyncModel(modelsPaths['accessoriesModelPath']);
    // const accessoriesModel = useAsyncModel('/models/1.glb');


    const handleModelChange = (type: keyof ModelsPathsType) => (value: string) => {
        console.log('clicked')
        handleAnimationRandomChange()
        setModelsPaths(state => ({
            ...state,
            [type]: value
        }))
    }

    const hairstyleModalPath = modelsPaths['hairstyleModelPath']

    useMaterials(thad)
    // useAudio(thad)

    useEffect(() => {
        accessoriesModel?.traverse((child: any) => {
            if (child.morphTargetDictionary) {

                Object.keys(child.morphTargetInfluences).map(item => {
                    child.morphTargetInfluences[item] = 0
                })

                // @ts-ignore
                const morphTarget = child.morphTargetDictionary[hair[hairstyleModalPath]]
                // @ts-ignore
                child.morphTargetInfluences[morphTarget] = 1
            }
        })
    }, [accessoriesModel, hairstyleModalPath]);

    const handleCameraMove = (position: Vector3, rotation: Quaternion) => {

        gsap.to(camera.position, {...position})
        gsap.to(camera.quaternion, {...rotation})
    }

    const cameraToDefault = useCallback(() => {
        // gsap.to(camera.position, {x: 0, y: 2, z: 3.2, duration: 0.7})
        gsap.to(camera.position, {x: 0, y: 1, z: 2, duration: 0.7})
        gsap.to(camera.quaternion, {x: -0.229, y: 0, z: 0, w: 1, duration: 0.7})
    }, [])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                cameraToDefault()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => {
            window.removeEventListener('keydown', handleEscape)
        }
    }, []);

    // const {x, y, z} = useControls({
    //     y: {
    //         value: 0,
    //         step: 0.05
    //     },
    //     x: {
    //         value: 0,
    //         step: 0.05
    //     },
    //     z: {
    //         value: 0,
    //         step: 0.05
    //     }
    // })
    //
    // const {xR, yR, zR} = useControls({
    //     yR: {
    //         value: 0,
    //         step: 0.01
    //     },
    //     xR: {
    //         value: -0.229,
    //         step: 0.01
    //     },
    //     zR: {
    //         value: 0,
    //         step: 0.01
    //     }
    // })

    const scene = useThree(state => state.scene);

    // useEffect(() => {
    //     if (!thad) return
    //     const helpers: SkeletonHelper[] = []
    //     console.log({thad})
    //
    //     helpers.push(new SkeletonHelper(thad.scene?.children[0]))
    //     helpers.forEach((helper) => {
    //         scene.add(helper);
    //     })
    //
    //     return () => {
    //         helpers.forEach((helper) => {
    //             scene.remove(helper);
    //         })
    //     }
    //
    // }, [thad])

    // useEffect(() => {
    //     console.log(camera.position, 'camera position')
    // }, [camera]);

    useEffect(() => {

    }, []);

    return (
        <>
            <group
                position={[0, -1, 0]}
                ref={groupRefAnimation}
            >

                {/*<AnimatedModel*/}
                {/*    name='top'*/}
                {/*    cameraToDefault={cameraToDefault}*/}
                {/*    handleModelChange={handleModelChange('topModelPath')}*/}
                {/*    onClick={handleCameraMove}*/}
                {/*    model={topModel}*/}
                {/*    handleCameraMove={handleCameraMove}*/}
                {/*    {...topModelAnnotation}*/}
                {/*/>*/}

                {/*<primitive*/}
                {/*    name='top'*/}
                {/*    object={top.scene}*/}
                {/*/>*/}

                <group ref={thadRef}>
                    <primitive
                        name='thad'
                        object={thad.scene}
                    />
                </group>

                <Html>
                    <button
                        onClick={handleAnimationRandomChange}
                    >change animation
                    </button>
                </Html>

                {/*<AnimatedModel*/}
                {/*    name='bottom'*/}
                {/*    cameraToDefault={cameraToDefault}*/}
                {/*    handleModelChange={handleModelChange('bottomModelPath')}*/}
                {/*    onClick={handleCameraMove}*/}
                {/*    handleCameraMove={handleCameraMove}*/}
                {/*    model={bottomModel}*/}
                {/*    {...bottomModelAnnotation}*/}
                {/*/>*/}
                {/*<AnimatedModel*/}
                {/*    name='hairstyles'*/}
                {/*    cameraToDefault={cameraToDefault}*/}
                {/*    handleModelChange={handleModelChange('hairstyleModelPath')}*/}
                {/*    onClick={handleCameraMove}*/}
                {/*    model={hairstylesModel}*/}
                {/*    handleCameraMove={handleCameraMove}*/}
                {/*    {...hairstyleModelAnnotation}*/}
                {/*/>*/}
                {/*<AnimatedModel*/}
                {/*    name='shoes'*/}
                {/*    cameraToDefault={cameraToDefault}*/}
                {/*    handleModelChange={handleModelChange('shoesModelPath')}*/}
                {/*    onClick={handleCameraMove}*/}
                {/*    model={shoesModel}*/}
                {/*    handleCameraMove={handleCameraMove}*/}
                {/*    {...shoesModelAnnotation}*/}
                {/*/>*/}

                {/*<AnimatedModel*/}
                {/*    name='accessories'*/}
                {/*    cameraToDefault={cameraToDefault}*/}
                {/*    handleModelChange={handleModelChange('accessoriesModelPath')}*/}
                {/*    onClick={handleCameraMove}*/}
                {/*    model={accessoriesModel}*/}
                {/*    handleCameraMove={handleCameraMove}*/}
                {/*    {...accessoriesModelAnnotation}*/}
                {/*/>*/}

                <Environment preset="dawn" background blur={0.75}/>
                <AccumulativeShadows temporal frames={100} color="orange" colorBlend={2} toneMapped={true}
                                     alphaTest={0.75} opacity={2} scale={12}>
                    <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -10]}
                                     bias={0.001}/>
                </AccumulativeShadows>

                <OrbitControls
                    enabled={false}
                />
            </group>
        </>

    )
}

export default Character;

useGLTF.preload('/models/character.glb')