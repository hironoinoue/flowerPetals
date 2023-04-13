import './style.css';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import petalsTexturePng01 from "./public/01.png";
import petalsTexturePng02 from "./public/02.png";
//import bgTexturePng09 from "./public/bg09.png";

//canvas
const canvas = document.querySelector("#webgl");
//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 1, 1000);
camera.position.set(0, 5, 0.1);
//renderer
camera.rotation.x = Math.PI * 0.5;
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
//renderer.setClearColor(0xd9e9ec, 1);
renderer.setPixelRatio(window.devicePixelRatio);
//mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
/*const bgLoader = new THREE.TextureLoader();
const bgimage = bgLoader.load(bgTexturePng09);
scene.background = bgimage;*/
/**
 * particles ↓↓
 */
const textureLoader01 = new THREE.TextureLoader();
const particlesTexture01 = textureLoader01.load(petalsTexturePng02);

const textureLoader02 = new THREE.TextureLoader();
const particlesTexture02 = textureLoader02.load(petalsTexturePng02);

const textureLoader03 = new THREE.TextureLoader();
const particlesTexture03 = textureLoader03.load(petalsTexturePng01);

const particlesGeometry01= new THREE.BufferGeometry();
const particlesGeometry02 = new THREE.BufferGeometry();
const particlesGeometry03 = new THREE.BufferGeometry();

const count01 = 860;
const count02 = 800;
const count03 = 300;

const positionArray01 = new Float32Array(count01 * 3);
for ( let i = 0; i < count01 * 3; i ++) {
  positionArray01[i] = (Math.random() - 0.5) * 20; 
}
particlesGeometry01.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray01, 3)
  );

const positionArray02 = new Float32Array(count02 * 3);
for (let i = 0; i < count02; i ++) {
  positionArray02[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry02.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray02, 3)
);

const positionArray03 = new Float32Array(count03 * 3);
for(let i = 0; i < count03; i++) {
  positionArray03[i] = (Math.random() * 0.5) * 20;
}
particlesGeometry03.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray03, 3)
);

const pointMaterial01 = new THREE.PointsMaterial({
  size: 0.5,
  //color: 0xffeffe,//pink
  color: 0xdce5f6,//blue
  sizeAttenuation: true,
  alphaMap: particlesTexture01,
  transparent: true,
  opacity: 1,
  depthWrite: false,

});
const particles01 = new THREE.Points(particlesGeometry01, pointMaterial01);
particles01 .position.set(1, 3, 2);
scene.add(particles01);

const pointMaterial02 = new THREE.PointsMaterial({
  size: 0.35,
  //color: 0xe775c0,//pink
  color: 0x3796d6,//blue
  sizeAttenuation: true,
  alphaMap: particlesTexture02,
  transparent: true,
  opacity: 1,
  depthWrite: false,
});
const particles02 = new THREE.Points(particlesGeometry02, pointMaterial02);
particles02 .position.set(1, 3, 3);
scene.add(particles02);

const pointMaterial03 = new THREE.PointsMaterial({
  size: 0.25,
  //color: 0xf42a71,//pink
  color: 0x0445d0,//blue
  sizeAttenuation: true,
  alphaMap: particlesTexture03,
  transparent: true,
  opacity: 0.7,
  depthWrite: false,
})
const particles03 = new THREE.Points(particlesGeometry03, pointMaterial03);
particles03.position.set(-1, -3, -3);
scene.add(particles03);

const particles = [particles01, particles02, particles03];

//animation
const clock = new THREE.Clock();
const tick = () => {
  const delta = clock.getDelta();
  for (const particle of particles){
    particle.rotation.x += 0.1 * delta;
    particle.rotation.z += 0.1 * delta;
  }
  
  
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();
//resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})
