import {AccumulativeShadows, Environment, OrbitControls, RandomizedLight, useGLTF} from "@react-three/drei";
import {useThree} from "@react-three/fiber";

import gsap from 'gsap'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Group, Quaternion, Vector3} from "three";
import {useAsyncModel} from "../../hooks/useAsyncModel";
import {useAppContextSelector} from "../../providers/ContextProvider";
import {useLoaderStore} from "../../store";
import AnimatedModel from "../AnimatedModel";
import {
    accessoriesModelAnnotation,
    accessoriesModelsPaths,
    bottomModelAnnotation,
    bottomModelsPaths,
    hairstyleModelAnnotation,
    hairstylesModelsPaths,
    shoesModelAnnotation,
    shoesModelsPaths,
    topModelAnnotation,
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
    const thad = useGLTF('/models/thad.glb');

    const groupRefAnimation = useRef<Group | null>(null);

    const animationObjectGroup = useAppContextSelector('animationObjectGroup')

    const {handleAnimationRandomChange} = useAnimations()

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

    useEffect(() => {

        if (!animationObjectGroup || !thad.scene) return

        animationObjectGroup.add(thad.scene)
        return () => {
            animationObjectGroup.remove(thad.scene)
            thad.scene.removeFromParent()
        }
    }, [thad]);

    return (
        <>
            <group
                position={[0, -1, 0]}
                ref={groupRefAnimation}
            >

                <group>
                    <primitive
                        name='thad'
                        object={thad.scene}
                    />
                </group>

                <AnimatedModel
                    name='top'
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('topModelPath')}
                    onClick={handleCameraMove}
                    model={topModel}
                    handleCameraMove={handleCameraMove}
                    {...topModelAnnotation}
                />

                <AnimatedModel
                    name='bottom'
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('bottomModelPath')}
                    onClick={handleCameraMove}
                    handleCameraMove={handleCameraMove}
                    model={bottomModel}
                    {...bottomModelAnnotation}
                />
                <AnimatedModel
                    name='hairstyles'
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('hairstyleModelPath')}
                    onClick={handleCameraMove}
                    model={hairstylesModel}
                    handleCameraMove={handleCameraMove}
                    {...hairstyleModelAnnotation}
                />
                <AnimatedModel
                    name='shoes'
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('shoesModelPath')}
                    onClick={handleCameraMove}
                    model={shoesModel}
                    handleCameraMove={handleCameraMove}
                    {...shoesModelAnnotation}
                />

                <AnimatedModel
                    name='accessories'
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('accessoriesModelPath')}
                    onClick={handleCameraMove}
                    model={accessoriesModel}
                    handleCameraMove={handleCameraMove}
                    {...accessoriesModelAnnotation}
                />

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