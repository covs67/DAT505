//Global variables
var scene, camera, renderer;
var geometry, texture, material, mesh, cake1, texture_Cake1, material_Cake1, mesh_Cake1;

function init(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  renderer = new THREE.WebGLRenderer({antialias:true});

  renderer.setClearColor("#000000");

  renderer.setSize( window.innerWidth, window.innerHeight );
//
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
      console.log('loader called back, hee is the geometry', geometry)
      material = new THREE.MeshBasicMaterial( { color: "#FF00FF" } );
      mesh = new THREE.Mesh( geometry, material );
      mesh.position.z = -1000;



//function2

cake1 = new THREE.BoxGeometry( 10, 10, 10 );

texture_Cake1 = new THREE.TextureLoader().load( "imgs/cake.png" );

material_Cake1 = new THREE.MeshBasicMaterial( { map: texture} );

mesh_Cake1 = new THREE.Mesh( cake1, material_Cake1 );


// Add mesh to scene
      scene.add( mesh );
      scene.add( mesh_Cake1 );
    }
  );

}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.01; //Continuously rotate the mesh
  mesh.rotation.y += 0.01;


  mesh_Cake1.rotation.x += 0.02;
	mesh_Cake1.rotation.y += 0.01;
	mesh_Cake1.position.z -= 0.2;

  renderer.setClearColor("#000000");
  renderer.render(scene, camera);
};

init();
geoletters();
render();
