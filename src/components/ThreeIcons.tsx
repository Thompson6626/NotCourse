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

	function createParticleBurst(position: THREE.Vector3, scene: THREE.Scene) {
		const particleCount = 500;
		const radius = 1.3;

		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);

		for (let i = 0; i < particleCount; i++) {
			const phi = Math.random() * 2 * Math.PI;
			const costheta = Math.random() * 2 - 1;
			const u = Math.random();

			const theta = Math.acos(costheta);
			const r = radius * Math.cbrt(u);

			const x = r * Math.sin(theta) * Math.cos(phi);
			const y = r * Math.sin(theta) * Math.sin(phi);
			const z = r * Math.cos(theta);

			positions.set([x, y, z], i * 3);
		}

		geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));


		const isLightTheme = document.body.classList.contains("light");
		const particleColor = isLightTheme ? 0x000000 : 0x00ffff;

		const material = new THREE.PointsMaterial({
			color: particleColor,
			size: 0.08,
			transparent: true,
			opacity: 0.9,
			depthWrite: false,
		});

		const points = new THREE.Points(geometry, material);
		points.position.copy(position);
		scene.add(points);

		// Animate particle fade and scale outward
		gsap.to(points.scale, {
			x: 2,
			y: 2,
			z: 2,
			duration: 0.6,
			ease: "power2.out",
		});

		gsap.to(material, {
			opacity: 0,
			duration: 0.6,
			ease: "power2.out",
			onComplete: () => {
				scene.remove(points);
				geometry.dispose();
				material.dispose();
			},
		});
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


		const light = new THREE.AmbientLight(0x404040, 4);
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
			"Poop",
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

						if (currentlyShown.instance) {
							const worldPosition = new THREE.Vector3();
							currentlyShown.instance.getWorldPosition(worldPosition);
							createParticleBurst(worldPosition, scene);
						}

						function getNextLogo(current: string): string {
							const index = intersectObjectsNames.indexOf(current);
							if (index === -1) return intersectObjectsNames[0];
							const nextIndex = (index + 1) % intersectObjectsNames.length;
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

			}, canvasRef);
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

		// So the icons transfom on their own
		const intervalId: ReturnType<typeof setInterval> | null = setInterval(() => {
			if (!isTransforming.current) {
				transformIcon();
			}
		}, 8000);

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
			canvas.removeEventListener("click", onClick);
			window.removeEventListener("resize", onResize);
			renderer.dispose();
			if (intervalId) clearInterval(intervalId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: "100%",
				height: "70vh",
				display: "block",
				backgroundColor: "transparent",
			}}
		/>
	);
}

export default Icons3D;
