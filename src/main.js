const game = new Game(27);
document.onkeydown = getPressed

function init() {
	const scene = new THREE.Scene();
	const gui = new dat.GUI();
	const clock = new THREE.Clock();

	//const box1 = createBox(1, 1, 1);
	//box1.position.y = box1.geometry.parameters.height / 2;

	const plane1 = createPlane(27);
	plane1.name = "plane-1";
	plane1.rotation.x = Math.PI / 2;

	const player = getPlayer();
	
	const boxGrid = getGameField();
	boxGrid.name = "gameField";

	// const light = createPointLight(1);
	// const light = createSpotLight(1);
	const light = createDirectionalLight(2);
	const ambientLight = createAmbientLight(1.5);

	light.position.y = 9;
	light.intensity = 2;
	
	const helper = new THREE.CameraHelper(light.shadow.camera);
	
	light.position.x = 13;
	light.position.z = 13;

	gui.add(light, "intensity", 0, 3);
	gui.add(light.position, "y", 0, 9);
	gui.add(light.position, "x", -13, 13);
	gui.add(light.position, "z", -13, 13);
	gui.add(ambientLight, "intensity", 0, 1)
	// gui.add(light, "penumbra", 0, 1)

	scene.add(plane1);
	scene.add(boxGrid);
	scene.add(light);
	scene.add(helper);
	scene.add(ambientLight);
	scene.add(player);
	
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

	camera.position.x = 0;
	camera.position.y = 40;
	camera.position.z = 0;

	camera.lookAt(new THREE.Vector3(0,0,0));

	const renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('#fef');

	document.getElementById("webgl").appendChild(renderer.domElement);
	
	const controls = new THREE.OrbitControls(camera, renderer.domElement)
	update(renderer, scene, camera, controls, clock);

}

function createAmbientLight(intensity){
	const light = new THREE.AmbientLight("rgb(140, 45, 120)", intensity);

	return light;
}

function createSpotLight(intensity){
	const light = new THREE.SpotLight(0xffffff, intensity);
	light.castShadow = true;
	light.shadow.bias = 0.001;
 
	light.shadow.mapSize.width = 1920;
	light.shadow.mapSize.height = 1080;

	return light;
}

function createDirectionalLight(intensity){
	const light = new THREE.DirectionalLight(0xffffff, intensity);
	light.castShadow = true;
	light.shadow.bias = 0.001;

	light.shadow.mapSize.width = 1920;
	light.shadow.mapSize.height = 1080;

	light.shadow.camera.left = -15;
	light.shadow.camera.right = 15;
	light.shadow.camera.top = 15;
	light.shadow.camera.bottom = -15;

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

function update(renderer, scene, camera, controls, clock) {
	renderer.render(scene, camera);

	controls.update();

	const timeElapsed = clock.getElapsedTime();
	const gameField = scene.getObjectByName("gameField");
	gameField.children.forEach(function(child, idex) {
		child.scale.y = Math.sin(timeElapsed + idex) + 0.5;
		child.position.y = child.scale.y / 2;
	});

	const player = scene.getElementByName("player");
	player.position.y = 0.5;
	player.position.x = game.player.position[0] - ((game.fieldSize - 1)) / 2;
	player.position.z = game.player.position[1] - ((game.fieldSize - 1)) / 2;

	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, clock);
	});
}

function getPressed(event) {
	if(evnt.keyCode == "40") {
		const newPosition = game.player.goDown();

	}
}

function getGameField(){
	const gamefield = new THREE.Group();
	const separationMultiplier = 1;


	for (let i = 0; i < game.fieldSize; i++){
		for (let j = 0; j < game.fieldSize; j++){
			if (game.gameFieldModel[i][j] == 1){
				const box = createBox(1, 1.5, 1)
				box.position.x = i * separationMultiplier;
				box.position.y = box.geometry.parameters.height / 2;
				box.position.z = j * separationMultiplier;
				gamefield.add(box);
			}
		}
	}

	gamefield.position.x = -((game.fieldSize - 1) * separationMultiplier) / 2;
	gamefield.position.z = -((game.fieldSize - 1) * separationMultiplier) / 2;

	return gamefield;
}

function getPlayer() {
	const pointLight = createPointLight(1);
	const sphere = createSphere(0.05);

	pointLight.position.y = 0.5;
	pointLight.position.x = game.player.position[0] - ((game.fieldSize - 1)) / 2;
	pointLight.position.z = game.player.position[1] - ((game.fieldSize - 1)) / 2;

	pointLight.add(sphere);

	return pointLight;
}

init();