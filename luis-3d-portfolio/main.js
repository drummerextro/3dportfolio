import './style.css'
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module'

//setting the scene like in a game
const scene = new THREE.Scene();

//sets the type of camera and position and perspective of it based on size of window

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 150);


//chooses the renderer and puts it into the canvas
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('#bg'),
});

//sets the size and camera position for devices
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

camera.position.set( 3, -3, 30 );
//camera.position.setZ(30);


//creates orbit controls into the browser
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true

// controls.minDistance = 1;
// controls.maxDistance = 1000;

// controls.minZoom = 2;
// controls.maxZoom = 500;

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


//creates a spheracle figure 
function addStar(){
const geometry = new THREE.SphereGeometry(.25,24,24);
const material = new THREE.MeshStandardMaterial ({color: 0xffffff})
const star = new THREE.Mesh(geometry, material);

//creates a math variable which randomly generates a bumber betwen a -2 to +100 spread
const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100));

//sets postion of stars
star.position.set(x,y,z);

//adds star to scene
scene.add(star)
}

//decides how many stars added to the scene, then fill it, and add.
Array(200).fill().forEach(addStar)


//adding a background of some sort using a material
const bgTexture = new THREE.TextureLoader().load('bluemoonbg.png');
scene.background = bgTexture;

//GROUP FOR O3D OBJECT

// Instantiate a loader for 3d objects as a group. EACH loader is a group
const redStaplerObject = new FBXLoader();
//materials for objects
const redStaplerTexture = new THREE.TextureLoader().load('objects/redStapler.png');

redStaplerObject.load('objects/redStapler.fbx',
(redstapler) => {

  redstapler.scale.set(.2,.2,.2);
  redstapler.position.set(0,-5,-30);
  redstapler.rotation.set(5,5,5);
  redstapler.traverse(function (child) {
    if (child instanceof THREE.Mesh) {

        // apply texture
        child.material.map = redStaplerTexture
        child.material.needsUpdate = true;
    }
});
  scene.add( redstapler )
  
  
//redStaplerObject.position.z = 30;
//redStaplerObject.position.setx(-10);

})

//geometry.position.z =30;
//geometry.position.setx(-10);


function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

//redStaplerObject.child.rotation.x += .05;
//redStaplerObject.child.y += .075;
//redStaplerObject.child.z += .05;

donut.rotation.z += .05;
donut.rotation.y += .075;
donut.rotation.x += .05;

camera.position.z = t * -.05; 
camera.position.y = t * -0.02;
camera.position.x = t * 0.00;

}

//document.body.onscroll = 

document.body.onscroll = function () {
  //calculate the current scroll progress as a percentage
  scrollPercent =
      ((document.documentElement.scrollTop || document.body.scrollTop) /
          ((document.documentElement.scrollHeight ||
              document.body.scrollHeight) -
              document.documentElement.clientHeight)) *
          100;
  document.getElementById('scrollProgress').innerText =
      'Scroll Progress : ' + scrollPercent.toFixed(2);

moveCamera();

    };


console.log(camera.position);

function scalePercent(start, end) {
  return (scrollPercent - start) / (end - start);
}

function playScrollAnimations() {
  animationScripts.forEach(function (a) {
      if (scrollPercent >= a.start && scrollPercent < a.end) {
          a.func();
      }
  });
}
var scrollPercent = 0;





const stats = Stats()
document.body.appendChild(stats.dom)



// function updateCamera(ev) {
//   let div1 = document.getElementById("div1");
// camera.position.z = -1.5 + window.scrollY / 250.0;
// }

// window.addEventListener("scroll", updateCamera);



//loop a animation which in this case is the scene refresh
function animate(){
  requestAnimationFrame(animate);

  //rotation of a simple object
  donut.rotation.x += 0.02;
  donut.rotation.y += 0.005;
  donut.rotation.z += -0.02;
  


//updates and makign sure canges are reflected onto the DOM
stats.update()
  //draws onto the screen
renderer.render(scene, camera);
}

//calls the animate function which refreshes the camera
animate();


