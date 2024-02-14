import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#display")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geo = new THREE.TorusGeometry(10, 3, 16, 100);
const mat = new THREE.MeshBasicMaterial({color: 0xff6347, wireframe: true});
const torus = new THREE.Mesh(geo, mat);

scene.add(torus);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();