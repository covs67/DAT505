//Global variables
var scene, camera, renderer;
var geometry, texture, material, mesh, cake1, texture_Cake1, floor, material_Cake1, mesh_Cake1;

function init(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000 );

  renderer = new THREE.WebGLRenderer({antialias:true});

  renderer.setClearColor("#000000");
renderer.shadowMap.enabled = true;

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );
}

function geoletters() {

var light = new THREE.PointLight(0xffffff, 0.7);
scene.add(light)
light.position.set(0, 40, -200)
var helper = new THREE.PointLightHelper(light, 20);
scene.add(helper);



  var loader = new THREE.FontLoader();
  loader.load(
    'fonts/helvetiker_regular.typeface.json',
    function ( font ) {
    	var geometry = new THREE.TextGeometry( 'Happy Birthday!', {
    		font: font,
    		size: 30,
    		height: 5,
    		curveSegments: 12,
    		bevelEnabled: false,
    		bevelThickness: 12,
    		bevelSize: 8,
    		bevelSegments: 5
    	});

      material = new THREE.MeshPhongMaterial( { color: "#FF00FF" } );
      mesh = new THREE.Mesh( geometry, material );
      mesh.position.set(-120,-80,-300);
      mesh.castShadows = true;
      mesh.receiveShadows = true;
      var loader = new THREE.TextureLoader();

      var texture = loader.load( "imgs/New_Cake2.png", function ( texture ) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.offset.set( 0, 0 );
          texture.repeat.set( 1, 1 );
          texture.anisotrophy = 16;

      } );
      var material1 = new THREE.MeshPhongMaterial( {
         color: 0xffffff,
         map: texture,
         specular:0x111111,
         shininess: 10,
      } );

  let textureBoxGeometry = new THREE.BoxGeometry(50, 50, 20);//width height segments
  cake1 = new THREE.Mesh( textureBoxGeometry, material1 );
  // cake1.position.z = -1000;
  cake1.position.set(0,0,-300);//x y z

  var floorMaterial = new THREE.MeshBasicMaterial( {
     color: 0xa2a2a2,
     specular:0x111111,
     shininess: 10,
  } );
let floorGeometry = new THREE.BoxGeometry(900, 100, 20);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.set(0,-110,-300);//x y z
  floor.rotation.x += 1.4;
  floor.castShadows = true;
  floor.receiveShadows = true;
// Add mesh to scene
      scene.add(floor);
      scene.add( mesh );
      scene.add( cake1 );

    }
  );

}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  //mesh.rotation.x += 0.01; //Continuously rotate the mesh
  //mesh.rotation.y += 0.01;
  if(cake1){
  cake1.rotation.y += 0.003;
  }

  renderer.setClearColor("#000000");
  renderer.render(scene, camera);
};

init();
geoletters();
render();
