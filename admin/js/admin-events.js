/**
 * KIFFEVENT ADMIN — admin-events.js
 */
let evCurrentPage = 1;
const EV_PAGE_SIZE = 5;

function evStatusBadge(status) {
  const map = { "Publié": "green", "Brouillon": "amber", "Programmé": "purple", "Terminé": "gray", "Archivé": "gray" };
  return `<span class="badge badge-${map[status] || "gray"}">${status}</span>`;
}

function getFilteredEvents() {
  const q = document.getElementById("event-search").value.toLowerCase();
  const cat = document.getElementById("category-filter").value;
  const status = document.getElementById("event-status-filter").value;
  return ADMIN_EVENTS.filter((e) =>
    (!q || e.title.toLowerCase().includes(q)) &&
    (cat === "all" || e.category === cat) &&
    (status === "all" || e.status === status)
  );
}

function renderEventsTable() {
  const list = getFilteredEvents();
  const totalPages = Math.max(1, Math.ceil(list.length / EV_PAGE_SIZE));
  evCurrentPage = Math.min(evCurrentPage, totalPages);
  const pageItems = list.slice((evCurrentPage - 1) * EV_PAGE_SIZE, evCurrentPage * EV_PAGE_SIZE);

  document.getElementById("events-table-body").innerHTML = pageItems.map((e) => `
    <tr>
      <td><input type="checkbox"></td>
      <td><div class="cell-user"><div class="ev-thumb-lg" style="background-image:${e.gradient}"></div><div><div class="ev-name-cell">${e.title}</div><div class="ev-tags-cell">${e.tags}</div></div></div></td>
      <td><span class="badge badge-blue">${e.category}</span></td>
      <td>${e.organizer}</td>
      <td>${e.date}<div class="cu-sub">${e.time}</div></td>
      <td>${e.location}</td>
      <td>${evStatusBadge(e.status)}</td>
      <td class="row-actions"><button class="icon-action" title="Voir">${icon("eye")}</button><button class="icon-action" title="Modifier">${icon("pencil")}</button><button class="icon-action" title="Plus">${icon("dots")}</button></td>
    </tr>`).join("") || `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:30px;">Aucun événement trouvé</td></tr>`;

  document.getElementById("pagination-info").textContent = `Affichage de ${list.length ? (evCurrentPage - 1) * EV_PAGE_SIZE + 1 : 0} à ${Math.min(evCurrentPage * EV_PAGE_SIZE, list.length)} sur ${list.length} événements`;
  let pagesHTML = `<button ${evCurrentPage === 1 ? "disabled" : ""} data-page="prev">‹</button>`;
  for (let p = 1; p <= totalPages; p++) pagesHTML += `<button class="${p === evCurrentPage ? "active" : ""}" data-page="${p}">${p}</button>`;
  pagesHTML += `<button ${evCurrentPage === totalPages ? "disabled" : ""} data-page="next">›</button>`;
  document.getElementById("pagination-pages").innerHTML = pagesHTML;
  document.querySelectorAll("[data-page]").forEach((btn) => btn.addEventListener("click", () => {
    const p = btn.getAttribute("data-page");
    if (p === "prev") evCurrentPage--; else if (p === "next") evCurrentPage++; else evCurrentPage = Number(p);
    renderEventsTable();
  }));
}

function renderCategoryFilterOptions() {
  const sel = document.getElementById("category-filter");
  EVENT_CATEGORIES.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.name; opt.textContent = c.name;
    sel.appendChild(opt);
  });
}

function renderCategoriesList() {
  document.getElementById("categories-list").innerHTML = EVENT_CATEGORIES.map((c) => `
    <div class="cat-row">
      <div class="cat-dot" style="background:${c.color}">${icon("tag")}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count}</div>
      <span>›</span>
    </div>`).join("");
}

function renderSideEvents() {
  document.getElementById("recent-events-side").innerHTML = ADMIN_EVENTS.slice(0, 4).map((e) => `
    <div class="side-event-row">
      <div class="thumb" style="background-image:${e.gradient}"></div>
      <div><div class="se-name">${e.title}</div><div class="se-sub">${e.date} · ${e.status}</div></div>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryFilterOptions();
  renderEventsTable();
  renderCategoriesList();
  renderSideEvents();

  document.getElementById("event-search").addEventListener("input", () => { evCurrentPage = 1; renderEventsTable(); });
  document.getElementById("category-filter").addEventListener("change", () => { evCurrentPage = 1; renderEventsTable(); });
  document.getElementById("event-status-filter").addEventListener("change", () => { evCurrentPage = 1; renderEventsTable(); });
  document.querySelectorAll("#content-tabs button").forEach((btn) => btn.addEventListener("click", () => {
    document.querySelectorAll("#content-tabs button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }));
});
