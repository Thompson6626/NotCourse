import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";

function Icons3D() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const isTransforming = useRef(false);
	const touchHappened = useRef(false);
	const rotationSpeed  = useRef(0.01);

	// Modify to reescale based on the canvas dimensions
	function normalizeSize(object: THREE.Object3D, targetSize = 9) {
		object.scale.setScalar(targetSize);
	}

	function centerPivot(object: THREE.Object3D) {
		const box = new THREE.Box3().setFromObject(object);
		const center = new THREE.Vector3();
		box.getCenter(center);
		object.position.sub(center);
	}

	useEffect(() => {
		if (!canvasRef.current) return;

        const canvas = canvasRef.current;

		const sizes = {
			width: canvas.clientWidth,
			height: canvas.clientHeight,
		};


		// Scene & Camera
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			sizes.width / sizes.height,
			0.1,
			1000,
		);
		camera.position.z = 5;

		// Renderer
		const renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true,
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.7;


        // ICON POSITIONS
        // camera.position.set(0, 0, 6); // Z distance to give perspective
        // camera.lookAt(0, 0, 0);

		const light = new THREE.AmbientLight(0x404040, 14);
		scene.add(light);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
		// x , y , z 
		directionalLight.position.set(5, 10, 12);
		directionalLight.target.position.set(0,0,0);
		directionalLight.castShadow = true;
		scene.add(directionalLight);
		scene.add(directionalLight.target);


		// Intersection objects
		const currentlyShown: {
			name: string;
			instance: THREE.Object3D<THREE.Object3DEventMap> | null;
		} = {
			name: "Spring",
			instance: null,
		};

		const intersectObjectsNames: string[] = [
			"Spring",
			"Laravel",
			"Vue",
			"Deno",
			"Svelte",
			"React",
			"Node",
			"Python",
			"Java",
			"Go",
		];

		// GLTF Loader
		const loader = new GLTFLoader();


		loader.load(
			"/glb/Icons.glb",
			(glb) => {
				glb.scene.traverse((child) => {
					if (intersectObjectsNames.includes(child.name)) {
						child.visible = false;

						if (child.name === currentlyShown.name) {
							currentlyShown.instance = child;
							child.visible = true;

							normalizeSize(child);
							centerPivot(child);

						}
						child.traverse((mesh) => {
							if ((mesh as THREE.Mesh).isMesh) {
								mesh.castShadow = true;
								mesh.receiveShadow = true;
							}
						});
					}
				});

				scene.add(glb.scene);
			},
			undefined,
			(error) => {
				console.error("GLTF load error:", error);
			},
		);

        function onClick() {
            if (touchHappened.current) return;
			transformIcon();
        }

		const transformIcon = () => {
			if (isTransforming.current) return;

			isTransforming.current = true;


			const ctx = gsap.context(() => {
				const t1 = gsap.timeline({
					onComplete: () => {
						isTransforming.current = false; // Re-enable transform when done
					},
				});

				t1.to(rotationSpeed, {
					current: 0.3,
					duration: 2.3,
					ease: "sine.in", // very slow to very fast
				})
					.call(() => {

						function getNextLogo(current: string): string {
							const index = intersectObjectsNames.indexOf(current);
							console.log("In here");
							if (index === -1) return intersectObjectsNames[0];
							const nextIndex = (index + 1) % intersectObjectsNames.length;
							console.log(nextIndex);
							console.log(intersectObjectsNames.length);
							console.log(".....................................");
							return intersectObjectsNames[nextIndex];
						}

						const chosen = getNextLogo(currentlyShown.name);


						currentlyShown.instance.visible = false;

						const newMesh = scene.getObjectByName(chosen)!;
						currentlyShown.instance = newMesh;
						currentlyShown.name = chosen;
						normalizeSize(newMesh);
						centerPivot(newMesh);

						newMesh.visible = true;
					})
					.to(rotationSpeed, {
						current: 0.01,
						duration: 2,
						ease: "power2.out",
					});

				// Animate mesh scale + rotation.y

			}, canvasRef); // So GSAP doesn't leak out of your scene
		}

		// Resize Handling
		const onResize = () => {
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};

		canvas.addEventListener("click", onClick);
		window.addEventListener("resize", onResize);

		// Animation Loop
		const animate = () => {
			if (currentlyShown.instance) {
				currentlyShown.instance.rotation.z -= rotationSpeed.current;
			}
			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		};
		animate();

		return () => {
			window.removeEventListener("resize", onResize);
			renderer.dispose();
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: "100%",
				height: "100vh",
				display: "block",
				backgroundColor: "transparent",
			}}
		/>
	);
}

export default Icons3D;
