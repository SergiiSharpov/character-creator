import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

export const setMorphTarget = (model: GLTF, nodeName: string, morphTargetName: string, value: number) => {
    // @ts-ignore
    const morphTarget = model.nodes[nodeName].morphTargetDictionary[morphTargetName]
    // @ts-ignore
    const morphTargetInfluences = model.nodes[nodeName].morphTargetInfluences
    morphTargetInfluences[morphTarget] = value
}