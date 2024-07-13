import "./Game.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import AsciiRenderer from "./AsciiRenderer";
import Cube from "./Cube";
import LocalPlayer from "./Core/LocalPlayer";
import { socket } from "./Network";
import PlayerModel from "./Player/PlayerModel";

export default function Game() {
    const [useAscii, setUseAscii] = useState(false);
    const [terrain, setTerrain] = useState({});
    const [players, setPlayers] = useState({});

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Numpad1") {
                setUseAscii((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        socket.on("terrain", (data) => {
            setTerrain(data);
        });

        socket.on("playerJoin", (data) => {
            setPlayers((prevPlayers) => ({
                ...prevPlayers,
                [data.id]: data.position,
            }));
        });

        socket.on("playerMove", (data) => {
            setPlayers((prevPlayers) => ({
                ...prevPlayers,
                [data.id]: data.position,
            }));
        });

        socket.on("playerLeave", (id) => {
            setPlayers((prevPlayers) => {
                const newPlayers = { ...prevPlayers };
                delete newPlayers[id];
                return newPlayers;
            });
        });

        return () => {
            socket.off("terrain");
            socket.off("playerJoin");
            socket.off("playerMove");
            socket.off("playerLeave");
        };
    }, []);

    return (
        <Canvas>
            <Suspense fallback={null}>
                <color attach="background" args={["black"]} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.45}
                    penumbra={1}
                    intensity={1}
                />
                <pointLight position={[-10, -10, -10]} />
                <ambientLight intensity={0.4} />
                <LocalPlayer />
                {Object.entries(players).map(([id, position]) => (
                    <PlayerModel key={id} id={id} initialPosition={position} />
                ))}
                {Object.entries(terrain).map(([key, chunk]) => (
                    chunk.map((cube, index) => (
                        <Cube key={`${key}-${index}`} position={cube.position} />
                    ))
                ))}
            </Suspense>
            {useAscii && <AsciiRenderer fgColor="white" bgColor="black" />}
        </Canvas>
    );
}