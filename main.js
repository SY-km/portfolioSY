
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer( { alpha:true, antialias: true, preserveDrawingBuffer: true } );
	var loader = new THREE.TextureLoader();
renderer.setSize( window.innerWidth, window.innerHeight );

var size=20;
const canvas = renderer.domElement;
document.body.appendChild(renderer.domElement );

var controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.update();

camera.position.y = 30;
camera.position.z= -40
camera.lookAt(new THREE.Vector3(0, 0, 0));

loader.setCrossOrigin('anonymous');
const geometry = new THREE.PlaneGeometry( size*1.168, size, 32 );
const material = new THREE.MeshPhongMaterial( {color: 0xdddddd, side: THREE.DoubleSide,
	map: loader.load('https://ibb.co/j6Ddd8K')} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.rotation.x=Math.PI/2;
plane.position.x = 0;
plane.position.y =0;


const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.PointLight(color, intensity);
light.position.set(0, 40, -10);
scene.add(light);

const helper = new THREE.PointLightHelper(light);
scene.add(helper);

const floor = new THREE.PlaneGeometry( 300, 300 );
const material2= new THREE.MeshPhongMaterial( {color: 0x123456, side: THREE.DoubleSide} );
const floorm = new THREE.Mesh( floor, material2 );
scene.add( floorm );
floorm.rotation.x=Math.PI/2;
floorm.position.y=-40;

const fold = new THREE.PlaneGeometry(size*1.168, size, 32);
const folder = new THREE.Mesh(fold,material);
scene.add(folder);
folder.rotation.x=Math.PI/2;
folder.position.x = 0;

function foldfunc(){
	folder.rotation.x+=(Math.PI/360);
	folder.position.y=0-size/2*Math.sin(folder.rotation.x-Math.PI/2);
	folder.position.z=-size/2+size/2*Math.cos(folder.rotation.x-Math.PI/2);
}


var foldstart=-1;

var framesPerSecond=60;

var animate = function () {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render( scene, camera );
	if (foldstart>0 && foldstart<180){
		foldfunc();
		foldstart+=1;
	}
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
};

animate();

function resizecanvas(){
	  renderer.setSize(window.innerWidth,window.innerHeight);
  }
  window.addEventListener('resize', resizecanvas , false);
