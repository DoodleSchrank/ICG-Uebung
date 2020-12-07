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

function render() {
	
	// Only clear once
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Call render function of each scene object
    for(let object of objects) {
		object.Render();
	};

	requestAnimationFrame(render);
}

function move(key) 
{
	if(key.code === 'KeyS') {
		mat4.translate(viewMatrix,viewMatrix,[0,0,-translationSpeed]);		
	} 
	if(key.code === 'KeyD') {
		mat4.translate(viewMatrix,viewMatrix,[-translationSpeed,0,0]);
	} 
	if(key.code === 'KeyW') {
		mat4.translate(viewMatrix,viewMatrix,[0,0,translationSpeed]);
	} 
	if(key.code === 'KeyA') {
		mat4.translate(viewMatrix,viewMatrix,[translationSpeed,0,0]);
	} 

	if(key.code === 'ArrowUp') {
		mat4.translate(viewMatrix,viewMatrix,[0,-translationSpeed,0]);
	} 
	if(key.code === 'ArrowDown') {
		mat4.translate(viewMatrix,viewMatrix,[0,translationSpeed,0]);
	} 

	gl.uniformMatrix4fv(viewMatLoc, false, viewMatrix);
}

main();
