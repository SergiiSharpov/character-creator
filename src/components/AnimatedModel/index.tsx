import {useEffect} from "react";
import {AnimatedModelProps} from "./types";

const AnimatedModel: React.FC<AnimatedModelProps> = ({model}) => {

    useEffect(() => {
        return () => {
            model && model.removeFromParent()
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