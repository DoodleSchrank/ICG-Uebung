let gl;
let program;

let objects = [];

let posLoc;


// DONE: Deklariere benötigte Locations von Shadervariablen als globale Variablen 
let normalLoc,
	lightPositionLoc,
	IaLoc,
	IdLoc,
	IsLoc,
	kaLoc,
	kdLoc,
	ksLoc,
	specularExponentLoc;

let modelMatrixLoc;

let viewMatrixLoc,
	viewMatrix;


let projectionMatrixLoc;

let eye,
	target,
	up;

let keyPressed = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false
};

let n,
	r,
	l,
	t,
	b,	
	f;

const speed = 0.005;


function main() {

	// Get canvas and setup WebGL context
    const canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl2');

	// Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(0.75,0.8,1.0,1.0);

	gl.enable(gl.DEPTH_TEST);

	// Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// Get locations of shader variables
	posLoc = gl.getAttribLocation(program, "vPosition");
	modelMatrixLoc = gl.getUniformLocation(program, "modelMatrix");
	viewMatrixLoc = gl.getUniformLocation(program, "viewMatrix");

	// DONE: Fülle globale Variablen mit Speicherlocations für Materialkoeffizienten und Lichtintensitäten
	normalLoc = gl.getAttribLocation(program, "vNormal");
	lightPositionLoc = gl.getUniformLocation(program, "lightPos");
	IaLoc = gl.getUniformLocation(program, "Ia");
	IdLoc = gl.getUniformLocation(program, "Id");
	IsLoc = gl.getUniformLocation(program, "Is");
	kaLoc = gl.getUniformLocation(program, "ka");
	kdLoc = gl.getUniformLocation(program, "kd");
	ksLoc = gl.getUniformLocation(program, "ks");
	specularExponentLoc = gl.getUniformLocation(program, "specExp");

	projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

	eye = vec3.fromValues(0.0, 0.3, 4.0);
	target = vec3.fromValues(0.0, 0.3, 0.0);
	up = vec3.fromValues(0.0, 1.0, 0.0);

	viewMatrix = mat4.create();
	mat4.lookAt(viewMatrix, eye, target, up);

	gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);

	// DONE: Setze Position und Intensitäten der Lichtquelle als Uniform-Variablen
	gl.uniform4fv(lightPositionLoc, [2.0, 3.0, 0.0, 1.0]);
	gl.uniform4fv(IaLoc, [0.3, 0.3, 0.3, 1.0]);
	gl.uniform4fv(IdLoc, [0.8, 0.8, 0.8, 1.0]);
	gl.uniform4fv(IsLoc, [0.7, 0.7, 0.7, 1.0]);

	let projMat = [];
	//mat4.ortho(projMat, -2, 2, -1, 1, 0, 5);
	mat4.perspective(projMat, 1.0472, 2, 0.01, 5);

	n = 10;
	r = 2;
	l = -2;
	t = 1;
	b = -1;	
	f = 900;

	/*projMat = [(2*n)/(r-l), 0, 0, 0, 
				0, (2*n)/(t-b), 0, 0,
				(r+l)/(r-l), (t+b)/(t-b), -(f+n)/(f-n), -1,
				0, 0, -2*f*n/(f-n),0];*/

	gl.uniformMatrix4fv(projectionMatrixLoc, false, projMat);
	//updateProjection(); 

	//document.getElementById("nSlider").oninput = function() {n = this.value; updateProjection();};
	/*document.getElementById("fSlider").oninput = function() {f = this.value; updateProjection();};
	document.getElementById("tSlider").oninput = function() {t = this.value; updateProjection();};
	document.getElementById("bSlider").oninput = function() {b = this.value; updateProjection();};
	document.getElementById("lSlider").oninput = function() {l = this.value; updateProjection();};
	document.getElementById("rSlider").oninput = function() {r = this.value; updateProjection();};*/

	document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
	canvas.addEventListener("mousemove", changeView);

	canvas.onmousedown = function() {
        canvas.requestPointerLock();
	}

	// Create object instances
	let island = new Island();
	objects.push(island);

	let tree1 = new Tree();
	tree1.SetModelMatrix([1.3, 0, 0.6], [0, 45, 0], [0.3, 0.3, 0.3]);
	objects.push(tree1);

	let tree2 = new Tree();
	tree2.SetModelMatrix([0.9, 0, 0.3], [0, 33, 0], [0.45, 0.45, 0.45]);
	objects.push(tree2);

	let tree3 = new Tree();
	tree3.SetModelMatrix([0.45, 0, 0.75], [0, 0, 0], [0.4, 0.4, 0.4]);
	objects.push(tree3);

	let tree4 = new Tree();
	tree4.SetModelMatrix([-1.1, 0, 0.5], [0, 222, 0], [0.42, 0.42, 0.42]);
	objects.push(tree4);

	let tree5 = new Tree();
	tree5.SetModelMatrix([-0.65, 0, 0.7], [0, 79, 0], [0.32, 0.32, 0.32]);
	objects.push(tree5);

	let cloud1 = new Cloud();
	cloud1.SetModelMatrix([-0.4, 1, -0.9], [0, 0, 0], [0.32, 0.32, 0.32]);
	objects.push(cloud1);

	let cloud2 = new Cloud();
	cloud2.SetModelMatrix([0, 1.4, -1.6], [0, -90, 0], [0.2, 0.2, 0.2]);
	objects.push(cloud2);

	let cloud3 = new Cloud();
	cloud3.SetModelMatrix([0.7, 0.9, -0.8], [0, 100, 0], [0.25, 0.25, 0.25]);
	objects.push(cloud3);

	let river = new River();
	river.SetModelMatrix([0, 0.04, 1.8], [0, 185, 0], [0.11, 0.11, 0.11]);
	objects.push(river);

	gameLoop();
};

function updateProjection()
{
	projMat = [(2*n)/(r-l), 0, (r+l)/(r-l), 0, 
		0, (2*n)/(t-b), (t+b)/(t-b), 0,
		0, 0, -(f+n)/(f-n), -2*f*n/(f-n),
		0, 0, -1, 0];
	//mat4.perspective(projMat, 1.0472, 2, 0.01, 5)
	gl.uniformMatrix4fv(projectionMatrixLoc, false, projMat);
	console.log(n);
}

function update() 
{
	let look = vec3.create();
	vec3.sub(look, target, eye);
	vec3.scale(look, look, speed);

	if(keyPressed.KeyW) {
		eye[0] += look[0];
		eye[2] += look[2];
		target[0] += look[0];
		target[2] += look[2];
	}
	if(keyPressed.KeyS) {
		eye[0] -= look[0];
		eye[2] -= look[2];
		target[0] -= look[0];
		target[2] -= look[2];
	}
	if(keyPressed.KeyA) {
		eye[0] += look[2];
		eye[2] -= look[0];
		target[0] += look[2];
		target[2] -= look[0];
	}
	if(keyPressed.KeyD) {
		eye[0] -= look[2];
		eye[2] += look[0];
		target[0] -= look[2];
		target[2] += look[0];
	}
	mat4.lookAt(viewMatrix, eye, target, up);
	gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);
}

function render() {
	
	// Only clear once
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Call render function of each scene object
    for(let object of objects) {
		object.Render();
	};
}

function gameLoop() 
{
	update();
	render();
	requestAnimationFrame(gameLoop);
}

function keydown(e) 
{
	keyPressed[e.code] = true;
}

function keyup(e) 
{
	keyPressed[e.code] = false;
}

function changeView(e) 
{
	vec3.rotateY(target, target, eye, -e.movementX * speed);
	mat4.lookAt(viewMatrix, eye, target, up);
	gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);
}

main();
