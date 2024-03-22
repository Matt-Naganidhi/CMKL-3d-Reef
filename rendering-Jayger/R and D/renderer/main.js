import './style.css'
import * as THREE from 'three';

//Code by Jayger Kunakorn
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Water
const waterGeometry = new THREE.PlaneBufferGeometry(100, 100);
const water = new THREE.Water(
    waterGeometry,
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('https://unpkg.com/three/examples/textures/waternormals.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        alpha: 1.0,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
    }
);
water.rotation.x = -Math.PI / 2;
scene.add(water);

// Lights
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(-1, 1, 1);
scene.add(directionalLight);

// Corals (Simple geometries for example)
const coralMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
for (let i = 0; i < 10; i++) {
    const geometry = new THREE.ConeGeometry(0.5, 1, 32);
    const coral = new THREE.Mesh(geometry, coralMaterial);
    coral.position.set(Math.random() * 20 - 10, -2, Math.random() * 20 - 10);
    scene.add(coral);
}

// Fishes (Simple geometries for example)
const fishMaterial = new THREE.MeshLambertMaterial({color: 0xffff00});
for (let i = 0; i < 10; i++) {
    const geometry = new THREE.SphereGeometry(0.25, 32, 16);
    const fish = new THREE.Mesh(geometry, fishMaterial);
    fish.position.set(Math.random() * 20 - 10, Math.random() * 5 - 2.5, Math.random() * 20 - 10);
    scene.add(fish);
}

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.495;
controls.target.set(0, 1, 0);
controls.minDistance = 10.0;
controls.maxDistance = 40.0;
controls.update();

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
