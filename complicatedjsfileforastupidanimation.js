const N = 80;
const half = 1.0;
const cornerRadius = 0.22;
const stride = 7;

function linspace(start, end, n) {
  const arr = [];
  const step = (end - start) / (n - 1);
  for (let i = 0; i < n; i++) arr.push(start + step * i);
  return arr;
}

const s = linspace(-1, 1, N);

function roundedBoxPoint(x, y, z) {
  const r = cornerRadius;
  const inner = half - r;

  const px = Math.max(-inner, Math.min(inner, x));
  const py = Math.max(-inner, Math.min(inner, y));
  const pz = Math.max(-inner, Math.min(inner, z));

  const dx = x - px;
  const dy = y - py;
  const dz = z - pz;

  const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (len === 0) return [x, y, z];

  return [
    px + r * dx / len,
    py + r * dy / len,
    pz + r * dz / len
  ];
}

function makeFace(axis, sign) {
  const x = [];
  const y = [];
  const z = [];

  for (let i = 0; i < N; i += stride) {
    const xr = [];
    const yr = [];
    const zr = [];

    for (let j = 0; j < N; j += stride) {
      const a = s[j];
      const b = s[i];

      let x0, y0, z0;

      if (axis === "z") {
        x0 = a;
        y0 = b;
        z0 = sign * half;
      } else if (axis === "x") {
        x0 = sign * half;
        y0 = a;
        z0 = b;
      } else if (axis === "y") {
        x0 = a;
        y0 = sign * half;
        z0 = b;
      }

      const p = roundedBoxPoint(x0, y0, z0);

      xr.push(p[0]);
      yr.push(p[1]);
      zr.push(p[2]);
    }

    x.push(xr);
    y.push(yr);
    z.push(zr);
  }

  return { x, y, z };
}

const traces = [];

const faces = [
  ["z", 1], ["z", -1],
  ["x", 1], ["x", -1],
  ["y", 1], ["y", -1]
];

for (const [axis, sign] of faces) {
  const face = makeFace(axis, sign);

  traces.push({
    type: "surface",
    x: face.x,
    y: face.y,
    z: face.z,
    surfacecolor: face.z,
    colorscale: "RdBu",
    reversescale: true,
    opacity: 0.98,
    showscale: false,
    hoverinfo: "skip"
  });

  const rows = face.x.length;
  const cols = face.x[0].length;

  for (let r = 0; r < rows; r++) {
    traces.push({
      type: "scatter3d",
      mode: "lines",
      x: face.x[r],
      y: face.y[r],
      z: face.z[r],
      line: { color: "black", width: 0.55 },
      showlegend: false,
      hoverinfo: "skip"
    });
  }

  for (let c = 0; c < cols; c++) {
    const xs = [];
    const ys = [];
    const zs = [];

    for (let r = 0; r < rows; r++) {
      xs.push(face.x[r][c]);
      ys.push(face.y[r][c]);
      zs.push(face.z[r][c]);
    }

    traces.push({
      type: "scatter3d",
      mode: "lines",
      x: xs,
      y: ys,
      z: zs,
      line: { color: "black", width: 0.55 },
      showlegend: false,
      hoverinfo: "skip"
    });
  }
}

const layout = {
  autosize: true,
  margin: { l: 0, r: 0, t: 0, b: 0 },
  scene: {
    domain: { x: [0, 1], y: [0, 1] },
    aspectmode: "cube",
    xaxis: {
      visible: false,
      range: [-1, 1],
      autorange: false
    },
    yaxis: {
      visible: false,
      range: [-1, 1],
      autorange: false
    },
    zaxis: {
      visible: false,
      range: [-1, 1],
      autorange: false
    },
    camera: {
      eye: { x: 1.18, y: -1.34, z: 0.88 },
      center: { x: 0, y: 0, z: 0 }
    }
  },
  paper_bgcolor: "rgba(255,255,255,0)",
  plot_bgcolor: "rgba(255,255,255,0)"
};

const config = {
  responsive: true,
  displayModeBar: false,
  scrollZoom: false
};

Plotly.newPlot("plot", traces, layout, config);

let rotX = 0.75;
let rotY = 0.75;
let rotZ = 0.0;

let velX = 0.00025;
let velY = 0.00035;
let velZ = 0.00010;

let mouseVX = 0;
let mouseVY = 0;

let lastMouseX = window.innerWidth / 2;
let lastMouseY = window.innerHeight / 2;
let lastUpdate = 0;

function cameraFromRotation(rx, ry, rz) {
  const radius = 2.1;

  let x = radius * Math.cos(rx) * Math.sin(ry);
  let y = radius * Math.sin(rx);
  let z = radius * Math.cos(rx) * Math.cos(ry);

  const cz = Math.cos(rz);
  const sz = Math.sin(rz);

  return {
    x: x * cz - y * sz,
    y: x * sz + y * cz,
    z
  };
}

const mouseSensitivity = 0.00001;

window.addEventListener("mousemove", (e) => {
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;

  lastMouseX = e.clientX;
  lastMouseY = e.clientY;

  mouseVX += dx * mouseSensitivity;
  mouseVY += dy * mouseSensitivity;
});

function animate(t) {
  const time = t * 0.001;

  const randomX =
    0.00018 * Math.sin(time * 0.71) +
    0.00011 * Math.sin(time * 1.37);

  const randomY =
    0.00015 * Math.sin(time * 0.53) +
    0.00010 * Math.sin(time * 1.91);

  const randomZ =
    0.00012 * Math.sin(time * 0.83) +
    0.00008 * Math.sin(time * 1.43);

  velY += mouseVX;
  velX += mouseVY;

  velX += randomX;
  velY += randomY;
  velZ += randomZ;

  velX *= 0.992;
  velY *= 0.992;
  velZ *= 0.995;

  mouseVX *= 0.92;
  mouseVY *= 0.92;

  rotX += velX;
  rotY += velY;
  rotZ += velZ;

  if (t - lastUpdate > 33) {
    lastUpdate = t;
    Plotly.relayout("plot", {
      "scene.camera.eye": cameraFromRotation(rotX, rotY, rotZ)
    });
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

window.addEventListener("resize", () => {
  Plotly.Plots.resize("plot");
});