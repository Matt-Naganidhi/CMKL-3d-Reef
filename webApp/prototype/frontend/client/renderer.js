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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
camera.position.setZ(5);

// Camera movement controls
const controls = new OrbitControls(camera, renderer.domElement);

// const point_light = new THREE.PointLight(0xffffff, 1000);
// const ambient_light = new THREE.AmbientLight(0xffffff, 0.5);
// point_light.position.set(5, 5, 5);
// scene.add(point_light, ambient_light);

// Load 3D construct file
export function loadPLY(filePath) {
    const loader = new PLYLoader();
    loader.load(filePath, (geo) => {
        const mat = new THREE.PointsMaterial({size: 0.1, vertexColors: true});
        const mesh = new THREE.Points(geo, mat);
        scene.add(mesh);
    });
}

// Update loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();