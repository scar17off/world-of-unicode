import { useMemo, useEffect, useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AsciiEffect } from "three-stdlib";

export default function AsciiRenderer({
	renderIndex = 1,
	characters = " .:,'-^=*+?!|0#X%WM@",
	bgColor = "black",
	fgColor,
	invert = true,
	color = false,
	resolution = 0.175
}) {
	const { size, gl, scene, camera } = useThree();

	const effect = useMemo(() => {
		const effect = new AsciiEffect(gl, characters, {
			invert,
			color,
			resolution
		});
		effect.domElement.style.position = "absolute";
		effect.domElement.style.top = "0px";
		effect.domElement.style.left = "0px";
		effect.domElement.style.pointerEvents = "none";
		return effect;
	}, [gl, characters, invert, color, resolution]);

	useLayoutEffect(() => {
		if (fgColor) {
			effect.domElement.style.color = fgColor;
		}
		effect.domElement.style.backgroundColor = bgColor;
	}, [effect.domElement.style, fgColor, bgColor]);

	useEffect(() => {
		gl.domElement.style.opacity = "0";
		gl.domElement.parentNode.appendChild(effect.domElement);
		return () => {
			gl.domElement.style.opacity = "1";
			gl.domElement.parentNode.removeChild(effect.domElement);
		};
	}, [effect, gl.domElement.parentNode, gl.domElement.style]);

	useEffect(() => {
		effect.setSize(size.width, size.height);
	}, [effect, size]);

	useFrame((state) => {
		effect.render(scene, camera);
	}, renderIndex);

	return null;
}