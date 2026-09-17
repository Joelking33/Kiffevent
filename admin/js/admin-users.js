/**
 * KIFFEVENT ADMIN — admin-users.js
 */
let activeType = "Tous";
let currentPage = 1;
const PAGE_SIZE = 5;
const AVATAR_COLORS = ["#2E6BF0", "#7C3AED", "#0D9488", "#F59E0B", "#DC2626", "#0EA5E9"];

function typeBadge(type) {
  const map = { Client: "blue", Organisateur: "purple", Staff: "green" };
  return `<span class="badge badge-${map[type] || "gray"}">${type}</span>`;
}
function statusBadgeUser(status) {
  return status === "Actif" ? '<span class="badge badge-green">Actif</span>' : '<span class="badge badge-red">Suspendu</span>';
}
function initials(name) { return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase(); }

function getFiltered() {
  const q = document.getElementById("user-search").value.toLowerCase();
  const statusFilter = document.getElementById("status-filter").value;
  return USERS.filter((u) => {
    const matchTab = activeType === "Tous" || (activeType === "Suspendu" ? u.status === "Suspendu" : u.type === activeType);
    const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchTab && matchQ && matchStatus;
  });
}

function renderTable() {
  const list = getFiltered();
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  currentPage = Math.min(currentPage, totalPages);
  const pageItems = list.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  document.getElementById("users-table-body").innerHTML = pageItems.map((u, i) => `
    <tr>
      <td><div class="cell-user"><div class="avatar" style="background:${AVATAR_COLORS[i % AVATAR_COLORS.length]}">${initials(u.name)}</div><div><div class="cu-name">${u.name}</div><div class="cu-sub">${u.handle}</div></div></div></td>
      <td>${typeBadge(u.type)}</td>
      <td><div>${u.email}</div><div class="cu-sub">${u.phone}</div></td>
      <td><div>${u.registered}</div><div class="cu-sub">${u.registeredAgo}</div></td>
      <td>${statusBadgeUser(u.status)}</td>
      <td class="row-actions">
        <button class="icon-action" title="Voir">${icon("eye")}</button>
        <button class="icon-action" title="Modifier">${icon("pencil")}</button>
        <button class="icon-action" data-toggle-status="${u.name}" title="${u.status === "Actif" ? "Suspendre" : "Réactiver"}">${u.status === "Actif" ? icon("ban") : icon("checkCircle")}</button>
      </td>
    </tr>`).join("") || `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:30px;">Aucun utilisateur trouvé</td></tr>`;

  document.getElementById("pagination-info").textContent = `Affichage de ${list.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0} à ${Math.min(currentPage * PAGE_SIZE, list.length)} sur ${list.length} utilisateurs`;

  let pagesHTML = `<button ${currentPage === 1 ? "disabled" : ""} data-page="prev">‹</button>`;
  for (let p = 1; p <= totalPages; p++) pagesHTML += `<button class="${p === currentPage ? "active" : ""}" data-page="${p}">${p}</button>`;
  pagesHTML += `<button ${currentPage === totalPages ? "disabled" : ""} data-page="next">›</button>`;
  document.getElementById("pagination-pages").innerHTML = pagesHTML;

  document.querySelectorAll("[data-page]").forEach((btn) => btn.addEventListener("click", () => {
    const p = btn.getAttribute("data-page");
    if (p === "prev") currentPage--; else if (p === "next") currentPage++; else currentPage = Number(p);
    renderTable();
  }));
  document.querySelectorAll("[data-toggle-status]").forEach((btn) => btn.addEventListener("click", () => {
    const u = USERS.find((x) => x.name === btn.getAttribute("data-toggle-status"));
    u.status = u.status === "Actif" ? "Suspendu" : "Actif";
    showToast(u.status === "Actif" ? `${u.name} a été réactivé` : `${u.name} a été suspendu`, u.status === "Actif" ? "success" : "error");
    renderTable();
  }));
}

function renderDonut() {
  renderDonutChart(document.getElementById("users-donut"), document.getElementById("users-legend"), {
    segments: [
      { label: "Clients", value: 1248, color: "#2E6BF0", displayValue: "74% (1 248)" },
      { label: "Organisateurs", value: 248, color: "#7C3AED", displayValue: "15% (248)" },
      { label: "Staff", value: 156, color: "#0D9488", displayValue: "9% (156)" },
      { label: "Suspendus", value: 23, color: "#DC2626", displayValue: "1% (23)" },
    ],
    centerLabel: "utilisateurs", centerValue: "1 682",
  });
}

function renderLatestSignups() {
  const signups = [
    { name: "Diarra Ibrahim", type: "Client", time: "il y a 2 h" },
    { name: "Sangaré Aissatou", type: "Client", time: "il y a 4 h" },
    { name: "Ouattara Lassina", type: "Organisateur", time: "il y a 6 h" },
    { name: "Koffi Estelle", type: "Client", time: "il y a 8 h" },
    { name: "N'Dri Ali", type: "Staff", time: "il y a 10 h" },
  ];
  document.getElementById("latest-signups").innerHTML = signups.map((s, i) => `
    <div class="signup-row">
      <div class="avatar" style="background:${AVATAR_COLORS[i % AVATAR_COLORS.length]}">${initials(s.name)}</div>
      <div><div class="sr-name">${s.name}</div><div class="sr-time">${s.time}</div></div>
      ${typeBadge(s.type)}
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  renderDonut();
  renderLatestSignups();

  document.querySelectorAll("#user-tabs button").forEach((btn) => btn.addEventListener("click", () => {
    document.querySelectorAll("#user-tabs button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeType = btn.getAttribute("data-type");
    currentPage = 1;
    renderTable();
  }));
  document.getElementById("user-search").addEventListener("input", () => { currentPage = 1; renderTable(); });
  document.getElementById("status-filter").addEventListener("change", () => { currentPage = 1; renderTable(); });
  document.querySelectorAll(".quick-actions .btn").forEach((btn) => btn.addEventListener("click", () => showToast("Action simulée (démo front-end)", "")));
});
