import {Html, OrbitControls, Stage, useGLTF} from "@react-three/drei";
import React, {useState} from "react";
import {useAsyncModel} from "../../hooks/useAsyncModel";
import AppearanceSettings from "../../widgets/AppearanceSettings";
import AnimatedModel from "../AnimatedModel";
import {bottomModelsPaths, hairstylesModelsPaths, shoesModelsPaths, topModelsPaths} from "./constants";
import {useAnimations} from "./hooks";
import {useAudio} from "./hooks/useAudio";
import {useMaterials} from "./hooks/useMaterials";
import {ModelsPathsType} from "./types";

const Character = () => {

    const thad = useGLTF('/models/thad.glb');

    const {handleAnimationChange} = useAnimations(thad)

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

    const {handleSetMaterialColor} = useMaterials(thad)

    console.log({thad})

    useAudio(thad)

    return (
        <>
            <Stage
                adjustCamera={false}
                environment={{files: 'env/kiara_1_dawn_1k.hdr', background: true, blur: 0.75}}
            >

                <group>
                    <primitive object={thad.scene}/>
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
                    handleSetSkinColor={handleSetMaterialColor}
                    modelsPaths={modelsPaths}
                    handleModelChange={handleModelChange}
                />
            </Html>
        </>
    )
}

export default Character;

useGLTF.preload('/models/character.glb')