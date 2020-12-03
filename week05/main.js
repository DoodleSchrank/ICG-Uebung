let gl;
let program;
let objects = [];
let posLoc,
	colorLoc;

// TODO: 1.4 + 2.4: Führe globale Variablen ein für Werte, die in verschiedenen Funktionen benötigt werden


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

	// Get locations of shader variables
	posLoc = gl.getAttribLocation(program, "vPosition");
	colorLoc = gl.getAttribLocation(program, "vColor");
	// TODO 1.3 + 2.3: Bestimme Locations der Shadervariablen für Model und View Matrix


	// TODO 2.5: Erstelle mithilfe der Funktionen aus gl-matrix.js eine initiale View Matrix


	// TODO 2.6: Übergebe die initiale View Matrix an den Shader


	// TODO 2.8: Füge einen Event Listener für Tastatureingaben hinzu


	// Create object instances
	let island = new Island();
	objects.push(island);

	// TODO 1.5: Erstelle mehrere Baum-/Wolkeninstanzen und einen Fluss
	// TODO 1.9: Rufe für jedes Objekt die Methode 'SetModelMatrix' auf und 
	// positioniere das Objekt auf diese Weise auf der Insel

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

// TODO 2.7: Erstelle einen Event-Handler, der anhand von WASD-Tastatureingaben
// die View Matrix anpasst
function move(e) 
{
	
}

main();
