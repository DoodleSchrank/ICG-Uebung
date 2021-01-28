let gl;
let program;
let positions, colors;
let posVBO,	colorVBO;
let textureImage ;
let texture;

function main() {
	// 1. Get canvas and setup WebGL context
  const canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl2');

	textureImage = new Image();
	//textureImage.src = 'data:image/png;base64,' + ImageCollection.cougar ;
	textureImage.src = 'data:image/jpeg;base64,' + ImageCollection.two_of_them ;

	textureImage.addEventListener('load', function()
	{
			// TODO
			// Textur erstellen
			// Bild der Textur zuweisen
			// Texture einbinden und konfigurieren
			// siehe Folien 7 und 10-12
			texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
			gl.generateMipmap(gl.TEXTURE_2D);
			
			//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);		
	} ) ;

	// 2. Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(1.0,1.0,1.0,1.0);

	// 4. Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// TODO:
	// Setze den Uniformwert der Textur im Fragmentshader
	samplerLoc = gl.getUniformLocation(program, "map");
	gl.uniform1i(samplerLoc, texture);

	initTriangle();
	render () ;
};

function render ()
{
	renderTriangle();
	requestAnimationFrame ( render ) ;
}

function initTriangle() {

	// 3. Specify geometry
	positions = [
					-1.0, -1.0, 			// lower left
				  -1.0,  1.0, 			// upper left
				   1.0, -1.0,				// lower right
				   1.0,  1.0,				// upper right
				  -1.0,  1.0, 			// upper left
				   1.0, -1.0				// lower right
				 ];

	texCoords = [
		// TODO
		// Hier sollten die Texturkoordinaten stehen
		0.15, 1.0,
		0.15, 0.0,
		0.85, 1.0,
		0.85, 0.0,
		0.15, 0.0,
		0.85, 1.0
	] ;

	colors = [ 0, 1, 0, 1,
			   0, 0, 1, 1,
			   1, 1, 0, 1,
			   1, 0, 0, 1,
			   0, 0, 1, 1,
			   1, 1, 0, 1];

	initTriangleBuffers();
}

function initTriangleBuffers() {

	// 5.1 Create VBO for positions and activate it
	posVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, posVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	colorVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	// TODO Erstelle VBO fuer Texturkoordinaten analog
	// zu den Positionen und Farben, siehe Folie 13
	texVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

}

function renderTriangle() {

	// 7.1 Link data in VBO to shader variables
	gl.bindBuffer(gl.ARRAY_BUFFER, posVBO);
	const posLoc = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(posLoc);
	gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // 7.2 Link data in VBO to shader variables
    gl.bindBuffer(gl.ARRAY_BUFFER, colorVBO);
	const colorLoc = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(colorLoc);
	gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

	// TODO:
	// Verlinke das Shaderattribut fuer die Texturkoordinaten
	// analog zu den Farben / Positionn, siehe Folien 17/18
	gl.bindBuffer(gl.ARRAY_BUFFER, texVBO);
	const texCoordLoc = gl.getAttribLocation(program, "vTexCoord");
	gl.enableVertexAttribArray(texCoordLoc);
	gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
	
	// 8. Render
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

main();
