
// object are in the scene

function init() {
	const scene = new THREE.Scene();
	const gui = new dat.GUI();

	//const box1 = createBox(1, 1, 1);
	//box1.position.y = box1.geometry.parameters.height / 2;
	const boxGroup = createBoxGrid(13, 1.5);

	const plane1 = createPlane(20);
	plane1.name = "plane-1";
	plane1.rotation.x = Math.PI / 2;

	const sphere = createSphere(0.05);

	// const light = createPointLight(1);
	const light = createSpotLight(1);
	light.position.y = 3;
	light.intensity = 2;
	
	const helper = new THREE.CameraHelper(light.shadow.camera);
	
	light.position.x = 0;
	light.position.z = 0;

	gui.add(light, "intensity", 0, 10);
	gui.add(light.position, "y", 0, 6);
	gui.add(light.position, "x", -9, 9);
	gui.add(light.position, "z", -9, 9);
	gui.add(light, "penumbra", 0, 1)


	scene.add(plane1);
	//scene.add(box1);
	scene.add(boxGroup);
	scene.add(light);
	light.add(sphere);
	scene.add(helper);
	
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	
	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;

	camera.lookAt(new THREE.Vector3(0,0,0));

	const renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('#fef');

	document.getElementById("webgl").appendChild(renderer.domElement);
	
	const controls = new THREE.OrbitControls(camera, renderer.domElement)
	update(renderer, scene, camera, controls);

}

// function createDirectedLight()

function createSpotLight(intensity){
	const light = new THREE.SpotLight(0xffffff, intensity);
	light.castShadow = true;
	light.shadow.bias = 0.001;

	light.shadow.mapSize.width = 1920;
	light.shadow.mapSize.height = 1080;

	return light;
}

function createSphere (radius){
	const geometry = new THREE.SphereGeometry(radius, 24, 24);
	const material = new THREE.MeshBasicMaterial({
		color : "#fff"
	});
	const mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

function createBox(w, h, d) {

	const geometry = new THREE.BoxGeometry(w, h, d);
	const material = new THREE.MeshPhongMaterial({
		color: "rgb(120, 120, 120)"
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = true;
	return mesh;
}

function createBoxGrid(amount, separationMultiplier) {
	const group = new THREE.Group();

	for (let i = 0;  i < amount; i++){
		const box = createBox(1,1,1);
		for (let j = 0; j < amount; j++){
			const hBox = createBox(1,1,1)
			hBox.position.x = i * separationMultiplier;
			hBox.position.y = hBox.geometry.parameters.height / 2;
			hBox.position.z = j * separationMultiplier;
			group.add(hBox);
		}
	}

	group.position.x = -((amount - 1) * separationMultiplier) / 2;
	group.position.z = -((amount - 1) * separationMultiplier) / 2;

	return group;
}

function createPlane(size) {
	const geometry = new THREE.PlaneGeometry(size, size);
	const material = new THREE.MeshPhongMaterial({
		color: "rgb(120, 120, 120)",
		side: THREE.DoubleSide
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.receiveShadow = true;
	return mesh;
}

function createPointLight(intensity) {
	const light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;
	return light;
}

function update(renderer, scene, camera, controls) {
	renderer.render(scene, camera);

	controls.update();

	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}

init();