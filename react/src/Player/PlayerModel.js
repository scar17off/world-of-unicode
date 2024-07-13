import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Cube from "../Cube";
import { socket } from "../Network";

const PlayerModel = ({ id, initialPosition }) => {
    const ref = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [animation, setAnimation] = useState("idle");
    const positionRef = useRef(position);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    useEffect(() => {
        const handlePlayerMove = (data) => {
            if (data.id === id) {
                setPosition(data.position);
                setAnimation(data.animation);
            }
        };

        socket.on("playerMove", handlePlayerMove);

        return () => {
            socket.off("playerMove", handlePlayerMove);
        };
    }, [id]);

    const getAnimation = () => {
        switch (animation) {
            case "walk":
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
            ref.current.position.set(positionRef.current[0], positionRef.current[1], positionRef.current[2]);
            if (typeof getAnimation === "function") {
                getAnimation()(delta);
            }
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