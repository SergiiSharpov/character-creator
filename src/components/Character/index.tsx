import {Html, MeshReflectorMaterial, OrbitControls, Stage, useFBX} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useEffect, useMemo, useState} from "react";
import {AnimationMixer, AnimationObjectGroup, MeshPhongMaterial, MeshStandardMaterial} from "three";
import {useAsyncModel} from "../../hooks/useAsyncModel";
import AppearanceSettings from "../../widgets/AppearanceSettings";
import AnimatedModel from "../AnimatedModel";
import {bottomModelsPaths, hairstylesModelsPaths, shoesModelsPaths, topModelsPaths} from "./constants";
import {useAnimations} from "./hooks";
import {ModelsPathsType} from "./types";

const Character = () => {

    const character = useFBX('/models/character.fbx');

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
        character.traverse((child: any) => {
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

    const mixer = useMemo(() => {
        if (!character || !topModel || !bottomModel || !hairstylesModel || !shoesModel) return null
        const animationObjectGroup = new AnimationObjectGroup(character, topModel, bottomModel, hairstylesModel, shoesModel)
        return new AnimationMixer(animationObjectGroup);
    }, [character, topModel, bottomModel, hairstylesModel, shoesModel])

    useEffect(() => {

        if (!mixer) return
        const action = mixer.clipAction(animation);
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animation, mixer, topModel, bottomModel, hairstylesModel, shoesModel])

    useFrame((state, delta) => {
        mixer && mixer.update(delta);
    })

    return (
        <>
            <Stage adjustCamera={1} intensity={0.5} shadows="contact" environment="city">
                <group>
                    <primitive
                        object={character}
                    />
                </group>
                <AnimatedModel model={topModel}/>
                <AnimatedModel model={bottomModel}/>
                <AnimatedModel model={hairstylesModel}/>
                <AnimatedModel model={shoesModel}/>
            </Stage>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-115}>
                <planeGeometry args={[2470, 2470]} />
                <MeshReflectorMaterial
                    mirror={0.5}
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={.7}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#101010"
                    metalness={.7}
                />
            </mesh>

            <OrbitControls
                maxPolarAngle={75 * (Math.PI / 180)}
                minPolarAngle={75 * (Math.PI / 180)}
                enablePan={false}
            />

            <Html
                fullscreen
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