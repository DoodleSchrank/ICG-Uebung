//const { mat4 } = require("./common/gl-matrix");

let gl;
let program;
let objects = [];
let posLoc,
	colorLoc;
let viewMatLoc;

modelMatrix = [];

viewMatrix = [];

const translationSpeed = 0.1;
const rotationSpeed = 1;

let timestamp = new Date().getTime();
let start;

let position = [0,0,1];

let mouse;

function main() {

	// Get canvas and setup WebGL context
    const canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl2');

	const body = document.getElementsByTagName("body")[0];

	// Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(1.0,1.0,1.0,1.0);

	gl.enable(gl.DEPTH_TEST);

	// Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// Get locations of shader variables
	posLoc = gl.getAttribLocation(program, "vPosition");
	colorLoc = gl.getAttribLocation(program, "vColor");

	viewMatLoc = gl.getUniformLocation(program, "viewMatrix");
	
	viewMatrix = mat4.create();

	gl.uniformMatrix4fv(viewMatLoc, false, viewMatrix);

	body.onkeydown = move;

	body.onmousemove = turn;

	// Create object instances
	let island = new Island();
	objects.push(island);

	// TODO 1.5: Erstelle mehrere Baum-/Wolkeninstanzen und einen Fluss

	baum = new Baum();
	baum.SetModelMatrix([-2,0,1],[0,0,0],[0.2,0.2,0.2]);
	objects.push(baum);

	baum = new Baum();
	baum.SetModelMatrix([2,0,6],[0,0,0],[0.2,0.3,0.2]);
	objects.push(baum);
	
	wolke = new Wolke();
	wolke.SetModelMatrix([-1,2,0],[0,1,0],[3,1,1]);
	objects.push(wolke);

	wolke = new Wolke();
	wolke.SetModelMatrix([1,2,0],[0,1,0],[1.5,1,0.5]);
	objects.push(wolke);

	render();
};

function update(x) {
	mat4.lookAt(viewMatrix, [position[2]*Math.sin(0.01*x), 1, position[2] * Math.cos(0.01*x)], [0,position[1],0], [0,1,0]);
	gl.uniformMatrix4fv(viewMatLoc, false, viewMatrix);
}

function turn(e) {
	mouse = e;
	update(e.clientX);
}

function render() {

	//start = timestamp;
	timestamp = new Date().getTime();

	//partialSec = (timestamp - start)*10.5;

	//update(timestamp);

	//console.log(partialSec);

	// Only clear once
	//gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Call render function of each scene object
    for(let object of objects) {
		object.Render();
	};

	requestAnimationFrame(render);
}

function move(key) 
{
	if(key.code === 'KeyW') {
		position[2] -= translationSpeed;
		//mat4.translate(viewMatrix,viewMatrix,[0,0,-translationSpeed]);		
	} 
	if(key.code === 'KeyD') {
		position[0] -= translationSpeed;
		//mat4.translate(viewMatrix,viewMatrix,[-translationSpeed,0,0]);
	} 
	if(key.code === 'KeyS') {
		position[2] += translationSpeed;
		//mat4.translate(viewMatrix,viewMatrix,[0,0,translationSpeed]);
	} 
	if(key.code === 'KeyA') {
		position[0] += translationSpeed;
		//mat4.translate(viewMatrix,viewMatrix,[translationSpeed,0,0]);
	} 

	if(key.code === 'ArrowUp') {
		position[1] += translationSpeed;
		//mat4.translate(viewMatrix,viewMatrix,[0,-translationSpeed,0]);
	} 
	if(key.code === 'ArrowDown') {
		position[1] -= translationSpeed;
		//mat4.translate(viewMatrix,viewMatrix,[0,translationSpeed,0]);
	} 

	turn(mouse);
}

main();
