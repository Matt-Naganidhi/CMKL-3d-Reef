import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(5);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#display"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

// Load PLY file - adjust the filePath to point to a valid .ply file served from your Django static files

export function loadPLY(filePath) {
    const loader = new PLYLoader();
    loader.load(filePath, (geo) => {
        const mat = new THREE.PointsMaterial({size: 0.1, vertexColors: true});
        const mesh = new THREE.Points(geo, mat);
        scene.add(mesh);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
;
