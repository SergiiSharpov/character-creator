import {CameraControls, Html, Stage} from "@react-three/drei";
import {useFrame, useLoader} from "@react-three/fiber";
import {useEffect, useMemo, useState} from "react";
import {AnimationMixer, AnimationObjectGroup, MeshPhongMaterial, MeshStandardMaterial} from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import AnimatedModel from "../AnimatedModel";
import {Select} from "../Select";
import {bottomModelsPaths, hairstylesModelsPaths, shoesModelsPaths, topModelsPaths} from "./constants";
import {useAnimations} from "./hooks";
import {AnimationTypeEnum} from "./types";

const useFBX = (url: string) => useLoader(FBXLoader, url)

const Character = () => {

    const character = useFBX('/models/character.fbx');

    const [animation, handleAnimationChange] = useAnimations()

    const [modelsPaths, setModelsPaths] = useState({
        topModelPath: topModelsPaths[0],
        bottomModelPath: bottomModelsPaths[0],
        hairstyleModelPath: hairstylesModelsPaths[0],
        shoesModelPath: shoesModelsPaths[0],
    })

    const topModel = useFBX(modelsPaths['topModelPath']);
    const bottomModel = useFBX(modelsPaths['bottomModelPath']);
    const hairstylesModel = useFBX(modelsPaths['hairstyleModelPath']);
    const shoesModel = useFBX(modelsPaths['shoesModelPath']);

    console.log({modelsPaths})

    const handleModelChange = (type: keyof typeof modelsPaths) => (value: string) => {
        setModelsPaths({
            ...modelsPaths,
            [type]: value
        })
    }


    useEffect(() => {
        character.traverse((child: any) => {
            if (child.isMesh) {
                const oldMat = child.material as (MeshPhongMaterial | MeshPhongMaterial[]);
                console.log(oldMat)
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
        const animationObjectGroup = new AnimationObjectGroup(character, topModel, bottomModel, hairstylesModel, shoesModel)
        return new AnimationMixer(animationObjectGroup);
    }, [character, topModel, bottomModel, hairstylesModel, shoesModel])

    useEffect(() => {

        const action = mixer.clipAction(animation);
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animation, mixer, topModel, bottomModel, hairstylesModel, shoesModel])

    useFrame((state, delta) => {
        mixer.update(delta);
    })

    return (
        <>
            <Stage adjustCamera={1} intensity={0.5} shadows="contact" environment="city">
                <AnimatedModel animation={animation} model={character}/>
                <AnimatedModel animation={animation} model={topModel}/>
                <AnimatedModel animation={animation} model={bottomModel}/>
                <AnimatedModel animation={animation} model={hairstylesModel}/>
                <AnimatedModel animation={animation} model={shoesModel}/>
                <CameraControls/>
            </Stage>
            <Html
                fullscreen
                className='z-50 relative'
            >
                <div className='absolute top-14 right-14 z-50 grid gap-10'>

                    <div className='flex gap-2'>
                        <button onClick={handleAnimationChange(AnimationTypeEnum.Idle)} className='ui__btn'>Idle
                        </button>
                        <button onClick={handleAnimationChange(AnimationTypeEnum.Walk)} className='ui__btn'>Walk
                        </button>
                    </div>

                    <Select
                        type='top'
                        list={topModelsPaths}
                        selected={modelsPaths['topModelPath']}
                        setSelected={handleModelChange('topModelPath')}
                    />

                    <Select
                        type='bottom'
                        list={bottomModelsPaths}
                        selected={modelsPaths['bottomModelPath']}
                        setSelected={handleModelChange('bottomModelPath')}
                    />

                    <Select
                        type='shoes'
                        list={shoesModelsPaths}
                        selected={modelsPaths['shoesModelPath']}
                        setSelected={handleModelChange('shoesModelPath')}
                    />

                    <Select
                        type='hairstyles'
                        list={hairstylesModelsPaths}
                        selected={modelsPaths['hairstyleModelPath']}
                        setSelected={handleModelChange('hairstyleModelPath')}
                    />
                </div>
            </Html>
        </>
    )
}

export default Character;