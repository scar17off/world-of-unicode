import { useRef, useEffect } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { socket } from "../Network";

function LocalPlayer() {
    const ref = useRef();
    const cameraRef = useRef();
    const velocity = useRef(new THREE.Vector3());
    const speed = 0.1;
    const rotationSpeed = 0.002;
    const pitch = useRef(new THREE.Quaternion());
    const yaw = useRef(new THREE.Quaternion());
    const angles = useRef(new THREE.Euler());
    const xAxis = new THREE.Vector3(1.0, 0.0, 0.0);
    const yAxis = new THREE.Vector3(0.0, 1.0, 0.0);

    useEffect(() => {
        const handleKeyDown = (event) => {
            let movementData = { x: 0, y: 0, z: 0 };
            switch (event.key) {
                case "w":
                    movementData.z = speed;
                    break;
                case "s":
                    movementData.z = -speed;
                    break;
                case "a":
                    movementData.x = -speed;
                    break;
                case "d":
                    movementData.x = speed;
                    break;
                case "q":
                    movementData.y = -speed;
                    break;
                case "e":
                    movementData.y = speed;
                    break;
                default:
                    break;
            }
            socket.emit("move", movementData);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!cameraRef.current) return;

            angles.current.y -= event.movementX * rotationSpeed;
            const verticalRotationChange = event.movementY * rotationSpeed;
            const newVerticalRotation = angles.current.x - verticalRotationChange;

            // Limit the vertical rotation to prevent the camera from flipping over
            if (newVerticalRotation > -Math.PI / 2 && newVerticalRotation < Math.PI / 2) {
                angles.current.x = newVerticalRotation;
            }

            updateRotation();
        };

        const handleClick = () => {
            document.body.requestPointerLock();
        };

        const handlePointerLockChange = () => {
            if (document.pointerLockElement !== document.body) {
                document.exitPointerLock();
            }
        };

        document.body.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("click", handleClick);
        document.addEventListener("pointerlockchange", handlePointerLockChange);

        return () => {
            document.body.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("click", handleClick);
            document.removeEventListener("pointerlockchange", handlePointerLockChange);
        };
    }, []);

    const updateRotation = () => {
        pitch.current.setFromAxisAngle(xAxis, angles.current.x);
        yaw.current.setFromAxisAngle(yAxis, angles.current.y);
        cameraRef.current.quaternion.multiplyQuaternions(yaw.current, pitch.current).normalize();
    };

    useFrame(() => {
        if (ref.current && cameraRef.current) {
            const direction = new THREE.Vector3();
            cameraRef.current.getWorldDirection(direction);

            const forward = new THREE.Vector3();
            const right = new THREE.Vector3();
            const up = new THREE.Vector3(0, 1, 0);

            forward.setFromMatrixColumn(cameraRef.current.matrix, 0);
            forward.crossVectors(cameraRef.current.up, forward);

            right.setFromMatrixColumn(cameraRef.current.matrix, 0);

            ref.current.position.addScaledVector(forward, velocity.current.z);
            ref.current.position.addScaledVector(right, velocity.current.x);
            ref.current.position.addScaledVector(up, velocity.current.y);

            cameraRef.current.position.copy(ref.current.position);
        }
    });

    return (
        <>
            <group ref={ref}></group>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} />
        </>
    );
}

export default LocalPlayer;