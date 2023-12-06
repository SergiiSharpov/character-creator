import {useFrame, useLoader} from "@react-three/fiber";
import {useControls} from "leva";
import {useEffect, useMemo} from "react";
import {FileLoader} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {
    Game_Head_primitive0,
    Game_Head_primitive1,
    Game_Head_primitive2,
    visemeTeeth1, visemeTeeth2,
    visemeTongue
} from "../constants";
import {setMorphTarget} from "../utils/setMorphTarget";

// Game_Tongue
// Base_Teeth_1
// Base_Teeth_2

// Game_Tongue_1

// Base_Teeth_primitive0

export const useAudio = (model: GLTF) => {
    const {playAudio} = useControls({playAudio: false})

    const audio = useMemo(() => new Audio('/voice/test-voice.mp3'), [])
    const jsonFIle = useLoader(FileLoader, '/voice/voice.json')
    const lipsync = JSON.parse(jsonFIle as string)

    useFrame(() => {

        Object.values(visemeTongue).forEach((value: string) => {
            setMorphTarget(model, 'Game_Tongue_1', value, 0)
        })

        // Object.values(vма4isemeTeeth1).forEach((value: string) => {
        //     setMorphTarget(model, 'Base_Teeth_primitive1', value, 0)
        //     setMorphTarget(model, 'Base_Teeth_primitive0', value, 0)
        // })

        Object.values(Game_Head_primitive0).forEach((value: string) => {
            setMorphTarget(model, 'Game_Head_primitive0', value, 0)
            setMorphTarget(model, 'Game_Head_primitive1', value, 0)
            setMorphTarget(model, 'Game_Head_primitive2', value, 0)
        })

        const currentAudioTime = audio.currentTime
        for (let i = 0; i < lipsync.mouthCues.length; i++) {
            const mouseCue = lipsync.mouthCues[i]
            if(currentAudioTime >= mouseCue.start && currentAudioTime <= mouseCue.end) {
                setMorphTarget(model, 'Base_Teeth_primitive1', visemeTeeth2[mouseCue.value], 0.5)
                setMorphTarget(model, 'Base_Teeth_primitive0', visemeTeeth2[mouseCue.value], 0.5)

                setMorphTarget(model, 'Game_Tongue_1', visemeTongue[mouseCue.value], 1)

                setMorphTarget(model, 'Game_Head_primitive0', Game_Head_primitive0[mouseCue.value], 1)
                setMorphTarget(model, 'Game_Head_primitive1', Game_Head_primitive1[mouseCue.value], 1)
                setMorphTarget(model, 'Game_Head_primitive2', Game_Head_primitive2[mouseCue.value], 1)
            }
        }
    })

    useEffect(() => {
        if (playAudio) audio.play()
        else audio.pause()

        return () => {
            audio.pause()
        }
    }, [playAudio])
}