import {CameraControls, Html, Stage} from '@react-three/drei';
import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import {useEffect, useMemo, useRef, useState} from 'react';
import {AnimationAction, AnimationMixer, MeshPhongMaterial, MeshStandardMaterial, SkeletonHelper,} from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {AnimatedModelProps, AnimationTypeEnum} from "./types";

const useFBX = (url: string) => useLoader(FBXLoader, url)

const AnimatedModel: React.FC<AnimatedModelProps> = ({animation, model}) => {
    const {scene} = useThree();

    const prevAnimationActionRef = useRef<AnimationAction | null>(null)

    const mixer = useMemo(() => {
        return new AnimationMixer(model);
    }, [model])

    // useEffect(() => {
    //     model.traverse((child: any) => {
    //         if (child.isMesh) {
    //             const material = child.material as MeshPhongMaterial | Array<MeshPhongMaterial>
    //             if (material instanceof Array) {
    //                 material.forEach((mat) => {
    //                     if (mat.map) {
    //                         const map = mat.map as Texture;
    //                         map.wrapS = map.wrapT = RepeatWrapping;
    //                         mat.color.set(0xf00);
    //                     }
    //                 })
    //             } else {
    //                 if (material.map) {
    //                     const map = material.map as Texture;
    //                     map.wrapS = map.wrapT = RepeatWrapping;
    //                 }
    //             }
    //         }
    //     })
    // }, [model])

    useEffect(() => {
        if (prevAnimationActionRef.current) {
            const newAction = mixer.clipAction(animation);

            prevAnimationActionRef.current?.fadeOut(0.5);

            newAction.reset().fadeIn(0.5).play()

            prevAnimationActionRef.current = newAction;
        } else {
            const action = mixer.clipAction(animation);

            action.play();

            prevAnimationActionRef.current = action;
        }
    }, [animation, mixer])


    useEffect(() => {
        const helpers: SkeletonHelper[] = [];
        // model.traverse((child: any) => {
        //   if (child.isSkinnedMesh) {
        //     const mesh = child as SkinnedMesh;
        //     const helper = new SkeletonHelper(mesh);
        //     // helper.material.linewidth = 3;
        //     helpers.push(helper);
        //     // mesh.visible = false;
        //   }
        // })

        helpers.push(new SkeletonHelper(model.children[1]))

        // helpers.forEach((helper) => {
        //   scene.add(helper);
        // })

        // model.scale.set(0.01, 0.01, 0.01);
        // model.scale.set(0.01, 0.01, 0.01);

        return () => {
            helpers.forEach((helper) => {
                scene.remove(helper);
            })
        }
    }, [model, scene])

    useFrame((state, delta) => {
        mixer.update(delta);
    })

    return (
        <group>
            <primitive
                object={model}
            />
        </group>
    )
}

const Character = () => {
    const hairstyles = useFBX('/models/hairstyles/1.fbx');
    const top = useFBX(`/models/top/3.fbx`);
    const bottom = useFBX('/models/bottom/1.fbx');
    const shoes = useFBX('/models/shoes/1.fbx');
    const character = useFBX('/models/character.fbx');
    const idleAnimation = useFBX('/animations/idle.fbx');
    const walkAnimation = useFBX('/animations/walk.fbx');

    const [animationType, setAnimationType] = useState<AnimationTypeEnum>(AnimationTypeEnum.Walk);

    useEffect(() => {
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
                    console.log({oldMat})
                    const newMat = new MeshStandardMaterial({
                        // map: oldMat.map,
                        // normalMap: oldMat.normalMap,
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

    const animation = useMemo(() => {
        const idle = idleAnimation.animations[0];
        const walk = walkAnimation.animations[0];

        const animations = {
            [AnimationTypeEnum.Idle]: idle,
            [AnimationTypeEnum.Walk]: walk,
        }

        return animations[animationType];
    }, [animationType, idleAnimation, walkAnimation])

    const handleAnimationChange = (type: AnimationTypeEnum) => () => {
        setAnimationType(type)
    }

    return (
        <>
            <Stage adjustCamera={1} intensity={0.5} shadows="contact" environment="city">
                <AnimatedModel animation={animation} model={character}/>
                <AnimatedModel animation={animation} model={top}/>
                <AnimatedModel animation={animation} model={bottom}/>
                <AnimatedModel animation={animation} model={hairstyles}/>
                <AnimatedModel animation={animation} model={shoes}/>
                <CameraControls/>
            </Stage>
            <Html
                fullscreen
            >
                <div className='ui'>

                    <div className='ui__animation-variants-box'>
                        <button onClick={handleAnimationChange(AnimationTypeEnum.Idle)} className='ui__btn'>Idle
                        </button>
                        <button onClick={handleAnimationChange(AnimationTypeEnum.Walk)} className='ui__btn'>Walk
                        </button>
                    </div>

                </div>
            </Html>
        </>
    )
}

const App = () => {
    return (
        <div className="app">

            <Canvas>
                <Character/>
            </Canvas>
        </div>
    );
}

export default App;
