import React, { useRef, useEffect } from "react";

const Cube = ({ position, color, size = [1, 1, 1] }) => {
	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			ref.current.position.set(position[0], position[1], position[2]);
		}
	}, [position]);

	return (
		<mesh ref={ref} position={position}>
			<boxGeometry args={size} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
};

export default Cube;