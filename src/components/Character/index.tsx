import {Html, OrbitControls, Stage, useFBX, useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useEffect, useState} from "react";
import {AnimationMixer, AnimationObjectGroup, Box3, MeshPhongMaterial, MeshStandardMaterial} from "three";
import {useAsyncModel} from "../../hooks/useAsyncModel";
import AppearanceSettings from "../../widgets/AppearanceSettings";
import AnimatedModel from "../AnimatedModel";
import {bottomModelsPaths, hairstylesModelsPaths, shoesModelsPaths, topModelsPaths} from "./constants";
import {useAnimations} from "./hooks";
import {ModelsPathsType} from "./types";

export const ObjectGroup = new AnimationObjectGroup();
const mixer = new AnimationMixer(ObjectGroup);

const Character = () => {

    const character = useGLTF('/models/character.glb');

    const [animation, handleAnimationChange] = useAnimations()

    const [modelsPaths, setModelsPaths] = useState<ModelsPathsType>({
        topModelPath: topModelsPaths[0],
        bottomModelPath: bottomModelsPaths[0],
        hairstyleModelPath: hairstylesModelsPaths[0],
        shoesModelPath: shoesModelsPaths[0],
    })

    const topModel = useAsyncModel(modelsPaths['topModelPath']) // useFBX(modelsPaths['topModelPath']);
    const bottomModel = useAsyncModel(modelsPaths['bottomModelPath']);
    const hairstylesModel = useAsyncModel(modelsPaths['hairstyleModelPath']);
    const shoesModel = useAsyncModel(modelsPaths['shoesModelPath']);

    const handleModelChange = (type: keyof ModelsPathsType) => (value: string) => {
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

                        color: oldMat.color,
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
    }, [character])

    useEffect(() => {
        if(!character) return
        ObjectGroup.add(character);

        return () => {
            ObjectGroup.remove(character);
        }
    }, [character])

    useEffect(() => {
        if(!animation) return
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
            <Stage adjustCamera={1} environment={{ files: 'env/kiara_1_dawn_1k.hdr', background: true, blur: 0.75 }} >
                <group>
                    <primitive object={character.scene} />
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
                makeDefault
            />

            <Html
                fullscreen
                wrapperClass="html-wrap"
                className='z-50 relative'
            >
                <AppearanceSettings
                    handleAnimationChange={handleAnimationChange}
                    modelsPaths={modelsPaths}
                    handleModelChange={handleModelChange}
                />
            </Html>
        </>
    )
}

export default Character;