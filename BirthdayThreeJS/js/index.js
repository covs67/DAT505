//Global variables
var scene, camera, renderer;
var geometry, texture, material, mesh, cake1, texture_Cake1, material_Cake1, mesh_Cake1;

function init(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  renderer = new THREE.WebGLRenderer({antialias:true});

  renderer.setClearColor("#000000");

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );
}

function geoletters() {
  var loader = new THREE.FontLoader();
  loader.load(
    'fonts/helvetiker_regular.typeface.json',
    function ( font ) {
    	var geometry = new THREE.TextGeometry( 'Happy Birthday!', {
    		font: font,
    		size: 80,
    		height: 5,
    		curveSegments: 12,
    		bevelEnabled: true,
    		bevelThickness: 10,
    		bevelSize: 8,
    		bevelSegments: 5
    	});

      material = new THREE.MeshBasicMaterial( { color: "#FF00FF" } );
      mesh = new THREE.Mesh( geometry, material );
      mesh.position.z = -1000;
      mesh.position.y = 100;
      mesh.position.x = -10;
scene.add( mesh );
});


var objLoader = new THREE.OBJLoader();
objLoader.setPath('models/');
objLoader.load('Birthday_Cake.obj', function ( object ) {
  object.position.y -= 60;
  scene.add( object );
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);
}
// Render Loop
var render = function () {
  requestAnimationFrame( render );

  //mesh.rotation.x += 0.00;
  //mesh.rotation.y += 0.00;

  renderer.setClearColor("#000000");
  renderer.render(scene, camera);
};

init();
geoletters();
render();
