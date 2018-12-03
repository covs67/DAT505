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

      var loader = new THREE.TextureLoader();

      var texture = loader.load( "imgs/cake.png", function ( texture ) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.offset.set( 0, 0 );
          texture.repeat.set( 2, 2 );
      } );
      var material1 = new THREE.MeshPhongMaterial( {
         color: 0xffffff,
         specular:0x111111,
         shininess: 10,
         map: texture,
      } );

  cake1 = new THREE.Mesh( loader, material1 );


// Add mesh to scene
      //scene.add( mesh );
      //scene.add( cake1 );
      //scene.add( mesh_Cake1 );
    }
  );

}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  //mesh.rotation.x += 0.01; //Continuously rotate the mesh
  //mesh.rotation.y += 0.01;


  renderer.setClearColor("#000000");
  renderer.render(scene, camera);
};

init();
geoletters();
render();
