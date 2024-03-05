import './style.css'
import * as THREE from 'three';

//Code by Jayger Kunakorn

//Always need 3 objects: Scene, Camera, Renderer

//Setting up the 3D scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0000ff); // Set background to blue

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // An optional setting that gives a smoother camera control experience
controls.dampingFactor = 0.05;

//Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

//Creating the corals by using geometries
const coralMaterial = new THREE.MeshPhongMaterial({ color: 0xff6347, flatShading: true });

//Coral
const geometry1 = new THREE.CylinderGeometry(0.5, 0.5, 3, 8);
const coral = new THREE.Mesh(geometry1, coralMaterial);
coral.position.x = -2;
scene.add(coral);

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const coral2 = new THREE.Mesh(geometry2, coralMaterial);
coral2.position.x = 2;
scene.add(coral2);

//Renderers the scene
const animate = function () 
{
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
};

animate();
