import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

// 3D construct for testing
const MESH_PATH = "birdBushMesh/mesh.obj";
const MAT_PATH = "birdBushMesh/mesh.mtl";

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#display")
});
// Display size = whole window. Not dynamic
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)
camera.position.setZ(5);

// Camera movement controls
const controls = new OrbitControls(camera, renderer.domElement);

const point_light = new THREE.PointLight(0xffffff, 100);
const ambient_light = new THREE.AmbientLight(0xffffff, 0.5);
point_light.position.set(5, 5, 5);
scene.add(point_light, ambient_light);

// Load 3D construct file
const mat_loader = new MTLLoader();
const geo_loader = new OBJLoader();
mat_loader.load(MAT_PATH, (material) => {
    material.preload();
    geo_loader.setMaterials(material);
    geo_loader.load(MESH_PATH, (mesh) => {
        scene.add(mesh);
    });
});

// Update loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();