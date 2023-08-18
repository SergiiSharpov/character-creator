import {useEffect} from "react";
import {AnimatedModelProps} from "./types";
import { ObjectGroup } from "../Character";

const AnimatedModel: React.FC<AnimatedModelProps> = ({model}) => {

    useEffect(() => {
        if (!model) return

        ObjectGroup.add(model)
        return () => {
            ObjectGroup.remove(model)
            model.removeFromParent()
        }
    }, [model])

    if(!model) return null

    return (
        <group>
            <primitive
                object={model}
            />
        </group>
    )
}

export default AnimatedModel;