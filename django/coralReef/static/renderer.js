import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

const display = document.querySelector("#display");
const width = display.getBoundingClientRect().width;
const height = display.getBoundingClientRect().height;

const renderer = new THREE.WebGLRenderer({canvas: display});
// Display size = whole window. Not dynamic
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
console.log("Renderer initialized");

const scene = new THREE.Scene();
console.log("Scene created");

const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.setZ(5);
console.log("Camera created");

// Camera movement controls
const controls = new OrbitControls(camera, renderer.domElement);
console.log("Controls initialized");

// const point_light = new THREE.PointLight(0xffffff, 1000);
// const ambient_light = new THREE.AmbientLight(0xffffff, 0.5);
// point_light.position.set(5, 5, 5);
// scene.add(point_light, ambient_light);
// Load 3D construct file
export function loadPLY(filePath) {
    const loader = new PLYLoader();
    loader.load(filePath, (geometry) => {
        const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
        console.log("PLY file loaded and added to scene");
    }, undefined, (error) => {
        console.error('Error loading .ply file:', error);
    });
    console.log("Loading PLY file...");
}


// Update loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    console.log("Animation frame rendered");
}

animate();
console.log("Animation loop started");
