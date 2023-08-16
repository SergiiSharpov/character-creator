import {Canvas} from '@react-three/fiber'
import {HomePage} from "./pages";

const App = () => {
    return (
        <div className="w-screen h-screen overflow-hidden fixed inset-0">
            <Canvas>
                <color attach="background" args={["#213547"]}/>
                <fog attach="fog" args={["#213547", 1, 1000]}/>
                <HomePage/>
            </Canvas>
        </div>
    );
}

export default App;
