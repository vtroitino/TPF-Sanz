import * as THREE from '../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from  '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from  '../../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { VertexNormalsHelper } from '../../node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js';
// import { EqualStencilFunc } from 'three';
// import { VertexColors } from 'three';

var scene,renderer,camera,loader,loaderobj,directLight,moon,controles,screen = document.getElementById('canvas-luna'),grabbing;
var cubefaces,cubeMaterial,cubeGeometry,skybox,geocilind,matcilind,cylinder,countrender = 0,geometrypart,verticespart,part,materialpart,particles,randomdirect = [-1,1];
var raycaster,mouse,maxdistnat,mindistnat,intersects,crasheamuniverso;
var selectterrien = null;
var nterr = ['Copernicus','Kepler','Langrenus','Stevinus','Oceanus Procellarum','Eduardo Castex'],
    randomcolor = [0xFF2300,0x047DFE,0x9804FE,0xF3FE04,0x04FE98,0xFFFFF0],
    angleX = [-Math.PI - 0.3,Math.PI / 2,-1.9,0,0.3,0], angleZ = [0,0,-Math.PI / 12,Math.PI / 2,0,-1];
var dterr = {
    'Copernicus':'Sector donde se encuentra la bandera del primer alunisaje. Es donde se encuentra el primer polideportivo Lunar y el Museo de los primeros allegados',
    'Kepler':"Zona donde se grabaron las escenas de 'Alein 3', es la zona mas habitable y con mejor vista. Tiene muchos crateres profundos.",
    'Langrenus':'Se conoce como la zona oscura o zona muerta por su poca actividad, pero es la mas lisa y mas rica en titanita.',
    'Stevinus':'Simplemente Stevinus, el unico lugar en la luna donde se encontro una cueva profunda, inexplorada todavia, pero vuelve loco a los mas pelotudos con impetu de exploracion',
    'Oceanus Procellarum':'Zona mas habitada por los humanos y por los androides de andromeda, ya que posee un oceano es la zona mas prospera.',
    'Eduardo Castex':'La zona del "Dios" o mejor conocido Eduardo "Pampeano" Castex, este representa el culto a las empandas de morcilla en la Luna,es la zona mas prestigiosa(debido al mismo) y la mas fria a su vez.'
}
var pterr = {
    'Copernicus':55000,
    'Kepler':10000,
    'Langrenus':20000,
    'Stevinus':13000,
    'Oceanus Procellarum':42000,
    'Eduardo Castex':69000
}
var eterr = {
    'Copernicus':true,
    'Kepler':true,
    'Langrenus':true,
    'Stevinus':true,
    'Oceanus Procellarum':true,
    'Eduardo Castex':true
}
var descripcion = 'Bienvendio al manual de usuario de Frederic Moon, el simulador terrenal mas profesional del marcado: \n Navegar en la luna: para poder indagar en las distintas partes d ela luna, basta con mover la camara con el click izquierdo. Para contemplarla a mayor detalle puede hacer zoom con la ruedita del mouse. Puede cambiar distintas caracteristicas de la camra con las herramientas de escena "Config Camera".\n Para cmabiar la luminocidad tambien puede acceder a este con las herramientas de escnea "Config Light". Otras caracteristicas para darle un poco de ambiente a la escena es "VisibiltyObj" y "CORRUPTION".\nPara poder comprar terrenos, peude clickear en el boton "Bandera" y darle a "VER" para acceder a las propiedades del terreno y comprarlo.'

var selectterrientrue,
    precioInt;

let spanterr = document.getElementById('nombre-terreno'),
    imgterr = document.getElementById('foto-terreno'),
    descterr = document.getElementById('desc-terreno'),
    precioterr = document.getElementById('precio-terreno'),
    cterrside = document.getElementById('cterrenos-side'),
    bterrside = document.getElementById('bterrenos-side'),
    saldo = document.getElementById('saldo'),
    compraterr = document.getElementById('comprar-terreno'),
    infoicon = document.getElementById('info-link');  

init();
function init() {/* Escenea, render, camara, controles, skybox, luna, luces,*/
    scene = new THREE.Scene();
    
    renderer = new THREE.WebGLRenderer( { antialias: true, canvas : screen} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2);
    camera.position.set(3700,800,-400)
    
    directLight = new THREE.DirectionalLight( 0xffffff, 1.9);
    scene.add(directLight);
    
    controles = new OrbitControls( camera, renderer.domElement );
    controles.enablePan = false;
    controles.autoRotateSpeed = 4;
    controles.minDistance = 700;
    controles.maxDistance = 5000;

    cubeGeometry = new THREE.CubeGeometry( 60000, 60000, 60000 );// Skybox
    cubefaces = [
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../imagenes/Skybox/GalaxyTex_PositiveX.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../imagenes/Skybox/GalaxyTex_NegativeX.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../imagenes/Skybox/GalaxyTex_PositiveY.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../imagenes/Skybox/GalaxyTex_NegativeY.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../imagenes/Skybox/GalaxyTex_PositiveZ.png'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../imagenes/Skybox/GalaxyTex_NegativeZ.png'), side: THREE.DoubleSide} )
    ];
    loader = new THREE.TextureLoader();
    cubeMaterial = new THREE.MeshFaceMaterial( cubefaces );
    skybox = new THREE.Mesh( cubeGeometry, cubeMaterial );
    skybox.name = 'skybox'
    scene.add( skybox );
    
    loader = new GLTFLoader();
    loader.load(//moon
        '../modelos/moon.glb',
        function ( gltf ) {
            gltf.scene.children[0].name = 'moon'
            scene.add( gltf.scene.children[0] );
        }
    );
    loaderobj = new OBJLoader()
    loaderobj.load(//satelit
        '../modelos/sat.obj',
        function ( obj ) {
            obj.name = 'Satellite-DiscovM39'
            obj.position.y = 490
            scene.add( obj );
            obj.scale.set(16,16,16)
        }
    );
        
    geometrypart = new THREE.BufferGeometry();
    verticespart = [];
    part = new THREE.TextureLoader().load( '../imagenes/disc.png' );
            
    for ( let i = 0; i < 725; i ++ ) {
        const x = Math.floor(Math.random() * 5001) * randomdirect[Math.floor(Math.random() * 2)]
        const y = Math.floor(Math.random() * 5001) * randomdirect[Math.floor(Math.random() * 2)]
        const z = Math.floor(Math.random() * 5001) * randomdirect[Math.floor(Math.random() * 2)]
        verticespart.push( x, y, z ); 
    }
    geometrypart.setAttribute( 'position', new THREE.Float32BufferAttribute( verticespart, 3 ) );
    materialpart = new THREE.PointsMaterial( { size: 35, sizeAttenuation: true, map: part, alphaTest: 0.5, transparent: true } );
    materialpart.color.setHSL( 1.0, 0.3, 0.7 );
    particles = new THREE.Points( geometrypart, materialpart );
    particles.visible = false;
    scene.add( particles );
        
        //Cylindros = id terreno
    for(var t = 0; t < nterr.length;t++){
        const geocilind = new THREE.CylinderGeometry( 22, 0, 1004 , 64 );
        const matcilind = new THREE.MeshLambertMaterial( {color: 0x2825c9,transparent:true, opacity: 0.50} );
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

function grab(event){
    grabbing = true;
}
    


function tentativecalltodatabase (event) {
    grabbing = false;
    if( selectterrien != null) {
        selectterrientrue = selectterrien;
        precioInt = pterr[selectterrientrue];
        spanterr.innerHTML = selectterrientrue;
        imgterr.src = '../imagenes/Terrenos/' + selectterrientrue + '.jpg';
        precioterr.innerHTML = '$' + pterr[selectterrientrue] / 1000 + '.' + '000';
        descterr.innerHTML = dterr[selectterrientrue];
        M.Sidenav.getInstance(cterrside).open();
        if(eterr[selectterrientrue] == true) {
            document.getElementById('propietario').innerHTML = ""
            compraterr.classList.remove('disabled');
        } else {
            document.getElementById('propietario').innerHTML = ""
            compraterr.classList += ' disabled';
        }
    };
}

let select = document.querySelectorAll('.ver');
for (let i = 0; i < select.length; i++) {
    select[i].addEventListener("click", function() {
        M.Sidenav.getInstance(bterrside).close();
        let selectterr = select[i].id;
        selectterrien = select[i].id;
        selectterrientrue = select[i].id;
        bterrtriggercterr(selectterr);
    });
}

function bterrtriggercterr(selectterr) {
    selectterrientrue = selectterr;
    precioInt = pterr[selectterrientrue];
    spanterr.innerHTML = selectterrientrue;
    imgterr.src = '../imagenes/Terrenos/' + selectterrientrue + '.jpg';
    precioterr.innerHTML = '$' + pterr[selectterrientrue] / 1000 + '.' + '000';
    descterr.innerHTML = dterr[selectterrientrue];
    M.Sidenav.getInstance(cterrside).open();
    if(eterr[selectterrientrue] == true) {
        document.getElementById('propietario').innerHTML = "";
        compraterr.classList.remove('disabled');
    } else {
        document.getElementById('propietario').innerHTML = "Propietario: Tú";
        compraterr.classList += ' disabled';
    }
}

compraterr.addEventListener('click', function() {
    let saldoAnt = parseInt(saldo.textContent.substr(11, saldo.textContent.length))
    let saldoAct = saldoAnt - precioInt;
    console.log(saldoAct);
    saldo.innerHTML = 'Tu saldo: $' + saldoAct + '<i id="saldo-icon" class="fas fa-wallet"></i>';
    compraterr.classList += ' disabled';
    document.getElementById('alert-card').classList.remove('hide');
    eterr[selectterrientrue] = false;
    document.getElementById('propietario').innerHTML = "Propietario: Tú"
    setTimeout(function(){
        document.getElementById('alert-card').setAttribute('aria-hidden', 'true');
        document.getElementById('alert-card').classList += ' hide';
    }, 2000)
})

infoicon.addEventListener('click', function(){ document.getElementById('contenido-info').classList.remove('hide')})
document.getElementById('back-icon').addEventListener('click', () => M.Sidenav.getInstance(cterrside).close())
document.getElementsByClassName('close_info-icon')[0].addEventListener('click', function(){document.getElementById('contenido-info').classList += ' hide'})

function config() {
    const panel = new dat.GUI();
    const camera = panel.addFolder('Config Camera');
    const light = panel.addFolder('Config Light');
    const VisibiltyObj = panel.addFolder('VisibiltyObj')
    const CORRUPTION = panel.addFolder('CORRUPTION')
    var settings = {
        'autorotate':true,
        'autorotate-speed':10,
        'frustrum':45,
        'intencity-light':1.9,
        'light-color':0xffffff,
        'Visibility-terrines':true,
        'Visibility-Particles':false,
        'BlackHole':false
    }
    camera.add(settings,'autorotate').onChange(autoRotate)
    camera.add(settings,'autorotate-speed',0.1,200).onChange(autoRotateSpeedChange)
    camera.add(settings,'frustrum',5,359).onChange(changeFrustrum)
    light.addColor(settings, "light-color").listen().onChange(ChangeColorLight)
    light.add(settings,'intencity-light',0.1,30).onChange(IntencityLightChange)
    VisibiltyObj.add(settings,'Visibility-terrines').onChange(changeTerrines)
    VisibiltyObj.add(settings,'Visibility-Particles').onChange(changeParticles)
    CORRUPTION.add(settings,'BlackHole').onChange(changeCrash)
    camera.open()
    light.open()
    VisibiltyObj.open()
    CORRUPTION.open()
}

function render() { /* RENDEREAR LA ESCENA*/
    const time = Date.now() * 0.00005;
    const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
    materialpart.color.setHSL( h, 0.5, 0.5 );
    countrender += 20//Cambia el color de las particulas
    if(countrender > 600) {
        camera.far = 100000 
    }//Espera a que se cargue toda la escena
    if(crasheamuniverso == true){
        camera.fov += 0.5 
    }
    selectterrien = null
    controles.enabled = true
    controles.update()
    for(var g = 0; g < scene.children.length;g++){//Setea la opacidad como no seleciconado(de terrenos) para provenir
        if(scene.children[g].name.substr(0,4) == 'ter-'){
            scene.children[g].material.opacity = 0.50
        }
    }
    /* MAIN */
    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children )
    for ( var l = 0; l < intersects.length; l++ ) {//Identifica terrenos**POINTER**
        if(intersects[l].object.name.substr(0,4) == 'ter-' && l == 0){// el segundo condicional sirve para saber si la luna no esta de por medio 
            screen.style.cursor = 'pointer';
            selectterrien = intersects[l].object.name.substr(4,intersects[l].object.name.lenght)
            console.log(selectterrien)
            intersects[l].object.material.opacity = 1.0
            break;
        }else{
            screen.style.cursor = 'default'
        }
    }
    if(grabbing == true){
        screen.style.cursor = 'grabbing'
    }
    directLight.position.set(camera.position.x, camera.position.y - 300,camera.position.z - 700)
    camera.updateProjectionMatrix();
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}

function onWindowResize() { /* AJUSTE DE CAMARA*/
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) { /* ACTUALIZAR POSICION DEL MOUSE*/
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
function changeParticles(bool){
    particles.visible = bool
}
function autoRotate(bool){//Funciones perteneces a config
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
function changeCrash(bool){
    crasheamuniverso = bool
    if(crasheamuniverso == false){
        camera.fov = 45
    }
}
function changeFrustrum(factor){
    camera.fov = factor
}

//Sidenav
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});