import {useEffect, useState} from "react";
import {Quaternion, Vector3} from "three";
import {useAppContextSelector} from "../../providers/ContextProvider";
import {useLoaderStore} from "../../store";
import Popover, {AnnotationType} from "../ui/Popover";
import {AnimatedModelProps} from "./types";
import {Html} from '@react-three/drei'
import {ReactSVG} from 'react-svg'

const AnimatedModel: React.FC<AnimatedModelProps> = ({
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

    useEffect(() => {
        if (!model) return

        animationObjectGroup.add(model)
        return () => {
            animationObjectGroup.remove(model)
            model.removeFromParent()
        }
    }, [model])


    if (!model) return null

    return (
        <>
            <group>
                <primitive
                    object={model}
                />
            </group>
            <Html
                position={annotationPosition}
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
                        }}
                        className='rounded-[5px] cursor-pointer grid place-items-center w-[70px] h-[70px] icon-gradient'>
                        <ReactSVG src={icon}/>
                    </div>
                </Popover>
            </Html>
        </>
    )
}

export default AnimatedModel;