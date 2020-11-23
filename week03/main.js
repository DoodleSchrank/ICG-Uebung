let gl;
let program;
let positions,
	positionsBaum,
	indicesBaum,
	positionsWolke,
	indicesWolke,
	colors;
let posVBO,
	posBaumVBO,
	posWolkeVBO,
	colorVBO,
	indexVBO,
	indexBaumVBO,
	indexWolkeVBO;

function main() {

	// Get canvas and setup WebGL context
    const canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl2');

	// Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(1.0,1.0,1.0,1.0);

	// 5. Add depth test
	gl.enable(gl.DEPTH_TEST);

	// Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	initTriangle();
};

function initTriangle() {

	// Specify geometry
	// 1. Add z coordinate for each vertex
	positions = [
		-0.344503,-0.106899,-2.313329,
		0.254658,0.065420,-2.430170,
		0.506020,-0.293147,-2.207084,
		1.415955,0.064912,-1.957500,
		1.489208,-0.318759,-1.320762,
		1.685851,0.084184,-1.268915,
		2.014675,-0.126122,-0.782958,
		0.957233,-1.089151,-0.905606,
		0.454708,-1.256676,-0.897711,
		0.810208,-0.709404,-1.141590,
		0.739686,-1.249709,-0.541415,
		0.231851,-1.904112,-0.621845,
		0.052641,-1.633897,-0.758536,
		-0.020753,-0.743329,-1.377161,
		1.364762,-0.324582,0.647285,
		2.074500,0.090083,0.068582,
		1.608835,0.037777,0.559365,
		1.955554,-0.191974,0.132568,
		1.393132,0.037777,1.383312,
		1.210661,-0.322174,1.134609,
		0.514977,-0.286422,1.576757,
		0.507135,-1.581211,0.348922,
		0.342563,-2.052501,-0.027325,
		0.620568,-1.491335,-0.146730,
		0.745909,-0.723539,0.485115,
		0.089439,-1.345612,0.360167,
		1.089500,-0.770651,-0.314462,
		-0.123718,-0.298339,1.611730,
		-0.930959,0.037777,1.550149,
		-0.866234,-0.291222,1.300128,
		-0.414258,0.037777,1.808618,
		-1.444312,-0.282136,0.794076,
		-1.591571,0.097928,0.827036,
		-1.839477,-0.177971,0.145553,
		-0.936850,-0.751093,-0.176985,
		-0.611777,-1.317411,-0.262516,
		-0.326162,-1.310280,0.225784,
		0.289486,-0.743127,0.679448,
		0.020776,-1.770522,0.330532,
		-1.675519,-0.336500,-0.606829,
		-1.607249,0.010755,-1.680275,
		-0.625318,-0.725192,-1.039731,
		-2.011082,0.043485,-0.744422,
		-1.247727,0.059337,-1.332687,
		-0.934732,-0.314137,-1.943344,
		-0.184171,-0.491687,-2.096484,
		-0.707720,0.065178,-2.205832,
		-0.350659,-1.373304,-0.758204,
		-0.299529,-2.155551,-0.308846,
		-0.086080,-2.478361,-0.004677,
		0.091215,-2.267556,0.130842,
		-0.260030,-2.240649,0.060849,
		-0.470828,-1.954876,0.024811,
		-0.278168,0.037777,-0.209083,
		-0.914878,0.210568,-1.267986,
		-0.862298,0.231412,-0.781910,
		-0.302799,0.520691,-1.301783,
		-1.068480,0.101026,-0.360536,
		-1.736910,0.103204,0.106553,
		0.236277,0.037777,0.701510,
		0.656348,0.037777,-0.098120,
		0.501631,0.037777,1.688231,
		1.034499,0.275328,-1.269756,
		0.471459,0.267036,-1.698558,
		0.637660,0.376390,-1.207861,
		0.812177,0.491673,-0.567514,
		1.244986,0.398908,-0.324291,
		1.002755,0.639249,-0.717163,
		1.381545,0.288786,-0.765328,
		1.348978,0.284964,-1.076072,
		-0.505260,0.213488,-1.704558,
		-0.221831,0.306144,-1.838428,
		-0.274246,0.065420,-2.359878,
		2.054775,0.091828,-0.677912,
		-0.148262,0.773865,-0.947432,
		0.101020,0.922236,-0.839739,
		0.312442,0.779166,-1.109731,
		-0.262315,0.721321,-1.533752,
		-0.404757,0.197895,-0.782219,
		0.568488,0.537125,-0.913448,
		0.115069,0.760356,-1.450921,
		-0.061115,0.654189,-0.643377,
		0.205810,0.801703,-0.757537,
		0.344937,0.262088,-0.492076,
		0.077232,0.934717,-1.202342,
		-0.102879,0.422805,-0.489015,
		-0.269697,0.566033,-0.874217,
		-0.186512,0.743264,-1.152426
		];


	positionsBaum = [
		-0.029064,3.379361,0.509060,
		-0.121034,4.044044,0.061390,
		0.052376,4.037272,0.005549,
		0.000000,1.947180,0.416001,
		-0.300000,-0.300000,0.300000,
		0.000000,-0.300000,0.416001,
		-0.436893,1.947180,0.000000,
		-0.300000,-0.300000,-0.300000,
		-0.436893,-0.300000,0.000000,
		0.000000,-0.300000,0.000000,
		0.300000,-0.300000,0.300000,
		0.466692,1.947180,0.000000,
		0.466692,-0.300000,0.000000,
		0.000000,1.947180,-0.456488,
		0.300000,-0.300000,-0.300000,
		0.000000,-0.300000,-0.456488,
		0.300000,1.947180,-0.300000,
		-0.300000,1.947180,0.300000,
		-0.300000,1.947180,-0.300000,
		-0.000120,2.310806,-1.781631,
		1.799190,2.309915,-0.001453,
		0.292723,1.947180,0.302814,
		0.300000,1.947180,0.300000,
		-0.396870,3.868018,0.912908,
		-0.101931,3.796167,1.008573,
		0.000402,2.284684,1.764847,
		-0.942175,1.960595,0.857953,
		-1.439748,2.253631,0.020244,
		-1.590390,2.294711,-0.025576,
		0.011309,4.074726,0.165905,
		1.001324,2.040716,0.895206,
		-0.001461,2.347428,1.691911,
		0.468639,4.036846,0.593042,
		0.672876,4.010312,0.122703,
		0.234192,4.036702,0.050942,
		-0.000943,2.349427,-1.733932,
		-1.464422,3.452980,-0.665287,
		-1.603310,3.355289,-0.044601,
		-0.945313,4.010456,0.212112,
		0.899614,2.080971,-0.858717,
		1.731844,2.357038,-0.007111,
		0.046878,3.978732,-0.107227,
		-0.061548,3.914359,-0.160338,
		-1.436977,2.276410,0.022178,
		0.717355,2.621275,1.487080,
		-1.513002,2.375436,-0.016613,
		1.141558,2.421681,-0.771670,
		-0.336511,2.414542,-1.550825,
		-0.170736,2.966285,-1.504247,
		-1.175490,2.289799,0.464545,
		-1.722409,3.082033,0.353184,
		-1.529032,2.761042,-0.501064,
		-1.229927,2.081746,-0.265987,
		-1.450559,3.037477,-0.703638,
		-1.442529,2.687004,-0.669066,
		-1.493072,3.086876,-0.624656,
		1.156149,2.813869,-1.028771,
		1.183453,2.673095,-0.615959,
		1.728078,2.367666,-0.004560,
		1.455346,3.059669,-0.369922,
		1.607944,3.353189,0.054822,
		1.245191,3.413261,-1.128589,
		1.404874,2.787076,-0.767970,
		-0.104577,3.292684,-1.319593,
		0.044063,3.290523,-0.843939,
		-1.314712,3.673876,-0.903890,
		-1.262246,2.698816,-0.900943,
		-0.755138,4.054916,-0.383093,
		-0.662056,3.525725,-1.300212,
		-1.172311,2.638057,-0.951949,
		-0.293179,2.967459,-1.507851,
		-0.576745,2.899735,-1.483997,
		0.458214,2.393995,-1.473508,
		0.666870,3.121750,-1.488212,
		1.017670,2.825830,-1.106213,
		0.609688,3.399859,-1.392983,
		0.281149,3.470439,-1.245388,
		0.783094,4.012477,-0.583272,
		0.288569,2.811245,1.787279,
		0.186178,3.494903,1.498629,
		0.652409,3.464653,1.568279,
		1.222943,3.137754,1.449596,
		1.139130,3.606236,1.279951,
		1.381632,2.432423,0.535715,
		1.142976,2.502451,1.129539,
		1.686191,3.048202,0.772467,
		-0.419460,2.485630,1.393404,
		-0.872166,2.393201,1.178248,
		-0.735413,2.656990,1.549802,
		-1.134248,2.557070,1.190418,
		-0.758156,2.943614,0.729303,
		-0.726967,2.613585,1.070453,
		-1.106842,2.730012,0.744860,
		-1.404272,3.387083,1.241020,
		-1.330375,2.791415,1.228436,
		-0.934967,2.981022,1.587437,
		-1.372516,2.585878,0.921447,
		-0.504621,3.528114,1.389500,
		-0.154180,3.846050,0.836615,
		-0.368828,3.382970,0.228240,
		1.518422,3.522412,0.198360,
		1.494738,3.611899,0.575704,
		1.678189,3.271814,0.199336,
		0.826315,4.056424,-0.401044,
		1.363184,3.834710,0.068054,
		-0.046274,3.485071,-0.621918,
		-0.041822,3.515229,-0.615760,
		-0.385938,3.917120,-0.227272,
		-0.045410,3.475438,-0.399634,
		0.318028,3.674408,-0.652338,
		1.240893,3.928146,0.229263,
		-0.337946,3.686767,-0.375588,
		-0.409921,3.623677,-0.756014,
		0.179613,3.078480,-1.473385,
		1.381765,3.787208,-0.403866,
		1.306716,3.778804,0.558051,
		1.114948,3.822975,0.822824,
		0.845716,3.843480,1.141593,
		0.802257,4.050620,0.259390,
		1.026590,2.386869,-0.924179,
		-1.038831,2.407189,1.100542,
		-1.600571,3.185581,1.054897,
		1.506096,3.455232,-0.593260,
		-1.400331,3.728495,-0.573921,
	];

	indicesBaum = [
		0,1,2,
		3,4,5,
		6,7,8,
		9,10,5,
		11,10,12,
		13,14,15,
		16,12,14,
		14,9,15,
		17,8,4,
		13,18,19,
		16,20,11,
		7,9,8,
		18,15,7,
		9,4,8,
		21,3,5,
		20,22,11,
		1,23,24,
		25,17,3,
		26,27,17,
		6,27,28,
		29,0,2,
		21,25,3,
		25,30,31,
		32,33,34,
		18,35,19,
		36,37,38,
		28,18,6,
		20,39,40,
		2,41,42,
		19,16,13,
		43,28,27,
		30,44,31,
		31,17,25,
		30,21,20,
		45,18,28,
		39,46,40,
		47,48,35,
		43,49,50,
		35,16,19,
		51,52,45,
		51,53,54,
		53,55,36,
		46,56,57,
		58,59,60,
		61,62,56,
		48,63,64,
		36,65,53,
		53,66,54,
		65,67,68,
		68,69,66,
		68,70,71,
		70,47,71,
		72,73,74,
		73,75,61,
		76,77,75,
		78,79,31,
		80,81,82,
		58,83,30,
		84,85,81,
		85,82,81,
		31,86,26,
		87,88,89,
		90,91,92,
		92,91,89,
		93,92,94,
		94,92,89,
		95,96,91,
		91,49,89,
		23,93,97,
		98,90,0,
		99,90,93,
		38,98,29,
		24,32,1,
		24,23,31,
		100,101,102,
		103,41,34,
		104,100,60,
		34,41,2,
		105,106,107,
		108,107,42,
		41,77,109,
		108,109,105,
		33,110,104,
		111,106,112,
		64,106,105,
		35,113,72,
		60,100,58,
		77,103,114,
		60,114,104,
		115,110,116,
		24,117,32,
		116,118,32,
		0,99,1,
		3,17,4,
		6,18,7,
		9,12,10,
		11,22,10,
		13,16,14,
		16,11,12,
		14,12,9,
		17,6,8,
		7,15,9,
		18,13,15,
		9,5,4,
		5,10,21,
		10,22,21,
		20,21,22,
		1,99,23,
		26,43,27,
		6,17,27,
		29,98,0,
		25,21,30,
		2,1,34,
		1,32,34,
		32,118,33,
		18,52,35,
		38,29,36,
		36,55,37,
		20,16,39,
		43,45,28,
		30,84,44,
		31,26,17,
		40,58,20,
		58,30,20,
		45,52,18,
		39,119,46,
		35,52,47,
		52,54,69,
		54,66,69,
		69,71,47,
		47,70,48,
		52,69,47,
		37,45,50,
		45,43,50,
		43,26,49,
		26,120,49,
		38,37,50,
		95,98,121,
		98,38,121,
		50,121,38,
		35,39,16,
		45,37,51,
		37,55,51,
		51,54,52,
		51,55,53,
		46,119,56,
		56,62,57,
		57,59,58,
		58,40,57,
		40,46,57,
		61,122,62,
		48,70,63,
		63,68,112,
		112,106,64,
		64,35,48,
		63,112,64,
		36,123,65,
		65,66,53,
		66,65,68,
		68,71,69,
		68,63,70,
		56,119,74,
		119,72,74,
		61,56,74,
		74,73,61,
		77,61,75,
		75,73,113,
		113,76,75,
		44,84,81,
		44,81,78,
		79,24,31,
		82,117,80,
		117,79,80,
		31,44,78,
		78,80,79,
		80,78,81,
		58,102,83,
		102,85,83,
		83,84,30,
		84,83,85,
		85,101,82,
		31,97,86,
		97,93,88,
		86,97,88,
		93,94,88,
		87,120,26,
		86,87,26,
		89,120,87,
		87,86,88,
		88,94,89,
		90,95,91,
		93,90,92,
		96,95,121,
		121,50,96,
		50,49,96,
		49,120,89,
		91,96,49,
		97,31,23,
		23,99,93,
		98,95,90,
		99,0,90,
		102,58,100,
		100,115,101,
		101,85,102,
		34,104,103,
		104,114,103,
		103,77,41,
		104,110,100,
		67,65,123,
		123,36,29,
		29,2,42,
		107,108,105,
		29,42,107,
		67,123,107,
		123,29,107,
		111,67,107,
		106,111,107,
		108,42,109,
		42,41,109,
		77,76,109,
		76,64,109,
		64,105,109,
		104,34,33,
		33,118,110,
		68,67,112,
		67,111,112,
		35,64,113,
		64,76,113,
		113,73,72,
		119,39,72,
		39,35,72,
		114,59,122,
		59,57,122,
		57,62,122,
		122,61,114,
		61,77,114,
		60,59,114,
		82,101,116,
		101,115,116,
		115,100,110,
		116,117,82,
		24,79,117,
		32,117,116,
		116,110,118,
	];

	indices = [
		0,1,2,
		3,4,2,
		5,6,4,
		7,8,9,
		8,10,11,
		9,12,13,
		14,15,16,
		14,6,17,
		6,15,17,
		14,18,19,
		18,20,19,
		21,22,23,
		24,25,21,
		24,23,26,
		27,28,29,
		20,30,27,
		28,31,29,
		32,33,31,
		34,35,36,
		36,25,37,
		36,38,25,
		39,40,41,
		40,42,43,
		33,42,39,
		40,44,41,
		44,0,45,
		40,46,44,
		46,0,44,
		41,12,47,
		47,12,48,
		41,35,34,
		48,35,47,
		48,11,49,
		11,50,49,
		50,51,49,
		50,52,51,
		51,48,49,
		53,32,28,
		54,55,56,
		57,58,32,
		59,16,60,
		28,59,53,
		59,61,18,
		62,63,64,
		65,66,67,
		68,5,69,
		70,43,54,
		63,1,71,
		71,72,46,
		13,45,2,
		9,4,7,
		4,26,7,
		26,14,24,
		26,6,14,
		19,37,24,
		37,29,36,
		29,34,36,
		44,13,41,
		2,1,3,
		2,45,0,
		0,72,1,
		9,2,4,
		3,5,4,
		5,73,6,
		7,10,8,
		7,26,10,
		9,8,12,
		8,11,12,
		14,17,15,
		6,73,15,
		14,16,18,
		18,61,20,
		24,21,23,
		21,38,22,
		24,37,25,
		21,25,38,
		26,23,10,
		23,22,10,
		27,30,28,
		20,61,30,
		28,32,31,
		32,58,33,
		36,35,52,
		74,75,76,
		36,52,38,
		40,39,42,
		33,58,42,
		40,43,46,
		46,72,0,
		41,13,12,
		41,47,35,
		48,52,35,
		48,12,11,
		11,22,50,
		11,10,22,
		50,38,52,
		22,38,50,
		48,51,52,
		53,57,32,
		43,42,57,
		57,42,58,
		59,18,16,
		28,30,59,
		59,30,61,
		5,62,69,
		60,16,15,
		66,73,68,
		71,70,77,
		63,3,1,
		71,1,72,
		13,2,9,
		4,6,26,
		14,19,24,
		19,20,37,
		37,27,29,
		37,20,27,
		29,31,34,
		31,33,34,
		34,39,41,
		34,33,39,
		44,45,13,
		55,78,56,
		59,60,53,
		79,60,65,
		77,56,80,
		81,82,75,
		82,76,75,
		60,76,83,
		76,80,84,
		53,83,85,
		86,74,87,
		64,76,79,
		74,84,87,
		53,60,83,
		78,85,86,
		67,64,79,
		67,79,65,
		67,66,68,
		67,69,62,
		67,68,69,
		60,66,65,
		67,62,64,
		62,3,63,
		68,73,5,
		5,3,62,
		66,15,73,
		79,76,60,
		64,63,76,
		60,15,66,
		76,82,83,
		85,82,81,
		85,83,82,
		74,85,81,
		56,78,86,
		56,87,84,
		56,86,87,
		56,84,80,
		71,80,63,
		53,55,57,
		56,77,70,
		56,70,54,
		43,55,54,
		70,46,43,
		71,46,70,
		76,63,80,
		86,85,74,
		74,76,84,
		78,53,85,
		71,77,80,
		53,78,55,
		43,57,55,
		74,81,75
	];

	positionsWolke = [
		-0.099425,0.441764,0.713179,
		-0.271799,0.291556,0.832936,
		-0.089438,0.320882,0.922907,
		-0.359619,0.098985,0.868687,
		-0.106199,0.083865,1.039625,
		-0.436729,0.354243,-0.244360,
		-0.454646,0.117611,-0.398190,
		-0.424138,0.073415,-0.069896,
		0.070884,-0.261144,0.600218,
		0.178139,-0.217726,0.679729,
		0.064810,-0.273139,0.712171,
		0.404392,0.102783,0.590733,
		0.314530,0.257972,0.791139,
		0.362623,0.114159,0.869443,
		0.190169,0.464154,-0.619371,
		0.295791,0.446221,-0.358006,
		0.459070,0.142052,-0.407122,
		-0.195830,0.478816,-0.599818,
		0.000057,0.486741,-0.614626,
		-0.187237,0.451547,-0.626796,
		-0.070304,-0.260891,0.597514,
		0.001072,-0.273370,0.714528,
		-0.077726,-0.270283,0.710525,
		0.105515,0.089235,1.037963,
		0.001295,0.306598,0.917611,
		0.001090,0.053165,1.033383,
		-0.000468,0.427144,0.737612,
		0.126704,0.328117,0.917483,
		0.111265,0.442520,0.725477,
		0.212752,0.624580,-0.017683,
		0.003099,0.621284,0.043560,
		0.188898,0.606189,0.073279,
		-0.083458,-0.257006,-0.054520,
		0.000000,-0.242760,0.024960,
		-0.078949,-0.231425,0.006456,
		0.455453,0.042659,-0.044131,
		0.377133,0.387422,-0.073897,
		0.444630,0.043979,0.009091,
		0.168470,-0.259795,-0.058148,
		0.078850,-0.231430,0.006463,
		0.083250,-0.257047,-0.054655,
		-0.326514,0.195653,0.059422,
		-0.338919,0.059768,0.037316,
		-0.316001,0.036958,0.067596,
		-0.386255,0.275251,-0.000938,
		-0.291852,0.530407,0.024963,
		-0.312151,0.578748,-0.156179,
		0.001974,0.680854,-0.077553,
		-0.168016,-0.259894,-0.057947,
		-0.158211,-0.229894,0.011679,
		-0.188614,-0.213478,0.672878,
		-0.193663,-0.218641,0.568826,
		-0.375121,0.327368,-0.418921,
		0.000044,-0.267398,-0.073134,
		0.424018,0.411801,-0.178976,
		0.319804,0.303882,0.628593,
		0.015006,0.609406,-0.349508,
		-0.001554,-0.256227,0.597220,
		0.068128,-0.199058,0.072184,
		0.000001,-0.217358,0.064482,
		0.357434,0.461296,0.082456,
		0.000936,0.582115,0.105871,
		-0.068097,-0.199076,0.072149,
		-0.153331,-0.191241,0.072496,
		-0.363539,0.021672,0.339276,
		0.134762,0.542792,0.137705,
		0.420310,0.032732,0.067000,
		0.157311,-0.230873,0.010321,
		-0.350311,0.216751,0.027278,
		-0.318347,0.481422,0.054638,
		0.187166,0.620546,-0.124956,
		0.426095,0.425862,-0.248537,
		0.070688,-0.279429,-0.109665,
		0.000045,-0.259807,-0.124183,
		-0.180157,-0.269512,-0.111834,
		0.003240,0.679202,-0.125069,
		-0.291842,0.624051,-0.275227,
		0.180400,-0.269470,-0.112725,
		0.406260,0.031810,-0.166180,
		-0.070864,-0.279460,-0.109629,
		-0.352049,0.077771,0.012079,
		0.154882,0.551416,-0.312700,
		-0.060666,-0.262755,-0.194518,
		0.061925,-0.262956,-0.194558,
		-0.192707,-0.259957,-0.176519,
		-0.000004,-0.242008,-0.182305,
		-0.311451,-0.137055,-0.041464,
		-0.387722,-0.061352,-0.080480,
		-0.297618,-0.148995,-0.108614,
		0.266658,-0.196714,-0.216233,
		0.374669,-0.078129,-0.107716,
		0.301496,-0.146703,-0.102594,
		-0.305527,-0.113497,0.026199,
		-0.353242,-0.022925,0.014898,
		0.340200,-0.095660,-0.065826,
		0.299757,-0.151318,-0.068341,
		0.286866,-0.140573,0.010488,
		0.411180,-0.009296,0.068272,
		0.287265,-0.126006,0.598595,
		-0.328193,-0.031681,0.334323,
		-0.298401,-0.098471,0.060369,
		-0.279902,-0.123977,0.338550,
		-0.000647,-0.188907,-0.440790,
		0.099164,-0.098395,-0.552875,
		0.086100,-0.188665,-0.418569,
		0.279742,-0.004938,0.909357,
		0.073436,-0.179725,0.856237,
		0.241273,-0.145321,0.742388,
		-0.000051,-0.073500,1.006399,
		-0.073111,-0.179655,0.856304,
		-0.002122,-0.174418,0.853540,
		-0.349255,-0.075651,-0.295296,
		-0.087137,-0.187914,-0.419694,
		-0.267154,-0.194512,-0.216989,
		-0.326755,-0.007529,0.035704,
		-0.101217,-0.094655,-0.555494,
		0.345906,-0.082182,-0.289450,
		0.272150,-0.145678,0.698193,
		-0.313726,-0.013006,0.819201,
		-0.248277,-0.142794,0.741249,
		0.191314,-0.219908,0.571397,
		0.194767,-0.259372,-0.175869,
		-0.182060,-0.199017,0.325777,
		0.152010,-0.192089,0.072011,
		0.405052,-0.019693,0.016553,
		-0.329355,-0.009302,0.061309,
		0.000891,-0.052087,-0.592967,
		0.083741,-0.066354,1.023166,
		-0.085726,-0.063926,1.024907,
		0.390651,0.009734,0.575550,
		0.484507,0.022311,0.349679,
		-0.366027,-0.015750,0.461841,
		-0.184269,-0.217157,0.482728,
		0.179475,-0.199909,0.326604,
		0.281532,-0.146164,0.639330,
		-0.298187,-0.121830,0.476121,
		-0.374054,0.070348,0.476347,
		-0.379307,0.280790,0.334061,
		-0.000292,-0.236872,0.331894,
		0.085610,0.446479,0.340691,
		0.427232,0.276364,0.305697,
		-0.002311,0.342393,0.340358,
		-0.091565,-0.211887,0.333561,
		0.504325,0.057619,0.350412,
		0.092301,-0.211861,0.333027,
		-0.229738,0.337088,0.339749,
		-0.404095,0.106597,0.593354,
		-0.329939,0.312074,0.539427,
		-0.394522,0.015968,0.570786,
		-0.289533,-0.138425,0.608517,
		0.434374,0.172913,0.506300,
		0.362018,-0.025319,0.472762,
		0.186924,-0.215502,0.482362,
		0.289511,-0.134495,0.669559,
		0.078049,-0.262389,0.506809,
		-0.002174,-0.268734,0.507216,
		0.328602,0.313904,0.548690,
		-0.093087,0.393055,0.535787,
		0.003346,0.418536,0.536332,
		0.089167,0.395502,0.537263,
		-0.077655,-0.262572,0.507653,
		-0.320102,0.306163,0.626158
	];

	indicesWolke = [
		0,1,2,
		2,3,4,
		5,6,7,
		8,9,10,
		11,12,13,
		14,15,16,
		17,18,19,
		20,21,22,
		23,24,25,
		26,27,28,
		29,30,31,
		32,33,34,
		35,36,37,
		38,39,40,
		41,42,43,
		44,45,46,
		47,45,30,
		48,34,49,
		20,50,51,
		52,19,6,
		24,4,25,
		26,2,24,
		40,33,53,
		29,36,54,
		28,12,55,
		13,27,23,
		56,14,18,
		57,10,21,
		33,58,59,
		31,60,36,
		45,61,30,
		49,62,63,
		64,41,43,
		30,65,31,
		33,62,34,
		37,60,66,
		67,58,39,
		68,69,45,
		70,54,71,
		72,53,73,
		74,32,48,
		75,46,47,
		5,46,76,
		77,40,72,
		78,54,35,
		79,53,32,
		70,47,29,
		68,80,42,
		56,70,81,
		82,73,79,
		16,71,78,
		83,77,72,
		52,76,17,
		56,76,75,
		84,79,74,
		83,73,85,
		15,70,71,
		44,7,80,
		86,87,88,
		89,90,91,
		92,93,86,
		91,94,95,
		96,97,98,
		99,100,101,
		102,103,104,
		105,106,107,
		108,109,110,
		111,112,113,
		100,114,92,
		94,96,95,
		106,108,110,
		115,102,112,
		104,116,89,
		117,105,107,
		88,111,113,
		109,118,119,
		109,50,22,
		88,84,74,
		117,9,120,
		104,121,83,
		112,85,82,
		106,21,10,
		38,96,67,
		63,92,49,
		84,112,82,
		21,109,22,
		9,106,10,
		85,104,83,
		101,63,122,
		96,123,67,
		77,95,38,
		49,86,48,
		121,91,77,
		86,74,48,
		80,87,93,
		116,78,90,
		42,93,114,
		90,35,94,
		124,66,97,
		99,43,125,
		126,14,103,
		105,23,127,
		25,128,108,
		6,115,111,
		43,114,125,
		35,124,94,
		127,25,108,
		19,126,115,
		103,16,116,
		129,13,105,
		7,111,87,
		4,118,128,
		66,130,97,
		131,64,99,
		132,101,122,
		98,133,123,
		98,130,134,
		135,99,101,
		136,137,64,
		58,138,59,
		60,139,140,
		69,141,61,
		63,142,122,
		65,141,139,
		62,138,142,
		66,140,143,
		123,144,58,
		41,145,69,
		146,147,136,
		148,135,149,
		51,135,132,
		148,136,131,
		130,150,151,
		134,152,133,
		134,151,153,
		138,154,155,
		139,156,140,
		141,157,158,
		142,132,122,
		139,158,159,
		138,160,142,
		140,150,143,
		144,152,154,
		145,147,157,
		118,146,148,
		50,149,51,
		118,149,119,
		161,146,
		151,11,129,
		153,120,152,
		153,129,117,
		155,8,57,
		159,55,156,
		158,0,26,
		160,51,132,
		158,28,159,
		155,20,160,
		156,11,150,
		154,120,8,
		157,161,0,
		0,161,1,
		2,1,3,
		5,52,6,
		8,120,9,
		11,55,12,
		14,81,15,
		17,56,18,
		20,57,21,
		23,27,24,
		26,24,27,
		29,47,30,
		32,53,33,
		35,54,36,
		38,67,39,
		41,68,42,
		44,68,45,
		47,46,45,
		48,32,34,
		20,22,50,
		52,17,19,
		24,2,4,
		26,0,2,
		40,39,33,
		29,31,36,
		28,27,12,
		13,12,27,
		56,81,14,
		57,8,10,
		33,39,58,
		31,65,60,
		45,69,61,
		49,34,62,
		64,137,41,
		30,61,65,
		33,59,62,
		37,36,60,
		67,123,58,
		68,41,69,
		70,29,54,
		72,40,53,
		74,79,32,
		75,76,46,
		5,44,46,
		77,38,40,
		78,71,54,
		79,73,53,
		70,75,47,
		68,44,80,
		56,75,70,
		82,85,73,
		16,15,71,
		83,121,77,
		52,5,76,
		56,17,76,
		84,82,79,
		83,72,73,
		15,81,70,
		44,5,7,
		86,93,87,
		89,116,90,
		92,114,93,
		91,90,94,
		96,124,97,
		99,125,100,
		102,126,103,
		105,127,106,
		108,128,109,
		111,115,112,
		100,125,114,
		94,124,96,
		106,127,108,
		115,126,102,
		104,103,116,
		117,129,105,
		88,87,111,
		109,128,118,
		109,119,50,
		88,113,84,
		117,107,9,
		104,89,121,
		112,102,85,
		106,110,21,
		38,95,96,
		63,100,92,
		84,113,112,
		21,110,109,
		9,107,106,
		85,102,104,
		101,100,63,
		96,98,123,
		77,91,95,
		49,92,86,
		121,89,91,
		86,88,74,
		80,7,87,
		116,16,78,
		42,80,93,
		90,78,35,
		124,37,66,
		99,64,43,
		126,18,14,
		105,13,23,
		25,4,128,
		6,19,115,
		43,42,114,
		35,37,124,
		127,23,25,
		19,18,126,
		103,14,16,
		129,11,13,
		7,6,111,
		4,3,118,
		66,143,130,
		131,136,64,
		132,135,101,
		98,134,133,
		98,97,130,
		135,131,99,
		136,147,137,
		58,144,138,
		60,65,139,
		69,145,141,
		63,62,142,
		65,61,141,
		62,59,138,
		66,60,140,
		123,133,144,
		41,137,145,
		146,161,147,
		148,131,135,
		51,149,135,
		148,146,136,
		130,143,150,
		134,153,152,
		134,130,151,
		138,144,154,
		139,159,156,
		141,145,157,
		142,160,132,
		139,141,158,
		138,155,160,
		140,156,150,
		144,133,152,
		145,137,147,
		118,3,146,
		50,119,149,
		118,148,149,
		1,161,
		151,150,11,
		153,117,120,
		153,151,129,
		155,154,8,
		159,28,55,
		158,157,0,
		160,20,51,
		158,26,28,
		155,57,20,
		156,55,11,
		154,152,120,
		157,147,161,
	];

	doArt();
}

function transform(posarr,x,y,z,scale=1)
{
	resArr = [];
	for(i = 0; i < posarr.length; i+=3)
	{
		resArr[i] = (posarr[i] + x)*scale;
		resArr[i+1] = (posarr[i+1] + y)*scale;
		resArr[i+2] = (posarr[i+2] + z)*scale;
	}

	return resArr;
}

function setColor(size, colr)
{	
	gl.bindBuffer(gl.ARRAY_BUFFER, colorVBO);
	colors = [];
	for(var i = 0; i < size; i += 3) {
		colors.push(colr[0]+(((i%2)*0.2)-0.2), colr[1]+(((i%2)*0.2)-0.2), colr[2]+(((i%2)*0.2)-0.2),1);
	}
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function doArt() {

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	const posLoc = gl.getAttribLocation(program, "vPosition");
	const colorLoc = gl.getAttribLocation(program, "vColor");
	
	colorVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorVBO);
	gl.enableVertexAttribArray(colorLoc);
	gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
			
	posVBO = gl.createBuffer();
	indexVBO = gl.createBuffer();

	drawModel(positions, indices, posLoc, colorLoc, [0, 0.8, 0]);
	drawModel(transform(positionsWolke,2,4,0), indicesWolke, posLoc, colorLoc, [0.8, 0.8, 0.8]);
	drawModel(transform(positionsWolke,-2,1,0,1.5), indicesWolke, posLoc, colorLoc, [0.8, 0.8, 0.8]);
	drawModel(transform(positionsBaum,0,0,0,0.5), indicesBaum, posLoc, colorLoc, [0.8,0.5,0.2]);
}

function drawModel(pos, ind, posLoc, colr)
{
	gl.bindBuffer(gl.ARRAY_BUFFER, posVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);

	gl.enableVertexAttribArray(posLoc);	
	gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexVBO);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ind), gl.STATIC_DRAW);	

	setColor(pos.length, colr);
	gl.drawElements(gl.TRIANGLES, ind.length, gl.UNSIGNED_SHORT, 0);
}

main();
