/**
 * KIFFEVENT ADMIN — admin-security.js
 */
function logStatusBadge(status) { return status === "Succès" ? '<span class="badge badge-green">Succès</span>' : '<span class="badge badge-red">Échec</span>'; }

function renderActivityLog() {
  document.getElementById("activity-log-body").innerHTML = ACTIVITY_LOG.map((l) => `
    <tr>
      <td>${l.date}<div class="cu-sub">${l.time}</div></td>
      <td><div class="cell-user"><div class="avatar" style="width:28px;height:28px;font-size:10px;">${l.user.split(" ").map((w) => w[0]).join("")}</div>${l.user}</div></td>
      <td>${l.action}</td>
      <td class="cu-sub">${l.details}</td>
      <td class="badge-code">${l.ip}</td>
      <td>${logStatusBadge(l.status)}</td>
    </tr>`).join("");
}

function renderSessions() {
  document.getElementById("sessions-list").innerHTML = RECENT_SESSIONS.map((s) => `
    <div class="session-row">
      <div class="sess-icon">${s.device.includes("iPhone") || s.device.includes("Android") ? icon("smartphone") : icon("desktop")}</div>
      <div><div class="sess-device">${s.device}</div><div class="sess-loc">${s.location}</div></div>
      <div class="sess-right"><span class="badge ${s.status === "En ligne" ? "badge-green" : "badge-gray"}">${s.status}</span><div class="sess-time">${s.date} · ${s.time}</div></div>
    </div>`).join("");
}

let secUserFilter = "Tous";
function renderSecUsers() {
  const q = document.getElementById("sec-user-search").value.toLowerCase();
  const list = USERS.filter((u) => (secUserFilter === "Tous" || u.type === secUserFilter) && u.name.toLowerCase().includes(q)).slice(0, 5);
  document.getElementById("sec-users-body").innerHTML = list.map((u) => `
    <tr>
      <td><div class="cell-user"><div class="avatar" style="width:28px;height:28px;font-size:10px;">${u.name.split(" ").map((w) => w[0]).join("")}</div>${u.name}</div></td>
      <td><span class="badge badge-${u.type === "Client" ? "blue" : u.type === "Organisateur" ? "purple" : "green"}">${u.type}</span></td>
      <td><span class="badge ${u.status === "Actif" ? "badge-green" : "badge-red"}">${u.status}</span></td>
      <td class="cu-sub">${u.registered}</td>
    </tr>`).join("");
}

function renderPlatformSettings() {
  const items = [
    { icon: "info", title: "Informations générales", sub: "Nom, description, logo, coordonnées" },
    { icon: "card", title: "Moyens de paiement", sub: "Wave, Orange Money, MTN, Moov, carte" },
    { icon: "chart", title: "Commissions", sub: "Taux et règles des commissions" },
    { icon: "bell", title: "Notifications", sub: "Paramètres des notifications système" },
    { icon: "database", title: "Sauvegarde et restauration", sub: "Sauvegardes automatiques des données" },
    { icon: "wrench", title: "Maintenance", sub: "Mode maintenance et mises à jour" },
  ];
  document.getElementById("platform-settings").innerHTML = items.map((it) => `
    <div class="settings-row">
      <div class="set-icon">${icon(it.icon)}</div>
      <div><div class="set-title">${it.title}</div><div class="set-sub">${it.sub}</div></div>
      <span class="chev">›</span>
    </div>`).join("");
}

function renderSecurityAlerts() {
  document.getElementById("security-alerts-list").innerHTML = SECURITY_ALERTS.map((a) => `
    <div class="alert-row">
      <div class="al-icon" style="background:var(--${a.type}-bg, var(--blue-100));">${icon(a.icon)}</div>
      <div><div class="al-title">${a.title}</div><div class="al-sub">${a.sub}</div></div>
      <div class="al-time">${a.time}</div>
    </div>`).join("");
}

function renderSecurityDonut() {
  renderDonutChart(document.getElementById("security-donut"), null, {
    segments: [{ label: "Sécurisé", value: 92, color: "#16A34A" }, { label: "À améliorer", value: 8, color: "#E2E8F0" }],
    centerLabel: "sécurité", centerValue: "92%",
  });
  document.getElementById("security-checklist").innerHTML = `
    <li class="ok">Authentification à deux facteurs</li>
    <li class="ok">Pare-feu actif</li>
    <li class="ok">Protection anti-DDoS</li>
    <li class="ok">Sauvegardes automatiques</li>
    <li class="warn">1 alerte à traiter</li>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderActivityLog();
  renderSessions();
  renderSecUsers();
  renderPlatformSettings();
  renderSecurityAlerts();
  renderSecurityDonut();

  document.querySelectorAll("#sec-user-tabs button").forEach((btn) => btn.addEventListener("click", () => {
    document.querySelectorAll("#sec-user-tabs button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    secUserFilter = btn.getAttribute("data-t");
    renderSecUsers();
  }));
  document.getElementById("sec-user-search").addEventListener("input", renderSecUsers);
});
