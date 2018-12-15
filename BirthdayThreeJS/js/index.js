//Global variables
var scene, camera, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var cakeModel;
var cakeWithFlame = new THREE.Group;
var allFlameMaterials = [];
var flames = [];
var cakeRotSpeed = 0.0030;

objects = [];

function init(){
  //Configure renderer settings-------------------------------------------------
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = true;
  renderer.setClearColor(0x000000, 0.0);
  document.body.appendChild(renderer.domElement);
  //----------------------------------------------------------------------------

    // Create an empty scene
    scene = new THREE.Scene();

    // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 5000 );
  scene.add(camera);

camera.position.z = 30;
camera.position.y = 8;
camera.lookAt(new THREE.Vector3(0,-20,0));

// the lights
  var ambientLight = new THREE.AmbientLight(0xFFFFFF, .5);
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight( 0xffffff, 0.5);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.5);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.5);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

//skybox
  var path = "textures/cube/Park2/";
    var format = '.jpg';
    var urls = [
      path + 'posx' + format, path + 'negx' + format,
      path + 'posy' + format, path + 'negy' + format,
      path + 'posz' + format, path + 'negz' + format
    ]; // get all skybox image urls into *urls* variable.
    var textureCube = new THREE.CubeTextureLoader().load( urls ); // load skybox images
    textureCube.format = THREE.RGBFormat;  // set skybox color format as RGB
    scene.background = textureCube;  // set loaded skybox texture into scene.

    // Add spheres (balloon)
    //addBalloons();


  window.addEventListener('resize', onWindowResize, false);
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    // Orbit controls
      var controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;

  }



//Keep everything appearing properly on screen when window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //maintain aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) / 5;
  mouseY = ( event.clientY - windowHalfY ) / 5;
}

function geoletters() {
  cakeModel = new THREE.Object3D();

  // add cakeWithFlame group. right now it's just empty group.
  // like balloon we also manage cake as group with cakemodel and candle flame
  scene.add(cakeWithFlame);

  // load model obj and material
  new THREE.MTLLoader()
    .setPath('models/')
    .load('Birthday_Cake.mtl', function(materials){
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials)
        .setPath('models/')
        .load('Birthday_Cake.obj', function ( object ) {
          // set loaded cake object to cakeModel and set initial position and rotation.
          // IMPORTANT: for position.z and x I applied those values to make sure
          // the position of candles match with generated candle flame.
          cakeModel.add( object );
          cakeModel.rotation.x = -Math.PI / 2;
          cakeModel.position.y = -20
          cakeModel.position.z = -0.5;
          cakeModel.position.x = -0.2;

          // add generated cakemodel to group.
          cakeWithFlame.add(cakeModel);

        //placeFlames(); // insert flames

        });
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
