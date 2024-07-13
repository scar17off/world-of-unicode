import "./Game.css";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three-stdlib";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useNavigate } from "react-router-dom";
import { Canvas, useThree } from "@react-three/fiber";
import AsciiRenderer from "./AsciiRenderer";

const MainMenuScene = () => {
    const mountRef = useRef(null);
    const navigate = useNavigate();
    const [useAscii, setUseAscii] = useState(true);

    const SceneContent = () => {
        const { gl, scene, camera } = useThree();
        const rendererRef = useRef(null);

        useEffect(() => {
            if (!mountRef.current) return;

            const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = gl;
            renderer.setSize(window.innerWidth, window.innerHeight);
            mountRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            const createButton = (text, x, y, z) => {
                const geometry = new THREE.PlaneGeometry(4, 2);
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
                const button = new THREE.Mesh(geometry, material);
                button.position.set(x, y, z);
                button.rotation.x = 0.34;

                const loader = new FontLoader();
                loader.load('./fonts/helvetiker_regular.typeface.json', (font) => {
                    const textGeometry = new TextGeometry(text, {
                        font: font,
                        size: 0.4,
                        depth: 0.05,
                    });
                    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                    textMesh.position.set(-1, -0.2, 0.1); // Adjusted position for larger text
                    button.add(textMesh);
                });

                return button;
            };

            const playButton = createButton("Play", -4, 0, 0);
            scene.add(playButton);

            const editorButton = createButton("Editor", 4, 0, 0);
            scene.add(editorButton);

            const loader = new FontLoader();
            loader.load('./fonts/helvetiker_regular.typeface.json', (font) => {
                const textGeometry = new TextGeometry("World of Unicode", {
                    font: font,
                    size: 0.5,
                    depth: 0.1,
                });
                const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textGeometry.computeBoundingBox();
                const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
                textMesh.position.set(-textWidth / 2, 3, 0);
                textMesh.rotation.x = Math.PI / 7.5;
                scene.add(textMesh);
            });

            camera.position.z = 5;

            const onDocumentMouseDown = (event) => {
                event.preventDefault();
                const mouse = new THREE.Vector2(
                    (event.clientX / window.innerWidth) * 2 - 1,
                    -(event.clientY / window.innerHeight) * 2 + 1
                );
                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects([playButton, editorButton]);

                if (intersects.length > 0) {
                    if (intersects[0].object === playButton) {
                        navigate("/game");
                    } else if (intersects[0].object === editorButton) {
                        navigate("/editor");
                    }
                }
            };

            window.addEventListener("mousedown", onDocumentMouseDown);

            const animate = () => {
                requestAnimationFrame(animate);
                
                renderer.render(scene, camera);
            };

            animate();

            return () => {
                window.removeEventListener("mousedown", onDocumentMouseDown);
                if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                    mountRef.current.removeChild(renderer.domElement);
                }
            };
        }, [navigate, gl, scene, camera]);

        return null;
    };

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

    return (
        <div ref={mountRef} style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <Canvas>
                <SceneContent />
                {useAscii && <AsciiRenderer fgColor="white" bgColor="black" invert={false} />}
            </Canvas>
        </div>
    );
};

export default MainMenuScene;