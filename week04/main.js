let gl;
let program;

let objects = [];

function render() {
	// clear Buffers
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//render
	for(let obj of objects) {
		obj.render();
	}
}

function main() {

	
	// Get canvas and setup WebGL context
    const canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl2');

	// Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(1.0,1.0,1.0,1.0);

	gl.enable(gl.DEPTH_TEST);

	// Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
	
	objects.push(new Object3D(River.positions, River.indices, River.colors));
	objects.push(new Object3D(Island.positions, Island.indices, Island.colors));

	render();
};

main();
