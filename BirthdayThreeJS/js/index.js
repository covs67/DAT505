//Global variables
var scene, camera, renderer;
var geometry, texture, material, mesh, cake1, cakeModel, material_Cake1, mesh_Cake1;



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

    // Create a basic perspective camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 500 );
    camera.position.z = 400;
    scene.add(camera);

    //Create the lights
    var ambientLight = new THREE.AmbientLight(0x999999, 0.5);
    scene.add(ambientLight);

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

    window.addEventListener('resize', onWindowResize, false);


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
      mesh.position.y = 100;
      mesh.position.x = -10;
      scene.add( mesh );
    }
  );

   cakeModel = new THREE.Object3D();

  scene.add(cakeModel);
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load('models/Birthday_Cake.mtl', function(materials){
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/Birthday_Cake.obj', function ( object ) {
      cakeModel.add( object );
    });
  })
}

//Render Loop
var render = function () {
  requestAnimationFrame( render );

  cakeModel.rotation.x -= 0.0020;
  cakeModel.rotation.y -= 0.0030;

  renderer.setClearColor("#000000");
  renderer.render(scene, camera);
};


init();
geoletters();
render();
