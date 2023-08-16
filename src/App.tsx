import {Canvas} from '@react-three/fiber'
import {HomePage} from "./pages";

const App = () => {
    return (
        <div className="w-screen h-screen overflow-hidden fixed inset-0">
            <Canvas

            >
                <HomePage/>
            </Canvas>
        </div>
    );
}

export default App;
