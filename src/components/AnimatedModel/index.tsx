import {useEffect} from "react";
import {AnimatedModelProps} from "./types";

const AnimatedModel: React.FC<AnimatedModelProps> = ({model}) => {

    useEffect(() => {
        return () => {
            model.removeFromParent()
        }
    }, [model])

    return (
        <group>
            <primitive
                object={model}
            />
        </group>
    )
}

export default AnimatedModel;