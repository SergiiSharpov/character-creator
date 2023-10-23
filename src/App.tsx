import {Canvas} from '@react-three/fiber'
import {Suspense} from 'react'
import Fallback from "./components/Fallback";
import Loader from './components/Loader';
import {HomePage} from "./pages";

const App = () => {
    return (
        <div className="w-screen h-screen overflow-hidden fixed inset-0">
            <Suspense fallback={<Fallback/>}>
                <Canvas
                    camera={{
                        fov: 60,
                        position: [0, 1, 2],
                    }}
                >
                    <HomePage/>
                </Canvas>
            </Suspense>
            <Loader/>
        </div>
    );
}

export default App;
