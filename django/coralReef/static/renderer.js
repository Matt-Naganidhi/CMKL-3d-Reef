// Import necessary components from Three.js
console.log('Before importing Three.js modules');

import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { PLYLoader } from 'https://unpkg.com/three/examples/jsm/loaders/PLYLoader.js';

console.log('After importing Three.js modules');

// Wait for the document to fully load to ensure all elements are accessible
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');
    // Read the .ply file path from the data-ply-path attribute of the #modelPath element
    const modelPathElement = document.getElementById('modelPath');
    const plyFilePath = modelPathElement.getAttribute('data-ply-path');

    // Select the canvas element and set its width and height
    const display = document.querySelector("#display");
    const width = display.getBoundingClientRect().width;
    const height = display.getBoundingClientRect().height;

    // Initialize the WebGL renderer with the canvas
    const renderer = new THREE.WebGLRenderer({canvas: display});
    renderer.setPixelRatio(window.devicePixelRatio); // Set the pixel ratio to support high-resolution displays
    renderer.setSize(width, height); // Set the renderer size to fill the canvas

    // Create a new Three.js scene
    const scene = new THREE.Scene();

    // Set up the camera with a perspective view
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.setZ(5); // Position the camera to view the scene

    // Initialize camera controls for interactive movement in the scene
    const controls = new OrbitControls(camera, renderer.domElement);

    // Uncomment below if you need lighting in your scene
    // const point_light = new THREE.PointLight(0xffffff, 1000);
    // const ambient_light = new THREE.AmbientLight(0xffffff, 0.5);
    // point_light.position.set(5, 5, 5);
    // scene.add(point_light, ambient_light);

    // Function to load a .ply file and add it to the scene
    const loader = new PLYLoader();
    loader.load(plyFilePath, (geometry) => {
        console.log('PLY file loaded');
        const material = new THREE.PointsMaterial({size: 0.1, vertexColors: true}); // Create a material for the points
        const mesh = new THREE.Points(geometry, material); // Create a mesh from the loaded geometry and material
        scene.add(mesh); // Add the mesh to the scene
    });

    // Function to continuously update the scene and controls
    function animate() {
        requestAnimationFrame(animate); // Request the next frame for animation
        controls.update(); // Update the controls based on user interaction
        renderer.render(scene, camera); // Render the current state of the scene with the camera
    }

    // Start the animation loop
    animate();
});
