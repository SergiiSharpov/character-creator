import {useFrame, useLoader} from "@react-three/fiber";
import {useControls} from "leva";
import {useEffect, useMemo} from "react";
import {FileLoader} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

const test = {
    'B': 'CC_Base_Phonemes.EE',
    'C': 'CC_Base_Phonemes.AE',
    // 'D': 'CC_Base_Phonemes.AO',
    'E': 'CC_Base_Phonemes.Er',
    'F': 'CC_Base_Phonemes.W_OO',
    'G': 'CC_Base_Phonemes.F_V',
    'H': 'CC_Base_Phonemes.T_L_D_N',
    'X': 'CC_Base_Phonemes.B_M_P'
}

export const useAudio = (model: GLTF) => {
    const {playAudio} = useControls({playAudio: false})

    const audio = useMemo(() => new Audio('/voice/test-voice.mp3'), [])
    const jsonFIle = useLoader(FileLoader, '/voice/voice.json')
    const lipsync = JSON.parse(jsonFIle as string)

    useFrame(() => {

        Object.values(test).forEach((value: string) => {
            // @ts-ignore
            const morphTarget = model.nodes['CC_Base_Head'].morphTargetDictionary[value]
            // @ts-ignore
            const morphTargetInfluences = model.nodes['CC_Base_Head'].morphTargetInfluences
            morphTargetInfluences[morphTarget] = 0
        })

        const currentAudioTime = audio.currentTime
        for (let i = 0; i < lipsync.mouthCues.length; i++) {
            const mouseCue = lipsync.mouthCues[i]
            if(currentAudioTime >= mouseCue.start && currentAudioTime <= mouseCue.end) {
                // @ts-ignore
                const morphTarget = model.nodes['CC_Base_Head'].morphTargetDictionary[test[mouseCue.value]]
                // @ts-ignore
                const morphTargetInfluences = model.nodes['CC_Base_Head'].morphTargetInfluences
                morphTargetInfluences[morphTarget] = 1
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