var $hYmQo$three = require("three");
var $hYmQo$threeexamplesjsmcontrolsOrbitControls = require("three/examples/jsm/controls/OrbitControls");
var $hYmQo$threeexamplesjsmloadersPLYLoader = require("three/examples/jsm/loaders/PLYLoader");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "loadPLY", () => $8cd833d8f09f7d03$export$fc4b3c989a9262fb);



const $8cd833d8f09f7d03$var$display = document.querySelector("#display");
const $8cd833d8f09f7d03$var$width = $8cd833d8f09f7d03$var$display.getBoundingClientRect().width;
const $8cd833d8f09f7d03$var$height = $8cd833d8f09f7d03$var$display.getBoundingClientRect().height;
const $8cd833d8f09f7d03$var$renderer = new $hYmQo$three.WebGLRenderer({
    canvas: $8cd833d8f09f7d03$var$display
});
// Display size = whole window. Not dynamic
$8cd833d8f09f7d03$var$renderer.setPixelRatio(window.devicePixelRatio);
$8cd833d8f09f7d03$var$renderer.setSize($8cd833d8f09f7d03$var$width, $8cd833d8f09f7d03$var$height);
const $8cd833d8f09f7d03$var$scene = new $hYmQo$three.Scene();
const $8cd833d8f09f7d03$var$camera = new $hYmQo$three.PerspectiveCamera(75, $8cd833d8f09f7d03$var$width / $8cd833d8f09f7d03$var$height, 0.1, 1000);
$8cd833d8f09f7d03$var$camera.position.setZ(5);
// Camera movement controls
const $8cd833d8f09f7d03$var$controls = new (0, $hYmQo$threeexamplesjsmcontrolsOrbitControls.OrbitControls)($8cd833d8f09f7d03$var$camera, $8cd833d8f09f7d03$var$renderer.domElement);
function $8cd833d8f09f7d03$export$fc4b3c989a9262fb(filePath) {
    const loader = new (0, $hYmQo$threeexamplesjsmloadersPLYLoader.PLYLoader)();
    loader.load(filePath, (geo)=>{
        const mat = new $hYmQo$three.PointsMaterial({
            size: 0.1,
            vertexColors: true
        });
        const mesh = new $hYmQo$three.Points(geo, mat);
        $8cd833d8f09f7d03$var$scene.add(mesh);
    });
}
// Update loop
function $8cd833d8f09f7d03$var$animate() {
    requestAnimationFrame($8cd833d8f09f7d03$var$animate);
    $8cd833d8f09f7d03$var$controls.update();
    $8cd833d8f09f7d03$var$renderer.render($8cd833d8f09f7d03$var$scene, $8cd833d8f09f7d03$var$camera);
}
$8cd833d8f09f7d03$var$animate();


//# sourceMappingURL=server.js.map
