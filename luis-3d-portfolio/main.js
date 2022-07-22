import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//setting the scene like in a game
const scene = new THREE.Scene();

//sets the type of camera and position and perspective of it based on size of window

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000);

//chooses the renderer and puts it into the canvas
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

//sets the size and camera position for devices
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


//create objects and define object
const geometry = new THREE.TorusGeometry(10,3,16,100);

//materials
const material = new THREE.MeshStandardMaterial({color: 0xFF6849});
//brings the mesh and the object as one by combining
const donut = new THREE.Mesh(geometry, material);

//adding the object created above
scene.add(donut)

//create lighting in the scene
const pointLight = new THREE.PointLight(0xffffff)

//position the light away from the center
pointLight.position.set( 10, 10, 10)

//ambient lighting
const ambLight = new THREE.AmbientLight(0xffffff)

//add the light to your scene
scene.add(pointLight, ambLight)

//lighthelper helps with position and direction of light in the world
const lightHelper = new THREE.PointLightHelper(pointLight) 
//add a grid into the world
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

//creates orbit controls into the browser
const controls = new OrbitControls(camera, renderer.domElement);

//loop a animation which in this case is the scene refresh
function animate(){
  requestAnimationFrame(animate);

  //rotation of object
  donut.rotation.x += 0.02;
  donut.rotation.y += 0.005;
  donut.rotation.z += 0.02;

//updates and makign sure canges are reflected onto the DOM
controls.update();

  //draws onto the screen
renderer.render(scene, camera);
}

//calls the animate function which refreshes the camera
animate();
