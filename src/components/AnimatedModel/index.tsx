import {useEffect} from "react";
import {AnimatedModelProps} from "./types";

const AnimatedModel: React.FC<AnimatedModelProps> = ({model}) => {

    useEffect(() => {
        return () => {
            model.clear()
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