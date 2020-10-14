import * as THREE from '../../node_modules/three/build/three.module.js';

import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from  '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;

let directLight, directLightHelper, shadowCameraHelper;

init();
render();

function init() {

    // Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camara
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 20, 8, 8 );

    // Controles
    let controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 15; // 15
    controls.maxDistance = 30; //30

    // La Luna
    let loader = new GLTFLoader();
    loader.load( './modelos/moon.glb', handle_load);

    let moon;

    function handle_load(gltf) {
        moon = gltf.scene.children[0];
        moon.scale.set(10, 10, 10);
        scene.add(moon);
    }

    // let moonMaterial = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('./imagenes/Luna/2k_moon.jpg')} );
    // let moonGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );

    // let moon = new THREE.Mesh( moonGeometry, moonMaterial );
    
    // moon.castShadow = false;
    // scene.add( moon );

    // Helpers
    // shadowCameraHelper = new THREE.CameraHelper( directLight.shadow.camera );
    // scene.add( shadowCameraHelper );
    
    // let newCamera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
    // let cameraHelper = new THREE.CameraHelper(newCamera);
    // scene.add( cameraHelper );

    // directLightHelper = new THREE.DirectionalLightHelper( directLight );
    // scene.add( directLightHelper );

    //

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function render() {

    renderer.render( scene, camera );
    requestAnimationFrame(render);

}
