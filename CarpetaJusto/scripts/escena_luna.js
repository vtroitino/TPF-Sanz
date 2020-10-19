import * as THREE from '../../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from  '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { VertexNormalsHelper } from '../../../node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js';

var cameratorend, scene, renderer,camera,loader,moon,moonposition,controles,axesHelper,gridHelper,cubeMaterials,cubeMaterial,cubeGeometry,skybox,vertixhelper,raycaster,mouse,intersects;

var screen = document.getElementById('canvaspace');

var directLight, directLightHelper;

init();
function init() {

    // Renderer
    scene = new THREE.Scene();
    
    renderer = new THREE.WebGLRenderer( { antialias: true, canvas : screen} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 50, 100000);
    camera.position.set(1800,300,0)
    
    directLight = new THREE.DirectionalLight( 0xfef8dd, 2);
    //directLight.target.position.set(x,y,z)
    scene.add(directLight);

    controles = new OrbitControls( camera, renderer.domElement );
    
    controles.enablePan = false;
    controles.rotateSpeed = 0.32;
    controles.minDistance = 700; 
    controles.maxDistance = 5000;

    cubeGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    cubeMaterials = [
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_PositiveX.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_NegativeX.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_PositiveY.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_NegativeY.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_PositiveZ.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_NegativeZ.png'), side: THREE.DoubleSide} )
    ];
    cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
    skybox = new THREE.Mesh( cubeGeometry, cubeMaterial );
    scene.add( skybox );
    loader = new GLTFLoader();
    loader.load(
        // resource URL
        './modelos/moon.glb',
        // called when the resource is loaded
        function ( gltf ) {

            scene.add( gltf.scene );

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

        },
        // called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );

    axesHelper = new THREE.AxesHelper( 1000 );
    scene.add( axesHelper );
    
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    //window.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'mousedown', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
    render()
}

function onWindowResize() { /* AJUSTE DE CAMARA*/
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function render() { /* RENDEREAR LA ESCENA*/
    // raycaster.setFromCamera( mouse, camera );
    // intersects = raycaster.intersectObjects( scene.children )
    // for ( var i = 0; i < intersects.length; i++ ) {
    //     if(intersects[i].object.name == 'moon'){
    //         intersects[i].object.rotateX(0.3/*.rotation(new THREE.Euler(1,1,1,'XYZ'))*/)
    //     }
    // }
    console.log()
    // if(scene.children.length > 3){
    //     scene.children[3].position.z += 1
    // }
    directLight.position.set(camera.position.x, camera.position.y + 1300,camera.position.z - 1300)
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}

function onDocumentMouseMove( event ) { /* ACTUALIZAR POSICION DE MOUSE*/
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

// function initMoon() {
//     var moon,camera,loader,moonposition,controles,axesHelper,gridHelper;
//     loader = new GLTFLoader();
//     loader.load( './modelos/moon.glb', handle_load);
//     function handle_load(gltf) {
//         moon = gltf.scene.children[0];
//         scene.add(moon);
//         console.log(moon.position)
//     }
//     moonposition = [getRandomInt(8000,-8000),getRandomInt(8000,-8000),getRandomInt(8000,-8000)];
//     gridHelper = new THREE.GridHelper( 1000,30 );
//     gridHelper.position.set(moonposition);
//     scene.add( gridHelper );
//     axesHelper = new THREE.AxesHelper( 500 );
//     scene.add( axesHelper );
//     camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 50, 100000);
//     camera.position.set( moonposition - 1200, moonposition - 300, moonposition -  0 );
//     controles = new OrbitControls( camera, renderer.domElement );
//     controles.enablePan = false;
//     controles.rotateSpeed = 0.42;
//     controles.minDistance = 600; 
//     controles.maxDistance = 3000;
//     cameratorend = camera;
// }