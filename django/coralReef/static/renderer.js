// Import necessary components from Three.js
console.log('renderer.js is loaded and running');

import * as THREE from '/static/three/three.module.js';
import { OrbitControls } from '/static/three/OrbitControls.js';
import { PLYLoader } from '/static/three/PLYLoader.js';

console.log('After importing Three.js modules');

let scene, renderer, camera, controls; // Declare these variables outside so they can be accessed by loadPLY

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');
    init(); // Call init to setup the scene, camera, renderer, and controls
    // Start the animation loop
    animate();
});

function init() {
    const display = document.querySelector("#display");
    const width = display.getBoundingClientRect().width;
    const height = display.getBoundingClientRect().height;

    renderer = new THREE.WebGLRenderer({canvas: display});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.setZ(5);

    controls = new OrbitControls(camera, renderer.domElement);
}

// Exposed function to load a .ply file and add it to the scene
export function loadPLY(plyFilePath) {
    const loader = new PLYLoader();
    loader.load(plyFilePath, (geometry) => {
        console.log('PLY file loaded');
        const material = new THREE.PointsMaterial({size: 0.1, vertexColors: true});
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh); // Add the mesh to the scene
    }, undefined, function (error) {
        console.error('Error loading PLY file:', error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
