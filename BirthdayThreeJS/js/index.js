//Global variables
var scene, camera, renderer;
var geometry, texture, material, mesh, cake1, cakeModel, material_Cake1, mesh_Cake1;

objects = [];

function init(){
    //Configure renderer settings-------------------------------------------------
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    renderer.setClearColor(0x404040, 1.0);
    document.body.appendChild(renderer.domElement);
    //----------------------------------------------------------------------------

    // Create an empty scene
    scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0f0f0 );
var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );




    // // Create a basic perspective camera
    // camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 2, 10000 );
    // camera.position.z = 50;
    // scene.add(camera);
    //
    // //Create the lights
    // var ambientLight = new THREE.AmbientLight(0x999999, 0.5);
    // scene.add(ambientLight);
    //
    // var lights = [];
    // lights[0] = new THREE.DirectionalLight( 0xffffff, 0.5);
    // lights[0].position.set(1, 0, 0);
    // lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.5);
    // lights[1].position.set(0.75, 1, 0.5);
    // lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.5);
    // lights[2].position.set(-0.75, -1, 0.5);
    // scene.add(lights[0]);
    // scene.add( lights[1] );
    // scene.add( lights[2] );

    //window.addEventListener('resize', onWindowResize, false);


    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enableZoom = true;
  }



//Keep everything appearing properly on screen when window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //maintain aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
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
      mesh.position.y = 10;
      mesh.position.x = -100;
      scene.add( mesh );
    }
  );

  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load('models/Birthday_Cake.mtl', function(materials){
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/Birthday_Cake.obj', function (mesh21 ) {
      mesh21.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
    });
  })
  scene.add(mesh21);
  objects.push(mesh21);

  mesh21.scale.set(1, 1, 1);
  mesh21.position.set(1, 1, 1);
  mesh21.rotation.y = -Math.PI/4;

})
}

//Render Loop
var render = function () {
  requestAnimationFrame( render );

  //cakeModel.rotation.x -= 0.0020;
  //cakeModel.rotation.y -= 0.0030;

  renderer.setClearColor("#000000");
  renderer.render(scene, camera);
};


init();
geoletters();
render();
