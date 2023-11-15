import {Html} from '@react-three/drei'
import {useThree} from "@react-three/fiber";
import gsap from 'gsap'
import {useEffect, useRef} from "react";
import {ReactSVG} from 'react-svg'
import {Group, SkeletonHelper} from "three";
import {useAppContextSelector} from "../../providers/ContextProvider";
import Popover, {AnnotationType} from "../ui/Popover";
import {AnimatedModelProps} from "./types";

const AnimatedModel: React.FC<AnimatedModelProps> = (
    {
        name,
        model,
        handleCameraMove,
        annotationLabel,
        annotationPosition,
        cameraRotation,
        cameraPosition,
        icon,
        handleModelChange,
        cameraToDefault
    }) => {

    const animationObjectGroup = useAppContextSelector('animationObjectGroup')
    const scene = useThree(state => state.scene);

    useEffect(() => {
        if (!model || !animationObjectGroup) return

        animationObjectGroup.add(model)
        return () => {
            animationObjectGroup.remove(model)
            model.removeFromParent()
        }
    }, [model, animationObjectGroup])

    const annotationRef = useRef<Group | null>(null);

    const handleAnnotationPositionChange = () => {
        if (!annotationRef.current?.position) return
        gsap.to(annotationRef.current?.position, {
            x: annotationPosition.x + 0.15,
        })
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (!annotationRef.current?.position) return
                gsap.to(annotationRef.current?.position, {
                    x: annotationPosition.x,
                })
            }
        }

        window.addEventListener('keydown', handleEscape)

        return () => {
            window.removeEventListener('keydown', handleEscape)
        }
    }, []);

    useEffect(() => {
        console.log(model?.position, '***')
    }, [model]);

    if (!model) return null

    return (
        <>

            <primitive
                name={name}
                object={model}
            />

            <group
                position={annotationPosition}
                ref={annotationRef}
            >
                <Html
                    // position={annotationPosition}
                >
                    <Popover
                        // @ts-ignore
                        onClick={handleModelChange}
                        annotationType={annotationLabel as AnnotationType}
                        cameraToDefault={cameraToDefault}
                    >
                        <div
                            onClick={() => {
                                handleCameraMove(cameraPosition, cameraRotation)
                                handleAnnotationPositionChange()
                            }}
                            className='rounded-[5px] cursor-pointer grid place-items-center w-[70px] h-[70px] icon-gradient'>
                            <ReactSVG src={icon}/>
                        </div>
                    </Popover>
                </Html>
            </group>
        </>
    )
}

export default AnimatedModel;