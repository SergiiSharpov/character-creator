import {useEffect, useState} from "react";
import {Group} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export const useAsyncModel = (modelPath: string) => {
    const [model, setModel] = useState<Group | null>(null);

    useEffect(() => {
        const loadAsync = async () => {
            const loader = new GLTFLoader();

            const loadedModel = await loader.loadAsync(modelPath);
            setModel(loadedModel.scene);
        };
        loadAsync();
    }, [modelPath]);

    return model;
};
