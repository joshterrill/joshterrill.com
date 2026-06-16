function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function startCube() {
  loadScript("/assets/plotly-gl3d-latest.min.js")
    .then(() => loadScript("/assets/complicatedjsfileforastupidanimation.js"))
    .catch(() => {});
}

window.addEventListener("load", () => {
  setTimeout(startCube, 0);
}, { once: true });
