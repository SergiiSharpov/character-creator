import {Html, OrbitControls, Stage, useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useControls} from "leva";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {AnimationMixer, Group, MeshPhongMaterial, MeshStandardMaterial} from "three";
import {useAsyncModel} from "../../hooks/useAsyncModel";
import {useAppContextSelector} from "../../providers/ContextProvider";
import AppearanceSettings from "../../widgets/AppearanceSettings";
import AnimatedModel from "../AnimatedModel";
import {bottomModelsPaths, hairstylesModelsPaths, shoesModelsPaths, skinColors, topModelsPaths} from "./constants";
import {useAnimations} from "./hooks";
import {ModelsPathsType} from "./types";

const Character = () => {

    const animationObjectGroup = useAppContextSelector('animationObjectGroup')
    const [mixer] = useState(() => new AnimationMixer(animationObjectGroup))

    const groupRef = useRef<Group | null>(null);

    const character = useGLTF('/models/character.glb');

    const {playAudio} = useControls({playAudio: false})

    const audio = useMemo(() => new Audio('/voice/test-voice.mp3'), [])

    useEffect(() => {
        if (playAudio) audio.play()
        else audio.pause()

        return () => {
            audio.pause()
        }
    }, [playAudio])

    const [animation, handleAnimationChange] = useAnimations()

    const [modelsPaths, setModelsPaths] = useState<ModelsPathsType>({
        topModelPath: topModelsPaths[0],
        bottomModelPath: bottomModelsPaths[0],
        hairstyleModelPath: hairstylesModelsPaths[0],
        shoesModelPath: shoesModelsPaths[0],
    })

    const [skinColor, setSkinColor] = useState(skinColors[0])

    const handleSetSkinColor = (value: string) => {
        setSkinColor(value)
    }

    const topModel = useAsyncModel(modelsPaths['topModelPath']) // useFBX(modelsPaths['topModelPath']);
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

    useEffect(() => {
        if (!character) return
        character.scene.traverse((child: any) => {
            if (child.isMesh) {
                const oldMat = child.material as (MeshPhongMaterial | MeshPhongMaterial[]);

                const oldMaterials: Array<MeshPhongMaterial> = [];
                if (oldMat instanceof Array) {
                    oldMaterials.push(...oldMat);
                } else {
                    oldMaterials.push(oldMat);
                }

                const nextMaterials: Array<MeshStandardMaterial> = [];
                oldMaterials.forEach((oldMat) => {
                    const newMat = new MeshStandardMaterial({
                        map: oldMat.map,
                        normalMap: oldMat.normalMap,
                        envMap: oldMat.envMap,
                        aoMap: oldMat.aoMap,
                        color: skinColor,
                        aoMapIntensity: oldMat.aoMapIntensity,
                        side: oldMat.side,
                        transparent: oldMat.transparent,
                        opacity: oldMat.opacity,
                        name: oldMat.name,
                    })
                    nextMaterials.push(newMat);
                })

                if (nextMaterials.length === 1) {
                    child.material = nextMaterials[0];
                } else {
                    child.material = nextMaterials;
                }
            }
        })
    }, [character, skinColor])

    useEffect(() => {
        if (!character) return
        animationObjectGroup.add(character.scene);

        return () => {
            animationObjectGroup.remove(character.scene);
        }
    }, [character])

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

    return (
        <>
            <Stage
                adjustCamera={false}
                environment={{files: 'env/kiara_1_dawn_1k.hdr', background: true, blur: 0.75}}
            >

                <group dispose={null} ref={groupRef}>
                    <primitive object={character.scene}/>
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