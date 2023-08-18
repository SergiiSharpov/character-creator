import {useEffect, useState} from "react";
import {Group} from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

export const useAsyncModel = (modelPath: string) => {
    const [model, setModel] = useState<Group | null>(null);

    useEffect(() => {
        const loadAsync = async () => {
            const loader = new FBXLoader();
            const loadedModel = await loader.loadAsync(modelPath);
            setModel(loadedModel);
        };
        loadAsync();
    }, [modelPath]);

    return model;
};
