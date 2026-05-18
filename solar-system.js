import * as THREE from "three";

const canvas = document.querySelector("#solar-canvas");
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Solar canvas missing");
}

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x07111e, 0.022);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 300);
camera.position.set(0, 14, 34);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

scene.add(new THREE.AmbientLight(0x8aa5ff, 0.9));
const keyLight = new THREE.PointLight(0xffd7a1, 120, 100);
keyLight.position.set(0, 0, 0);
scene.add(keyLight);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3.1, 48, 48),
  new THREE.MeshStandardMaterial({
    color: 0xffb36d,
    emissive: 0xf05a6b,
    emissiveIntensity: 1.7,
    roughness: 0.34,
  })
);
scene.add(sun);

const glow = new THREE.Mesh(
  new THREE.SphereGeometry(4.4, 48, 48),
  new THREE.MeshBasicMaterial({ color: 0xff9e7a, transparent: true, opacity: 0.09 })
);
scene.add(glow);

const planetDefinitions = [
  { key: "projects", url: "./projects.html", radius: 8, size: 1.45, color: 0x77a6ff, speed: 0.18 },
  { key: "games", url: "./games.html", radius: 12, size: 1.2, color: 0xf05a6b, speed: 0.13 },
  { key: "resume", url: "./resume.html", radius: 16, size: 1.35, color: 0xa179ff, speed: 0.1 },
  { key: "contact", url: "./contact.html", radius: 20, size: 1.1, color: 0x68ddb8, speed: 0.075 },
];

const planets = [];
const interactiveMeshes = [];
const labelLayer = document.createElement("div");
labelLayer.className = "planet-label-layer";
document.body.appendChild(labelLayer);

for (const definition of planetDefinitions) {
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(definition.radius, 0.025, 8, 180),
    new THREE.MeshBasicMaterial({ color: 0x33558d, transparent: true, opacity: 0.62 })
  );
  orbit.rotation.x = Math.PI / 2;
  scene.add(orbit);

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(definition.size, 36, 36),
    new THREE.MeshStandardMaterial({
      color: definition.color,
      emissive: definition.color,
      emissiveIntensity: 0.18,
      roughness: 0.42,
      metalness: 0.18,
    })
  );
  mesh.userData = definition;
  scene.add(mesh);
  const labelElement = document.createElement("span");
  labelElement.className = "planet-label";
  labelElement.textContent = definition.key === "resume" ? "About" : definition.key[0].toUpperCase() + definition.key.slice(1);
  labelLayer.appendChild(labelElement);
  planets.push({ ...definition, mesh, angle: Math.random() * Math.PI * 2, labelElement });
  interactiveMeshes.push(mesh);
}

const starGeometry = new THREE.BufferGeometry();
const starCount = 1800;
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i += 1) {
  const i3 = i * 3;
  starPositions[i3] = (Math.random() - 0.5) * 180;
  starPositions[i3 + 1] = (Math.random() - 0.5) * 120;
  starPositions[i3 + 2] = (Math.random() - 0.5) * 180;
}
starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
scene.add(
  new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({ color: 0xcfe0ff, size: 0.16, transparent: true, opacity: 0.88 })
  )
);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const cameraTarget = new THREE.Vector3(0, 0, 0);
const desiredCameraPosition = new THREE.Vector3(0, 14, 34);
let pendingNavigation = null;

function focusPlanet(key) {
  const planet = planets.find((item) => item.key === key);
  if (!planet) return;
  cameraTarget.copy(planet.mesh.position);
  desiredCameraPosition.copy(planet.mesh.position).add(new THREE.Vector3(0, 4.8, 7.2));
  pendingNavigation = planet.url;
  window.setTimeout(() => {
    if (pendingNavigation === planet.url) window.location.href = planet.url;
  }, 950);
}

function updatePointer(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

canvas.addEventListener("pointermove", (event) => {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const [hit] = raycaster.intersectObjects(interactiveMeshes);
  canvas.style.cursor = hit ? "pointer" : "default";
});

canvas.addEventListener("pointerdown", (event) => {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const [hit] = raycaster.intersectObjects(interactiveMeshes);
  if (hit?.object?.userData?.key) focusPlanet(hit.object.userData.key);
});

document.querySelectorAll("[data-focus-planet]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    focusPlanet(button.dataset.focusPlanet);
  });
});

const clock = new THREE.Clock();
function animate() {
  const elapsed = clock.getElapsedTime();

  sun.rotation.y += 0.0025;
  glow.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.04);

  planets.forEach((planet) => {
    planet.angle += planet.speed * 0.01;
    planet.mesh.position.set(
      Math.cos(planet.angle) * planet.radius,
      Math.sin(planet.angle * 1.7) * 0.65,
      Math.sin(planet.angle) * planet.radius
    );
    planet.mesh.rotation.y += 0.01;
    const projected = planet.mesh.position.clone().project(camera);
    planet.labelElement.style.left = `${(projected.x * 0.5 + 0.5) * 100}%`;
    planet.labelElement.style.top = `${(-projected.y * 0.5 + 0.5) * 100}%`;
  });

  camera.position.lerp(desiredCameraPosition, 0.035);
  camera.lookAt(cameraTarget);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
