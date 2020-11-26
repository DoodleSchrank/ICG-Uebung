

class Object3D {
	let positions,
	indices,
	colors,
	posVBO,
	colorVBO,
	indexVBO;

	// Get locations of shader variables
	posLoc = gl.getAttribLocation(program, "vPosition");
	colorLoc = gl.getAttribLocation(program, "vColor");

	constructor() {
		
	}

	function InitBuffers() {
		// Create VBO for positions and activate it
		posVBO = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, posVBO);

		// Fill VBO with positions
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

		// Create VBO for colors and activate it
		colorVBO1 = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, colorVBO);

		// Fill VBO with colors
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		// Create VBO for indices and activate it
		indexVBO1 = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexVBO);

		// Fill VBO with indices
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	}
	function render() {
		// Link data in VBO to shader variables
		gl.bindBuffer(gl.ARRAY_BUFFER, posVBO);
		gl.enableVertexAttribArray(posLoc);
		gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

		// Link data in VBO to shader variables
		gl.bindBuffer(gl.ARRAY_BUFFER, colorVBO);
		gl.enableVertexAttribArray(colorLoc);
		gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

		// Render
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexVBO);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
	}
}
