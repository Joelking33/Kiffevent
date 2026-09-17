/**
 * KIFFEVENT — charts.js
 * Mini-librairie interne de graphiques (ligne + anneau) en SVG pur.
 * Choix délibéré de ne pas embarquer Chart.js/D3 : le besoin (une
 * courbe d'évolution + une répartition) ne justifie pas une dépendance
 * externe, et un rendu SVG fait main reste léger et facile à adapter
 * à un futur jeu de données réel.
 */

/**
 * Dessine une courbe d'évolution (aire + ligne + point actif) dans `el`.
 * data: { labels: string[], values: number[], color: string, tooltipIndex?: number, tooltipLabel?: string, formatValue?: fn }
 */
function renderLineChart(el, data) {
  const w = 640, h = 220, padL = 36, padR = 10, padT = 18, padB = 26;
  const values = data.values;
  const max = Math.max(...values) * 1.15;
  const min = 0;
  const stepX = (w - padL - padR) / (values.length - 1);
  const yFor = (v) => padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
  const xFor = (i) => padL + i * stepX;

  const points = values.map((v, i) => [xFor(i), yFor(v)]);
  const linePath = points.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const areaPath = linePath + ` L${points[points.length - 1][0].toFixed(1)},${h - padB} L${points[0][0].toFixed(1)},${h - padB} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const y = padT + f * (h - padT - padB);
    const val = Math.round(max * (1 - f));
    return `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#EEF2FB" stroke-width="1"/>
            <text x="${padL - 8}" y="${y + 4}" font-size="10" fill="#94A3B8" text-anchor="end" font-family="Inter,sans-serif">${formatCompact(val)}</text>`;
  }).join("");

  const xLabels = values.map((_, i) => {
    if (values.length > 8 && i % 2 !== 0) return "";
    return `<text x="${xFor(i)}" y="${h - 6}" font-size="10" fill="#94A3B8" text-anchor="middle" font-family="Inter,sans-serif">${data.labels[i]}</text>`;
  }).join("");

  const tIdx = data.tooltipIndex !== undefined ? data.tooltipIndex : values.length - 1;
  const tip = points[tIdx];

  const uid = "grad" + Math.random().toString(36).slice(2, 8);

  el.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" data-chart="line">
      <defs>
        <linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${data.color}" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="${data.color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${gridLines}
      <path d="${areaPath}" fill="url(#${uid})"/>
      <path d="${linePath}" fill="none" stroke="${data.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${points.map((p, i) => `<circle class="chart-pt" data-i="${i}" cx="${p[0]}" cy="${p[1]}" r="${i === tIdx ? 5 : 8}" fill="${i === tIdx ? data.color : "transparent"}" stroke="${i === tIdx ? "white" : "none"}" stroke-width="2" style="cursor:pointer;"/>`).join("")}
      ${xLabels}
    </svg>
    <div class="chart-tooltip" style="left:${(tip[0] / w) * 100}%; top:${(tip[1] / h) * 100}%;">
      <b>${data.labels[tIdx]}</b><span>${data.tooltipLabel || formatNumber(values[tIdx])}</span>
    </div>`;

  el.querySelectorAll(".chart-pt").forEach((pt) => {
    pt.addEventListener("mouseenter", () => {
      const i = Number(pt.getAttribute("data-i"));
      const tt = el.querySelector(".chart-tooltip");
      const svg = el.querySelector("svg");
      const bbox = pt.getBoundingClientRect();
      tt.style.left = (points[i][0] / w) * 100 + "%";
      tt.style.top = (points[i][1] / h) * 100 + "%";
      tt.innerHTML = `<b>${data.labels[i]}</b><span>${data.formatValue ? data.formatValue(values[i]) : formatNumber(values[i])}</span>`;
      tt.classList.add("show");
    });
  });
}

function formatCompact(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k";
  return String(n);
}

/**
 * Dessine un anneau (donut) proportionnel en conic-gradient + légende.
 * container: élément qui recevra le disque ET la légende (deux enfants).
 * data: { segments: [{label, value, color}], centerLabel, centerValue }
 */
function renderDonutChart(ringEl, legendEl, data) {
  const total = data.segments.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const stops = data.segments.map((seg) => {
    const start = (acc / total) * 360;
    acc += seg.value;
    const end = (acc / total) * 360;
    return `${seg.color} ${start}deg ${end}deg`;
  }).join(", ");

  ringEl.style.background = `conic-gradient(${stops})`;
  ringEl.innerHTML = `<div class="donut-hole"><div class="dh-value">${data.centerValue}</div><div class="dh-label">${data.centerLabel}</div></div>`;

  if (legendEl) {
    legendEl.innerHTML = data.segments.map((seg) => `
      <div class="legend-row">
        <span class="dot" style="background:${seg.color}"></span>
        <span class="lbl">${seg.label}</span>
        <span class="val">${seg.displayValue || Math.round((seg.value / total) * 100) + "%"}</span>
      </div>`).join("");
  }
}

/** Barre de progression simple (largeur en %) */
function renderProgressBar(el, pct, color) {
  el.innerHTML = `<div class="progress-bg"><div class="progress-fill" style="width:${pct}%; ${color ? "background:" + color + ";" : ""}"></div></div>`;
}

/**
 * Pseudo-QR code déterministe (canvas), sans dépendance externe.
 * Même principe que côté espace Client : le motif est dérivé du texte
 * fourni (ex: numéro de billet) — reproductible, mais pas un vrai
 * décodeur/encodeur QR. Suffisant pour une maquette de scanner.
 */
function seededRandomAdmin(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}
function renderFakeQR(canvas, seedString, size) {
  size = size || canvas.width || 160;
  const grid = 21;
  const cell = Math.floor(size / grid);
  canvas.width = cell * grid; canvas.height = cell * grid;
  const ctx = canvas.getContext("2d");
  const rand = seededRandomAdmin(seedString);
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0F172A";
  function drawFinder(ox, oy) {
    ctx.fillRect(ox, oy, cell * 7, cell * 7);
    ctx.fillStyle = "#ffffff"; ctx.fillRect(ox + cell, oy + cell, cell * 5, cell * 5);
    ctx.fillStyle = "#0F172A"; ctx.fillRect(ox + cell * 2, oy + cell * 2, cell * 3, cell * 3);
  }
  drawFinder(0, 0); drawFinder((grid - 7) * cell, 0); drawFinder(0, (grid - 7) * cell);
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const inFinder = (x < 8 && y < 8) || (x > grid - 9 && y < 8) || (x < 8 && y > grid - 9);
      if (inFinder) continue;
      if (rand() > 0.56) ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }
}
