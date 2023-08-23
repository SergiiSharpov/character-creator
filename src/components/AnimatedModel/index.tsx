import {useEffect} from "react";
import {useAppContextSelector} from "../../providers/ContextProvider";
import {AnimatedModelProps} from "./types";

const AnimatedModel: React.FC<AnimatedModelProps> = ({
                                                         model,
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
        <group>
            <primitive
                object={model}
            />
        </group>
    )
}

export default AnimatedModel;