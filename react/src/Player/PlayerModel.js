import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Cube from "../Cube";

const PlayerModel = ({ position }) => {
    const ref = useRef();
    const [animation, setAnimation] = useState("idle");

    useEffect(() => {
        if (ref.current) {
            ref.current.position.set(position[0], position[1], position[2]);
        }
    }, [position]);

    const getAnimation = () => {
        switch (animation) {
            case "walking":
                return (delta) => {
                    const time = Date.now() * 0.001;
                    ref.current.children[2].rotation.x = Math.sin(time * 10) * 0.5; // Left Arm
                    ref.current.children[3].rotation.x = -Math.sin(time * 10) * 0.5; // Right Arm
                    ref.current.children[4].rotation.x = -Math.sin(time * 10) * 0.5; // Left Leg
                    ref.current.children[5].rotation.x = Math.sin(time * 10) * 0.5; // Right Leg
                };
            default:
                return () => {};
        }
    };

    useFrame((state, delta) => {
        if (ref.current) {
            getAnimation()(delta);
        }
    });

    return (
        <group ref={ref} position={position}>
            <Cube color={"blue"} position={[0, 1.7, 0]} size={[1, 1, 1]} /> {/* Head */}
            <Cube color={"green"} position={[0, 0.5, 0]} size={[1, 1.5, 0.5]} /> {/* Body */}
            <Cube color={"red"} position={[-0.75, 0.5, 0]} size={[0.5, 1.5, 0.5]} /> {/* Left Arm */}
            <Cube color={"purple"} position={[0.75, 0.5, 0]} size={[0.5, 1.5, 0.5]} /> {/* Right Arm */}
            <Cube color={"orange"} position={[-0.25, -1, 0]} size={[0.5, 1.5, 0.5]} /> {/* Left Leg */}
            <Cube color={"yellow"} position={[0.25, -1, 0]} size={[0.5, 1.5, 0.5]} /> {/* Right Leg */}
        </group>
    );
};

export default PlayerModel;