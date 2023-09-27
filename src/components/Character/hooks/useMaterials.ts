import {useEffect, useState} from "react";
import {MeshPhongMaterial, MeshStandardMaterial} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {skinColors} from "../constants";

export const useMaterials = (model: GLTF) => {

    const [skinColor, setSkinColor] = useState(skinColors[0])

    const handleSetSkinColor = (value: string) => {
        setSkinColor(value)
    }

    useEffect(() => {
        if (!model) return
        model.scene.traverse((child: any) => {
            if(child.morphTargetDictionary) {

                console.log(child, 'morph')
            }
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
    }, [model, skinColor])

    return {handleSetSkinColor}
}