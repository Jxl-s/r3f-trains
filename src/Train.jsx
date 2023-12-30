import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

const trainGeometry = new THREE.BoxGeometry(1, 1, 2);
export default function Train({ height, curve, pathPoints }) {
    const trainRef = useRef();
    const pathRef = useRef();

    const randomDelay = Math.random() * 12;
    const randomColor = Math.random() * 0xffffff;

    useFrame((state) => {
        // With the time, get a value between 0 and 1. It should be smooth, like 0 -> 1, and 1 -> 0
        const time = state.clock.getElapsedTime() + randomDelay;
        const t = (Math.sin(time / 3) + 1) / 2;

        // Use this as an input in the bezier function, to find the next position
        const nextPosition = curve.get(t);

        // Set the position of the train
        trainRef.current.position.x = nextPosition.x;
        trainRef.current.position.z = nextPosition.y;

        // Get the tangent of the curve at this point
        const tangent = curve.getDt(t);

        // Get the angle of the tangent
        const angle = Math.atan2(tangent.x, tangent.y);

        // Set the rotation of the train
        trainRef.current.rotation.y = angle;
    });

    useEffect(() => {
        pathRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        for (let i = 0; i <= pathPoints; i++) {
            const t = i / pathPoints;
            const { x, y } = curve.get(t);

            // Create the instance matrix
            const matrix = new THREE.Matrix4();
            matrix.setPosition(new THREE.Vector3(x, height, y));

            // Set the matrix for i-th instance
            pathRef.current.setMatrixAt(i, matrix);
        }

        pathRef.current.instanceMatrix.needsUpdate = true;
    }, [pathPoints, curve, pathRef, height]);

    return (
        <>
            <mesh ref={trainRef} position-y={height} geometry={trainGeometry}>
                <meshStandardMaterial color={randomColor} />
            </mesh>

            <instancedMesh ref={pathRef} args={[null, null, pathPoints + 1]}>
                <meshStandardMaterial color={randomColor} opacity={0.5} transparent={true} />
                <sphereGeometry args={[0.1, 8]} />
            </instancedMesh>
        </>
    );
}

Train.propTypes = {
    height: PropTypes.number.isRequired,
    curve: PropTypes.object.isRequired,
    pathPoints: PropTypes.number.isRequired,
};
