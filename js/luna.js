import * as THREE from '../../node_modules/three/build/three.module.js';

import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from  '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let screen = document.getElementById('canvas-luna');
let camera, scene, renderer;

let directLight, directLightHelper, shadowCameraHelper;

//CSS
let items = document.getElementsByClassName('user-options'),
    userView = document.getElementsByClassName('user-view'),
    userStyle = getComputedStyle(userView[0]).height,
    height = parseInt(userStyle) + 8;

init();

function init() {
    //CSS
    items[0].style.height = window.innerHeight - height + "px";

    // Renderer
    renderer = new THREE.WebGLRenderer( { canvas: screen, antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Escena
    scene = new THREE.Scene();

    // Camara
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 20, 8, 8 );

    // Controles
    let controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 15; // 15
    controls.maxDistance = 30; //30

    // Skybox		
    let cubeGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
    let cubeMaterials = [
        // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox1/front.png'), side: THREE.DoubleSide} ),
        // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox1/back.png'), side: THREE.DoubleSide} ),
        // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox1/left.png'), side: THREE.DoubleSide} ),
        // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox1/GalaxyTex_NegativeY.png'), side: THREE.DoubleSide} ),
        // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox1/GalaxyTex_PositiveZ.png'), side: THREE.DoubleSide} ),
        // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox1/GalaxyTex_NegativeZ.png'), side: THREE.DoubleSide} )
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox2/GalaxyTex_PositiveX.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox2/GalaxyTex_NegativeX.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox2/GalaxyTex_PositiveY.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox2/GalaxyTex_NegativeY.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox2/GalaxyTex_PositiveZ.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox2/GalaxyTex_NegativeZ.png'), side: THREE.DoubleSide} )
    ];
    let cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
    
    let skybox = new THREE.Mesh( cubeGeometry, cubeMaterial );
    scene.add( skybox );

    // La Luna
    // let loader = new GLTFLoader();
    // loader.load( './modelos/luna/Moon_2K.gltf', handle_load);

    // let moon;

    // function handle_load(gltf) {
    //     moon = gltf.scene.children[0];
    //     // moon.scale.set(10, 10, 10);
    //     scene.add(moon);
    // }

    let moonMaterial = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('./imagenes/Luna/2k_moon.jpg')} );
    let moonGeometry = new THREE.SphereBufferGeometry( 5, 32, 32);

    let moon = new THREE.Mesh( moonGeometry, moonMaterial );
    
    moon.castShadow = false;
    scene.add( moon );

    // Luces
    directLight = new THREE.DirectionalLight( 0xffffff, 1);
    directLight.position.set( -15, 10, 0 ); // 15, 40, 35
    camera.add( directLight );
    scene.add( new THREE.AmbientLight( 0xffffff, 0.1 ), camera);

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

    render();
}

function onWindowResize() {
    console.log(parseInt(height));

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    //CSS
    items[0].style.height = window.innerHeight - height + "px";

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function render() {

    renderer.render( scene, camera );
    requestAnimationFrame(render);

}

//CSS

//Sidenav
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

window.addEventListener('load', () => {
    document.getElementById('carga').className = 'hide';
    document.getElementById('contenido-pagina').className = 'center';
});