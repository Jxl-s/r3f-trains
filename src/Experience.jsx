import { Box, OrbitControls, Plane, Stage } from "@react-three/drei";
import Train from "./Train";
import Bezier from "./util/Bezier";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

function numberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function Experience() {
    const { pathPoints, trainCount } = useControls({
        pathPoints: {
            step: 1,
            value: 100,
        },
        trainCount: {
            step: 1,
            value: 3,
        },
    });

    return (
        <>
            <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 15] }}>
                <OrbitControls makeDefault />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />

                <ambientLight />

                <Stage environment="city" intensity={2} adjustCamera={false} shadows={false}>
                    {[...Array(trainCount)].map((_, i) => (
                        <Train
                            key={i}
                            pathPoints={pathPoints}
                            height={i}
                            curve={
                                new Bezier(
                                    { x: numberInRange(-20, -10), y: numberInRange(-25, 25) },
                                    { x: numberInRange(-10, 0), y: numberInRange(-25, 25) },
                                    { x: numberInRange(0, 10), y: numberInRange(-25, 25) },
                                    { x: numberInRange(10, 20), y: numberInRange(-25, 25) }
                                )
                            }
                        />
                    ))}
                </Stage>
            </Canvas>
        </>
    );
}

export default Experience;
