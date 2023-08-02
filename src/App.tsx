import {Canvas} from '@react-three/fiber'
import Character from "./components/Character";

const App = () => {
    return (
        <div className="w-screen h-screen overflow-hidden fixed inset-0">
            <Canvas camera={{
                // position: [0, 0, 5]
            }}>
                <Character/>
            </Canvas>
        </div>
    );
}

export default App;
