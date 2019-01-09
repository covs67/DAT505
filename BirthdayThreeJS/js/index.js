//Global variables
var scene, camera, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var cakeModel;
var cakeWithFlame = new THREE.Group;
var allFlameMaterials = []; //empty all flames Materials array
var flames = []; //empty flames array
var cakeRotSpeed = 0.01; // cake rotation speed


var spheres = []; // I used spheres to create the balloons. For now, it's just an empty array
var ballColors = [0x00bfff, 0xff00ff, 0x7cfc00, 0xdc143c, 0x7fff00, 0x00bfff, 0x00ffff,0xff0000];
var balloonCount = 100; // controls balloon numbers
var balloonSpeed = 0.0001; //controls balloon speeds

var text = "Happy Birthday!  --^-- ˜›^o^˜› --^-- ";
var textColors = [0x00bfff, 0xff00ff, 0x7cfc00, 0xdc143c, 0x7fff00, 0x00bfff, 0x00ffff,0xff0000];
var textScaleSize = 0.3; //delta scale for letters
var textAnimeColors = []; // Index of current color for each letter
var textRotSpeed = 0.15;  // Text word rotation speed. in degree
var textInitialSize = 120; // Initial font size for text
var textYScope = 5  // Text Sin wave height.
var textYSpeed = 10  // Text Sin wave speed
var textBevelThickness = 3; // Text bevel thickness
var textBevelSize = 3;   // Text bevel size
var textFont = "fonts/gentilis_bold.typeface.json";  // textFont  ::Only ThreeJS fonts are available
var distanceToText = 1000; // Distance from cakemodel to text
var textSizeInAngle = 8; // Angle width for each letter.
var textRot = 0.1;  // current text rotation.
var textColorTransformSpeed = 45; // text color transform speed.
var textObjects = [];

var dx, dy, dz;
// used for render ticker
var clock = new THREE.Clock();
var time = 0;
var r = 11;
var initialAngle = 2;


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
    ];// get all skybox image urls into *urls* variable.
    var textureCube = new THREE.CubeTextureLoader().load( urls ); // load skybox images
    textureCube.format = THREE.RGBFormat;  // set skybox color format as RGB
    scene.background = textureCube;  // set loaded skybox texture into scene.

    addBalloons();

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
// Save mouse point for applying mouse move effect on camera.
function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) / 5;
  mouseY = ( event.clientY - windowHalfY ) / 5;
}

// Add Random Balloons
function addBalloons() {
  var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 ); // basic balloon geometry (initially it's sphere)
  var lineGeo = new THREE.Geometry(); // geometry for balloon tail

  // Balloon tail
  lineGeo.vertices.push(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 2, 0),

    new THREE.Vector3(1, 2, 0),
    new THREE.Vector3(2, 4, 1),

    new THREE.Vector3(2, 4, 1),
    new THREE.Vector3(0, 6, 2),

    new THREE.Vector3(0, 6, 2),
    new THREE.Vector3(0, 8, 4),

    new THREE.Vector3(0, 8, 4),
    new THREE.Vector3(2, 10, 4)
  )

  var lineMat = new THREE.LineBasicMaterial({
    color: 0xaaaaaa,
    linewidth: 5,
    transparent: true,
    opacity: 0.6
  })

  // Create balloons according to balloon count
  for ( var i = 0; i < balloonCount; i ++ ) {
    //Here balloons are controlled as group of balloon sphere and tail.
    var sphereGroup = new THREE.Group;
    var material = new THREE.MeshPhongMaterial( { // balloon sphere material.
      color: ballColors[i % ballColors.length],
      transparent: true,
      opacity: 0.4,
      shininess: 50,
      specular: 0x777777
    } );
    var mesh = new THREE.Mesh( geometry, material ); // create balloon mesh
    var line = new THREE.LineSegments( lineGeo, lineMat );  // create balloon tail

    // set balloon position as random.
    mesh.position.x = Math.random() * 20 - 10;
    mesh.position.y = Math.random() * 20 - 10;
    mesh.position.z = Math.random() * 1000 - 500;

   //avoid cake and balloon collission
    if(Math.abs(mesh.position.z) < 40)
      mesh.position.z = 40 + Math.abs(mesh.position.z);

  // set random balloon size
  mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * .1 + .3;
  mesh.scale.y *= 1.2;
  line.position.x = mesh.position.x;
  line.position.y = mesh.position.y - 100 * mesh.scale.y - 10;
  line.position.z = mesh.position.z;
  line.scale.x = line.scale.y = line.scale.z = mesh.scale.y;

// add created balloon and tail to group
  sphereGroup.add(mesh);
  sphereGroup.add(line);

     scene.add(sphereGroup);  //  add balloon group here

  spheres.push( sphereGroup ); // save created balloon for later control
}
}
// Add Cake Object
function geoletters() {
  cakeModel = new THREE.Object3D();
  scene.add(cakeWithFlame);  // add cakeWithFlame group

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
// the position of candles match with generated candle flame.
          cakeModel.add( object );
          cakeModel.rotation.x = -Math.PI / 2;
          cakeModel.position.y = -20
          cakeModel.position.z = -0.5;
          cakeModel.position.x = -0.2;

          // add cakemodel to group.
          cakeWithFlame.add(cakeModel);

      placeFlames();
    insertText();

        });
    })
}

// Generate flame
function flame(isFrontSide, x, z){
// This function creates one flame and places it on given x, z place

  var caseMesh = new THREE.Mesh(); // create empty mesh.
  var flameGeo = new THREE.SphereBufferGeometry(0.5, 32, 32);
  var flameMaterials = [];

    // Please don't udpate following codes. Basically makes the flames work
  flameGeo.translate(0, 0.5, 0);
  var flameMat = getFlameMaterial(isFrontSide);
  flameMaterials.push(flameMat);
  var flame = new THREE.Mesh(flameGeo, flameMat);
  flame.position.set(x, 2.6, z);
  flame.rotation.y = THREE.Math.degToRad(-45);

  flames.push(flame);
  allFlameMaterials.push(flameMaterials);

  caseMesh.add(flame);

  cakeWithFlame.add(caseMesh);
}

  // Add Flames per candle
  function placeFlames() {
// Calculate each position of candle tip and place flames for them.
    for(var i = 0; i < 16; i ++) {
      a = THREE.Math.degToRad(360 / 16 * i + initialAngle) + cakeModel.rotation.z;
      x = r * Math.cos(a);
      z = r * Math.sin(a);
      flame(true, x, z);
    }
  }

  // Add fancy "Happy Birthday!" text
  function insertText() {
// Creates text object for each letter of string.
    var loader = new THREE.FontLoader();
    loader.load( textFont, function ( font ) {
      text.split('').map((letter, i) => {
// Initialize Color of text as randome one.
  textAnimeColors[i] = parseInt(Math.random() * textColors.length);

// Create text geometry
      var textGeo = new THREE.TextGeometry( letter, {
        font: font,
        size: textInitialSize,
        height: textInitialSize / 2,
        curveSegments: 4,
        bevelThickness: textBevelThickness,
        bevelSize: textBevelSize,
        bevelEnabled: true
      });

// Using buffergeometry for performance.
            textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );

  // Create text material : similar to balloon material
            var material = new THREE.MeshPhongMaterial( {
              color: textColors[textAnimeColors[i]],
              flatShading: true,
              shininess: 50,
              specular: 0x777777,
              transparent: true,
              opacity: 0.7
            } );

  // Create textMesh for one letter.
    var textMesh = new THREE.Mesh(textGeo, material);
  // calculate rotation of i-th letter.
    var rot = Math.PI / 180 * textSizeInAngle * i;

  // calculate position based on rot.
    textMesh.position.x = distanceToText * Math.sin(rot) + cakeModel.position.x;
    textMesh.position.z = distanceToText * Math.cos(rot) * cakeModel.position.z;
    textMesh.position.y = 0;

      scene.add(textMesh); // add generated mesh to scene.

      textObjects.push(textMesh);  // save generated mesh for later control
      });
      });
  }
//Render Loop
var render = function () {
  requestAnimationFrame( render );

  // rotate candleFlame.
  cakeWithFlame.rotation.y -= cakeRotSpeed;

//random candle falme
  time += clock.getDelta();

  if(allFlameMaterials.length > 0) {
    allFlameMaterials.map(function(flameMaterial, i) {
      flameMaterial[0].uniforms.time.value = time + i;
    })
  }

  // Balloon random movement
  var timer = balloonSpeed * Date.now();

  for ( var i = 0, il = spheres.length; i < il; i ++ ) {
    var sphere = spheres[ i ];
    sphere.position.x = 500 * Math.cos( timer + i );
    sphere.position.y = 200 * Math.sin( timer + i * 1.5 );
  }
  // Text Animation
  // calculate next rotation angle of text.
  textRot -= textRotSpeed;
  if(textRot < 0) { // make it loop.
    textRot = textRot + 360;
  }
//shift lettr color by 1 and insert new random color at first letter
//and insert new random color at first letter.
  if((textRot % (textRotSpeed * textColorTransformSpeed)) < textRotSpeed) {
    for(var j = text.length - 1; j > 0; j --)
      textAnimeColors[j] = textAnimeColors[j - 1];
    textAnimeColors[j] = parseInt(Math.random() * textColors.length);
  }
   //text movement for each letter
  text.split('').map((letter, i) => {
    if(!textObjects[i])
      return;
//rotation angle calculation for i letter
var rot = Math.PI / 180 * (textSizeInAngle * i + textRot);
//text goes round cake model with radius separation of distanceToText and determine position of i
textObjects[i].position.x = distanceToText * Math.sin(rot) + cakeModel.position.x;
textObjects[i].position.z = distanceToText * Math.cos(rot) * cakeModel.position.z;
textObjects[i].position.y = cakeModel.position.y + Math.sin(rot * textYSpeed) * textYScope;
// letters face cakemodel
textObjects[i].rotation.y = -rot;
// Make i letter scale respond to rot
textObjects[i].scale.x = 1 + Math.sin(rot * textYSpeed) * textScaleSize;
textObjects[i].scale.y = 1 + Math.sin(rot * textYSpeed) * textScaleSize;
//update colour
if((textRot % (textRotSpeed * textColorTransformSpeed)) < textRotSpeed) {
      textObjects[i]['material']['color'].set(textColors[textAnimeColors[i]]);
    }
})
  // camera mouse animation
dx = ( mouseX - camera.position.x ) * .05
dy = ( - mouseY - camera.position.y ) * .05;

camera.position.x += dx;
camera.position.y += dy;

camera.lookAt( scene.position );

  renderer.setClearColor("#000000");
  renderer.render(scene, camera);
};

init();
geoletters();
render();
