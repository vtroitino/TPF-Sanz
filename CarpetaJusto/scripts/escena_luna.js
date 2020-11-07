import * as THREE from '../../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from  '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { VertexNormalsHelper } from '../../../node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js';

var scene,renderer,camera,loader,directLight,moon,controles,screen = document.getElementById('canvaspace');
var cubefaces,cubeMaterial,cubeGeometry,skybox,geocilind,matcilind,cylinder;
var raycaster,mouse,maxdistnat,mindistnat,intersects;
var selectterrien = null;
var nterr = ['Juan','Carlos','Maradona','Demartino','Pedroso','Zaragosa'],randomcolor = [0xFF2300,0x047DFE,0x9804FE,0xF3FE04,0x04FE98,0xFFFFF0],angleX=[-Math.PI / 2,Math.PI / 2,0,0,0,0],angleZ=[0,0,-Math.PI / 2,Math.PI / 2,9.4,0];
var container = document.getElementById( 'canvaspace' );

init();

function init() {/* Escenea, render, camara, controles, skybox, luna, luces,*/
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { antialias: true, canvas : screen} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 50, 100000);
    camera.position.set(3700,800,-400)
    
    directLight = new THREE.DirectionalLight( 0xfef8dd, 3);
    scene.add(directLight);

    controles = new OrbitControls( camera, renderer.domElement );
    controles.enablePan = false;
    // controles.rotateSpeed = 0.75;
    // controles.autoRotate = true;
    controles.autoRotateSpeed = 4;
    controles.minDistance = 50; 
    controles.maxDistance = 5000;
    // Skybox
    cubeGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    cubefaces = [
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_PositiveX.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_NegativeX.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_PositiveY.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_NegativeY.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_PositiveZ.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./imagenes/Skybox/GalaxyTex_NegativeZ.png'), side: THREE.DoubleSide} )
    ];
    loader = new THREE.TextureLoader();
    cubeMaterial = new THREE.MeshFaceMaterial( cubefaces );
    skybox = new THREE.Mesh( cubeGeometry, cubeMaterial );
    skybox.name = 'skybox'
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
    );//
    //Cylindros = id terreno
    for(var t = 0; t < nterr.length;t++){
        const geocilind = new THREE.CylinderGeometry( 25, 0, 1005 , 64 );
        const matcilind = new THREE.MeshLambertMaterial( {color: randomcolor[t],transparent:true, opacity: 0.75} );
        const cylinder = new THREE.Mesh( geocilind, matcilind );
        cylinder.name = 'ter-'.concat(nterr[t]) 
        cylinder.rotateX(angleX[t])
        cylinder.rotateZ(angleZ[t])
        scene.add( cylinder );//
    }
    //Listeners utiles para el canvas y el detector de objetos(mouse y raycaster)
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    window.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'pointerup', tentativecalltodatabase, false );
    console.log(scene.children)
    config();
    render();
}

function tentativecalltodatabase (event){
    if( selectterrien != null){/* calllear api de valik y finalizar tp*/};
}
function config() {
    const panel = new dat.GUI();
    const camera = panel.addFolder('Config Camera');
    const light = panel.addFolder('Config Light');
    const terrines = panel.addFolder('Terrines')
    var settings = {
        'autorotate':true,
        'autorotate-speed':10,
        'intencity-light':3,
        'light-color':0xfef8dd,
        'show-terrines': true,
    }
    camera.add(settings,'autorotate').onChange(autoRotate)
    camera.add(settings,'autorotate-speed',0.1,200).onChange(autoRotateSpeedChange)
    light.addColor(settings, "light-color").listen().onChange(ChangeColorLight)
    light.add(settings,'intencity-light',0.1,30).onChange(IntencityLightChange)
    terrines.add(settings,'show-terrines').onChange(changeTerrines)

    function autoRotate(bool){
        controles.autoRotate = bool
    }
    function autoRotateSpeedChange( factorrot ){
        controles.autoRotateSpeed = factorrot
    }
    function IntencityLightChange(intens){
        directLight.intensity = intens
    }
    function ChangeColorLight(color){
        directLight.color.setHex(color)
    }
    function changeTerrines(bool){
        for(var a = 0; a < scene.children.length;a++){
            if(scene.children[a].name.substr(0,4) == 'ter-'){
                scene.children[a].visible = bool
            }
        } 
    }
    camera.open()
    light.open()
    terrines.open()
}

function onWindowResize() { /* AJUSTE DE CAMARA*/
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function render() { /* RENDEREAR LA ESCENA*/
    //Detecta cuando algo no esta siendo tocado (los terrenos especificamente)
    selectterrien = null
    controles.enabled = true
    controles.update()
    for(var g = 0; g < scene.children.length;g++){
        if(scene.children[g].name.substr(0,4) == 'ter-'){
            scene.children[g].material.opacity = 0.75
        }
    }//
    /* MAIN */
    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children )
    for ( var i = 0; i < intersects.length; i++ ) {//Identifica la luna**GRAB**
        if(intersects[i].object.name == 'moon'){
            document.getElementById('canvaspace').style.cursor = 'grab';
            break;
        }
        else if(intersects[i].object.name != 'moon'){
            document.getElementById('canvaspace').style.cursor = 'default';
        }
    }
    for ( var l = 0; l < intersects.length; l++ ) {//Identifica terrenos**POINTER**
        if(intersects[l].object.name.substr(0,4) == 'ter-' && l == 0){// el segundo condicional sirve para saber si la luna no esta de por medio 
            document.getElementById('canvaspace').style.cursor = 'pointer';
            selectterrien = intersects[l].object.name.substr(4,intersects[l].object.name.lenght)
            intersects[l].object.material.opacity = 1.0
        }
    }
    //console.log(scene.children)  
    directLight.position.set(camera.position.x, camera.position.y - 300,camera.position.z - 700)
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}

function onDocumentMouseMove( event ) { /* ACTUALIZAR POSICION DEL MOUSE*/
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
