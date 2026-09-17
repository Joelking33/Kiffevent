/**
 * KIFFEVENT STAFF — staff-scanner.js
 */
let scanPoolIndex = 0;

function renderStats() {
  const s = loadAdminState().scans;
  document.getElementById("stat-validated").textContent = s.validated;
  document.getElementById("stat-rejected").textContent = s.rejected;
  document.getElementById("stat-pending").textContent = s.pending;
  document.getElementById("stat-remaining").textContent = s.remaining;
}

function renderRecentScans() {
  const state = loadAdminState();
  document.getElementById("recent-scans-list").innerHTML = state.lastScans.slice(0, 6).map((s) => `
    <div class="scan-row">
      <div class="avatar">${s.name.split(" ").map((w) => w[0]).join("")}</div>
      <div><div class="sc-name">${s.name}</div><div class="sc-id">${s.ticketNo}</div></div>
      <div class="sc-right">${s.status === "Validé" ? '<span class="badge badge-green">Validé</span>' : '<span class="badge badge-red">Refusé</span>'}<span class="sc-time">${s.time}</span></div>
    </div>`).join("");
}

function renderResult(scan) {
  const canvas = document.getElementById("qr-demo-canvas");
  renderFakeQR(canvas, scan.ticketNo, 220);

  const panel = document.getElementById("scan-result-panel");

  if (scan.result === "invalid") {
    panel.innerHTML = `
      <div class="scan-result invalid">
        <div class="sr-icon">${icon("xCircle")}</div>
        <div class="sr-title invalid">Billet invalide</div>
        <div class="sr-sub">Ce QR code ne correspond à aucun billet connu.</div>
      </div>
      <div class="result-actions"><button class="btn btn-outline btn-block" id="rescan-btn">${icon("repeat")}Scanner un autre billet</button></div>`;
  } else {
    const isUsed = scan.result === "used";
    panel.innerHTML = `
      <div class="scan-result ${isUsed ? "used" : "valid"}">
        <div class="sr-icon">${isUsed ? icon("alert") : icon("checkCircle")}</div>
        <div class="sr-title ${isUsed ? "used" : "valid"}">${isUsed ? "Billet déjà utilisé" : "Billet valide !"}</div>
        <div class="sr-sub">${isUsed ? "Ce billet a déjà été scanné à " + scan.usedAt : "Le participant peut entrer."}</div>
      </div>
      <div class="participant-card">
        <div class="p-thumb" style="background-image:${STAFF_EVENT.gradient}"></div>
        <div><div class="p-title">${STAFF_EVENT.title}</div><div class="p-sub">${STAFF_EVENT.category} · ${STAFF_EVENT.date}</div></div>
      </div>
      <div class="participant-card" style="margin-top:10px;">
        <div class="avatar" style="width:44px;height:44px;">${scan.name.split(" ").map((w) => w[0]).join("")}</div>
        <div><div class="p-title">${scan.name}</div><div class="p-sub">${scan.email}</div></div>
        <span class="badge badge-blue">${scan.ticketType}</span>
      </div>
      <div class="participant-detail">
        <div class="pd-row"><span class="pd-icon">${icon("ticket")}</span><span class="pd-label">N° billet</span><span class="pd-value">${scan.ticketNo}</span></div>
        <div class="pd-row"><span class="pd-icon">${icon("calendar")}</span><span class="pd-label">Date & heure</span><span class="pd-value">${STAFF_EVENT.date} · ${scan.time}</span></div>
        <div class="pd-row"><span class="pd-icon">${icon("mapPin")}</span><span class="pd-label">Lieu</span><span class="pd-value">${STAFF_EVENT.location}</span></div>
        <div class="pd-row"><span class="pd-icon">${icon("door")}</span><span class="pd-label">Entrée</span><span class="pd-value">${scan.entry}</span></div>
      </div>
      <div class="result-actions">
        ${!isUsed ? `<button class="btn btn-validate btn-block" id="validate-btn">${icon("check")}Valider le billet</button>` : ""}
        <button class="btn btn-outline btn-block" id="rescan-btn">${icon("repeat")}Scanner un autre billet</button>
      </div>`;
  }

  document.getElementById("rescan-btn").addEventListener("click", doScan);
  const validateBtn = document.getElementById("validate-btn");
  if (validateBtn) validateBtn.addEventListener("click", () => confirmValidation(scan));
}

function confirmValidation(scan) {
  updateAdminState((s) => {
    s.scans.validated++;
    s.scans.remaining = Math.max(0, s.scans.remaining - 1);
    s.lastScans.unshift({ name: scan.name, ticketNo: scan.ticketNo, type: scan.ticketType, status: "Validé", time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) });
  });
  showToast(`Billet de ${scan.name} validé`, "success");
  renderStats();
  renderRecentScans();
}

function doScan() {
  // Choisit le résultat suivant dans le pool de démonstration (cycle)
  scanPoolIndex = (scanPoolIndex + 1) % SCAN_RESULTS_POOL.length;
  const scan = SCAN_RESULTS_POOL[scanPoolIndex];
  if (scan.result === "invalid") {
    updateAdminState((s) => { s.scans.rejected++; });
    renderStats();
  }
  renderResult(scan);
}

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderRecentScans();
  renderResult(SCAN_RESULTS_POOL[0]); // état initial identique à la maquette de référence

  document.getElementById("torch-btn").addEventListener("click", function () {
    this.classList.toggle("active");
    showToast(this.classList.contains("active") ? "Lampe torche activée" : "Lampe torche désactivée", "");
  });
});
