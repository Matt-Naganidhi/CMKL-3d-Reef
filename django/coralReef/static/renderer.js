import * as SPLAT from "gsplat";

const display = document.querySelector("#display");
const width = display.getBoundingClientRect().width;
const height = display.getBoundingClientRect().height;

const renderer = new SPLAT.WebGLRenderer(display);
// Display size = whole window. Not dynamic
renderer.setSize(width, height);

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
camera.position.z = 5;

// Camera movement controls
const controls = new SPLAT.OrbitControls(camera, display);

export async function loadPLY(url) {
    await SPLAT.PLYLoader.LoadAsync(url, scene);
}

// Update loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();