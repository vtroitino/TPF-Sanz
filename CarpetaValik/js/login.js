import * as THREE from '../../node_modules/three/build/three.module.js';

let screen = document.getElementById('canvas-login');
let scene, camera, renderer, stars, starGeo;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer( { canvas: screen } );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    starGeo = new THREE.Geometry();
    for(let i=0; i<6000; i++) {
        let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load('./imagenes/star.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    window.addEventListener('resize', onWindowResize, false);
    
    render();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function render() {
    starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity;
        
        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y += 0.002;
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

//CSS

//JS Alerta
let close = document.getElementById('alert_close');
let alert = document.getElementById('alert_box');

close.addEventListener('click', () => alert.style.opacity = '0');
alert.addEventListener('transitionend', () => alert.remove());

//JS Mostrar/Esconder Contraseña
let password = document.getElementById('myPassword')

password.addEventListener('click', function () {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
});

