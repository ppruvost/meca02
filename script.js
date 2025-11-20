// ============================================================
// script.js — Version finale corrigée
// - affiche l'abaque N = f(D) (option B)
// - superpose les points (courant + ajoutés)
// - conserve tous les autres modules (VC, fz, tableaux, graphiques)
// ============================================================

// -----------------------------
// Paramètres (transcription fidèle du PDF)
// -----------------------------
const parametres = {
  "FORET HSS": {
    "ALUMINIUM": { Vc: [70], fz: [0.1, 0.25] },
    "ACIER DOUX": { Vc: [25], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [25, 35], fz: [0.08, 0.12] },
    "LAITON / CUIVRE": { Vc: [22], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [20], fz: [0.08] },
    "INOX": { Vc: [16], fz: [0.07] },
    "TITANE": { Vc: [12], fz: [0.03, 0.06] },
    "INCONEL / HASTELLOY": { Vc: [10], fz: [0.03, 0.06] }
  },

  "FORET CARBURE": {
    "ALUMINIUM": { Vc: [100, 150], fz: [0.15, 0.3] },
    "ACIER DOUX": { Vc: [60, 80], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [60, 100], fz: [0.08, 0.18] },
    "LAITON / CUIVRE": { Vc: [50], fz: [0.08, 0.1] },
    "ACIER PRETRAITE": { Vc: [35, 40], fz: [0.08, 0.12] },
    "INOX": { Vc: [30], fz: [0.08] },
    "TITANE": { Vc: [25], fz: [0.03, 0.06] },
    "INCONEL / HASTELLOY": { Vc: [22], fz: [0.02, 0.04] }
  },

  "FORET A PLAQUETTES": {
    "ALUMINIUM": { Vc: [200], fz: [0.1] },
    "ACIER DOUX": { Vc: [120], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [120], fz: [0.1] },
    "LAITON / CUIVRE": { Vc: [110], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [100], fz: [0.1] },
    "INOX": { Vc: [80], fz: [0.1] },
    "TITANE": { Vc: [60], fz: [0.1] },
    "INCONEL / HASTELLOY": { Vc: [50], fz: [0.08] }
  },

  "FRAISE HSS": {
    "ALUMINIUM": { Vc: [120], fz: [0.1, 0.25] },
    "ACIER DOUX": { Vc: [25], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [25], fz: [0.08, 0.12] },
    "LAITON / CUIVRE": { Vc: [22], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [20], fz: [0.08] },
    "INOX": { Vc: [16], fz: [0.06] },
    "TITANE": { Vc: [12], fz: [0.025, 0.05] },
    "INCONEL / HASTELLOY": { Vc: [10], fz: [0.02, 0.04] }
  },

  "FRAISE CARBURE": {
    "ALUMINIUM": { Vc: [150, 250], fz: [0.15, 0.3] },
    "ACIER DOUX": { Vc: [60, 120], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [60, 80], fz: [0.1, 0.2] },
    "LAITON / CUIVRE": { Vc: [50], fz: [0.08, 0.1] },
    "ACIER PRETRAITE": { Vc: [35, 40], fz: [0.1, 0.15] },
    "INOX": { Vc: [30], fz: [0.08, 0.12] },
    "TITANE": { Vc: [25], fz: [0.025, 0.05] },
    "INCONEL / HASTELLOY": { Vc: [22], fz: [0.02, 0.04] }
  },

  "FRAISE A PLAQUETTES": {
    "ALUMINIUM": { Vc: [200, 300], fz: [0.05, 0.1] },
    "ACIER DOUX": { Vc: [140], fz: [0.05, 0.1] },
    "ACIER MI-DUR": { Vc: [120, 140], fz: [0.05, 0.1] },
    "LAITON / CUIVRE": { Vc: [120], fz: [0.05, 0.1] },
    "ACIER PRETRAITE": { Vc: [110], fz: [0.05, 0.1] },
    "INOX": { Vc: [100], fz: [0.05, 0.1] },
    "TITANE": { Vc: [80], fz: [0.05, 0.07] },
    "INCONEL / HASTELLOY": { Vc: [70], fz: [0.03, 0.05] }
  },

  "ALESOIR HSS": {
    "ALUMINIUM": { Vc: [30], fz: [0.1] },
    "ACIER DOUX": { Vc: [16], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [16], fz: [0.1] },
    "LAITON / CUIVRE": { Vc: [15], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [14], fz: [0.1] },
    "INOX": { Vc: [12], fz: [0.1] },
    "TITANE": { Vc: [10], fz: [0.1] },
    "INCONEL / HASTELLOY": { Vc: [10], fz: [0.08] }
  },

  "ALESOIR CARBURE": {
    "ALUMINIUM": { Vc: [50], fz: [0.1] },
    "ACIER DOUX": { Vc: [25], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [25], fz: [0.1] },
    "LAITON / CUIVRE": { Vc: [24], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [22], fz: [0.1] },
    "INOX": { Vc: [20], fz: [0.1] },
    "TITANE": { Vc: [16], fz: [0.08] },
    "INCONEL / HASTELLOY": { Vc: [15], fz: [0.08] }
  },

  "TETE A ALESER": {
    "ALUMINIUM": { Vc: [200], fz: [0.05, 0.1] },
    "ACIER DOUX": { Vc: [120], fz: [0.05, 0.1] },
    "ACIER MI-DUR": { Vc: [120], fz: [0.05, 0.1] },
    "LAITON / CUIVRE": { Vc: [110], fz: [0.05, 0.1] },
    "ACIER PRETRAITE": { Vc: [100], fz: [0.05, 0.1] },
    "INOX": { Vc: [60, 80], fz: [0.05, 0.1] },
    "TITANE": { Vc: [50], fz: [0.05, 0.07] },
    "INCONEL / HASTELLOY": { Vc: [50], fz: [0.03, 0.05] }
  },

  "TARAUD": {
    "ALUMINIUM": { Vc: [25] },
    "ACIER DOUX": { Vc: [9] },
    "ACIER MI-DUR": { Vc: [9] },
    "LAITON / CUIVRE": { Vc: [8] },
    "ACIER PRETRAITE": { Vc: [8] },
    "INOX": { Vc: [5] },
    "TITANE": { Vc: [4] },
    "INCONEL / HASTELLOY": { Vc: [3] }
  }
};


// -----------------------------
// Utilitaires
// -----------------------------
function moyenne(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return NaN;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function formatRange(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "—";
  return arr.length === 1 ? `${arr[0]}` : `${arr[0]} - ${arr[1]}`;
}

// N = (Vc * 1000) / (π * D)
function calcRPM(Vc, D) {
  if (!D || !Vc) return NaN;
  return (Vc * 1000) / (Math.PI * D);
}

// Vf = N * fz * Z
function calcVf(N, fz, Z) {
  if (isNaN(N) || isNaN(fz) || isNaN(Z)) return NaN;
  return N * fz * Z;
}


// -----------------------------
// DOM elements
// -----------------------------
const outilSelect = document.getElementById("outil");
const matiereSelect = document.getElementById("matiere");
const diamInput = document.getElementById("diametre");
const zInput = document.getElementById("z");
const vcRecoInput = document.getElementById("vcReco");
const fzRecoInput = document.getElementById("fzReco");
const rpmInput = document.getElementById("rpm");
const vfInput = document.getElementById("vf");
const updateBtn = document.getElementById("update");
const addRowBtn = document.getElementById("addRow");

const analyseVc = document.getElementById("analyseVc");
const analyseD = document.getElementById("analyseD");
const formuleExplication = document.getElementById("formuleExplication");

// Devine la formule DOM
const formuleInput = document.getElementById("formuleInput");
const testerBtn = document.getElementById("testerFormule");
const indiceBtn = document.getElementById("indiceBtn");
const solutionBtn = document.getElementById("solutionBtn");
const resultatFormule = document.getElementById("resultatFormule");
const indiceTexte = document.getElementById("indiceTexte");
const solutionTexte = document.getElementById("solutionTexte");


// -----------------------------
// Remplissage menus
// -----------------------------
function remplirOutils() {
  outilSelect.innerHTML = "";
  Object.keys(parametres).forEach(outil => {
    const opt = document.createElement("option");
    opt.value = outil;
    opt.textContent = outil;
    outilSelect.appendChild(opt);
  });
}

function remplirMatieres() {
  matiereSelect.innerHTML = "";
  const outil = outilSelect.value;
  if (!parametres[outil]) return;
  Object.keys(parametres[outil]).forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    matiereSelect.appendChild(opt);
  });
}

outilSelect.addEventListener("change", () => {
  remplirMatieres();
  rafraichir();
});
matiereSelect.addEventListener("change", rafraichir);
diamInput.addEventListener("input", rafraichir);
zInput.addEventListener("input", rafraichir);
updateBtn.addEventListener("click", rafraichir);

remplirOutils();
remplirMatieres();


// -----------------------------
// Animation roue
// -----------------------------
const wheelCanvas = document.getElementById("wheelCanvas");
const ctxWheel = wheelCanvas.getContext("2d");
let angle = 0;
let rotationSpeed = 0;

function drawWheel() {
  const W = wheelCanvas.width;
  const H = wheelCanvas.height;
  const R = Math.min(W, H) / 4;

  ctxWheel.clearRect(0, 0, W, H);
  ctxWheel.save();
  ctxWheel.translate(W / 2, H / 2);
  ctxWheel.rotate(angle);

  ctxWheel.beginPath();
  ctxWheel.arc(0, 0, R, 0, Math.PI * 2);
  ctxWheel.lineWidth = 2;
  ctxWheel.strokeStyle = "#333";
  ctxWheel.stroke();

  ctxWheel.beginPath();
  ctxWheel.moveTo(0, 0);
  ctxWheel.lineTo(R, 0);
  ctxWheel.strokeStyle = "red";
  ctxWheel.lineWidth = 2;
  ctxWheel.stroke();

  ctxWheel.restore();
  angle += rotationSpeed;
  requestAnimationFrame(drawWheel);
}
requestAnimationFrame(drawWheel);


// -----------------------------
// Zone pédagogique
// -----------------------------
function miseAJourPedagogie(VcRange, D, N) {
  if (!VcRange || !D || isNaN(N)) {
    analyseVc.textContent = "";
    analyseD.textContent = "";
    formuleExplication.textContent = "";
    return;
  }

  analyseVc.textContent = "➤ Quand la vitesse de coupe (Vc) augmente, la vitesse de rotation (N) augmente aussi.";
  analyseD.textContent = "➤ Quand le diamètre (D) augmente, la vitesse de rotation (N) doit diminuer pour conserver la même Vc.";

  formuleExplication.innerHTML =
    `<strong>Formule :</strong><br>
     <code>N = (Vc × 1000) / (π × D)</code><br><br>
     Exemples :<br>
     <code>N = (${formatRange(VcRange)} × 1000) / (π × ${D})</code><br>
     ≈ <strong>${Math.round(N)} tr/min</strong>`;
}


// -----------------------------
// Charts : 3 graphiques
// -----------------------------
const chartCanvas = document.getElementById("chartCanvas").getContext("2d");
const chartNDCanvas = document.getElementById("chartND").getContext("2d");
const chartNVcCanvas = document.getElementById("chartNVc").getContext("2d");

// Chart 1 : Vc = f(D) (points + abaque possible) - keep basic
const chart = new Chart(chartCanvas, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Points mesurés (simulation)",
        data: [],
        pointRadius: 5
      }
    ]
  },
  options: {
    scales: {
      x: { title: { display: true, text: "Diamètre (mm)" }, beginAtZero: true },
      y: { title: { display: true, text: "Vc (m/min)" }, beginAtZero: true }
    }
  }
});

// Chart ND : N = f(D) — includes abaque curves + points
const chartND = new Chart(chartNDCanvas, {
  type: "scatter",
  data: {
    datasets: [
      // Abaque min (if exists) - line
      {
        label: "Abaque N (Vc min)",
        data: [],
        showLine: true,
        pointRadius: 0,
        borderWidth: 1.5,
        borderDash: [6, 4],
        tension: 0.1
      },
      // Abaque mean - solid line
      {
        label: "Abaque N (Vc moyen)",
        data: [],
        showLine: true,
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.1
      },
      // Abaque max (if exists) - line
      {
        label: "Abaque N (Vc max)",
        data: [],
        showLine: true,
        pointRadius: 0,
        borderWidth: 1.5,
        borderDash: [6, 4],
        tension: 0.1
      },
      // Points ajoutés par l'utilisateur
      {
        label: "Points enregistrés",
        data: [],
        pointRadius: 5,
        backgroundColor: "blue"
      },
      // Point courant (mis à jour via 'Mettre à jour')
      {
        label: "Point courant",
        data: [],
        pointRadius: 8,
        backgroundColor: "red"
      }
    ]
  },
  options: {
    scales: {
      x: { title: { display: true, text: "Diamètre D (mm)" }, beginAtZero: true },
      y: { title: { display: true, text: "N (tr/min)" }, beginAtZero: true }
    }
  }
});

// Chart NVc : N = f(Vc)
const chartNVc = new Chart(chartNVcCanvas, {
  type: "scatter",
  data: {
    datasets: [{
      label: "N en fonction de Vc",
      data: [],
      pointRadius: 4
    }]
  },
  options: {
    scales: {
      x: { title: { display: true, text: "Vc (m/min)" }, beginAtZero: true },
      y: { title: { display: true, text: "N (tr/min)" }, beginAtZero: true }
    }
  }
});


// -----------------------------
// Abaque generator for N = f(D)
// - returns objects for min/mean/max (arrays of {x: D, y: N})
// -----------------------------
function genererAbaqueND() {
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  if (!parametres[outil] || !parametres[outil][mat]) return { min: [], mean: [], max: [] };

  const VcRange = parametres[outil][mat].Vc;
  const Vc_min = VcRange.length === 1 ? VcRange[0] : VcRange[0];
  const Vc_max = VcRange.length === 1 ? VcRange[0] : VcRange[1];
  const Vc_mean = moyenne(VcRange);

  const minPoints = [];
  const meanPoints = [];
  const maxPoints = [];

  // Generate D from 1 mm to 200 mm (step 1 or 2 depending)
  const step = 2;
  for (let D = 1; D <= 200; D += step) {
    const N_min = calcRPM(Vc_min, D);
    const N_mean = calcRPM(Vc_mean, D);
    const N_max = calcRPM(Vc_max, D);
    minPoints.push({ x: D, y: N_min });
    meanPoints.push({ x: D, y: N_mean });
    maxPoints.push({ x: D, y: N_max });
  }

  return { min: minPoints, mean: meanPoints, max: maxPoints };
}


// -----------------------------
// Rafraîchir affichage principal
// - met à jour inputs, animation, abaque, point courant sur chartND
// -----------------------------
function rafraichir() {
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  const D = parseFloat(diamInput.value);
  const Z = parseFloat(zInput.value);

  if (!parametres[outil] || !parametres[outil][mat]) return;

  const data = parametres[outil][mat];
  const VcRange = data.Vc || [];
  const fzRange = data.fz || [];

  // Affichages textuels
  vcRecoInput.value = formatRange(VcRange);
  fzRecoInput.value = fzRange.length ? formatRange(fzRange) : "—";

  const Vc_mean = moyenne(VcRange);
  const fz_mean = fzRange.length ? moyenne(fzRange) : NaN;

  // Calculs
  const N = calcRPM(Vc_mean, D);
  rpmInput.value = isNaN(N) ? "" : Math.round(N);
  const Vf = calcVf(N, fz_mean, Z);
  vfInput.value = isNaN(Vf) ? "" : Vf.toFixed(1);

  // Animation speed
  rotationSpeed = isNaN(N) ? 0 : (N / 60) * 0.02;

  // Pedagogy
  miseAJourPedagogie(VcRange, D, N);

  // Update abaque on chartND
  const abaque = genererAbaqueND();
  // Fill datasets 0..2 with abaque data
  chartND.data.datasets[0].data = abaque.min;
  chartND.data.datasets[1].data = abaque.mean;
  chartND.data.datasets[2].data = abaque.max;

  // Update the current point dataset (dataset index 4)
  chartND.data.datasets[4].data = []; // reset
  if (!isNaN(D) && !isNaN(N)) {
    chartND.data.datasets[4].data.push({ x: D, y: N });
  }

  chartND.update();

  // Also update chartNVc's current point if desired (not persistent)
  // Here we do not clear the dataset, we add a temporary point in a separate dataset
  // We'll not modify chartNVc datasets here (points are added on addRow)
}


// -----------------------------
// Ajouter ligne + mise à jour graphiques
// -----------------------------
addRowBtn.addEventListener("click", () => {
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  const D = parseFloat(diamInput.value);
  const Z = parseFloat(zInput.value);

  if (!parametres[outil] || !parametres[outil][mat]) return;

  const data = parametres[outil][mat];
  const VcRange = data.Vc;
  const fzRange = data.fz || [];

  const Vc_num = moyenne(VcRange);
  const fz_num = fzRange.length ? moyenne(fzRange) : NaN;

  const N = calcRPM(Vc_num, D);
  const Vf = calcVf(N, fz_num, Z);

  // Append row to table
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${outil}</td>
    <td>${mat}</td>
    <td>${Number.isFinite(D) ? D : ""}</td>
    <td>${Number.isFinite(Z) ? Z : ""}</td>
    <td>${formatRange(VcRange)}</td>
    <td>${fzRange.length ? formatRange(fzRange) : "—"}</td>
    <td>${Number.isFinite(N) ? Math.round(N) : ""}</td>
    <td>${Number.isFinite(Vf) ? Vf.toFixed(1) : ""}</td>
  `;
  document.querySelector("#dataTable tbody").appendChild(tr);

  // Update Chart 1 (Vc vs D) - use Vc_num as y
  chart.data.datasets[0].data.push({ x: D, y: Vc_num });
  chart.update();

  // Update Chart ND: add to dataset index 3 (Points enregistrés)
  chartND.data.datasets[3].data.push({ x: D, y: N });
  chartND.update();

  // Update Chart NVc: add (x=Vc_num, y=N)
  chartNVc.data.datasets[0].data.push({ x: Vc_num, y: N });
  chartNVc.update();
});


// -----------------------------
// Devine la formule (mode interactif)
// - simple test par substitution et comparaison numérique
// -----------------------------
let indiceStep = 0;

function normaliserFormuleTexte(txt) {
  return txt.toLowerCase().replace(/\s+/g, "");
}

testerBtn.addEventListener("click", () => {
  indiceTexte.textContent = "";
  solutionTexte.textContent = "";

  const D = parseFloat(diamInput.value);
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  if (!parametres[outil] || !parametres[outil][mat]) {
    resultatFormule.textContent = "Choisis d'abord un outil et une matière.";
    resultatFormule.style.color = "red";
    return;
  }
  const Vc = moyenne(parametres[outil][mat].Vc);
  const N_correct = calcRPM(Vc, D);

  const entree = formuleInput.value.trim();
  if (!entree) {
    resultatFormule.textContent = "⚠️ Propose d’abord une formule.";
    resultatFormule.style.color = "red";
    return;
  }

  // Attempt to evaluate the user's formula by replacing Vc and D with numbers
  // Caution: use a safe eval approach — here a minimal approach using Function constructor
  try {
    // Replace common tokens (pi -> Math.PI)
    let expr = entree.replace(/π/g, "Math.PI").replace(/pi/gi, "Math.PI");
    // Replace Vc and D tokens with numeric values
    expr = expr.replace(/Vc/g, `(${Vc})`).replace(/vc/g, `(${Vc})`);
    expr = expr.replace(/D/g, `(${D})`).replace(/d/g, `(${D})`);
    // Remove "N=" or similar if user included
    expr = expr.replace(/^.*=*/, "");
    // Evaluate
    // eslint-disable-next-line no-new-func
    const val = Function(`return (${expr});`)();

    if (isNaN(val)) throw new Error("NaN");

    if (Math.abs(val - N_correct) < Math.max(1, 0.01 * N_correct)) {
      resultatFormule.textContent = "✅ Bravo ! Ta formule est correcte.";
      resultatFormule.style.color = "green";
    } else {
      resultatFormule.textContent = `❌ Incorrect (ta valeur ≈ ${Math.round(val)}, attendu ≈ ${Math.round(N_correct)}).`;
      resultatFormule.style.color = "red";
    }
  } catch (e) {
    resultatFormule.textContent = "⚠️ Formule invalide. Vérifie la syntaxe.";
    resultatFormule.style.color = "red";
  }
});

indiceBtn.addEventListener("click", () => {
  indiceStep++;
  solutionTexte.textContent = "";
  if (indiceStep === 1) indiceTexte.textContent = "Indice 1 : N est proportionnel à Vc.";
  else if (indiceStep === 2) indiceTexte.textContent = "Indice 2 : N varie inversement avec D (division).";
  else if (indiceStep === 3) indiceTexte.textContent = "Indice 3 : Il faut convertir Vc (m/min) avec ×1000.";
  else if (indiceStep >= 4) indiceTexte.textContent = "Dernier indice : structure générale N = (Vc * 1000) / (π * D)";
});

solutionBtn.addEventListener("click", () => {
  indiceTexte.textContent = "";
  solutionTexte.innerHTML = "🧠 <strong>Solution :</strong><br><code>N = (Vc × 1000) / (π × D)</code>";
});


// -----------------------------
// Initial refresh to populate charts/inputs
// -----------------------------
rafraichir();

// End of script
