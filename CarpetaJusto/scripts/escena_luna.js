import * as THREE from '../../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from  '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { VertexNormalsHelper } from '../../../node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js';

var scene, renderer,camera,loader,moon,manmoon,controles,axesHelper,cubeMaterials,cubeMaterial,cubeGeometry,skybox,raycaster,mouse,directLight,screen = document.getElementById('canvaspace'),maxdistnat,mindistnat,inmoon;

init();

function init() {/* */

    // Renderer
    scene = new THREE.Scene();
    
    renderer = new THREE.WebGLRenderer( { antialias: true, canvas : screen} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 50, 100000);
    camera.position.set(1700,300,0)
    
    directLight = new THREE.DirectionalLight( 0xfef8dd, 2);
    //directLight.target.position.set(x,y,z)
    scene.add(directLight);

    controles = new OrbitControls( camera, renderer.domElement );
    //controles.enabled = false
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
        './modelos/moon.glb',
        function ( gltf ) {
            gltf.scene.children[0].name = 'moon'
            scene.add( gltf.scene.children[0] );
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' )
        }
    );
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    window.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
    render()
}

function onWindowResize() { /* AJUSTE DE CAMARA*/
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function render() { /* RENDEREAR LA ESCENA*/
    if (scene.children != 4){
        controles.enabled = true
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( scene.children )
        for ( var i = 0; i < intersects.length; i++ ) {
            if(intersects[i].object.name == 'moon'){
                document.getElementById('canvaspace').style.cursor = 'grab';
                break
            }
            else if(intersects[i].object.name != 'moon'){
                document.getElementById('canvaspace').style.cursor = 'default';
            }
        }
        directLight.position.set(camera.position.x, camera.position.y + 1300,camera.position.z - 1300)
        renderer.render( scene, camera );
        requestAnimationFrame(render);
        document.getElementById('carga').className = 'hide';
        document.getElementById('contenido-pagina').className = 'center';
    }
}

function onDocumentMouseMove( event ) { /* ACTUALIZAR POSICION DEL MOUSE*/
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
