import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";

function Icons3D() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const [isTransforming, setIsTransforming] = useState(false);
	const [touchHappened, setTouchHappened] = useState(false);

	function normalizeSize(object: THREE.Object3D, targetSize = 2) {
		const box = new THREE.Box3().setFromObject(object);
		const size = new THREE.Vector3();
		box.getSize(size);
		const maxDim = Math.max(size.x, size.y, size.z);
		if (maxDim > 0) {
			const scale = targetSize / maxDim;
			object.scale.setScalar(scale);
		}
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
			name: "Go",
			instance: null,
		};

        let intersectObject: string | null = "";
        const intersectObjects:  THREE.Object3D<THREE.Object3DEventMap>[] = [];

		const intersectObjectsNames: string[] = [
			"Python",
			"Go",
			"Rust",
			"Java",
			"Node",
			"React",
			"Angular",
			"Astro",
		];

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

		// GLTF Loader
		const loader = new GLTFLoader();


		loader.load(
			"/glb/Icons.glb",
			(glb) => {
				glb.scene.traverse((child) => {
					if (intersectObjectsNames.includes(child.name)) {
						child.visible = false;
                        intersectObjects.push(child);

						if (child.name === currentlyShown.name) {
							currentlyShown.instance = child;
							child.visible = true;

							normalizeSize(child, 6);
							centerPivot(child);

							child.traverse((mesh) => {
								if ((mesh as THREE.Mesh).isMesh) {
									mesh.castShadow = true;
									mesh.receiveShadow = true;
								}
							});
						}
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
            if (touchHappened) return;
            handleInteraction();
        }

        function handleInteraction(){

            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects(intersectObjects);

            if (intersects.length > 0) {
                intersectObject = intersects[0]?.object?.name || null;
            } else {
                intersectObject = "";
            }


            if (intersectObject && intersectObject !== "") {
                if (intersectObjectsNames.includes(intersectObject)){
                    if(!isTransforming){
                        transformIcon(intersectObject);
                    }

                }
            }


        }

        function transformIcon(meshID: string){
			if(isTransforming) return;

			const mesh = scene.getObjectByName(meshID);

			const t1 = gsap.timeline();
			
			
			

		}

        canvas.addEventListener("click", onClick);


        function onMouseMove(event: MouseEvent) {
            pointer.x = (event.clientX / sizes.width) * 2 - 1;
            pointer.y = -(event.clientY / sizes.height) * 2 + 1;
            setTouchHappened(false);
        }
        canvas.addEventListener("mousemove", onMouseMove);

        // Resize Handling
		const onResize = () => {
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};
		window.addEventListener("resize", onResize);

		// Animation Loop
		const animate = () => {
			if (currentlyShown.instance) {
				currentlyShown.instance.rotation.z -= 0.01;
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
