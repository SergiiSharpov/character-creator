import {CameraControls, Html, Stage, useGLTF} from "@react-three/drei";
import {useThree} from "@react-three/fiber";

import gsap from 'gsap'
import {useControls} from "leva";
import React, {useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {Quaternion, Vector3} from "three";
import {useAsyncModel} from "../../hooks/useAsyncModel";
import AnimatedModel from "../AnimatedModel";
import Popover, {AnnotationType} from "../ui/Popover";
import {
    accessoriesModelAnnotation,
    accessoriesModelsPaths,
    animationsAnnotation,
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
import {useAudio} from "./hooks/useAudio";
import {useMaterials} from "./hooks/useMaterials";
import {ModelsPathsType} from "./types";

const Character = () => {

    const thad = useGLTF('/models/thad.glb');

    const {handleAnimationRandomChange, handleSetAnimation} = useAnimations(thad)

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

    const handleModelChange = (type: keyof ModelsPathsType) => (value: string) => {
        console.log('clicked')
        handleAnimationRandomChange()
        setModelsPaths(state => ({
            ...state,
            [type]: value
        }))
    }

    const {handleSetMaterialColor} = useMaterials(thad)

    useAudio(thad)

    const [cameraControlsRef, setCameraControlsRef] = useState<CameraControls | null>(null)


    const handleCameraMove = (position: Vector3, rotation: Quaternion) => {

        gsap.to(camera.position, {...position})
        gsap.to(camera.quaternion, {...rotation})
        if (!cameraControlsRef) return null

        console.log({cameraControlsRef})

        // cameraControlsRef.moveTo(0.35, 1.5, 0)

        // gsap.to(cameraControlsRef.camera.position, {...position})
        // gsap.to(cameraControlsRef.camera.quaternion, {...rotation})
    }

    const cameraToDefault = useCallback(() => {
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

    return (
        <>
            <Stage
                adjustCamera={false}
                environment={{files: 'env/kiara_1_dawn_1k.hdr', background: true, blur: 0.75}}
            >
                <group>
                    <primitive object={thad.scene}/>
                </group>

                {/*<mesh scale={0.1} position={[x, y, z]}>*/}
                {/*    <boxGeometry args={[1, 1, 1]}/>*/}
                {/*    <meshBasicMaterial color={'#fff'}/>*/}
                {/*</mesh>*/}

                <AnimatedModel
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('topModelPath')}
                    onClick={handleCameraMove}
                    model={topModel}
                    handleCameraMove={handleCameraMove}
                    {...topModelAnnotation}
                />
                <AnimatedModel
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('bottomModelPath')}
                    onClick={handleCameraMove}
                    handleCameraMove={handleCameraMove}
                    model={bottomModel}
                    {...bottomModelAnnotation}
                />
                <AnimatedModel
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('hairstyleModelPath')}
                    onClick={handleCameraMove}
                    model={hairstylesModel}
                    handleCameraMove={handleCameraMove}
                    {...hairstyleModelAnnotation}
                />
                <AnimatedModel
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('shoesModelPath')}
                    onClick={handleCameraMove}
                    model={shoesModel}
                    handleCameraMove={handleCameraMove}
                    {...shoesModelAnnotation}
                />

                <AnimatedModel
                    cameraToDefault={cameraToDefault}
                    handleModelChange={handleModelChange('accessoriesModelPath')}
                    onClick={handleCameraMove}
                    model={accessoriesModel}
                    handleCameraMove={handleCameraMove}
                    {...accessoriesModelAnnotation}
                />

                <Html
                    position={animationsAnnotation.annotationPosition}
                >
                    <Popover
                        cameraToDefault={cameraToDefault}
                        onClick={handleSetAnimation}
                        annotationType={animationsAnnotation.annotationLabel as AnnotationType}
                    >
                        <div
                            onClick={() => {
                                handleCameraMove(animationsAnnotation.cameraPosition, animationsAnnotation.cameraRotation)
                            }}
                            className='rounded-[5px] cursor-pointer grid place-items-center w-[70px] h-[70px] icon-gradient'>
                            <ReactSVG src={animationsAnnotation.icon}/>
                        </div>
                    </Popover>
                </Html>
            </Stage>


            {/*<OrbitControls*/}
            {/*    // maxPolarAngle={75 * (Math.PI / 180)}*/}
            {/*    // minPolarAngle={75 * (Math.PI / 180)}*/}
            {/*    // enablePan={false}*/}
            {/*    // target={thad.scene.position.clone()}*/}
            {/*    // makeDefault*/}
            {/*/>*/}

            {/*<CameraControls*/}
            {/*    enabled*/}
            {/*    ref={setCameraControlsRef}*/}
            {/*/>*/}

            <Html
                fullscreen
                wrapperClass="html-wrap"
                className='z-50 relative'
            >
                {/*<AppearanceSettings*/}
                {/*    handleSetSkinColor={handleSetMaterialColor}*/}
                {/*    modelsPaths={modelsPaths}*/}
                {/*    handleModelChange={handleModelChange}*/}
                {/*/>*/}
            </Html>
        </>
    )
}

export default Character;

useGLTF.preload('/models/character.glb')