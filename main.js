import { loadGLTF, loadVideo } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

  let video = null;
  const init = async () => {
    video = await loadVideo("kyokai.mp4");
    texture = new THREE.VideoTexture(video);
    video.play();
    video.pause();
  }



  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/card_maruta.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    // const video = await loadVideo("./assets/videos/sintel/snow.mp4");
    const video = await loadVideo("kyokai.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(408 / 480, 2);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener('play', () => {
      video.currentTime = 0;
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  // start();
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);
});
