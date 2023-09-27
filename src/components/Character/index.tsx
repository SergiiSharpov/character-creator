import {Html, OrbitControls, Stage, useGLTF} from "@react-three/drei";
import React, {useEffect, useState} from "react";
import {useAsyncModel} from "../../hooks/useAsyncModel";
import AppearanceSettings from "../../widgets/AppearanceSettings";
import AnimatedModel from "../AnimatedModel";
import {bottomModelsPaths, hairstylesModelsPaths, shoesModelsPaths, topModelsPaths} from "./constants";
import {useAnimations} from "./hooks";
import {useMaterials} from "./hooks/useMaterials";
import {ModelsPathsType} from "./types";

const Character = () => {

    const character = useGLTF('/models/character.glb');
    const blendshape = useGLTF('/models/blendshapes.glb');
    const character__ = useGLTF('/models/character__.glb');

    const {handleAnimationChange} = useAnimations()

    const [modelsPaths, setModelsPaths] = useState<ModelsPathsType>({
        topModelPath: topModelsPaths[0],
        bottomModelPath: bottomModelsPaths[0],
        hairstyleModelPath: hairstylesModelsPaths[0],
        shoesModelPath: shoesModelsPaths[0],
    })

    const topModel = useAsyncModel(modelsPaths['topModelPath'])
    const bottomModel = useAsyncModel(modelsPaths['bottomModelPath']);
    const hairstylesModel = useAsyncModel(modelsPaths['hairstyleModelPath']);
    const shoesModel = useAsyncModel(modelsPaths['shoesModelPath']);

    const handleModelChange = (type: keyof ModelsPathsType) => (value: string) => {
        handleAnimationChange()
        setModelsPaths(state => ({
            ...state,
            [type]: value
        }))
    }

    const {handleSetSkinColor} = useMaterials(character__)

    useEffect(() => {
        if (!character__) return
        // animationObjectGroup.add(character__.scene);
        //
        // return () => {
        //     animationObjectGroup.remove(character__.scene);
        // }
    }, [character__])

    return (
        <>
            <Stage
                adjustCamera={false}
                environment={{files: 'env/kiara_1_dawn_1k.hdr', background: true, blur: 0.75}}
            >

                {/*<group dispose={null} ref={groupRef}>*/}
                {/*    <primitive object={character.scene}/>*/}
                {/*</group>*/}

                <group>
                    <primitive object={character__.scene}/>
                </group>


                <AnimatedModel model={topModel}/>
                <AnimatedModel model={bottomModel}/>
                <AnimatedModel model={hairstylesModel}/>
                <AnimatedModel model={shoesModel}/>
            </Stage>

            <OrbitControls
                // maxPolarAngle={75 * (Math.PI / 180)}
                // minPolarAngle={75 * (Math.PI / 180)}
                // enablePan={false}
                target={[0, 1, 0]}
                makeDefault
            />

            <Html
                fullscreen
                wrapperClass="html-wrap"
                className='z-50 relative'
            >
                <AppearanceSettings
                    handleSetSkinColor={handleSetSkinColor}
                    modelsPaths={modelsPaths}
                    handleModelChange={handleModelChange}
                />
            </Html>
        </>
    )
}

export default Character;

useGLTF.preload('/models/character.glb')