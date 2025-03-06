import * as THREE from 'three';
import {Player} from "./player.js"
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color(20, 20, 150);


const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

const light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light2 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x22aa22 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
var p = new Player(renderer.domElement, 2.0, camera).setup();
function animate() {
    cube.rotateX(THREE.MathUtils.degToRad(1));
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );