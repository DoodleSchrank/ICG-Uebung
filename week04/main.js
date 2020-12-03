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

const translationVector = [
	-0.2,0,0
]; 

viewMatrix = [
	0.1767766922712326, -0.0589255653321743, -0.013334667310118675, 0, 
	0, 0.2357022613286972, -0.006667333655059338, 0, 
	-0.1767766922712326, -0.0589255653321743, -0.013334667310118675, 0, 
	0, 0, -0.8801880478858948, 1];


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
	
	objects.push(new Object3D(new River()));
	objects.push(new Object3D(new Island()));

	const matloc = gl.getUniformLocation(program, "translationVector");
	gl.uniform3fv(matloc, translationVector);

	const viewloc = gl.getUniformLocation(program, "viewMatrix");
	gl.uniformMatrix4fv(viewloc, false, viewMatrix);

	setInterval(function(){
		gl.clearColor(1.0,1.0,1.0,1.0);
		var rotMat = [];
		mat4.fromYRotation(rotMat, 0.01);
		mat4.multiply(viewMatrix,viewMatrix,rotMat);
		gl.uniformMatrix4fv(viewloc, false, viewMatrix);
		render();
	},
	6.1
	)
	
};

main();
