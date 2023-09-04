import {useEffect, useState} from "react";
import {Group} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

export const useAsyncModel = (modelPath: string) => {
    const [model, setModel] = useState<Group | null>(null);

    useEffect(() => {
        const loadAsync = async () => {
            const loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

            loader.setDRACOLoader(dracoLoader)

            const loadedModel = await loader.loadAsync(modelPath);
            setModel(loadedModel.scene);
        };
        loadAsync();
    }, [modelPath]);

    return model;
};
