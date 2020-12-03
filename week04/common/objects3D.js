
class Object3D {
	// Get locations of shader variables
	constructor(mesh) {
        this.positions = mesh.positions;
        this.indices = mesh.indices;
        this.colors = mesh.colors;

		this.posLoc = gl.getAttribLocation(program, "vPosition");
        this.colorLoc = gl.getAttribLocation(program, "vColor");
        
        this.InitBuffers();
	}

	InitBuffers() {
		// Create VBO for positions and activate it
		this.posVBO = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.posVBO);

		// Fill VBO with positions
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

		// Create VBO for this.colors and activate it
		this.colorVBO = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorVBO);

		// Fill VBO with this.colors
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

		// Create VBO for this.indices and activate it
		this.indexVBO = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexVBO);

		// Fill VBO with this.indices
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
    }
    
	render() {
		// Link data in VBO to shader variables
		gl.bindBuffer(gl.ARRAY_BUFFER, this.posVBO);
		gl.enableVertexAttribArray(this.posLoc);
		gl.vertexAttribPointer(this.posLoc, 3, gl.FLOAT, false, 0, 0);

		// Link data in VBO to shader variables
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorVBO);
		gl.enableVertexAttribArray(this.colorLoc);
		gl.vertexAttribPointer(this.colorLoc, 4, gl.FLOAT, false, 0, 0);

		// Render
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexVBO);
		gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
	}
}


