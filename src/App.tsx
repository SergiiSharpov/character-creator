import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { HomePage } from "./pages";
import Loader, { useLoaderStore } from './components/Loader';

const Fallback = () => {
    const setLoading = useLoaderStore((state) => state.setLoading);

    useEffect(() => {
        setLoading(true);

        return () => {
            setLoading(false);
        }
    }, [setLoading])

    return null;
}

const App = () => {
    return (
        <div className="w-screen h-screen overflow-hidden fixed inset-0">
            <Suspense fallback={<Fallback />}>
                <Canvas>
                    <HomePage/>
                </Canvas>
            </Suspense>
            <Loader />
        </div>
    );
}

export default App;
